export const tierLabels = {
  essentials: 'Essentials bookkeeping',
  standard: 'Standard bookkeeping',
  full_service: 'Full-service bookkeeping',
  custom_scope_review: 'Custom scope review',
} as const;

export const serviceLabels: Record<string, string> = {
  core_bookkeeping: 'Transaction categorization and monthly close',
  account_reconciliation: 'Bank, card, loan, and clearing-account reconciliation',
  monthly_financials: 'Monthly profit-and-loss and balance-sheet reporting',
  accounts_receivable: 'Accounts-receivable support',
  accounts_payable: 'Accounts-payable support',
  payroll_reconciliation: 'Payroll reconciliation',
  payroll_administration: 'Payroll administration',
  contractor_tracking: 'Contractor and 1099 tracking support',
  sales_tax: 'Sales-tax filing support',
  weekly_reporting: 'Weekly reporting cadence',
  income_tax_filing: 'Income-tax preparation and filing',
  audit_assurance: 'Audit or assurance services',
  legal_services: 'Legal advice or representation',
};

export const factorLabels: Record<string, string> = {
  core_close: 'Core monthly close and review',
  transactions: 'Monthly transaction volume',
  financial_accounts: 'Financial account reconciliations',
  accounts_receivable: 'Sales invoice volume',
  accounts_payable: 'Vendor bill volume',
  payroll: 'Payroll scope',
  contractors: 'Contractor tracking',
  sales_tax: 'Sales-tax filing scope',
  entities: 'Additional business entities',
  locations: 'Additional locations',
  accounting_method: 'Accounting method',
  inventory_ecommerce: 'Inventory or ecommerce activity',
  job_costing: 'Job costing',
  class_tracking: 'Class or location tracking',
  multi_currency: 'Multi-currency activity',
  commingled_activity: 'Mixed personal and business activity',
  payment_processors: 'Additional payment processors',
  reporting_cadence: 'Weekly reporting cadence',
};

export const manualReviewLabels: Record<string, string> = {
  transaction_volume: 'More than 750 monthly transactions',
  financial_accounts: 'More than 12 active financial accounts',
  entities: 'More than three business entities',
  locations: 'More than five locations',
  sales_invoices: 'More than 150 monthly sales invoices',
  vendor_bills: 'More than 150 monthly vendor bills',
  employees: 'More than 50 employees',
  contractors: 'More than 100 contractors',
  sales_tax: 'More than five sales-tax jurisdictions',
  catch_up_months: 'More than 24 months of catch-up work',
  major_reconstruction: 'The books may require major reconstruction',
  multi_currency_entities: 'Multi-currency activity across multiple entities',
  monthly_hours: 'Estimated monthly workload exceeds 40 hours',
  no_system_history: 'No accounting system and more than six months of history',
  prior_return_unavailable: 'A prior business tax return may not be available',
  catch_up_timeline: 'The calculated catch-up timeline exceeds 12 weeks',
};

export const pricingDisclaimer = 'This calculator provides a planning estimate using a draft pricing configuration. It is not a quote, engagement agreement, audit, assurance service, tax opinion, legal opinion, or guarantee of timing. Final services, price, and delivery schedule require review of your accounting records and written confirmation from IntegraFin.';
