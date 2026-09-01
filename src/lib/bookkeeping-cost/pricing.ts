import { bookkeepingPricingConfig, type BookkeepingPricingConfig } from './config';
import { BookkeepingCostInputsSchema } from './schema';
import {
  BOOKKEEPING_COST_VERSION,
  type BookkeepingCostInputs,
  type BookkeepingCostResult,
  type PriceRange,
} from './types';

export function roundToIncrement(value: number, increment: number) {
  return Math.round(value / increment) * increment;
}

export function floorToIncrement(value: number, increment: number) {
  return Math.floor(value / increment) * increment;
}

export function ceilToIncrement(value: number, increment: number) {
  return Math.ceil(value / increment) * increment;
}

export function getTransactionHours(transactions: number) {
  if (transactions <= 25) return 0.75;
  if (transactions <= 50) return 1;
  if (transactions <= 100) return 1.75;
  if (transactions <= 200) return 3;
  if (transactions <= 350) return 5;
  if (transactions <= 500) return 7.5;
  if (transactions <= 750) return 11;
  return 11 + (transactions - 750) * 0.014;
}

export function getDocumentVolumeHours(volume: number) {
  if (volume === 0) return 0;
  if (volume <= 25) return 1;
  if (volume <= 75) return 2.5;
  if (volume <= 150) return 5;
  return 5 + (volume - 150) * 0.05;
}

function publicRange(center: number, lowFactor: number, highFactor: number, increment: number, minimum: number): PriceRange {
  return {
    low: Math.max(minimum, floorToIncrement(center * lowFactor, increment)),
    center,
    high: ceilToIncrement(center * highFactor, increment),
  };
}

