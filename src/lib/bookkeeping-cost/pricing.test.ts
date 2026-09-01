import { describe, expect, it } from 'vitest';
import { BookkeepingCostInputsSchema } from './schema';
import { calculateBookkeepingCost, getDocumentVolumeHours, getTransactionHours } from './pricing';
import { defaultBookkeepingCostInputs, type BookkeepingCostInputs } from './types';

const monthlyBase: BookkeepingCostInputs = {
  ...defaultBookkeepingCostInputs,
  estimateMode: 'monthly',
  monthsBehind: 0,
  priorTaxReturnAvailable: true,
};

describe('bookkeeping cost calculator', () => {
  it.each([
    [0, 0.75], [25, 0.75], [26, 1], [50, 1], [51, 1.75], [100, 1.75], [101, 3], [200, 3],
    [201, 5], [350, 5], [351, 7.5], [500, 7.5], [501, 11], [750, 11], [1_000, 14.5],
  ])('maps %i transactions to %f hours', (transactions, hours) => {
    expect(getTransactionHours(transactions)).toBe(hours);
  });

  it.each([[0, 0], [1, 1], [25, 1], [26, 2.5], [75, 2.5], [76, 5], [150, 5], [170, 6]])(
    'maps %i documents to %f hours',
    (volume, hours) => expect(getDocumentVolumeHours(volume)).toBe(hours),
  );

  it('calculates the micro-business reference fixture', () => {
    const result = calculateBookkeepingCost({
      ...monthlyBase,
      averageMonthlyTransactions: 40,
      activeFinancialAccounts: 2,
    });
    expect(result.monthly).toMatchObject({ estimatedHours: 3.2, low: 299, center: 299, high: 350, annualCenter: 3_588 });
    expect(result.recommendedTier).toBe('essentials');
    expect(result.firstYear.center).toBe(3_887);
  });

  it('calculates the typical-service-business reference fixture', () => {
    const result = calculateBookkeepingCost({
      ...monthlyBase,
      averageMonthlyTransactions: 150,
      activeFinancialAccounts: 3,
      monthlySalesInvoices: 20,
      monthlyVendorBills: 10,
      payrollService: 'reconciliation_only',
      employees: 5,
    });
    expect(result.monthly).toMatchObject({ estimatedHours: 8.7, low: 650, center: 725, high: 850, annualCenter: 8_700 });
    expect(result.recommendedTier).toBe('full_service');
  });

  it('calculates the ecommerce reference fixture and requires review', () => {
    const result = calculateBookkeepingCost({
      ...monthlyBase,
      averageMonthlyTransactions: 450,
      activeFinancialAccounts: 6,
      monthlySalesInvoices: 80,
      monthlyVendorBills: 80,
      payrollService: 'full_administration',
      employees: 12,
      contractors1099: 20,
      salesTaxJurisdictions: 3,
      salesTaxFrequency: 'monthly',
      entities: 2,
      locations: 2,
      accountingMethod: 'accrual',
      inventoryOrEcommerce: true,
      classOrLocationTracking: true,
      paymentProcessors: 4,
    });
    expect(result.monthly).toMatchObject({ estimatedHours: 51.5, low: 3_825, center: 4_250, high: 4_900 });
    expect(result.recommendedTier).toBe('custom_scope_review');
    expect(result.manualReviewReasons).toContain('monthly_hours');
  });

  it('calculates the six-month catch-up reference fixture', () => {
    const result = calculateBookkeepingCost({
      ...monthlyBase,
      estimateMode: 'both',
      averageMonthlyTransactions: 150,
      activeFinancialAccounts: 3,
      monthlySalesInvoices: 20,
      monthlyVendorBills: 10,
      payrollService: 'reconciliation_only',
      employees: 5,
      monthsBehind: 6,
      bookCondition: 'some_corrections',
    });
    expect(result.catchUp).toMatchObject({ estimatedHours: 42.4, low: 3_500, center: 4_150, high: 5_200 });
    expect(result.firstYear.center).toBe(12_850);
  });

  it('keeps catch-up-only output separate from monthly pricing', () => {
    const result = calculateBookkeepingCost({ ...defaultBookkeepingCostInputs, estimateMode: 'catch_up' });
    expect(result.monthly).toBeUndefined();
    expect(result.catchUp).toBeDefined();
    expect(result.firstYear.center).toBe(result.catchUp?.center);
  });

  it('ignores stale catch-up risk fields in a monthly-only estimate', () => {
    const result = calculateBookkeepingCost({
      ...monthlyBase,
      monthsBehind: 0,
      bookCondition: 'major_reconstruction',
      accountingSoftware: 'none',
      priorTaxReturnAvailable: false,
    });
    expect(result.manualReviewReasons).not.toEqual(expect.arrayContaining([
      'catch_up_months',
      'major_reconstruction',
      'no_system_history',
      'prior_return_unavailable',
      'catch_up_timeline',
    ]));
    expect(result.recommendedTier).not.toBe('custom_scope_review');
  });

  it('caps stacked complexity multipliers at 1.75', () => {
    const plain = calculateBookkeepingCost({ ...monthlyBase, averageMonthlyTransactions: 100, activeFinancialAccounts: 2 });
    const complex = calculateBookkeepingCost({
      ...monthlyBase,
      averageMonthlyTransactions: 100,
      activeFinancialAccounts: 2,
      accountingMethod: 'accrual',
      inventoryOrEcommerce: true,
      jobCosting: true,
      classOrLocationTracking: true,
      multiCurrency: true,
      commingledPersonalActivity: true,
      reportingCadence: 'weekly',
      paymentProcessors: 10,
    });
    expect(plain.monthly?.estimatedHours).toBe(4);
    expect(complex.monthly?.estimatedHours).toBe(6.9);
  });

  it('returns every documented manual-review trigger', () => {
    const result = calculateBookkeepingCost({
      ...defaultBookkeepingCostInputs,
      averageMonthlyTransactions: 751,
      activeFinancialAccounts: 13,
      entities: 4,
      locations: 6,
      paymentProcessors: 5,
      accountingMethod: 'accrual',
      accountingSoftware: 'none',
      multiCurrency: true,
      monthlySalesInvoices: 151,
      monthlyVendorBills: 151,
      payrollService: 'full_administration',
      employees: 51,
      contractors1099: 101,
      salesTaxJurisdictions: 6,
      salesTaxFrequency: 'monthly',
      monthsBehind: 25,
      bookCondition: 'major_reconstruction',
      priorTaxReturnAvailable: false,
    });
    expect(result.manualReviewReasons).toEqual(expect.arrayContaining([
      'transaction_volume', 'financial_accounts', 'entities', 'locations', 'sales_invoices', 'vendor_bills',
      'employees', 'contractors', 'sales_tax', 'catch_up_months', 'major_reconstruction', 'multi_currency_entities',
      'monthly_hours', 'no_system_history', 'prior_return_unavailable', 'catch_up_timeline',
    ]));
  });

  it('rejects inconsistent and unknown inputs', () => {
    expect(() => BookkeepingCostInputsSchema.parse({ ...monthlyBase, payrollService: 'full_administration', employees: 0 })).toThrow();
    expect(() => BookkeepingCostInputsSchema.parse({ ...monthlyBase, employees: 3, payrollService: 'none', payrollHandledOutsideScope: false })).toThrow();
    expect(() => BookkeepingCostInputsSchema.parse({ ...monthlyBase, salesTaxJurisdictions: 2, salesTaxFrequency: 'none' })).toThrow();
    expect(() => BookkeepingCostInputsSchema.parse({ ...monthlyBase, unexpected: true })).toThrow();
  });

  it('is deterministic and does not mutate input', () => {
    const input = structuredClone(defaultBookkeepingCostInputs);
    const before = structuredClone(input);
    expect(calculateBookkeepingCost(input)).toEqual(calculateBookkeepingCost(input));
    expect(input).toEqual(before);
  });
});
