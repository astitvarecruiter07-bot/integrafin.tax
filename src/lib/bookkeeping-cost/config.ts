import { PRICING_CONFIG_VERSION } from './types';

export const bookkeepingPricingConfig = Object.freeze({
  version: PRICING_CONFIG_VERSION,
  minimumMonthlyPrice: 299,
  minimumCatchUpPrice: 500,
  monthlyBlendedRate: 75,
  catchUpBlendedRate: 85,
  monthlyDeliveryContingency: 1.10,
  catchUpDeliveryContingency: 1.15,
  publicMonthlyLowFactor: 0.90,
  publicMonthlyHighFactor: 1.15,
  publicCatchUpLowFactor: 0.85,
  publicCatchUpHighFactor: 1.25,
  historicalRepeatEfficiency: 0.65,
  monthlyRoundingIncrement: 25,
  catchUpRoundingIncrement: 50,
  catchUpWeeklyCapacityHours: 12,
  maximumComplexityMultiplier: 1.75,
  coreCloseHours: 1.5,
});

export type BookkeepingPricingConfig = typeof bookkeepingPricingConfig;
