import { z } from 'zod';
import {
  accountingMethods,
  accountingSoftwareValues,
  bookConditionValues,
  estimateModes,
  payrollServiceValues,
  reportingCadenceValues,
  salesTaxFrequencyValues,
} from './types';

const count = (maximum: number) => z.number().finite().int().min(0).max(maximum);

export const BookkeepingCostInputsSchema = z.strictObject({
  estimateMode: z.enum(estimateModes),
  averageMonthlyTransactions: count(5_000),
  activeFinancialAccounts: count(50).min(1),
  entities: count(10).min(1),
  locations: count(50).min(1),
  paymentProcessors: count(20),
  accountingMethod: z.enum(accountingMethods),
  accountingSoftware: z.enum(accountingSoftwareValues),
  inventoryOrEcommerce: z.boolean(),
  jobCosting: z.boolean(),
  classOrLocationTracking: z.boolean(),
  multiCurrency: z.boolean(),
  commingledPersonalActivity: z.boolean(),
  monthlySalesInvoices: count(1_000),
  monthlyVendorBills: count(1_000),
  payrollService: z.enum(payrollServiceValues),
  employees: count(500),
  payrollHandledOutsideScope: z.boolean(),
  contractors1099: count(500),
  salesTaxJurisdictions: count(50),
  salesTaxFrequency: z.enum(salesTaxFrequencyValues),
  reportingCadence: z.enum(reportingCadenceValues),
  monthsBehind: count(60),
  bookCondition: z.enum(bookConditionValues),
  priorTaxReturnAvailable: z.union([z.boolean(), z.literal('unknown')]),
}).superRefine((inputs, context) => {
  if (inputs.estimateMode !== 'monthly' && inputs.monthsBehind < 1) {
    context.addIssue({ code: 'custom', path: ['monthsBehind'], message: 'Enter at least one month for a catch-up estimate.' });
  }
  if (inputs.payrollService === 'full_administration' && inputs.employees < 1) {
    context.addIssue({ code: 'custom', path: ['employees'], message: 'Full payroll administration requires at least one employee.' });
  }
  if (inputs.payrollService === 'none' && inputs.employees > 0 && !inputs.payrollHandledOutsideScope) {
    context.addIssue({ code: 'custom', path: ['payrollHandledOutsideScope'], message: 'Confirm that payroll is handled outside this bookkeeping scope.' });
  }
  if (inputs.salesTaxJurisdictions > 0 && inputs.salesTaxFrequency === 'none') {
    context.addIssue({ code: 'custom', path: ['salesTaxFrequency'], message: 'Choose a filing frequency for sales-tax support.' });
  }
  if (inputs.salesTaxJurisdictions === 0 && inputs.salesTaxFrequency !== 'none') {
    context.addIssue({ code: 'custom', path: ['salesTaxJurisdictions'], message: 'Enter at least one sales-tax jurisdiction.' });
  }
});
