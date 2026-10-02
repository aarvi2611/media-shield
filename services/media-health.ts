export interface HealthScoreBreakdown {
  aiClassification: number;
  safety: number;
  optimization: number;
  metadata: number;
  deliveryReadiness: number;
  overallScore: number;
  recommendations: string[];
}

interface MediaHealthInput {
  hasCategory: boolean;
  category?: string;
  confidence?: number;
  tagsCount: number;
  safetyStatus: string;
  moderationScore: number;
  bytes: number;
  optimizedBytes?: number | null;
  transformationsCount: number;
  hasBackgroundRemoved?: boolean;
  format: string;
  width: number;
  height: number;
}

/**
 * Calculates the Media Health Score (0-100) based on AI classification depth,
 * safety moderation, optimization savings, metadata completeness, and delivery readiness.
 */
export function calculateMediaHealthScore(input: MediaHealthInput): HealthScoreBreakdown {
  const recommendations: string[] = [];

  // 1. AI Classification (0 - 100)
  let aiClassification = 60;
  if (input.hasCategory) aiClassification += 20;
  if (input.confidence && input.confidence > 0.9) aiClassification += 20;
  else if (input.confidence && input.confidence > 0.75) aiClassification += 10;
  else {
    recommendations.push('Improve asset categorization confidence');
  }

  // 2. Safety Moderation (0 - 100)
  let safety = input.moderationScore;
  if (input.safetyStatus === 'SAFE') {
    safety = Math.max(95, safety);
  } else if (input.safetyStatus === 'REQUIRES_REVIEW') {
    safety = Math.min(60, safety);
    recommendations.push('Review flagged safety indicators before public distribution');
  } else {
    safety = Math.min(30, safety);
    recommendations.push('Resolve severe safety violation flags');
  }

  // 3. Optimization (0 - 100)
  let optimization = 70;
  if (input.optimizedBytes && input.bytes > 0) {
    const ratio = (input.bytes - input.optimizedBytes) / input.bytes;
    if (ratio >= 0.8) optimization = 98;
    else if (ratio >= 0.5) optimization = 90;
    else optimization = 80;
  } else {
    optimization = 65;
    recommendations.push('Enable f_auto,q_auto delivery optimization');
  }

  // 4. Metadata Completeness (0 - 100)
  let metadata = 50;
  if (input.tagsCount >= 6) metadata = 95;
  else if (input.tagsCount >= 3) metadata = 80;
  else if (input.tagsCount > 0) metadata = 65;
  else {
    metadata = 40;
    recommendations.push('Add descriptive tags and semantic metadata');
  }

  // 5. Delivery Readiness (0 - 100)
  let deliveryReadiness = 70;
  if (input.transformationsCount >= 3) deliveryReadiness = 95;
  else if (input.transformationsCount >= 1) deliveryReadiness = 85;
  else {
    recommendations.push('Generate responsive social and mobile crop variants');
  }

  if (!input.hasBackgroundRemoved && input.category && input.category.includes('Footwear')) {
    recommendations.push('Generate background-removed e-commerce variant');
  }

  // Overall Score (Weighted average)
  const overallScore = Math.round(
    aiClassification * 0.2 +
    safety * 0.3 +
    optimization * 0.2 +
    metadata * 0.15 +
    deliveryReadiness * 0.15
  );

  return {
    aiClassification: Math.min(100, Math.max(0, aiClassification)),
    safety: Math.min(100, Math.max(0, safety)),
    optimization: Math.min(100, Math.max(0, optimization)),
    metadata: Math.min(100, Math.max(0, metadata)),
    deliveryReadiness: Math.min(100, Math.max(0, deliveryReadiness)),
    overallScore: Math.min(100, Math.max(0, overallScore)),
    recommendations,
  };
}
