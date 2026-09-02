import { BookkeepingAssessmentAnswersSchema } from './schema';
import { CALCULATOR_VERSION, type AssessmentCategory, type BookkeepingAssessmentAnswers, type BookkeepingAssessmentResult } from './types';

const points = {
  monthsBehind: { current: 0, '1_3': 8, '4_6': 14, '7_12': 20, '13_24': 26, more_than_24: 30, unsure: 15 },
  monthlyTransactions: { under_50: 0, '50_100': 3, '101_250': 6, '251_500': 10, more_than_500: 15, unsure: 6 },
  financialAccounts: { '1_2': 0, '3_4': 3, '5_7': 6, '8_plus': 10, unsure: 3 },
  reconciliationStatus: { last_month: 0, within_3_months: 5, within_6_months: 10, more_than_6_months: 15, never: 20, unsure: 15 },
  payrollStatus: { none: 0, provider: 4, incomplete: 8, unsure: 4 },
  mixedPersonalExpenses: { none: 0, occasionally: 5, frequently: 10, unsure: 5 },
} as const;

const additionalPointValues: Record<string, number> = {
  inventory: 2,
  sales_tax: 2,
  business_loans: 2,
  multiple_processors: 2,
  subcontractors_1099: 2,
  unsure: 3,
  none: 0,
};

export function getCategoryFromScore(score: number): AssessmentCategory {
  if (score <= 24) return 'reasonably_current';
  if (score <= 44) return 'light_catch_up';
  if (score <= 69) return 'moderate_cleanup';
  return 'complex_cleanup';
}

export function calculateCleanupAssessment(input: BookkeepingAssessmentAnswers): BookkeepingAssessmentResult {
  const answers = BookkeepingAssessmentAnswersSchema.parse(input);
  const additionalComplexity = Math.min(10, answers.complexities.reduce((sum, value) => sum + (additionalPointValues[value] || 0), 0));
  const multipleEntities = answers.complexities.includes('multiple_entities') ? 10 : 0;

  const contributions = [
    { key: 'months_behind', points: points.monthsBehind[answers.monthsBehind], explanationKey: 'months_behind' },
    { key: 'reconciliation', points: points.reconciliationStatus[answers.reconciliationStatus], explanationKey: 'reconciliation' },
    { key: 'multiple_entities', points: multipleEntities, explanationKey: 'multiple_entities' },
    { key: 'transaction_volume', points: points.monthlyTransactions[answers.monthlyTransactions], explanationKey: 'transaction_volume' },
    { key: 'financial_accounts', points: points.financialAccounts[answers.financialAccounts], explanationKey: 'financial_accounts' },
    { key: 'mixed_activity', points: points.mixedPersonalExpenses[answers.mixedPersonalExpenses], explanationKey: 'mixed_activity' },
    { key: 'payroll', points: points.payrollStatus[answers.payrollStatus], explanationKey: 'payroll' },
    { key: 'additional_complexity', points: additionalComplexity, explanationKey: 'additional_complexity' },
  ];
  const rawScore = contributions.reduce((sum, factor) => sum + factor.points, 0);
  const score = Math.max(0, Math.min(100, Math.round((rawScore / 113) * 100)));

  const factors = contributions.filter((factor) => factor.points > 0).sort((a, b) => b.points - a.points).slice(0, 3);
  if (factors.length < 3 && ['none', 'spreadsheet'].includes(answers.software)) {
    factors.push({ key: 'software_observation', points: 0, explanationKey: 'software_observation' });
  }
  if (factors.length < 3 && answers.deadlineWindow !== 'none') {
    factors.push({ key: 'deadline_observation', points: 0, explanationKey: 'deadline_observation' });
  }

  const issueKeys = contributions.filter((factor) => factor.points > 0).map((factor) => factor.key);
  if (['none', 'spreadsheet'].includes(answers.software)) issueKeys.push('software_setup');
  if (answers.deadlineWindow !== 'none') issueKeys.push('deadline');

  const checklistKeys = ['account_statements'];
  const complexityChecklistKeys = ['business_loans', 'sales_tax', 'inventory', 'multiple_processors', 'multiple_entities', 'subcontractors_1099'] as const;
  complexityChecklistKeys.forEach((key) => { if (answers.complexities.includes(key)) checklistKeys.push(key); });
  if (answers.payrollStatus !== 'none') checklistKeys.push('payroll');
  if (answers.mixedPersonalExpenses !== 'none') checklistKeys.push('mixed_activity');
  if (['spreadsheet', 'none'].includes(answers.software)) checklistKeys.push('source_records');
  if (answers.deadlineWindow !== 'none') checklistKeys.push('deadline');

  const category = getCategoryFromScore(score);
  const recommendedServiceKeys = [{ reasonably_current: 'books_review', light_catch_up: 'light_catch_up', moderate_cleanup: 'bookkeeping_cleanup', complex_cleanup: 'cleanup_scope_review' }[category]];
  if (['none', 'spreadsheet'].includes(answers.software)) recommendedServiceKeys.push('quickbooks_setup');
  if (answers.payrollStatus === 'incomplete') recommendedServiceKeys.push('payroll_review');
  if (answers.deadlineType === 'tax_filing') recommendedServiceKeys.push('tax_preparation');
  if (answers.complexities.includes('multiple_entities')) recommendedServiceKeys.push('multi_entity_scope');

  return {
    calculatorVersion: CALCULATOR_VERSION,
    rawScore,
    score,
    category,
    urgency: answers.deadlineWindow === 'within_14_days' ? 'critical' : answers.deadlineWindow === 'within_30_days' ? 'high' : answers.deadlineWindow === 'within_60_days' ? 'medium' : 'normal',
    factors,
    issueKeys: [...new Set(issueKeys)],
    checklistKeys: [...new Set(checklistKeys)],
    recommendedServiceKeys: [...new Set(recommendedServiceKeys)],
  };
}
