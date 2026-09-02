export const CALCULATOR_VERSION = '1.0' as const;

export const softwareValues = [
  'quickbooks_online',
  'quickbooks_desktop',
  'xero',
  'wave',
  'spreadsheet',
  'none',
  'other_or_unsure',
] as const;
export const monthsBehindValues = ['current', '1_3', '4_6', '7_12', '13_24', 'more_than_24', 'unsure'] as const;
export const monthlyTransactionValues = ['under_50', '50_100', '101_250', '251_500', 'more_than_500', 'unsure'] as const;
export const financialAccountValues = ['1_2', '3_4', '5_7', '8_plus', 'unsure'] as const;
export const reconciliationValues = ['last_month', 'within_3_months', 'within_6_months', 'more_than_6_months', 'never', 'unsure'] as const;
export const payrollValues = ['none', 'provider', 'incomplete', 'unsure'] as const;
export const mixedExpenseValues = ['none', 'occasionally', 'frequently', 'unsure'] as const;
export const complexityValues = [
  'inventory',
  'sales_tax',
  'business_loans',
  'multiple_processors',
  'multiple_entities',
  'subcontractors_1099',
  'none',
  'unsure',
] as const;
export const deadlineWindowValues = ['within_14_days', 'within_30_days', 'within_60_days', 'more_than_60_days', 'none'] as const;
export const deadlineTypeValues = [
  'tax_filing',
  'agency_notice',
  'payroll_or_sales_tax',
  'financing',
  'sale_or_investor',
  'internal_reporting',
  'other',
] as const;

export type BookkeepingAssessmentAnswers = {
  software: (typeof softwareValues)[number];
  monthsBehind: (typeof monthsBehindValues)[number];
  monthlyTransactions: (typeof monthlyTransactionValues)[number];
  financialAccounts: (typeof financialAccountValues)[number];
  reconciliationStatus: (typeof reconciliationValues)[number];
  payrollStatus: (typeof payrollValues)[number];
  mixedPersonalExpenses: (typeof mixedExpenseValues)[number];
  complexities: Array<(typeof complexityValues)[number]>;
  deadlineWindow: (typeof deadlineWindowValues)[number];
  deadlineType?: (typeof deadlineTypeValues)[number];
};

export type AssessmentCategory = 'reasonably_current' | 'light_catch_up' | 'moderate_cleanup' | 'complex_cleanup';
export type AssessmentUrgency = 'normal' | 'medium' | 'high' | 'critical';

export type BookkeepingAssessmentResult = {
  calculatorVersion: typeof CALCULATOR_VERSION;
  rawScore: number;
  score: number;
  category: AssessmentCategory;
  urgency: AssessmentUrgency;
  factors: Array<{ key: string; points: number; explanationKey: string }>;
  issueKeys: string[];
  checklistKeys: string[];
  recommendedServiceKeys: string[];
};

export type BookkeepingAssessmentRecord = {
  calculatorVersion: typeof CALCULATOR_VERSION;
  answers: BookkeepingAssessmentAnswers;
  result: BookkeepingAssessmentResult;
  contactPreference?: 'email' | 'phone' | 'no_preference';
  consentToContact: true;
  completedAt: Date;
  submittedAt: Date;
};
