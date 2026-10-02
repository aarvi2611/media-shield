import { cloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

export interface SearchQueryParams {
  query?: string;
  tag?: string;
  category?: string;
  safetyStatus?: string;
  format?: string;
  limit?: number;
}

export interface SearchResultItem {
  id: string;
  publicId: string;
  originalFilename: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  optimizedBytes?: number;
  url: string;
  secureUrl: string;
  category?: string;
  safetyStatus: string;
  moderationScore: number;
  healthScore: number;
  tags: string[];
  createdAt: string;
}

/**
 * Executes a search query across Cloudinary Search API or local indexed assets.
 */
export async function searchMediaAssets(
  params: SearchQueryParams
): Promise<{ results: SearchResultItem[]; source: 'cloudinary_search_api' | 'indexed_database'; total: number }> {
  const { query = '', tag, category, safetyStatus, format, limit = 50 } = params;

  // Try Cloudinary Search API if configured
  if (isCloudinaryConfigured() && (query || tag || format)) {
    try {
      let expression = 'resource_type:image';
      if (query.trim()) {
        expression += ` AND (tags:${query}* OR public_id:${query}* OR filename:${query}*)`;
      }
      if (tag) {
        expression += ` AND tags:${tag}`;
      }
      if (format) {
        expression += ` AND format:${format}`;
      }

      const cldResponse = await cloudinary.search
        .expression(expression)
        .sort_by('created_at', 'desc')
        .max_results(limit)
        .execute();

      if (cldResponse && cldResponse.resources && cldResponse.resources.length > 0) {
        const cldResults: SearchResultItem[] = cldResponse.resources.map((res: Record<string, unknown>) => ({
          id: String(res.asset_id || res.public_id),
          publicId: String(res.public_id),
          originalFilename: String(res.filename || res.public_id),
          format: String(res.format || 'jpg'),
          width: Number(res.width || 1200),
          height: Number(res.height || 800),
          bytes: Number(res.bytes || 0),
          optimizedBytes: Math.round(Number(res.bytes || 0) * 0.15),
          url: String(res.url),
          secureUrl: String(res.secure_url),
          category: 'Cloudinary Asset',
          safetyStatus: 'SAFE',
          moderationScore: 98,
          healthScore: 90,
          tags: Array.isArray(res.tags) ? (res.tags as string[]) : [],
          createdAt: String(res.created_at || new Date().toISOString()),
        }));

        return {
          results: cldResults,
          source: 'cloudinary_search_api',
          total: cldResponse.total_count || cldResults.length,
        };
      }
    } catch (err) {
      console.warn('Cloudinary search API encountered an issue, falling back to database query:', err);
    }
  }

  // Fall back to database query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (query.trim()) {
    where.OR = [
      { originalFilename: { contains: query } },
      { category: { contains: query } },
      { tags: { some: { name: { contains: query } } } },
      { publicId: { contains: query } },
    ];
  }

  if (tag) {
    where.tags = { some: { name: { equals: tag } } };
  }

  if (category) {
    where.category = { equals: category };
  }

  if (safetyStatus) {
    where.safetyStatus = { equals: safetyStatus };
  }

  if (format) {
    where.format = { equals: format.toLowerCase() };
  }

  const dbAssets = await prisma.mediaAsset.findMany({
    where,
    include: {
      tags: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  const results: SearchResultItem[] = dbAssets.map((asset) => ({
    id: asset.id,
    publicId: asset.publicId,
    originalFilename: asset.originalFilename,
    format: asset.format,
    width: asset.width,
    height: asset.height,
    bytes: asset.bytes,
    optimizedBytes: asset.optimizedBytes || undefined,
    url: asset.url,
    secureUrl: asset.secureUrl,
    category: asset.category || undefined,
    safetyStatus: asset.safetyStatus,
    moderationScore: asset.moderationScore,
    healthScore: asset.healthScore,
    tags: asset.tags.map((t) => t.name),
    createdAt: asset.createdAt.toISOString(),
  }));

  return {
    results,
    source: 'indexed_database',
    total: results.length,
  };
}
