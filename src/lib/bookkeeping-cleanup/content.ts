import type { AssessmentCategory, AssessmentUrgency } from './types';

export const categoryContent: Record<AssessmentCategory, { label: string; explanation: string; nextSteps: string[] }> = {
  reasonably_current: {
    label: 'Books appear reasonably current',
    explanation: 'Your answers suggest the books may need a review or limited corrections rather than a large catch-up project. A professional should still confirm reconciliations, balances, and reporting before the result is relied upon.',
    nextSteps: [
      'Confirm every business account is reconciled through the latest statement.',
      'Review uncategorized and owner-related transactions.',
      'Run and review the balance sheet and profit-and-loss report.',
    ],
  },
  light_catch_up: {
    label: 'Light catch-up may be required',
    explanation: 'Your answers suggest a contained amount of catch-up or correction work. Final scope depends on statement availability, reconciliation differences, and transaction quality.',
    nextSteps: [
      'Gather statements for all affected accounts.',
      'Identify the last reliably reconciled month.',
      'Avoid making large historical changes until the file is reviewed.',
    ],
  },
  moderate_cleanup: {
    label: 'Moderate cleanup is likely',
    explanation: 'Your answers suggest multiple periods or accounting areas may require review, correction, and reconciliation before the reports are reliable.',
    nextSteps: [
      'List every bank, card, loan, payroll, and payment account involved.',
      'Gather statements and payroll or sales-tax reports for the affected period.',
      'Prioritize the earliest external deadline and request a professional scope review.',
    ],
  },
  complex_cleanup: {
    label: 'Complex cleanup is likely',
    explanation: 'Your answers suggest a broad cleanup involving significant history, volume, unreconciled activity, or multiple complexity factors. The work should be scoped after records are reviewed.',
    nextSteps: [
      'Preserve the current file and avoid bulk deletions or reclassifications.',
      'Gather complete statements and reports for every affected period and entity.',
      'Arrange a professional review and identify any tax, payroll, notice, or financing deadline immediately.',
    ],
  },
};

export const urgencyContent: Record<AssessmentUrgency, { label: string; explanation: string }> = {
  normal: { label: 'Normal', explanation: 'No near-term deadline was selected. Complexity and timing still require a records review.' },
  medium: { label: 'Medium', explanation: 'Your selected deadline is within 60 days. Begin gathering records soon so the scope can be reviewed.' },
  high: { label: 'High', explanation: 'Your selected deadline is within 30 days. Share the deadline during your consultation so it can be evaluated.' },
  critical: { label: 'Critical', explanation: 'Your selected deadline is within 14 days. Identify the exact date and related notice or request right away.' },
};

export const factorExplanations: Record<string, string> = {
  months_behind: 'The number of months behind is a major driver of review and catch-up work.',
  reconciliation: 'Older or missing reconciliations can require statement-by-statement investigation.',
  multiple_entities: 'The work may involve more than one business entity.',
  transaction_volume: 'Higher monthly transaction volume increases the amount of activity to review.',
  financial_accounts: 'More financial accounts create more balances and reconciliations to verify.',
  mixed_activity: 'Mixed personal and business transactions require additional classification review.',
  payroll: 'Payroll activity can add record-matching and filing dependencies.',
  additional_complexity: 'Your selected business activities add records and reporting considerations.',
  software_observation: 'Your current record-keeping system may need setup or migration review.',
  deadline_observation: 'Your upcoming deadline affects how quickly records should be organized.',
};

export const checklistContent: Record<string, string> = {
  account_statements: 'Monthly statements for each affected bank, card, loan, and payment account',
  business_loans: 'Loan statements showing principal, interest, and ending balance',
  payroll: 'Payroll registers, quarterly filings, and year-end forms',
  sales_tax: 'Sales-tax returns and platform sales reports',
  inventory: 'Latest inventory count and valuation method, if available',
  multiple_processors: 'Statements or exports from each payment processor',
  multiple_entities: 'Entity list, tax classification, and separate records for each entity',
  subcontractors_1099: 'Vendor list, W-9 records, and 1099 filing status',
  mixed_activity: 'Notes identifying owner contributions, draws, and personal transactions',
  source_records: 'Current spreadsheet or source records and your preferred future system',
  deadline: 'The notice, request, filing date, and any related correspondence',
};

export const serviceContent: Record<string, string> = {
  books_review: 'Books review or monthly bookkeeping',
  light_catch_up: 'Light catch-up bookkeeping',
  bookkeeping_cleanup: 'Bookkeeping cleanup',
  cleanup_scope_review: 'Professional bookkeeping cleanup scope review',
  quickbooks_setup: 'QuickBooks setup or migration review',
  payroll_review: 'Payroll-record review',
  tax_preparation: 'Separate tax-preparation review after the books are ready',
  multi_entity_scope: 'Professional multi-entity scope review',
};

export const requiredDisclaimer = 'This assessment provides a preliminary scope based only on the information entered. It is not a quote, audit, assurance service, tax opinion, legal opinion, or guarantee. Final scope, timing, and pricing require review of the accounting records. Tax preparation, filings, notices, payroll corrections, and other services may require separate engagements.';

export const sensitiveInformationWarning = 'Do not enter Social Security numbers, tax identification numbers, account numbers, bank details, passwords, tax returns, or other confidential financial records in this calculator.';
