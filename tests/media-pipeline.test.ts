import assert from 'assert';
import { buildCloudinaryUrl } from '../lib/cloudinary';
import { calculateMediaHealthScore } from '../services/media-health';
import { moderateMedia } from '../services/cloudinary-moderation';
import { calculateSavings, formatBytes } from '../lib/utils';
import { TRANSFORMATION_PRESETS } from '../services/cloudinary-transform';

console.log('--- Starting MediaShield Automated Test Suite ---');

// Test 1: Cloudinary URL Transformation Syntax
console.log('Test 1: Cloudinary URL Generation & Syntax...');
const testPublicId = 'mediashield/sample_shoe_01';
const defaultUrl = buildCloudinaryUrl(testPublicId, 'f_auto,q_auto');
assert(defaultUrl.includes('/f_auto,q_auto/'), 'Default optimization must include f_auto,q_auto');
assert(defaultUrl.includes(testPublicId), 'URL must contain correct public ID');

const cropUrl = buildCloudinaryUrl(testPublicId, 'c_fill,g_auto,w_1080,h_1080/f_auto,q_auto');
assert(cropUrl.includes('c_fill,g_auto,w_1080,h_1080'), 'Smart crop URL must contain gravity auto crop parameters');
console.log('✓ Passed: Cloudinary URL generation verified.');

// Test 2: Bandwidth Savings & Byte Calculations
console.log('Test 2: Bandwidth Savings Calculation...');
const originalBytes = 10 * 1024 * 1024; // 10 MB
const optimizedBytes = 500 * 1024; // 500 KB
const savings = calculateSavings(originalBytes, optimizedBytes);
assert(savings > 90, 'Compression savings should exceed 90% for typical Cloudinary optimizations');
assert.strictEqual(formatBytes(1048576), '1 MB', 'Byte formatting should format 1MB correctly');
console.log(`✓ Passed: Savings calculation verified (${savings}% savings).`);

// Test 3: Media Health Score Algorithm
console.log('Test 3: Media Health Score Algorithm...');
const optimalScore = calculateMediaHealthScore({
  hasCategory: true,
  confidence: 0.96,
  tagsCount: 8,
  safetyStatus: 'SAFE',
  moderationScore: 98,
  bytes: 5000000,
  optimizedBytes: 300000,
  transformationsCount: 4,
  hasBackgroundRemoved: true,
  format: 'png',
  width: 2000,
  height: 2000,
});
assert(optimalScore.overallScore >= 90, 'Enriched and safe assets should score 90+');
assert(optimalScore.overallScore <= 100, 'Score must never exceed 100');

const riskyScore = calculateMediaHealthScore({
  hasCategory: false,
  confidence: 0.4,
  tagsCount: 0,
  safetyStatus: 'REQUIRES_REVIEW',
  moderationScore: 40,
  bytes: 5000000,
  optimizedBytes: null,
  transformationsCount: 0,
  format: 'jpg',
  width: 800,
  height: 600,
});
assert(riskyScore.overallScore < 60, 'Unoptimized risky asset should have low score');
assert(riskyScore.recommendations.length > 0, 'Risky asset should generate remediation recommendations');
console.log(`✓ Passed: Health score verified (Optimal: ${optimalScore.overallScore}, Risky: ${riskyScore.overallScore}).`);

// Test 4: Content Moderation & Quarantine Logic
console.log('Test 4: Content Moderation & Quarantine...');
const mockSafeUpload = {
  publicId: 'test_safe',
  url: 'http://example.com/test.jpg',
  secureUrl: 'https://example.com/test.jpg',
  format: 'jpg',
  width: 1200,
  height: 800,
  bytes: 120000,
  tags: ['sneaker', 'shoe'],
};
const safeMod = moderateMedia(mockSafeUpload, 'nike_running_shoe.jpg', 'Footwear');
assert.strictEqual(safeMod.safetyStatus, 'SAFE', 'Clean footwear should be marked SAFE');
assert(safeMod.isProductionReady, 'Clean media should be marked production ready');

const mockRiskyUpload = {
  publicId: 'test_risky',
  url: 'http://example.com/test.jpg',
  secureUrl: 'https://example.com/test.jpg',
  format: 'jpg',
  width: 1200,
  height: 800,
  bytes: 120000,
  tags: ['danger'],
};
const riskyMod = moderateMedia(mockRiskyUpload, 'restricted_firearm_weapon.jpg', 'Security Alert');
assert.strictEqual(riskyMod.safetyStatus, 'REQUIRES_REVIEW', 'Restricted weapons must require review');
assert.strictEqual(riskyMod.isProductionReady, false, 'Risky media must NOT be production ready');
console.log('✓ Passed: Content moderation guardrails verified.');

// Test 5: Transformation Presets Verification
console.log('Test 5: Transformation Presets Configuration...');
assert(TRANSFORMATION_PRESETS.length >= 6, 'Must provide at least 6 standard transformation presets');
const igSquare = TRANSFORMATION_PRESETS.find(p => p.id === 'instagram_square');
assert(igSquare, 'Instagram Square preset must exist');
assert(igSquare?.transformation.includes('c_fill,g_auto'), 'Preset must use content-aware g_auto gravity');
console.log(`✓ Passed: Verified ${TRANSFORMATION_PRESETS.length} transformation presets.`);

console.log('\n=========================================');
console.log('🎉 ALL 5 TEST SUITES PASSED SUCCESSFULLY!');
console.log('=========================================\n');
