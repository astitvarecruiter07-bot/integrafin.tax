import type { BookkeepingAssessmentAnswers } from '@/lib/bookkeeping-cleanup/types';

export type SingleAnswerKey = Exclude<keyof BookkeepingAssessmentAnswers, 'complexities' | 'deadlineType'>;
export type QuestionDefinition = {
  key: SingleAnswerKey | 'complexities';
  title: string;
  helper?: string;
  multiple?: boolean;
  options: Array<{ value: string; label: string; description?: string }>;
};

export const questions: QuestionDefinition[] = [
  {
    key: 'software',
    title: 'What do you currently use to track your business finances?',
    options: [
      { value: 'quickbooks_online', label: 'QuickBooks Online' },
      { value: 'quickbooks_desktop', label: 'QuickBooks Desktop' },
      { value: 'xero', label: 'Xero' },
      { value: 'wave', label: 'Wave' },
      { value: 'spreadsheet', label: 'Spreadsheet' },
      { value: 'none', label: 'No accounting system' },
      { value: 'other_or_unsure', label: 'Other or not sure' },
    ],
  },
  {
    key: 'monthsBehind',
    title: 'How far behind are your books?',
    options: [
      { value: 'current', label: 'Current or less than one month' },
      { value: '1_3', label: '1–3 months' },
      { value: '4_6', label: '4–6 months' },
      { value: '7_12', label: '7–12 months' },
      { value: '13_24', label: '13–24 months' },
      { value: 'more_than_24', label: 'More than 24 months' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    key: 'monthlyTransactions',
    title: 'Approximately how many business transactions occur each month?',
    helper: 'Include deposits, purchases, transfers, fees, and payments across all business accounts.',
    options: [
      { value: 'under_50', label: 'Fewer than 50' },
      { value: '50_100', label: '50–100' },
      { value: '101_250', label: '101–250' },
      { value: '251_500', label: '251–500' },
      { value: 'more_than_500', label: 'More than 500' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    key: 'financialAccounts',
    title: 'How many financial accounts are involved?',
    helper: 'Count bank, credit-card, loan, and payment-platform accounts used by the business.',
    options: [
      { value: '1_2', label: '1–2 accounts' },
      { value: '3_4', label: '3–4 accounts' },
      { value: '5_7', label: '5–7 accounts' },
      { value: '8_plus', label: '8 or more accounts' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    key: 'reconciliationStatus',
    title: 'When were all business accounts last reconciled?',
    helper: 'Reconciliation means matching bookkeeping records to bank, card, loan, and payment statements.',
    options: [
      { value: 'last_month', label: 'Last month' },
      { value: 'within_3_months', label: 'Within the last 3 months' },
      { value: 'within_6_months', label: 'Within the last 6 months' },
      { value: 'more_than_6_months', label: 'More than 6 months ago' },
      { value: 'never', label: 'They have never been reconciled' },
      { value: 'unsure', label: 'I am not sure what reconciliation means' },
    ],
  },
  {
    key: 'payrollStatus',
    title: 'Does the business have employees or run payroll?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'provider', label: 'Yes, through a payroll provider' },
      { value: 'incomplete', label: 'Yes, but records may be incomplete' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    key: 'mixedPersonalExpenses',
    title: 'Are personal and business transactions mixed together?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'occasionally', label: 'Occasionally' },
      { value: 'frequently', label: 'Frequently' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    key: 'complexities',
    title: 'Which of these apply to the business?',
    helper: 'Select all that apply. “None” and “Not sure” must be selected by themselves.',
    multiple: true,
    options: [
      { value: 'inventory', label: 'Inventory' },
      { value: 'sales_tax', label: 'Sales-tax collection' },
      { value: 'business_loans', label: 'Business loans' },
      { value: 'multiple_processors', label: 'Multiple payment processors' },
      { value: 'multiple_entities', label: 'Multiple entities' },
      { value: 'subcontractors_1099', label: 'Subcontractors or 1099 payments' },
      { value: 'none', label: 'None of these' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    key: 'deadlineWindow',
    title: 'Is there an important deadline?',
    options: [
      { value: 'within_14_days', label: 'Within 14 days' },
      { value: 'within_30_days', label: 'Within 30 days' },
      { value: 'within_60_days', label: 'Within 60 days' },
      { value: 'more_than_60_days', label: 'More than 60 days away' },
      { value: 'none', label: 'No known deadline' },
    ],
  },
];

export const deadlineTypeOptions = [
  { value: 'tax_filing', label: 'Tax filing' },
  { value: 'agency_notice', label: 'IRS or state notice' },
  { value: 'payroll_or_sales_tax', label: 'Payroll or sales-tax matter' },
  { value: 'financing', label: 'Loan or financing request' },
  { value: 'sale_or_investor', label: 'Business sale or investor request' },
  { value: 'internal_reporting', label: 'Internal reporting need' },
  { value: 'other', label: 'Other' },
] as const;
