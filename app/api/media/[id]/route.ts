import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEMO_SAMPLE_ASSETS } from '@/lib/demo-data';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // First check database
    const asset = await prisma.mediaAsset.findFirst({
      where: {
        OR: [{ id }, { publicId: id }],
      },
      include: {
        tags: true,
        detectedObjects: true,
        transformations: true,
        metadata: true,
      },
    });

    if (asset) {
      return NextResponse.json({ success: true, data: asset });
    }

    // Check demo sample assets if not found in database
    const demoSample = DEMO_SAMPLE_ASSETS.find(
      (a) => a.id === id || a.publicId === id
    );

    if (demoSample) {
      const demoFormatted = {
        id: demoSample.id,
        publicId: demoSample.publicId,
        secureUrl: demoSample.secureUrl,
        url: demoSample.url,
        originalFilename: demoSample.originalFilename,
        format: demoSample.format,
        resourceType: 'image',
        width: demoSample.width,
        height: demoSample.height,
        bytes: demoSample.bytes,
        optimizedBytes: demoSample.optimizedBytes,
        savingsPercent: (
          ((demoSample.bytes - demoSample.optimizedBytes) / demoSample.bytes) *
          100
        ).toFixed(1),
        category: demoSample.category,
        confidence: demoSample.confidence,
        healthScore: demoSample.healthScore,
        safetyStatus: demoSample.safetyStatus,
        moderationScore: demoSample.moderationScore,
        moderationDetail: JSON.stringify(demoSample.moderationDetail),
        colorPalette: JSON.stringify(demoSample.colorPalette),
        isDemo: true,
        processingStatus: 'COMPLETED',
        createdAt: new Date().toISOString(),
        tags: demoSample.tags.map((t, idx) => ({
          id: `tag-${idx}`,
          name: t,
          confidence: 0.95,
          source: 'cloudinary_ai',
        })),
        detectedObjects: demoSample.detectedObjects.map((o, idx) => ({
          id: `obj-${idx}`,
          name: o.name,
          confidence: o.confidence,
        })),
        transformations: demoSample.transformations.map((t, idx) => ({
          id: `tr-${idx}`,
          presetName: t.presetName,
          transformation: t.transformation,
          url: t.url,
          width: t.width,
          height: t.height,
          format: t.format,
        })),
        metadata: [],
      };

      return NextResponse.json({ success: true, data: demoFormatted });
    }

    return NextResponse.json(
      { success: false, error: 'Media asset not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching asset detail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch asset detail' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.mediaAsset.deleteMany({
      where: {
        OR: [{ id }, { publicId: id }],
      },
    });

    return NextResponse.json({ success: true, message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete asset' },
      { status: 500 }
    );
  }
}
