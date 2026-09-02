import { describe, expect, it } from 'vitest';
import { BookkeepingAssessmentAnswersSchema } from './schema';
import { calculateCleanupAssessment, getCategoryFromScore } from './scoring';
import type { BookkeepingAssessmentAnswers } from './types';

const minimumAnswers: BookkeepingAssessmentAnswers = {
  software: 'quickbooks_online',
  monthsBehind: 'current',
  monthlyTransactions: 'under_50',
  financialAccounts: '1_2',
  reconciliationStatus: 'last_month',
  payrollStatus: 'none',
  mixedPersonalExpenses: 'none',
  complexities: ['none'],
  deadlineWindow: 'none',
};

const maximumAnswers: BookkeepingAssessmentAnswers = {
  software: 'quickbooks_online',
  monthsBehind: 'more_than_24',
  monthlyTransactions: 'more_than_500',
  financialAccounts: '8_plus',
  reconciliationStatus: 'never',
  payrollStatus: 'incomplete',
  mixedPersonalExpenses: 'frequently',
  complexities: ['inventory', 'sales_tax', 'business_loans', 'multiple_processors', 'multiple_entities', 'subcontractors_1099'],
  deadlineWindow: 'none',
};

function scoreWith(changes: Partial<BookkeepingAssessmentAnswers>) {
  return calculateCleanupAssessment({ ...minimumAnswers, ...changes }).rawScore;
}

describe('bookkeeping cleanup scoring v1.0', () => {
  it('calculates the documented minimum and maximum', () => {
    expect(calculateCleanupAssessment(minimumAnswers)).toMatchObject({ rawScore: 0, score: 0, category: 'reasonably_current' });
    expect(calculateCleanupAssessment(maximumAnswers)).toMatchObject({ rawScore: 113, score: 100, category: 'complex_cleanup' });
  });

  it.each([
    ['current', 0], ['1_3', 8], ['4_6', 14], ['7_12', 20], ['13_24', 26], ['more_than_24', 30], ['unsure', 15],
  ] as const)('maps months-behind %s to %i points', (value, expected) => {
    expect(scoreWith({ monthsBehind: value })).toBe(expected);
  });

  it.each([
    ['under_50', 0], ['50_100', 3], ['101_250', 6], ['251_500', 10], ['more_than_500', 15], ['unsure', 6],
  ] as const)('maps monthly transaction %s to %i points', (value, expected) => {
    expect(scoreWith({ monthlyTransactions: value })).toBe(expected);
  });

  it.each([['1_2', 0], ['3_4', 3], ['5_7', 6], ['8_plus', 10], ['unsure', 3]] as const)(
    'maps financial accounts %s to %i points',
    (value, expected) => expect(scoreWith({ financialAccounts: value })).toBe(expected),
  );

  it.each([
    ['last_month', 0], ['within_3_months', 5], ['within_6_months', 10], ['more_than_6_months', 15], ['never', 20], ['unsure', 15],
  ] as const)('maps reconciliation %s to %i points', (value, expected) => {
    expect(scoreWith({ reconciliationStatus: value })).toBe(expected);
  });

  it.each([['none', 0], ['provider', 4], ['incomplete', 8], ['unsure', 4]] as const)(
    'maps payroll %s to %i points',
    (value, expected) => expect(scoreWith({ payrollStatus: value })).toBe(expected),
  );

  it.each([['none', 0], ['occasionally', 5], ['frequently', 10], ['unsure', 5]] as const)(
    'maps mixed activity %s to %i points',
    (value, expected) => expect(scoreWith({ mixedPersonalExpenses: value })).toBe(expected),
  );

  it('caps additional complexity and counts multiple entities separately once', () => {
    expect(scoreWith({ complexities: ['inventory', 'sales_tax', 'business_loans', 'multiple_processors', 'subcontractors_1099'] })).toBe(10);
    expect(scoreWith({ complexities: ['multiple_entities'] })).toBe(10);
    expect(scoreWith({ complexities: maximumAnswers.complexities })).toBe(20);
  });

  it.each([[24, 'reasonably_current'], [25, 'light_catch_up'], [44, 'light_catch_up'], [45, 'moderate_cleanup'], [69, 'moderate_cleanup'], [70, 'complex_cleanup']] as const)(
    'uses the documented category boundary at %i',
    (score, category) => expect(getCategoryFromScore(score)).toBe(category),
  );

  it('keeps urgency independent from complexity', () => {
    expect(calculateCleanupAssessment({ ...minimumAnswers, deadlineWindow: 'within_14_days' })).toMatchObject({ score: 0, urgency: 'critical' });
    expect(calculateCleanupAssessment(maximumAnswers)).toMatchObject({ score: 100, urgency: 'normal' });
  });

  it('uses stable factor ordering when contributions tie', () => {
    const result = calculateCleanupAssessment({ ...minimumAnswers, monthsBehind: '1_3', payrollStatus: 'incomplete', complexities: ['inventory', 'sales_tax', 'business_loans', 'multiple_processors'] });
    expect(result.factors.map((factor) => factor.key)).toEqual(['months_behind', 'payroll', 'additional_complexity']);
  });

  it('rejects mutually exclusive, duplicate, missing, and unknown answers', () => {
    expect(() => BookkeepingAssessmentAnswersSchema.parse({ ...minimumAnswers, complexities: ['none', 'inventory'] })).toThrow();
    expect(() => BookkeepingAssessmentAnswersSchema.parse({ ...minimumAnswers, complexities: ['unsure', 'sales_tax'] })).toThrow();
    expect(() => BookkeepingAssessmentAnswersSchema.parse({ ...minimumAnswers, complexities: ['inventory', 'inventory'] })).toThrow();
    const missingSoftware: Partial<BookkeepingAssessmentAnswers> = { ...minimumAnswers };
    delete missingSoftware.software;
    expect(() => BookkeepingAssessmentAnswersSchema.parse(missingSoftware)).toThrow();
    expect(() => BookkeepingAssessmentAnswersSchema.parse({ ...minimumAnswers, unexpected: true })).toThrow();
  });

  it('is deterministic and does not mutate its input', () => {
    const input = structuredClone(maximumAnswers);
    const before = structuredClone(input);
    const first = calculateCleanupAssessment(input);
    const second = calculateCleanupAssessment(input);
    expect(input).toEqual(before);
    expect(second).toEqual(first);
  });
});