export function calculateBookkeepingCost(
  input: BookkeepingCostInputs,
  config: BookkeepingPricingConfig = bookkeepingPricingConfig,
): BookkeepingCostResult {
  const inputs = BookkeepingCostInputsSchema.parse(input);
  const factors: BookkeepingCostResult['factorBreakdown'] = [];

  const transactionHours = getTransactionHours(inputs.averageMonthlyTransactions);
  const reconciliationHours = inputs.activeFinancialAccounts * 0.35;
  const receivableHours = getDocumentVolumeHours(inputs.monthlySalesInvoices);
  const payableHours = getDocumentVolumeHours(inputs.monthlyVendorBills);
  const payrollHours = inputs.payrollService === 'reconciliation_only'
    ? 0.75 + inputs.employees * 0.08
    : inputs.payrollService === 'full_administration'
      ? 1.5 + inputs.employees * 0.15
      : 0;
  const contractorHours = inputs.contractors1099 * 0.04;
  const salesTaxHours = inputs.salesTaxJurisdictions * 0.75 * (inputs.salesTaxFrequency === 'quarterly' ? 0.33 : inputs.salesTaxFrequency === 'monthly' ? 1 : 0);
  const entityHours = Math.max(0, inputs.entities - 1) * 2.5;
  const locationHours = Math.max(0, inputs.locations - 1) * 0.75;

  [
    ['core_close', config.coreCloseHours],
    ['transactions', transactionHours],
    ['financial_accounts', reconciliationHours],
    ['accounts_receivable', receivableHours],
    ['accounts_payable', payableHours],
    ['payroll', payrollHours],
    ['contractors', contractorHours],
    ['sales_tax', salesTaxHours],
    ['entities', entityHours],
    ['locations', locationHours],
  ].forEach(([key, hours]) => {
    if (Number(hours) > 0) factors.push({ key: String(key), labelKey: String(key), hoursAdded: Math.round(Number(hours) * 100) / 100 });
  });

  const baseHours = config.coreCloseHours + transactionHours + reconciliationHours + receivableHours + payableHours + payrollHours + contractorHours + salesTaxHours + entityHours + locationHours;
  const multipliers: Array<[string, number]> = [
    ['accounting_method', inputs.accountingMethod === 'accrual' ? 1.2 : inputs.accountingMethod === 'unsure' ? 1.1 : 1],
    ['inventory_ecommerce', inputs.inventoryOrEcommerce ? 1.2 : 1],
    ['job_costing', inputs.jobCosting ? 1.15 : 1],
    ['class_tracking', inputs.classOrLocationTracking ? 1.1 : 1],
    ['multi_currency', inputs.multiCurrency ? 1.15 : 1],
    ['commingled_activity', inputs.commingledPersonalActivity ? 1.2 : 1],
    ['payment_processors', inputs.paymentProcessors > 2 ? Math.min(1.12, 1 + (inputs.paymentProcessors - 2) * 0.03) : 1],
    ['reporting_cadence', inputs.reportingCadence === 'weekly' ? 1.25 : 1],
  ];
  multipliers.forEach(([key, multiplier]) => {
    if (multiplier > 1) factors.push({ key, labelKey: key, multiplier: Math.round(multiplier * 1000) / 1000 });
  });
  const rawMultiplier = multipliers.reduce((product, [, multiplier]) => product * multiplier, 1);
  const complexityMultiplier = Math.min(rawMultiplier, config.maximumComplexityMultiplier);
  const adjustedMonthlyHours = Math.round(baseHours * complexityMultiplier * 10) / 10;

  const monthlyUnrounded = adjustedMonthlyHours * config.monthlyBlendedRate * config.monthlyDeliveryContingency;
  const monthlyCenter = Math.max(config.minimumMonthlyPrice, roundToIncrement(monthlyUnrounded, config.monthlyRoundingIncrement));
  const monthlyRange = publicRange(monthlyCenter, config.publicMonthlyLowFactor, config.publicMonthlyHighFactor, config.monthlyRoundingIncrement, config.minimumMonthlyPrice);
  const monthly = {
    ...monthlyRange,
    estimatedHours: adjustedMonthlyHours,
    annualLow: monthlyRange.low * 12,
    annualCenter: monthlyRange.center * 12,
    annualHigh: monthlyRange.high * 12,
  };

  let catchUp: BookkeepingCostResult['catchUp'];
  if (inputs.estimateMode !== 'monthly') {
    const conditionFactor = {
      clean_but_behind: 1,
      some_corrections: 1.25,
      unreconciled: 1.5,
      major_reconstruction: 2,
      unsure: 1.5,
    }[inputs.bookCondition];
    const catchUpHours = Math.round(adjustedMonthlyHours * inputs.monthsBehind * config.historicalRepeatEfficiency * conditionFactor * 10) / 10;
    const catchUpCenter = Math.max(
      config.minimumCatchUpPrice,
      roundToIncrement(catchUpHours * config.catchUpBlendedRate * config.catchUpDeliveryContingency, config.catchUpRoundingIncrement),
    );
    const catchUpRange = publicRange(catchUpCenter, config.publicCatchUpLowFactor, config.publicCatchUpHighFactor, config.catchUpRoundingIncrement, config.minimumCatchUpPrice);
    const centerWeeks = Math.max(1, Math.ceil(catchUpHours / config.catchUpWeeklyCapacityHours));
    catchUp = {
      ...catchUpRange,
      estimatedHours: catchUpHours,
      estimatedWeeksLow: Math.max(1, Math.floor(centerWeeks * 0.8)),
      estimatedWeeksHigh: Math.max(1, Math.ceil(centerWeeks * 1.25)),
    };
  }

  const onboarding = inputs.estimateMode === 'monthly' ? { ...monthlyRange } : undefined;
  const firstYear = inputs.estimateMode === 'catch_up' && catchUp
    ? { low: catchUp.low, center: catchUp.center, high: catchUp.high }
    : inputs.estimateMode === 'both' && catchUp
      ? { low: monthly.annualLow + catchUp.low, center: monthly.annualCenter + catchUp.center, high: monthly.annualHigh + catchUp.high }
      : { low: monthly.annualLow + (onboarding?.low || 0), center: monthly.annualCenter + (onboarding?.center || 0), high: monthly.annualHigh + (onboarding?.high || 0) };

  const reviewReasons: string[] = [];
  if (inputs.averageMonthlyTransactions > 750) reviewReasons.push('transaction_volume');
  if (inputs.activeFinancialAccounts > 12) reviewReasons.push('financial_accounts');
  if (inputs.entities > 3) reviewReasons.push('entities');
  if (inputs.locations > 5) reviewReasons.push('locations');
  if (inputs.monthlySalesInvoices > 150) reviewReasons.push('sales_invoices');
  if (inputs.monthlyVendorBills > 150) reviewReasons.push('vendor_bills');
  if (inputs.employees > 50) reviewReasons.push('employees');
  if (inputs.contractors1099 > 100) reviewReasons.push('contractors');
  if (inputs.salesTaxJurisdictions > 5) reviewReasons.push('sales_tax');
  if (catchUp && inputs.monthsBehind > 24) reviewReasons.push('catch_up_months');
  if (catchUp && inputs.bookCondition === 'major_reconstruction') reviewReasons.push('major_reconstruction');
  if (inputs.multiCurrency && inputs.entities > 1) reviewReasons.push('multi_currency_entities');
  if (adjustedMonthlyHours > 40) reviewReasons.push('monthly_hours');
  if (catchUp && inputs.accountingSoftware === 'none' && inputs.monthsBehind > 6) reviewReasons.push('no_system_history');
  if (catchUp && inputs.priorTaxReturnAvailable === false) reviewReasons.push('prior_return_unavailable');
  if (catchUp && catchUp.estimatedWeeksHigh > 12) reviewReasons.push('catch_up_timeline');

  const includedServiceKeys = ['core_bookkeeping', 'account_reconciliation', 'monthly_financials'];
  if (inputs.monthlySalesInvoices > 0) includedServiceKeys.push('accounts_receivable');
  if (inputs.monthlyVendorBills > 0) includedServiceKeys.push('accounts_payable');
  if (inputs.payrollService === 'reconciliation_only') includedServiceKeys.push('payroll_reconciliation');
  if (inputs.payrollService === 'full_administration') includedServiceKeys.push('payroll_administration');
  if (inputs.contractors1099 > 0) includedServiceKeys.push('contractor_tracking');
  if (inputs.salesTaxJurisdictions > 0) includedServiceKeys.push('sales_tax');
  if (inputs.reportingCadence === 'weekly') includedServiceKeys.push('weekly_reporting');

  const hasFullServiceScope = adjustedMonthlyHours > 15 || (inputs.monthlySalesInvoices > 0 && inputs.monthlyVendorBills > 0) || inputs.payrollService === 'full_administration' || inputs.inventoryOrEcommerce || inputs.entities > 1 || inputs.reportingCadence === 'weekly';
  const essentialsEligible = adjustedMonthlyHours < 5 && inputs.entities === 1 && inputs.monthlySalesInvoices === 0 && inputs.monthlyVendorBills === 0 && inputs.payrollService !== 'full_administration' && inputs.salesTaxJurisdictions === 0 && !inputs.inventoryOrEcommerce && !inputs.jobCosting && inputs.reportingCadence === 'monthly';
  const recommendedTier = reviewReasons.length > 0 ? 'custom_scope_review' : essentialsEligible ? 'essentials' : hasFullServiceScope ? 'full_service' : 'standard';

  return {
    calculatorVersion: BOOKKEEPING_COST_VERSION,
    pricingConfigVersion: config.version,
    currency: 'USD',
    monthly: inputs.estimateMode === 'catch_up' ? undefined : monthly,
    onboarding,
    catchUp,
    firstYear,
    recommendedTier,
    includedServiceKeys: [...new Set(includedServiceKeys)],
    excludedServiceKeys: ['income_tax_filing', 'audit_assurance', 'legal_services'],
    factorBreakdown: factors,
    assumptions: [
      'Transaction volume is a three-month monthly average.',
      'Requested records and system access are complete and available.',
      'Final price and timeline require a professional records review.',
    ],
    manualReviewReasons: [...new Set(reviewReasons)],
  };
}
