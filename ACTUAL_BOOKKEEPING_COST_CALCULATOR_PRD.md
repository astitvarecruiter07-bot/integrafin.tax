# Product Requirements Document: IntegraFin Bookkeeping Cost Calculator

**Document status:** Research-backed implementation specification  
**Prepared:** September 2, 2026  
**Recommended public product name:** Bookkeeping Cost Calculator  
**Recommended route:** `/bookkeeping-cost-calculator`  
**Primary market:** United States small businesses  
**Calculation version:** Proposed `1.0-draft`  
**Important:** The prices and rates in this document are an engineering reference configuration. IntegraFin must approve and calibrate them before public launch.

---

## 1. Executive Decision

The product should be an actual numeric **bookkeeping cost calculator**, not another health check or cleanup-complexity quiz.

The calculator should answer these customer questions:

1. What could monthly bookkeeping cost for a business like mine?
2. How many bookkeeping hours or workload units does my scope represent?
3. What could one-time catch-up or cleanup work cost if the books are behind?
4. What is the estimated first-year total?
5. Which services are included in the estimate?
6. Which inputs caused the estimate to increase?
7. Does the engagement require manual scoping?

The recommended experience combines the best observed characteristics of current calculators:

- Immediate results without mandatory lead capture, as used by [Tides Bookkeeping](https://www.tidesbookkeeping.com/tools).
- Transaction entry by active account, as used by [GoodBookkeeping](https://www.goodbookkeeping.com/pricing).
- A rolling three-month business-size input, as described by [QuickBooks Live](https://quickbooks.intuit.com/results-save-share/) and [Pilot](https://pilot.com/faq).
- Scope inputs for accounts, entities, payroll, AR/AP, inventory, and reporting, consistent with the factors disclosed by [Pilot](https://pilot.com/faq), [Profit Matters](https://profitmatters.com/pricing/), and [Silver Taza Labs](https://labs.silvertaza.com/how-much-to-charge-for-bookkeeping).
- A price **range**, factor breakdown, annual total, and manual-review flag rather than a falsely precise guaranteed quote.

### Core recommendation

Build one calculator with two linked estimates:

```text
Ongoing monthly bookkeeping estimate
                  +
Optional catch-up / cleanup estimate
                  =
Estimated first-year bookkeeping cost
```

The current `Bookkeeping Cleanup Calculator` should remain a separate diagnostic product or be renamed **Bookkeeping Cleanup Assessment**. It should not be presented as the numeric cost calculator.

---

## 2. What “Actual Bookkeeping Calculator” Means

The term can describe several different products. The recommended definition for IntegraFin is:

> A transparent estimator that converts bookkeeping workload and service-scope inputs into an estimated monthly service range, catch-up range, first-year total, estimated workload, and recommended service tier.

It is not:

- General-ledger software.
- A replacement for QuickBooks or Xero.
- A profit-and-loss statement generator.
- A tax calculator.
- A binding engagement quote.
- An audit of the visitor’s records.
- A lead form disguised as a calculator.

### Why this definition is recommended

Search results for “bookkeeping calculator” are dominated by bookkeeping cost, pricing, catch-up, and workload calculators. Strong calculators translate business activity into a useful number. The existing cleanup assessment provides a score but not the numeric outcome most users expect when they hear “calculator.”

---

## 3. Competitor and Market Research

### 3.1 Research approach

The review prioritized live calculator pages, official pricing pages, and provider explanations of their pricing inputs. It did not treat marketing claims as independent evidence of service quality.

Evaluation criteria:

1. Does the user receive a number immediately?
2. Is lead capture optional until after value is delivered?
3. Are the inputs understandable to a small-business owner?
4. Does the model include the major workload drivers?
5. Is the calculation or factor chain explained?
6. Are catch-up and monthly work kept separate?
7. Does the result communicate uncertainty honestly?
8. Is the experience usable on a phone?

### 3.2 Comparative findings

| Product | Main approach | Strongest feature | Important limitation | Pattern to use |
| --- | --- | --- | --- | --- |
| [Tides Bookkeeping tools](https://www.tidesbookkeeping.com/tools) | Separate monthly-cost, catch-up-cost, and books-health tools | Instant result with no mandatory signup | Publicly visible search content does not expose the complete formula | No-gate result and separate monthly/catch-up outputs |
| [GoodBookkeeping pricing calculator](https://www.goodbookkeeping.com/pricing) | Last-three-month transaction volume by active bank account | Clear, concrete data entry and 60-second promise | The visible first step emphasizes bank accounts more than other complexity drivers | Account-by-account transaction input and quick presets |
| [QuickBooks Live pricing](https://quickbooks.intuit.com/results-save-share/) | Three-month average monthly expenses with tiered pricing | Extremely transparent tier boundaries | Expense volume alone can miss service scope and complexity | Three-month average and simple explanation |
| [Pilot pricing explanation](https://pilot.com/faq) | Rolling three-month expenses plus institutions, transactions, and support needs | Smooths temporary monthly spikes | Exact complete pricing formula is not public | Rolling average plus complexity adjustments |
| [Profit Matters pricing](https://profitmatters.com/pricing/) | Spending plus accounts, classes, locations, job costing, AR/AP and broader scope | Comprehensive scope discovery | More inputs create more friction; visible experience includes contact collection | Use conditional inputs only when relevant |
| [Silver Taza Labs calculator](https://labs.silvertaza.com/how-much-to-charge-for-bookkeeping) | Core band plus add-on services, entity/account adjustment, pricing tier, implied hourly rate | Most explicit factor-chain methodology | Built for bookkeepers setting prices, not owners buying services | Scope-based additions and effective-rate sanity check |
| [Peacock Bookkeeping calculator](https://www.peacockbookkeepingservices.com/calculator) | DIY time cost versus professional estimate | Strong value framing | Industry and revenue are proxies; they do not fully describe bookkeeping workload | Optional “cost of doing it yourself” comparison |
| [Corient calculator](https://corientbs.co.uk/calculator/bookkeeping-pricing-calculator/) | Invoices, bank transactions, cash coding, processing and review effort | Connects workload to processing time | UK accountant audience and potentially gated quote flow | Explicit workload hours and review effort |
| [Bench pricing](https://www.bench.co/pricing) | Starting-price service tiers | Simple package comparison | Not a personalized public calculator | Use recognizable plan names after calculation |
| [Bookkeeper360 pricing](https://bookkeeper360.com/pricing/) | Starting monthly, weekly, onboarding, payroll, tax, and CFO prices | Clearly separates onboarding, recurring work, and add-ons | Starting prices do not show the complete personalized calculation | Separate recurring, onboarding, and add-on totals |

### 3.3 Best-in-class conclusion

There is no defensible single “best bookkeeping calculator” for every audience.

The strongest individual references are:

- **Best customer experience:** Tides, because value is delivered without a lead wall and monthly versus catch-up tools are distinct.
- **Best data-entry pattern:** GoodBookkeeping, because asking for three months of transactions by active account is concrete and understandable.
- **Best simple formula disclosure:** QuickBooks Live, because the price tiers and expense definition are explicit.
- **Best growth-adjusted model:** Pilot, because a rolling three-month average reduces volatility and supplements expenses with institutions, transactions, and support needs.
- **Best scope model:** Silver Taza Labs and Profit Matters, because the price changes with actual services and structural complexity.

### 3.4 Recommended competitive position

IntegraFin should outperform these tools by combining:

- No mandatory email before the result.
- Both monthly and catch-up estimates in one coherent flow.
- Transparent “how this was calculated” line items.
- A realistic price range rather than a misleading exact promise.
- Inputs that map directly to bookkeeping work.
- An estimated workload in hours.
- A recommended service tier with an explicit inclusion list.
- A configurable pricing engine that can be calibrated using IntegraFin’s completed engagements.

---

## 4. Product Goals and Non-Goals

### Goals

1. Provide a useful monthly bookkeeping price range in under two minutes.
2. Provide a separate one-time catch-up or cleanup range when applicable.
3. Explain every material price driver.
4. Show value before requesting contact details.
5. Generate a structured lead that operations can scope efficiently.
6. Keep all pricing constants versioned and server-authoritative.
7. Support future calibration without rewriting the interface.
8. Prevent the estimate from being mistaken for an accepted engagement or final quote.

### Non-goals for version 1

- Connecting directly to QuickBooks, Xero, bank accounts, or payroll systems.
- Uploading bank statements or accounting files.
- Producing a binding quote.
- Automatically accepting every high-complexity engagement.
- Calculating income tax, sales tax owed, payroll tax, or business profit.
- Replacing professional record review.
- Supporting international entities, foreign statutory bookkeeping, or consolidated financial statements without manual review.

---

## 5. Target Users

### Primary user

An owner-managed U.S. small business that wants predictable bookkeeping support and needs to understand likely cost before booking a consultation.

### Secondary users

- A business that is behind and needs both catch-up and ongoing bookkeeping.
- An existing prospect comparing outsourced bookkeeping providers.
- IntegraFin sales and bookkeeping staff using the calculator during discovery.
- Marketing staff analyzing which scope factors produce qualified leads.

### Out-of-scope users

- Public companies.
- Businesses needing audit or assurance work.
- Highly regulated financial institutions.
- Multi-national consolidations.
- Businesses with more than three entities in version 1 without manual scoping.
- Engagements above the public calculator’s volume ceiling.

---

## 6. Primary User Journey

```text
Landing page
    |
    v
Choose estimate type: monthly only / catch-up only / both
    |
    v
Enter business activity and service scope
    |
    v
See live estimate summary while answering
    |
    v
Receive free numeric result without contact details
    |
    +--> Change assumptions and compare
    |
    +--> Request a reviewed quote
            |
            v
      Enter contact and consent
            |
            v
 Server validates inputs and recalculates result
            |
            v
 Save lead, show full breakdown, notify team
```

### User promise

> Answer a few questions about your monthly activity and the services you need. Get an immediate bookkeeping cost range—no records, credentials, or signup required.

---

## 7. Information Architecture

Use one page with seven interface states:

1. **Landing:** value proposition, calculator limitations, and estimate-type selector.
2. **Business activity:** transaction volume, accounts, expenses, entities, and locations.
3. **Bookkeeping method and systems:** cash/accrual, software, payment processors, and industry flags.
4. **Service scope:** core bookkeeping, AR, AP, payroll, sales tax, 1099s, reporting, and advisory exclusions.
5. **Catch-up scope:** months behind and condition of books, shown only when applicable.
6. **Free result:** monthly range, catch-up range, annual total, hours, tier, factors, assumptions, and disclaimer.
7. **Reviewed-quote form and confirmation:** optional lead capture after the free result.

### Why grouped steps are better than one question per screen

The calculator contains related numeric fields. Grouping them into logical stages reduces unnecessary navigation while preserving a short mobile flow. W3C guidance recommends splitting long forms into logical steps and explicitly communicating progress: [WAI Multi-page Forms](https://www.w3.org/WAI/tutorials/forms/multi-page/).

---

## 8. Recommended Visual and Interaction Design

### 8.1 Visual direction

Extend IntegraFin’s existing brand:

- Navy `#003580` for headings and primary actions.
- Bright blue `#0092DF` for selected controls and progress.
- Teal `#00C2CB` for positive numeric highlights.
- Warm off-white or very light blue-gray page background.
- White calculation panels with subtle borders, not heavy gradients.
- Amber only for assumptions or manual-review notices.
- Red only for blocking validation errors.

### 8.2 Desktop layout

Use a two-column working surface after the landing state:

```text
+---------------------------------------------------------------+
| Bookkeeping Cost Calculator             Step 2 of 4            |
| [=====================---------------------------]             |
+--------------------------------------+------------------------+
|                                      |                        |
| Business activity inputs             | Live estimate          |
|                                      |                        |
| Average monthly transactions         | $650–$850 / month       |
| [ 150 ]                              |                        |
|                                      | Est. 8.7 hours/month    |
| Active financial accounts            | Standard Bookkeeping   |
| [ 3 ]                                |                        |
|                                      | Changes as you answer   |
| [Back]                     [Continue] |                        |
+--------------------------------------+------------------------+
```

The live estimate card remains sticky on desktop but becomes a compact non-sticky summary on mobile.

### 8.3 Mobile layout

- Inputs first, result summary second.
- No horizontal scrolling.
- Numeric keypad for count and currency fields.
- Preset chips for common transaction values: 50, 100, 250, 500.
- Increment/decrement buttons are optional; direct input must remain available.
- Bottom action bar may be sticky if it does not obscure errors or focused controls.

### 8.4 Result design

The first result viewport must show:

1. Estimated monthly range.
2. Estimated catch-up range, if applicable.
3. Estimated first-year total.
4. Recommended service tier.
5. “How we calculated this” summary.
6. Manual-review status.
7. Change-input and reviewed-quote actions.

Do not hide the numeric estimate behind email capture.

### 8.5 Accessibility requirements

- Use native number inputs or carefully validated text inputs with `inputMode="numeric"` or `decimal`.
- Use `fieldset` and `legend` for grouped choices.
- Show progress in text and visually.
- Associate instructions and errors programmatically.
- Move focus to the new step heading.
- Announce updated result values in a polite live region; do not announce every keystroke.
- Provide targets at least 44 by 44 CSS pixels where practical, exceeding the WCAG 2.2 AA minimum target guidance of 24 by 24 pixels: [W3C Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).
- Validate on the client for usability and again on the server for integrity, consistent with [WAI form-validation guidance](https://www.w3.org/WAI/tutorials/forms/validation/).
- Respect reduced motion.
- Do not encode estimate quality or price tier only by color.

---

## 9. Inputs and Data Contract

### 9.1 Estimate selection

| Field | Type | Allowed values | Required |
| --- | --- | --- | --- |
| `estimateMode` | enum | `monthly`, `catch_up`, `both` | Yes |

### 9.2 Business activity

| Field | Type | Rules | Why it matters |
| --- | --- | --- | --- |
| `averageMonthlyTransactions` | integer | `0–5,000`; over 750 triggers review | Primary categorization workload |
| `activeFinancialAccounts` | integer | `1–50`; over 12 triggers review | Reconciliation workload |
| `entities` | integer | `1–10`; over 3 triggers review | Separate ledgers, closes, and reporting |
| `locations` | integer | `1–50`; over 5 triggers review | Tracking and reporting structure |
| `paymentProcessors` | integer | `0–20` | Integration and clearing-account work |

The UI should ask for a three-month average where possible. QuickBooks Live explicitly uses three consecutive months of average expenses, and Pilot describes a rolling prior-three-month average to account for growth and changing activity. IntegraFin should apply that smoothing principle to transaction volume instead of requesting the visitor's exact expenses: direct workload inputs are more actionable for this model and collect less financial information.

### 9.3 Accounting approach

| Field | Type | Allowed values |
| --- | --- | --- |
| `accountingMethod` | enum | `cash`, `accrual`, `unsure` |
| `accountingSoftware` | enum | `quickbooks_online`, `quickbooks_desktop`, `xero`, `wave`, `spreadsheet`, `none`, `other` |
| `inventoryOrEcommerce` | boolean | `true`, `false` |
| `jobCosting` | boolean | `true`, `false` |
| `classOrLocationTracking` | boolean | `true`, `false` |
| `multiCurrency` | boolean | `true`, `false` |
| `commingledPersonalActivity` | boolean | `true`, `false` |

`unsure` should use the accrual multiplier only when other answers indicate accrual-like work; otherwise it should use a conservative `1.10` method multiplier.

### 9.4 Service scope

| Field | Type | Rules |
| --- | --- | --- |
| `coreBookkeeping` | literal | Always `true` for monthly estimates |
| `monthlySalesInvoices` | integer | `0–1,000`; over 150 triggers review |
| `monthlyVendorBills` | integer | `0–1,000`; over 150 triggers review |
| `payrollService` | enum | `none`, `reconciliation_only`, `full_administration` |
| `employees` | integer | `0–500`; over 50 triggers review |
| `contractors1099` | integer | `0–500`; over 100 triggers review |
| `salesTaxJurisdictions` | integer | `0–50`; over 5 triggers review |
| `salesTaxFrequency` | enum | `none`, `monthly`, `quarterly` |
| `reportingCadence` | enum | `monthly`, `weekly` |

### 9.5 Catch-up and cleanup

| Field | Type | Allowed values or rules |
| --- | --- | --- |
| `monthsBehind` | integer | `0–60`; over 24 triggers review |
| `bookCondition` | enum | `clean_but_behind`, `some_corrections`, `unreconciled`, `major_reconstruction`, `unsure` |
| `priorTaxReturnAvailable` | boolean/unknown | `true`, `false`, `unknown` |

### 9.6 Contact fields

These fields are not required for the free result:

- Full name.
- Email and/or phone.
- Business name.
- Preferred contact method.
- Consent.
- Hidden honeypot.
- Idempotency key.
- Traffic attribution.

### 9.7 Proposed TypeScript contract

```ts
type BookkeepingCostInputs = {
  estimateMode: "monthly" | "catch_up" | "both";
  averageMonthlyTransactions: number;
  activeFinancialAccounts: number;
  entities: number;
  locations: number;
  paymentProcessors: number;
  accountingMethod: "cash" | "accrual" | "unsure";
  accountingSoftware:
    | "quickbooks_online"
    | "quickbooks_desktop"
    | "xero"
    | "wave"
    | "spreadsheet"
    | "none"
    | "other";
  inventoryOrEcommerce: boolean;
  jobCosting: boolean;
  classOrLocationTracking: boolean;
  multiCurrency: boolean;
  commingledPersonalActivity: boolean;
  monthlySalesInvoices: number;
  monthlyVendorBills: number;
  payrollService: "none" | "reconciliation_only" | "full_administration";
  employees: number;
  contractors1099: number;
  salesTaxJurisdictions: number;
  salesTaxFrequency: "none" | "monthly" | "quarterly";
  reportingCadence: "monthly" | "weekly";
  monthsBehind: number;
  bookCondition:
    | "clean_but_behind"
    | "some_corrections"
    | "unreconciled"
    | "major_reconstruction"
    | "unsure";
  priorTaxReturnAvailable: true | false | "unknown";
};
```

---

## 10. Calculation Philosophy

### 10.1 Principles

1. Calculate estimated workload first, then calculate price.
2. Keep recurring monthly work separate from one-time catch-up work.
3. Use additive hours for discrete services.
4. Use bounded multipliers for cross-cutting complexity.
5. Cap multiplier stacking.
6. Apply a minimum viable engagement price.
7. Return a range, not false precision.
8. Keep every constant in a versioned server configuration.
9. Recalculate on the server before storing a lead.
10. Never trust a browser-supplied price.

### 10.2 Why workload-first is recommended

Expense-only pricing is simple, but two businesses with the same expenses can create very different work. A service business with one bank account is not equivalent to an ecommerce business with inventory, three payment processors, sales-tax filings, payroll, and multiple entities.

The proposed engine therefore uses:

```text
estimated workload
    = core close work
    + transaction work
    + reconciliation work
    + optional service work
    + structural work

adjusted workload
    = estimated workload × bounded complexity multiplier

estimated price
    = adjusted workload × configured rate × delivery contingency
```

---

## 11. Reference Pricing Configuration

The following values exist so engineering can implement and test a deterministic model. They are **not approved public IntegraFin pricing**.

```ts
const pricingConfigV1Draft = {
  minimumMonthlyPrice: 299,
  monthlyBlendedRate: 75,
  catchUpBlendedRate: 85,
  monthlyDeliveryContingency: 1.10,
  catchUpDeliveryContingency: 1.15,
  publicMonthlyLowFactor: 0.90,
  publicMonthlyHighFactor: 1.15,
  publicCatchUpLowFactor: 0.85,
  publicCatchUpHighFactor: 1.25,
  historicalRepeatEfficiency: 0.65,
  monthlyRoundingIncrement: 25,
  catchUpRoundingIncrement: 50,
  catchUpWeeklyCapacityHours: 12,
  maximumComplexityMultiplier: 1.75,
};
```

### Configuration ownership

- Bookkeeping service owner approves time assumptions.
- Business owner approves minimums, rates, margin, and public ranges.
- Engineering versions the complete configuration.
- Historical calibration changes the version.
- No pricing constant should be scattered through JSX.

---

## 12. Monthly Workload Formula

### 12.1 Core close hours

```text
coreCloseHours = 1.50
```

This covers recurring close administration, base review, and standard financial statement preparation.

### 12.2 Transaction hours

| Average monthly transactions | Hours |
| ---: | ---: |
| 0–25 | 0.75 |
| 26–50 | 1.00 |
| 51–100 | 1.75 |
| 101–200 | 3.00 |
| 201–350 | 5.00 |
| 351–500 | 7.50 |
| 501–750 | 11.00 |
| More than 750 | Calculate for planning, but require manual review |

Exact bands are easier to test and explain than a hidden nonlinear formula. Calibration may later replace bands with a piecewise-linear curve.

### 12.3 Reconciliation hours

```text
reconciliationHours = activeFinancialAccounts × 0.35
```

All active bank, credit-card, loan, and payment-clearing accounts count.

### 12.4 Accounts receivable hours

| Monthly sales invoices | Hours |
| ---: | ---: |
| 0 | 0.00 |
| 1–25 | 1.00 |
| 26–75 | 2.50 |
| 76–150 | 5.00 |
| More than 150 | Manual review required |

This field represents invoice administration, not revenue amount.

### 12.5 Accounts payable hours

| Monthly vendor bills | Hours |
| ---: | ---: |
| 0 | 0.00 |
| 1–25 | 1.00 |
| 26–75 | 2.50 |
| 76–150 | 5.00 |
| More than 150 | Manual review required |

### 12.6 Payroll hours

```text
none:
  payrollHours = 0

reconciliation_only:
  payrollHours = 0.75 + (employees × 0.08)

full_administration:
  payrollHours = 1.50 + (employees × 0.15)
```

Cross-field rule: employees greater than zero with `payrollService = none` is allowed only when the visitor confirms payroll is handled outside the requested scope.

### 12.7 Contractor and 1099 tracking hours

```text
contractorHours = contractors1099 × 0.04
```

The public copy must say that tax-form preparation or filing may be separately scoped.

### 12.8 Sales-tax hours

```text
monthlyFrequencyFactor = 1.00
quarterlyFrequencyFactor = 0.33

salesTaxHours =
  salesTaxJurisdictions
  × 0.75
  × frequencyFactor
```

Cross-field rules:

- `salesTaxFrequency = none` requires zero jurisdictions.
- Positive jurisdictions require monthly or quarterly frequency.

### 12.9 Entity and location hours

```text
additionalEntityHours = max(0, entities - 1) × 2.50
additionalLocationHours = max(0, locations - 1) × 0.75
```

### 12.10 Base monthly hours

```text
baseMonthlyHours =
  coreCloseHours
  + transactionHours
  + reconciliationHours
  + accountsReceivableHours
  + accountsPayableHours
  + payrollHours
  + contractorHours
  + salesTaxHours
  + additionalEntityHours
  + additionalLocationHours
```

---

## 13. Complexity Multipliers

### 13.1 Multiplier table

| Condition | Multiplier |
| --- | ---: |
| Cash-basis accounting | `1.00` |
| Accrual-basis accounting | `1.20` |
| Accounting method unsure | `1.10` |
| Inventory or ecommerce | `1.20` |
| Job costing | `1.15` |
| Class or location tracking | `1.10` |
| Multi-currency | `1.15` |
| Personal and business activity commingled | `1.20` |
| Each payment processor over two | `1.03`, capped at `1.12` for this factor |
| Weekly rather than monthly reporting | `1.25` |

### 13.2 Stacking rule

```text
rawComplexityMultiplier = product(all applicable multipliers)

complexityMultiplier = min(rawComplexityMultiplier, 1.75)
```

### 13.3 Adjusted monthly hours

```text
adjustedMonthlyHours = round(baseMonthlyHours × complexityMultiplier, 1)
```

Rounding occurs only for displayed workload. Price calculations should use the unrounded internal value or a documented single-decimal value consistently. Version 1 should use the single-decimal value to simplify fixture testing.

---

## 14. Monthly Price Formula

### 14.1 Center estimate

```text
unroundedMonthlyPrice =
  adjustedMonthlyHours
  × monthlyBlendedRate
  × monthlyDeliveryContingency

roundedMonthlyPrice =
  roundToIncrement(unroundedMonthlyPrice, 25)

monthlyCenter =
  max(minimumMonthlyPrice, roundedMonthlyPrice)
```

### 14.2 Public range

```text
monthlyLow = max(
  minimumMonthlyPrice,
  floorToIncrement(monthlyCenter × 0.90, 25)
)

monthlyHigh =
  ceilToIncrement(monthlyCenter × 1.15, 25)
```

### 14.3 Annual recurring estimate

```text
annualRecurringCenter = monthlyCenter × 12
annualRecurringLow = monthlyLow × 12
annualRecurringHigh = monthlyHigh × 12
```

Do not silently apply annual-payment discounts. If IntegraFin approves an annual discount later, show monthly and annual billing separately.

---

## 15. Catch-Up and Cleanup Formula

### 15.1 Condition factors

| Book condition | Factor |
| --- | ---: |
| Clean but behind | `1.00` |
| Some corrections expected | `1.25` |
| Accounts unreconciled | `1.50` |
| Major reconstruction | `2.00` |
| Not sure | `1.50` |

### 15.2 Catch-up workload

```text
catchUpHours =
  adjustedMonthlyHours
  × monthsBehind
  × historicalRepeatEfficiency
  × conditionFactor
```

The `0.65` historical repeat-efficiency factor reflects that some recurring setup and close tasks do not repeat fully for every historical month. It must be calibrated using actual IntegraFin cleanup projects.

### 15.3 Catch-up center estimate

```text
unroundedCatchUpPrice =
  catchUpHours
  × catchUpBlendedRate
  × catchUpDeliveryContingency

catchUpCenter = max(
  500,
  roundToIncrement(unroundedCatchUpPrice, 50)
)
```

### 15.4 Catch-up public range

```text
catchUpLow = max(500, floorToIncrement(catchUpCenter × 0.85, 50))
catchUpHigh = ceilToIncrement(catchUpCenter × 1.25, 50)
```

### 15.5 Estimated delivery window

```text
estimatedCatchUpWeeks = ceil(catchUpHours / 12)
```

Display rules:

- Minimum visible result is `1–2 weeks`, not “1 week guaranteed.”
- More than 12 calculated weeks displays `Manual timeline review required`.
- The timeline begins only after requested records are available.
- Never promise an external tax, notice, financing, or payroll deadline.

---

## 16. First-Year Total

### Monthly-only engagement

```text
firstYearCenter = annualRecurringCenter + onboardingCenter
```

### Both monthly and catch-up

```text
firstYearCenter = annualRecurringCenter + catchUpCenter
```

### Catch-up only

```text
firstYearCenter = catchUpCenter
```

The default onboarding reference should equal one monthly center estimate, subject to an approved minimum and maximum. QuickBooks Live discloses a separate first-month cleanup/onboarding charge, Pilot describes an onboarding charge equal to one month, and Bookkeeper360 separates onboarding/prior bookkeeping from monthly work. IntegraFin must decide whether onboarding is included, waived, or separately displayed.

---

## 17. Service Tier Assignment

Tier assignment describes service scope; it must not override the calculated price.

### Essentials

Use when all are true:

- Adjusted monthly hours below `5`.
- One entity.
- No AR or AP administration.
- No full payroll administration.
- No sales-tax filings.
- No inventory, job costing, or weekly reporting.

### Standard

Use when:

- Adjusted monthly hours from `5` through `15`, or
- One or two common add-on services are present.

### Full-Service

Use when:

- Adjusted monthly hours above `15`, or
- AR and AP are both present, or
- Full payroll administration, inventory, multiple entities, or weekly reporting is selected.

### Custom Scope Review

Trigger when any review condition in Section 18 applies.

---

## 18. Manual-Review Triggers

Calculate a planning range but label it as requiring professional scoping when any condition is true:

- More than 750 monthly transactions.
- More than 12 financial accounts.
- More than 3 entities.
- More than 5 locations.
- More than 150 monthly sales invoices.
- More than 150 monthly vendor bills.
- More than 50 employees.
- More than 100 1099 contractors.
- More than 5 sales-tax jurisdictions.
- More than 24 months behind.
- Major reconstruction selected.
- Multi-currency plus multiple entities.
- Adjusted monthly hours over 40.
- No accounting system and more than 6 months of history.
- User reports unavailable prior returns or source records.
- International statutory bookkeeping or foreign consolidation is indicated.

The calculator should not return “cannot calculate.” It should return a planning range plus a strong review notice unless inputs exceed safe numeric limits.

---

## 19. Result Contract

```ts
type BookkeepingCostResult = {
  calculatorVersion: "1.0-draft";
  currency: "USD";
  monthly?: {
    estimatedHours: number;
    low: number;
    center: number;
    high: number;
    annualLow: number;
    annualCenter: number;
    annualHigh: number;
  };
  catchUp?: {
    estimatedHours: number;
    low: number;
    center: number;
    high: number;
    estimatedWeeksLow: number;
    estimatedWeeksHigh: number;
  };
  firstYear?: {
    low: number;
    center: number;
    high: number;
  };
  recommendedTier:
    | "essentials"
    | "standard"
    | "full_service"
    | "custom_scope_review";
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
```

### Result display order

1. Monthly range.
2. Catch-up range.
3. First-year range.
4. Estimated monthly and catch-up hours.
5. Recommended tier.
6. Included services.
7. Largest cost drivers.
8. Assumptions and exclusions.
9. Disclaimer.
10. Optional reviewed-quote form.

---

## 20. Worked Examples Using the Reference Configuration

These examples are engineering fixtures, not approved public quotes.

### Example A: Micro service business

Inputs:

- 40 monthly transactions.
- 2 financial accounts.
- Cash basis.
- One entity and location.
- No AR/AP, payroll, sales tax, inventory, or catch-up.

Calculation:

```text
base hours = 1.50 + 1.00 + (2 × 0.35) = 3.20
complexity multiplier = 1.00
adjusted hours = 3.20
unrounded price = 3.20 × $75 × 1.10 = $264.00
minimum monthly price applies
```

Expected result:

- Monthly center: `$299`.
- Monthly range: `$299–$350`.
- Annual center: `$3,588`.
- Tier: Essentials.

### Example B: Typical service business with AR/AP and payroll reconciliation

Inputs:

- 150 monthly transactions.
- 3 financial accounts.
- 20 sales invoices.
- 10 vendor bills.
- Payroll reconciliation for 5 employees.
- Cash basis.
- One entity and location.

Calculation:

```text
core close                 1.50
transactions               3.00
accounts: 3 × 0.35         1.05
AR                          1.00
AP                          1.00
payroll: .75 + 5 × .08     1.15
--------------------------------
adjusted monthly hours      8.70
```

Expected result:

- Monthly center: `$725`.
- Monthly range: `$650–$850`.
- Annual center: `$8,700`.
- Tier: Standard.

### Example C: Ecommerce, accrual, multi-service scope

Inputs:

- 450 monthly transactions.
- 6 financial accounts.
- 80 sales invoices and 80 vendor bills.
- Full payroll administration for 12 employees.
- 20 contractors.
- 3 monthly sales-tax jurisdictions.
- 2 entities and 2 locations.
- Accrual accounting.
- Inventory/ecommerce.
- Class tracking.
- 4 processors.

Expected reference calculation:

- Base hours: `30.70`.
- Complexity multiplier: approximately `1.679`.
- Adjusted hours: `51.5`.
- Monthly center: `$4,250`.
- Monthly range: `$3,825–$4,900`.
- Annual center: `$51,000`.
- Tier: Custom Scope Review because adjusted hours exceed 40.

### Example D: Six-month catch-up for Example B

Additional inputs:

- 6 months behind.
- Some corrections expected: factor `1.25`.

Expected result:

- Catch-up hours: `42.4`.
- Catch-up center: `$4,150`.
- Catch-up range: `$3,500–$5,200`.
- Planning timeline: approximately 4 weeks after complete records are received.

---

## 21. Validation Rules

### Numeric normalization

- Trim whitespace.
- Accept commas and currency symbols in the UI, but normalize to integer cents or integers before calculation.
- Reject negative values.
- Reject `NaN`, infinity, exponential notation, and values above configured maximums.
- Counts must be whole numbers.
- Currency must use at most two decimal places.
- Blank optional counts normalize to zero.
- Never use JavaScript floating-point dollars for stored financial amounts; store cents.

### Cross-field validation

- Monthly mode requires at least one financial account.
- Catch-up mode requires at least one month behind.
- `employees = 0` with full payroll administration is invalid.
- Employees greater than zero with no payroll scope requires explicit confirmation that payroll is handled elsewhere.
- Sales-tax jurisdictions greater than zero require a filing frequency.
- `salesTaxFrequency = none` requires zero jurisdictions.
- `entities` and `locations` cannot be zero.
- Catch-up-only mode still requires enough activity inputs to estimate historical workload.
- Accounting method `unsure` is valid and must use a conservative multiplier.

### Security

- Use a strict Zod schema on the server.
- Reject unknown keys.
- Server assigns calculator version and source.
- Browser submits inputs, never an authoritative result.
- Server recalculates result before saving.
- Preserve the existing five-submissions-per-ten-minutes rate limit unless separately approved.
- Use an idempotency key with a unique partial database index.
- No documents, bank details, tax IDs, or credentials.

---

## 22. Full Test Matrix

### 22.1 Unit tests: transaction bands

| ID | Input | Expected |
| --- | ---: | ---: |
| TX-01 | 0 transactions | 0.75 hours |
| TX-02 | 25 | 0.75 hours |
| TX-03 | 26 | 1.00 hours |
| TX-04 | 50 | 1.00 hours |
| TX-05 | 51 | 1.75 hours |
| TX-06 | 100 | 1.75 hours |
| TX-07 | 101 | 3.00 hours |
| TX-08 | 200 | 3.00 hours |
| TX-09 | 201 | 5.00 hours |
| TX-10 | 350 | 5.00 hours |
| TX-11 | 351 | 7.50 hours |
| TX-12 | 500 | 7.50 hours |
| TX-13 | 501 | 11.00 hours |
| TX-14 | 750 | 11.00 hours |
| TX-15 | 751 | Estimate plus manual-review flag |

### 22.2 Unit tests: AR and AP bands

Test both AR and AP independently at:

- `0` → `0` hours.
- `1` and `25` → `1` hour.
- `26` and `75` → `2.5` hours.
- `76` and `150` → `5` hours.
- `151` → manual-review flag.

### 22.3 Unit tests: payroll

| ID | Input | Expected payroll hours |
| --- | --- | ---: |
| PY-01 | None, 0 employees | 0 |
| PY-02 | Reconciliation, 1 employee | 0.83 |
| PY-03 | Reconciliation, 5 employees | 1.15 |
| PY-04 | Full administration, 1 employee | 1.65 |
| PY-05 | Full administration, 10 employees | 3.00 |
| PY-06 | Full administration, 0 employees | Validation error |
| PY-07 | None, 5 employees, external handling confirmed | 0 |
| PY-08 | More than 50 employees | Estimate plus review flag |

### 22.4 Unit tests: sales tax

- Zero jurisdictions and none frequency → zero.
- One monthly jurisdiction → `0.75` hours.
- Three monthly jurisdictions → `2.25` hours.
- Three quarterly jurisdictions → `0.7425` hours before final rounding.
- Positive jurisdictions plus none frequency → invalid.
- Zero jurisdictions plus monthly frequency → invalid or normalize to none; version 1 should reject.
- Six jurisdictions → review flag.

### 22.5 Unit tests: complexity

- Cash-only multiplier equals `1.00`.
- Accrual-only equals `1.20`.
- Unsure method equals `1.10`.
- Every individual multiplier maps exactly to the table.
- Three processors produce `1.03` processor factor.
- Six processors produce `1.12` processor-factor cap.
- Multiplier product below `1.75` is preserved.
- Multiplier product above `1.75` is capped.
- Input object is not mutated.
- Same input returns a deeply equal result.

### 22.6 Unit tests: monthly price

- Minimum-price scenario returns center `$299`.
- Minimum range never falls below `$299`.
- Values exactly halfway between `$25` increments use the documented rounding method.
- Low uses floor-to-increment.
- High uses ceil-to-increment.
- Annual totals equal monthly values multiplied by 12.
- Example A returns `$299`, `$299–$350`, and `3.2` hours.
- Example B returns `$725`, `$650–$850`, and `8.7` hours.
- Example C returns `$4,250`, `$3,825–$4,900`, and review required.

### 22.7 Unit tests: catch-up

- Zero months in monthly-only mode produces no catch-up result.
- Zero months in catch-up-only mode is invalid.
- One clean month applies the catch-up minimum.
- Condition factors map exactly.
- Unsure condition uses `1.50`.
- Example D returns `42.4` hours and center `$4,150`.
- Low and high bounds use `$50` increments.
- More than 24 months sets review required.
- More than 12 estimated weeks replaces the public timeline with manual review.

### 22.8 Schema tests

- Valid monthly-only input.
- Valid catch-up-only input.
- Valid combined input.
- Missing required key.
- Extra unknown key.
- Negative count.
- Decimal transaction count.
- Currency above maximum.
- `NaN`, infinity, or exponential notation.
- Invalid enum.
- Zero entities.
- Inconsistent payroll fields.
- Inconsistent sales-tax fields.

### 22.9 Server-action tests

- Valid email-only lead.
- Valid phone-only lead.
- Both contact methods.
- Neither contact method rejected.
- Consent false or missing rejected.
- Honeypot populated rejected without saving.
- Browser-supplied result ignored or rejected.
- Server stores its own versioned result.
- Source fixed to `bookkeeping-cost-calculator`.
- Service fixed to `Bookkeeping Services` or approved enum.
- Attribution sanitized and preserved.
- Duplicate idempotency key returns the original saved result.
- Rate limit returns a clear retry message.
- Database success plus notification failure remains a successful submission.
- Email absent produces `not_applicable`, not delivery failure.

### 22.10 Component tests

- User can get a result without entering PII.
- Back navigation preserves values.
- Changing an input immediately recalculates the summary.
- Conditional fields appear and disappear correctly.
- Hidden conditional values are cleared or excluded deterministically.
- Estimate mode changes result sections correctly.
- Manual-review flags appear for every trigger.
- Result factor list matches the largest contributors.
- Form error preserves the free result and entered contact fields.
- Loading state blocks duplicate submission.
- Restart asks for confirmation after material input.
- Session recovery restores non-sensitive calculator inputs only.

### 22.11 Accessibility tests

- Complete the flow using keyboard only.
- Screen reader announces step heading and progress.
- Every control has an accessible label.
- Related controls use fieldset and legend.
- Errors identify the field and correction.
- Updated estimate is announced after a pause, not per keystroke.
- Focus is never hidden by a sticky header or footer.
- 200% and 400% zoom remain usable.
- 320 CSS-pixel viewport has no horizontal scroll.
- Reduced motion disables non-essential transitions.
- Touch targets meet the project’s 44-pixel target.

### 22.12 Analytics privacy tests

Ensure analytics never receives:

- Name.
- Email.
- Phone.
- Business name.
- Exact price result.
- Complete input object.

Only send bands and safe categorical values.

---

## 23. Analytics Plan

| Event | Trigger | Safe parameters |
| --- | --- | --- |
| `bookkeeping_cost_view` | Page visible | version, page type, attribution |
| `bookkeeping_cost_start` | First input | version, estimate mode |
| `bookkeeping_cost_step` | Valid step completed | version, step number |
| `bookkeeping_cost_result` | Free result shown | version, tier, monthly price band, hours band, review required |
| `bookkeeping_cost_adjust` | User changes completed inputs | version, changed section |
| `bookkeeping_quote_form_start` | First form interaction | version, tier |
| `bookkeeping_quote_submit` | Lead saved | version, tier, review required |
| `bookkeeping_quote_cta` | Contact/scheduling action | version, tier, CTA name |

### Price bands for analytics

Use broad bands rather than exact price:

- `under_300`
- `300_499`
- `500_749`
- `750_999`
- `1000_1499`
- `1500_2499`
- `2500_plus`

### Success metrics

- Calculator start rate.
- Start-to-result completion.
- Result-to-lead conversion.
- Adjustment/comparison rate.
- Manual-review rate.
- Quoted price versus calculator center.
- Absolute and percentage pricing error.
- False-low estimate rate.
- Client win rate by tier.
- No PII analytics incidents.

---

## 24. SEO Requirements

### Metadata

- **Title:** `Bookkeeping Cost Calculator | Estimate Monthly Bookkeeping Pricing`
- **Description:** `Estimate monthly bookkeeping costs, catch-up pricing, workload, and first-year cost based on transactions, accounts, payroll, and service scope.`
- **Canonical:** `https://integrafin.tax/bookkeeping-cost-calculator`
- **H1:** `How Much Should Bookkeeping Cost for Your Business?`

### Visible supporting content

- What bookkeeping costs include.
- Monthly bookkeeping versus catch-up bookkeeping.
- Why transaction volume is not the only price driver.
- Cash versus accrual workload.
- How payroll, sales tax, inventory, AR, and AP affect price.
- Why final pricing requires review.
- Frequently asked questions.

### Structured data

- `WebApplication`.
- `WebPage`.
- `BreadcrumbList`.
- `FAQPage` only if every FAQ is visible and current search-engine rules still support it.

### Internal links

Link to the calculator from:

- `/bookkeeping-cleanup`
- `/quickbooks-bookkeeping-services`
- `/small-business-bookkeeping-services`
- `/contractor-bookkeeping-services`
- `/pricing`
- Relevant bookkeeping articles

Add the calculator to the XML sitemap and HTML site map.

---

## 25. Codebase Architecture

Recommended new files:

```text
src/app/bookkeeping-cost-calculator/
|-- page.tsx
|-- BookkeepingCostCalculatorClient.tsx
|-- components/
|   |-- EstimateMode.tsx
|   |-- BusinessActivityStep.tsx
|   |-- ServiceScopeStep.tsx
|   |-- CatchUpStep.tsx
|   |-- LiveEstimateCard.tsx
|   |-- CostResult.tsx
|   `-- ReviewedQuoteForm.tsx
`-- content.ts

src/lib/bookkeeping-cost/
|-- types.ts
|-- schema.ts
|-- config.ts
|-- workload.ts
|-- pricing.ts
|-- content.ts
|-- pricing.test.ts
`-- fixtures.ts
```

Existing files expected to change:

```text
src/app/actions/leads.ts
src/models/ContactLead.ts
src/components/admin/LeadOperationsDashboard.tsx
src/lib/leadNotifications.ts
src/lib/analytics.ts
src/app/sitemap.ts
src/components/Footer.tsx
src/data/internalLinking.ts
```

### Function contracts

```ts
estimateMonthlyWorkload(inputs, config): MonthlyWorkloadResult

estimateCatchUpWorkload(inputs, monthlyWorkload, config): CatchUpWorkloadResult

calculateBookkeepingCost(inputs, config): BookkeepingCostResult
```

Required properties:

- Pure.
- Deterministic.
- No browser, database, time, or network dependency.
- Same function imported by client and server.
- Configuration passed explicitly or imported from a versioned immutable module.
- Returns structured keys and numbers, not JSX or marketing paragraphs.

---

## 26. Lead and Admin Data

### Stored record

```ts
type BookkeepingCostEstimateRecord = {
  calculatorVersion: string;
  pricingConfigVersion: string;
  inputs: BookkeepingCostInputs;
  result: BookkeepingCostResult;
  consentToContact: true;
  completedAt: Date;
  submittedAt: Date;
};
```

### Admin summary

Show:

- Monthly range.
- Catch-up range.
- Recommended tier.
- Estimated hours.
- Manual-review status.
- Transactions.
- Accounts.
- Entities.
- Months behind.
- Payroll and sales-tax scope.
- Pricing version.

### Team notification

Include all safe structured inputs necessary for qualification, but continue omitting contact details from email if the existing security policy requires staff to open the authenticated dashboard.

---

## 27. Disclaimer and Customer Copy

Display immediately below the result and near the quote request:

> This calculator provides a planning estimate based only on the information entered and the current pricing configuration. It is not a quote, engagement agreement, audit, assurance service, tax opinion, legal opinion, or guarantee of timing. Final services, price, and delivery schedule require review of your accounting records and written confirmation from IntegraFin.

Sensitive-information warning:

> Do not enter account numbers, bank details, Social Security numbers, tax identification numbers, passwords, tax returns, or other confidential financial records. This calculator does not need them.

---

## 28. Calibration Plan

Public price accuracy cannot be established from competitor pages alone. Before launch:

1. Select at least 25 completed IntegraFin bookkeeping engagements.
2. Include micro, typical, full-service, ecommerce, multi-entity, and catch-up examples.
3. Record actual monthly delivery hours, review hours, software costs, write-offs, and realized fees.
4. Run each engagement through the proposed calculator without using its final price.
5. Compare estimated hours and price with actual outcomes.
6. Calculate median absolute percentage error.
7. Identify false-low cases separately.
8. Adjust workload bands before adjusting price rates.
9. Approve the reference margin and minimum engagement price.
10. Freeze and publish configuration version `1.0`.

### Recommended launch thresholds

- At least 25 calibrated engagements.
- Median absolute price error at or below 20%.
- No false-low estimate below actual delivery cost by more than 25% without a manual-review flag.
- Every extreme engagement produces a manual-review flag.
- Service owner signs off on all included/excluded service copy.

---

## 29. Delivery Plan

### Phase 0: pricing decisions and calibration

- Approve the product definition.
- Decide whether pricing is public, a range, or internal only.
- Approve the rate, minimum, contingency, and range factors.
- Calibrate with historical engagements.
- Approve onboarding policy.

### Phase 1: calculation engine

- Create strict types and schemas.
- Implement workload functions.
- Implement monthly and catch-up pricing.
- Add versioned configuration.
- Create named fixtures and all unit tests.

### Phase 2: calculator interface

- Build grouped multi-step flow.
- Add live estimate summary.
- Build free result and factor breakdown.
- Add responsive and accessible states.
- Add session recovery for non-sensitive input.

### Phase 3: lead and operations integration

- Create dedicated server action.
- Recalculate and store authoritative result.
- Extend notifications and confirmation email.
- Extend admin dashboard.
- Verify idempotency and rate limiting.

### Phase 4: analytics, SEO, and release

- Add privacy-safe funnel events.
- Add metadata, schema, sitemap, and internal links.
- Run accessibility and browser testing.
- Validate calibration fixtures.
- Soft launch and compare estimates with reviewed quotes.

---

## 30. Definition of Done

The product is ready for public launch only when:

- It returns a numeric monthly range without collecting PII.
- It returns a separate catch-up range when relevant.
- It displays workload, tier, included services, factors, and assumptions.
- Browser and server produce the same result for every fixture.
- All numeric and cross-field validation passes.
- Manual-review triggers cover every defined high-risk case.
- The pricing configuration has an approved version.
- At least 25 historical engagements have been calibrated.
- Unit, server, component, accessibility, analytics, lint, and production-build checks pass.
- The admin dashboard and team notification show operationally useful scope details.
- Public copy does not imply a binding quote or guaranteed deadline.

---

## 31. Decisions Required Before Engineering Publishes Prices

1. Is the calculator estimating IntegraFin’s likely fee or a general U.S. market range?
2. What is the approved minimum monthly engagement price?
3. What internal or billable hourly rate should the engine use?
4. What delivery contingency or target margin is approved?
5. Is onboarding included, charged as one month, or separately priced?
6. Which AR, AP, payroll, sales-tax, and 1099 tasks are actually offered?
7. Are weekly bookkeeping and reporting offered?
8. What input threshold requires a mandatory discovery call?
9. What reviewed-quote response expectation can operations meet?
10. Who owns future pricing-version changes?

---

## 32. Research Sources

Primary product and provider sources reviewed:

1. [Tides Bookkeeping — Free Bookkeeping Tools](https://www.tidesbookkeeping.com/tools)
2. [GoodBookkeeping — Pricing Calculator](https://www.goodbookkeeping.com/pricing)
3. [QuickBooks — Live Bookkeeping Pricing Disclosure](https://quickbooks.intuit.com/results-save-share/)
4. [Pilot — Pricing and Bookkeeping FAQ](https://pilot.com/faq)
5. [Profit Matters — Bookkeeping Pricing](https://profitmatters.com/pricing/)
6. [Silver Taza Labs — Bookkeeping Pricing Calculator and Methodology](https://labs.silvertaza.com/how-much-to-charge-for-bookkeeping)
7. [Peacock Bookkeeping — Pricing Calculator](https://www.peacockbookkeepingservices.com/calculator)
8. [Corient — Bookkeeping Pricing Calculator](https://corientbs.co.uk/calculator/bookkeeping-pricing-calculator/)
9. [Bench — Bookkeeping Pricing](https://www.bench.co/pricing)
10. [Bookkeeper360 — Pricing](https://bookkeeper360.com/pricing/)
11. [W3C WAI — Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
12. [W3C WAI — Multi-page Forms](https://www.w3.org/WAI/tutorials/forms/multi-page/)
13. [W3C WAI — Validating Input](https://www.w3.org/WAI/tutorials/forms/validation/)
14. [W3C WCAG 2.2 — Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

### Research limitation

Many commercial calculators do not publish their complete formulas. Any characterization of a hidden formula is avoided. The proposed IntegraFin engine is a transparent, independently specified model informed by disclosed input patterns; it does not reproduce proprietary code or undisclosed competitor logic.
