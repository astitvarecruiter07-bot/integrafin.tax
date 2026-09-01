export const BOOKKEEPING_COST_VERSION = '1.0-draft' as const;
export const PRICING_CONFIG_VERSION = '2026-09-draft-1' as const;

export const estimateModes = ['monthly', 'catch_up', 'both'] as const;
export const accountingMethods = ['cash', 'accrual', 'unsure'] as const;
export const accountingSoftwareValues = ['quickbooks_online', 'quickbooks_desktop', 'xero', 'wave', 'spreadsheet', 'none', 'other'] as const;
export const payrollServiceValues = ['none', 'reconciliation_only', 'full_administration'] as const;
export const salesTaxFrequencyValues = ['none', 'monthly', 'quarterly'] as const;
export const reportingCadenceValues = ['monthly', 'weekly'] as const;
export const bookConditionValues = ['clean_but_behind', 'some_corrections', 'unreconciled', 'major_reconstruction', 'unsure'] as const;

export type BookkeepingCostInputs = {
  estimateMode: (typeof estimateModes)[number];
  averageMonthlyTransactions: number;
  activeFinancialAccounts: number;
  entities: number;
  locations: number;
  paymentProcessors: number;
  accountingMethod: (typeof accountingMethods)[number];
  accountingSoftware: (typeof accountingSoftwareValues)[number];
  inventoryOrEcommerce: boolean;
  jobCosting: boolean;
  classOrLocationTracking: boolean;
  multiCurrency: boolean;
  commingledPersonalActivity: boolean;
  monthlySalesInvoices: number;
  monthlyVendorBills: number;
  payrollService: (typeof payrollServiceValues)[number];
  employees: number;
  payrollHandledOutsideScope: boolean;
  contractors1099: number;
  salesTaxJurisdictions: number;
  salesTaxFrequency: (typeof salesTaxFrequencyValues)[number];
  reportingCadence: (typeof reportingCadenceValues)[number];
  monthsBehind: number;
  bookCondition: (typeof bookConditionValues)[number];
  priorTaxReturnAvailable: true | false | 'unknown';
};

export type PriceRange = { low: number; center: number; high: number };

export type BookkeepingCostResult = {
  calculatorVersion: typeof BOOKKEEPING_COST_VERSION;
  pricingConfigVersion: typeof PRICING_CONFIG_VERSION;
  currency: 'USD';
  monthly?: PriceRange & {
    estimatedHours: number;
    annualLow: number;
    annualCenter: number;
    annualHigh: number;
  };
  onboarding?: PriceRange;
  catchUp?: PriceRange & {
    estimatedHours: number;
    estimatedWeeksLow: number;
    estimatedWeeksHigh: number;
  };
  firstYear: PriceRange;
  recommendedTier: 'essentials' | 'standard' | 'full_service' | 'custom_scope_review';
  includedServiceKeys: string[];
  excludedServiceKeys: string[];
  factorBreakdown: Array<{
    key: string;
    labelKey: string;
    hoursAdded?: number;
    multiplier?: number;
  }>;
  assumptions: string[];
  manualReviewReasons: string[];
};

export const defaultBookkeepingCostInputs: BookkeepingCostInputs = {
  estimateMode: 'both',
  averageMonthlyTransactions: 150,
  activeFinancialAccounts: 3,
  entities: 1,
  locations: 1,
  paymentProcessors: 1,
  accountingMethod: 'cash',
  accountingSoftware: 'quickbooks_online',
  inventoryOrEcommerce: false,
  jobCosting: false,
  classOrLocationTracking: false,
  multiCurrency: false,
  commingledPersonalActivity: false,
  monthlySalesInvoices: 0,
  monthlyVendorBills: 0,
  payrollService: 'none',
  employees: 0,
  payrollHandledOutsideScope: false,
  contractors1099: 0,
  salesTaxJurisdictions: 0,
  salesTaxFrequency: 'none',
  reportingCadence: 'monthly',
  monthsBehind: 6,
  bookCondition: 'some_corrections',
  priorTaxReturnAvailable: 'unknown',
};
