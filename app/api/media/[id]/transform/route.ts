import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTransformationUrl } from '@/services/cloudinary-transform';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { presetName, transformation, width, height, format = 'webp' } = body;

    if (!transformation) {
      return NextResponse.json(
        { success: false, error: 'Transformation string is required' },
        { status: 400 }
      );
    }

    const asset = await prisma.mediaAsset.findFirst({
      where: {
        OR: [{ id }, { publicId: id }],
      },
    });

    if (!asset) {
      return NextResponse.json(
        { success: false, error: 'Asset not found' },
        { status: 404 }
      );
    }

    const url = generateTransformationUrl(asset.publicId, transformation, asset.secureUrl);

    const createdTransform = await prisma.mediaTransformation.create({
      data: {
        assetId: asset.id,
        presetName: presetName || 'Custom Transformation',
        transformation,
        url,
        width: width || null,
        height: height || null,
        format,
      },
    });

    return NextResponse.json({
      success: true,
      data: createdTransform,
    });
  } catch (error) {
    console.error('Error generating transformation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate transformation' },
      { status: 500 }
    );
  }
}
