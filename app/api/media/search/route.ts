import { NextRequest, NextResponse } from 'next/server';
import { searchMediaAssets } from '@/services/cloudinary-search';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const tag = searchParams.get('tag') || undefined;
    const category = searchParams.get('category') || undefined;
    const safetyStatus = searchParams.get('safety') || undefined;
    const format = searchParams.get('format') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const searchResponse = await searchMediaAssets({
      query,
      tag,
      category,
      safetyStatus,
      format,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...searchResponse,
    });
  } catch (error) {
    console.error('Search API failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search media library' },
      { status: 500 }
    );
  }
}
