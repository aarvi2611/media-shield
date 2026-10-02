import { PrismaClient } from '@prisma/client';
import { DEMO_SAMPLE_ASSETS } from '../lib/demo-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo assets into MediaShield database...');

  await prisma.mediaAsset.deleteMany({
    where: { isDemo: true },
  });

  for (const sample of DEMO_SAMPLE_ASSETS) {
    const savings = (((sample.bytes - sample.optimizedBytes) / sample.bytes) * 100);

    await prisma.mediaAsset.create({
      data: {
        publicId: sample.publicId,
        secureUrl: sample.secureUrl,
        url: sample.url,
        originalFilename: sample.originalFilename,
        format: sample.format,
        resourceType: 'image',
        width: sample.width,
        height: sample.height,
        bytes: sample.bytes,
        optimizedBytes: sample.optimizedBytes,
        savingsPercent: parseFloat(savings.toFixed(1)),
        category: sample.category,
        confidence: sample.confidence,
        healthScore: sample.healthScore,
        safetyStatus: sample.safetyStatus,
        moderationScore: sample.moderationScore,
        moderationDetail: JSON.stringify(sample.moderationDetail),
        colorPalette: JSON.stringify(sample.colorPalette),
        isDemo: true,
        processingStatus: 'COMPLETED',
        tags: {
          create: sample.tags.map((t) => ({
            name: t,
            confidence: 0.95,
            source: 'cloudinary_ai',
          })),
        },
        detectedObjects: {
          create: sample.detectedObjects.map((o) => ({
            name: o.name,
            confidence: o.confidence,
          })),
        },
        transformations: {
          create: sample.transformations.map((t) => ({
            presetName: t.presetName,
            transformation: t.transformation,
            url: t.url,
            width: t.width,
            height: t.height,
            format: t.format,
          })),
        },
      },
    });
  }

  console.log(`✓ Seeded ${DEMO_SAMPLE_ASSETS.length} sample assets into database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
