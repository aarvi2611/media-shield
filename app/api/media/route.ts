import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadToCloudinary } from '@/services/cloudinary-upload';
import { analyzeMedia } from '@/services/cloudinary-analysis';
import { moderateMedia } from '@/services/cloudinary-moderation';
import { generateDefaultTransformations } from '@/services/cloudinary-transform';
import { calculateMediaHealthScore } from '@/services/media-health';
import { calculateSavings } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');
    const safety = searchParams.get('safety');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (tag) where.tags = { some: { name: tag } };
    if (safety) where.safetyStatus = safety;
    if (category) where.category = category;

    const [assets, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        where,
        include: {
          tags: true,
          detectedObjects: true,
          transformations: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.mediaAsset.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: assets,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching media assets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve media assets' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form data' },
        { status: 400 }
      );
    }

    // Validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type: ${file.type}. Allowed: JPG, PNG, WEBP, GIF, AVIF`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds 25 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB)`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Upload to Cloudinary Pipeline
    const uploadResult = await uploadToCloudinary(buffer, file.name);

    // 2. AI Media Analysis (Objects, Categories, Semantic Tags, Colors)
    const analysis = analyzeMedia(uploadResult, file.name);

    // 3. Content Safety Moderation
    const moderation = moderateMedia(uploadResult, file.name, analysis.category);

    // 4. Optimization calculation (Cloudinary f_auto,q_auto typically delivers 80-94% compression)
    const estimatedOptimizedBytes = Math.round(uploadResult.bytes * 0.12);
    const savingsPercent = calculateSavings(uploadResult.bytes, estimatedOptimizedBytes);

    // 5. Default Transformations (Optimized delivery, background removal, social crops)
    const defaultTransforms = generateDefaultTransformations(
      uploadResult.publicId,
      uploadResult.secureUrl
    );

    // 6. Media Health Score
    const health = calculateMediaHealthScore({
      hasCategory: !!analysis.category,
      confidence: analysis.confidence,
      tagsCount: analysis.tags.length,
      safetyStatus: moderation.safetyStatus,
      moderationScore: moderation.moderationScore,
      bytes: uploadResult.bytes,
      optimizedBytes: estimatedOptimizedBytes,
      transformationsCount: defaultTransforms.length,
      hasBackgroundRemoved: defaultTransforms.some((t) => t.presetName.includes('Background')),
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });

    // 7. Persist in Database
    const asset = await prisma.mediaAsset.create({
      data: {
        publicId: uploadResult.publicId,
        secureUrl: uploadResult.secureUrl,
        url: uploadResult.url,
        originalFilename: file.name,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes,
        optimizedBytes: estimatedOptimizedBytes,
        savingsPercent,
        category: analysis.category,
        confidence: analysis.confidence,
        healthScore: health.overallScore,
        safetyStatus: moderation.safetyStatus,
        moderationScore: moderation.moderationScore,
        moderationDetail: JSON.stringify(moderation.moderationDetail),
        colorPalette: JSON.stringify(analysis.colorPalette),
        isDemo: uploadResult.isDemoFallback || false,
        processingStatus: 'COMPLETED',
        tags: {
          create: analysis.tags.map((tag) => ({
            name: tag,
            confidence: 0.95,
            source: analysis.source,
          })),
        },
        detectedObjects: {
          create: analysis.detectedObjects.map((obj) => ({
            name: obj.name,
            confidence: obj.confidence,
            boundingBox: obj.boundingBox ? JSON.stringify(obj.boundingBox) : null,
          })),
        },
        transformations: {
          create: defaultTransforms.map((t) => ({
            presetName: t.presetName,
            transformation: t.transformation,
            url: t.url,
            width: t.width,
            height: t.height,
            format: t.format,
          })),
        },
      },
      include: {
        tags: true,
        detectedObjects: true,
        transformations: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: asset,
      healthBreakdown: health,
    });
  } catch (error) {
    console.error('Upload handler failed:', error);
    return NextResponse.json(
      { success: false, error: 'Upload and pipeline execution failed' },
      { status: 500 }
    );
  }
}
