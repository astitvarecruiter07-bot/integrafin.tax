# Product Requirements Document: Bookkeeping Cleanup Calculator

**Product:** IntegraFin Bookkeeping Cleanup Calculator  
**PRD status:** Draft for business and service-owner approval  
**Version:** 1.0-draft  
**Date:** 2026-08-04  
**Target website:** `https://integrafin.tax`  
**Target route:** `/bookkeeping-cleanup-calculator`  
**Source plan:** `BOOKKEEPING_CLEANUP_CALCULATOR_PRODUCT_PLAN.md`

---

## 1. Purpose of This PRD

This document translates the product plan into a buildable MVP specification. It explains:

- What the product must do
- What the user sees at each stage
- How the score is calculated
- What data is stored
- How the calculator connects to the existing IntegraFin lead system
- What engineering work is required
- What must be approved before development and launch
- How the team will know whether the product is working

This PRD is the contract between the business owner, bookkeeping service owner, design, engineering, marketing, and operations. If a requirement changes, update this document before changing the implementation.

---



## 2. Executive Summary

The Bookkeeping Cleanup Calculator is a free, mobile-first assessment for U.S. small-business owners who believe their books are behind, incomplete, or unreliable.

The visitor answers nine plain-language questions. The product then gives the visitor, without requiring contact information:

- A bookkeeping complexity score from 0 to 100
- One of four cleanup categories
- A separate urgency level
- The three answers that contributed most to the result
- A short explanation and immediate next steps

**After seeing this basic result, the visitor may submit their name and either an email address or phone number to receive a complete action plan and request an IntegraFin books review.**

The MVP will not connect to QuickBooks, inspect accounting records, accept document uploads, calculate a guaranteed price, or use AI to determine the result. It will use a deterministic, versioned scoring function that runs in the browser for immediate feedback and again on the server before a lead is saved.

### MVP outcome

The MVP succeeds when it provides useful guidance, generates qualified bookkeeping cleanup leads, and gives IntegraFin enough structured intake information to make the first follow-up more productive.

### North-star metric

**Qualified consultation requests per 100 completed assessments.**

---



## **3. Problem and Opportunity**



### Customer problem

Small-business owners often know their bookkeeping needs attention, but they cannot easily determine:

- Whether they need catch-up bookkeeping, cleanup, or a full system setup
- How transaction volume, unreconciled accounts, payroll, and mixed expenses affect the work
- Whether a looming tax or financing deadline makes the situation urgent
- What documents and information a professional will request
- What their first practical step should be

As a result, some delay asking for help, while others enter a consultation expecting an instant quote that cannot responsibly be provided without reviewing the records.

### Business problem

The existing website collects general lead information, but it does not capture structured bookkeeping condition data before the first conversation. The team must qualify the situation manually and may not immediately see which leads are both complex and urgent.

### Product opportunity

Give the visitor immediate, trustworthy guidance while collecting structured information that improves lead qualification, follow-up prioritization, and service routing.

---



## 4. Product Goals and Non-Goals



### Goals

1. Help a visitor understand the likely complexity and urgency of their bookkeeping situation in 60 to 90 seconds.
2. Provide meaningful value before asking for contact details.
3. Convert suitable visitors into requests for a professional books review.
4. Save structured answers, the server-calculated result, and attribution with the lead.
5. Make the result visible in IntegraFin's existing lead operations workflow.
6. Measure the funnel from calculator view through client win.
7. Create a credible path from one-time cleanup to recurring monthly bookkeeping.



### Non-goals for MVP

- Direct connection to QuickBooks, Xero, banks, payroll platforms, or payment processors
- Uploading financial documents
- Reviewing actual ledger data
- Giving an exact price, guaranteed timeline, or guaranteed outcome
- Preparing or amending tax returns
- Providing tax, legal, audit, fraud, or assurance conclusions
- Automatically correcting accounting records
- Using generative AI for scoring or category selection
- Replacing professional review

---



## 5. Target Users



### Primary persona: owner-managed small business

The primary user is a U.S. small-business owner who manages or supervises their own bookkeeping and suspects that it is incomplete or inaccurate.

Common characteristics:

- Uses QuickBooks, a spreadsheet, another bookkeeping tool, or no consistent system
- Is between 1 and 24 or more months behind
- Has multiple bank, card, loan, or payment accounts
- May have payroll, sales tax, inventory, subcontractors, or mixed personal expenses
- Is approaching a tax, financing, agency, or internal reporting deadline
- Has limited accounting vocabulary
- Wants clarity before speaking to a professional



### Secondary user: IntegraFin lead operations team

The internal user needs to see the condition, urgency, source, contact information, and recommended service without reading an unstructured message or repeating the entire assessment on the first call.

### Out-of-scope users

- A consumer seeking only an income tax estimate
- A person seeking an audit opinion or fraud determination
- A user expecting to submit credentials or confidential records
- A user seeking legal advice
- A user requiring a guaranteed cleanup quote before file review

---



## 6. Product Principles

1. **Value before lead capture:** show the score, category, urgency, and top factors before the contact form.
2. **No false precision:** the score is a preliminary complexity indicator, not a professional opinion or price.
3. **Explain the result:** show which answers influenced it.
4. **Keep complexity and urgency separate:** a small job can be urgent, and a large job can be non-urgent.
5. **Use plain language:** a visitor must not need bookkeeping expertise.
6. **Collect the minimum data required:** fixed-choice answers only; no account numbers, credentials, tax IDs, or uploads.
7. **Trust the server:** never save a browser-supplied score without recalculation.
8. **Version the rules:** every stored result must identify the scoring version used.
9. **Design for a phone first:** one primary question per step, large targets, and persistent answers.
10. **Use approved content:** no generated advice in the MVP.

---



## 7. MVP Decisions and Approval Gates

The following defaults make the PRD buildable. Items marked **Approval required** must be confirmed by the named owner before public launch.


| Decision                   | MVP requirement                                                                           | Owner          | Status                  |
| -------------------------- | ----------------------------------------------------------------------------------------- | -------------- | ----------------------- |
| Customer-facing name       | Bookkeeping Cleanup Calculator                                                            | Business owner | Approval required       |
| Basic result               | Show exact 0-100 score, category, urgency, top three factors, and short next steps        | Service owner  | Approval required       |
| Lead requirement           | Full name plus at least one of email or phone                                             | Business owner | Proposed                |
| Full action plan delivery  | Show immediately on screen after submission; email the same plan when email is provided   | Operations     | Approval required       |
| Consultation handoff       | Link to the current scheduling or contact path after successful submission                | Operations     | Approval required       |
| Initial books review       | Describe as a consultation/request until free-versus-paid policy is confirmed             | Business owner | Open                    |
| Price display              | No exact price or price band in MVP                                                       | Business owner | Approved in source plan |
| AI usage                   | No generative AI in scoring or result creation                                            | Product owner  | Approved in source plan |
| Data retention             | Use the site's approved lead-retention policy; do not launch until a period is documented | Privacy owner  | Open                    |
| Operational response claim | Do not promise a response time until operations approves one                              | Operations     | Open                    |


Development may begin with these defaults, but the calculator must not publicly launch with unresolved disclaimer, retention, service-scope, or response-time decisions.

---



## 8. End-to-End User Journey

```text
Organic search, service page, blog, referral, ad, or direct visit
                              |
                              v
                  Calculator landing page
                              |
                              v
                 Start nine-step assessment
                              |
                              v
          Answer questions with progress and Back control
                              |
                              v
             Client calculates preliminary result
                              |
                              v
        See free score, category, urgency, and top factors
                              |
                 +------------+-------------+
                 |                          |
                 v                          v
             Leave page              Submit lead form
                                            |
                                            v
                           Server validates answers and contact
                                            |
                                            v
                              Server recalculates the result
                                            |
                                            v
                         Save lead and structured assessment
                                            |
                                            v
                    Show full action plan and consultation CTA
                                            |
                                            v
                      Notify team and optionally email customer
                                            |
                                            v
                          Professional review and service scope
```



### Primary happy path

1. Visitor lands on the page and understands the value and limitations.
2. Visitor selects **Check My Books**.
3. Visitor answers one question per step.
4. The interface validates each answer before advancing.
5. Visitor sees their free result without entering contact details.
6. Visitor chooses **Get My Complete Cleanup Action Plan**.
7. Visitor enters their name, email or phone, optional business name, contact preference, and consent.
8. The server validates the original answers, recalculates the result, and saves one lead.
9. Visitor sees the full action plan and **Request My Books Review** CTA.
10. IntegraFin receives a notification containing a concise qualification summary.



### Alternative and failure paths

- The visitor may go backward without losing answers.
- Refreshing before completion may restore answers from browser session storage; this is a should-have, not a launch blocker.
- Invalid or incomplete answers keep the visitor on the current step with an accessible error.
- If lead submission fails, the free result remains visible and the form preserves entered values.
- If email delivery or team notification fails after the database save, the saved lead remains successful and the interface does not ask the visitor to submit again.
- A duplicate click while a submission is pending must create no more than one lead.
- A rate-limited visitor sees a clear retry message and direct phone option.

---



## 9. Information Architecture and Screens

The route is one page with distinct states rather than separate URLs for every step.

### State 1: Landing

Required content:

- H1: **How Much Work Will It Take to Fix Your Books?**
- One-sentence explanation
- Expected completion time: about 60 to 90 seconds
- Three benefits: complexity, urgency, preparation checklist
- Privacy note: no documents, account numbers, or credentials requested
- Primary CTA: **Check My Books**
- Link to full disclaimer



### State 2: Assessment

Required elements:

- Question number and text
- Short helper text when needed
- Answer choices with large selectable targets
- Text progress, such as `Question 3 of 9`, plus a progress bar
- Back and Continue controls
- Exit/restart control that requires confirmation only when answers would be cleared
- Inline accessible validation



### State 3: Free basic result

Required elements:

- `Your preliminary bookkeeping complexity score`
- Score out of 100
- Category label
- Separate urgency badge and deadline explanation
- Top three contributing factors
- Two to four sentences explaining the category
- Three immediate next steps
- Visible disclaimer
- Lead CTA: **Get My Complete Cleanup Action Plan**
- Secondary option to retake or change answers

The score may use a gauge or bar, but the number and result must always be provided as text.

### State 4: Lead form

Required fields:

- Full name
- Email
- Phone
- Business name (optional)
- Preferred contact method (optional: email, phone, no preference)
- Consent checkbox
- Hidden honeypot field

Validation rule: full name, consent, and at least one of email or phone are required. If preferred contact is email or phone, that corresponding field becomes required.

### State 5: Full action plan and handoff

Required elements:

- Confirmation that the request was saved
- Restatement of result and urgency
- Result-specific explanation
- Personalized preparation checklist
- Recommended order of operations
- Questions to prepare for the consultation
- Recommended IntegraFin service route
- **Request My Books Review** CTA
- Phone and WhatsApp options if those are current approved channels
- Clear statement that final scope, timing, and pricing require record review



### State 6: Supporting page content

Below the interactive experience:

- Difference between catch-up and cleanup bookkeeping
- Factors that affect cleanup complexity
- How the calculator works
- Limitations and privacy warning
- FAQs
- Links to bookkeeping cleanup, QuickBooks, small-business bookkeeping, contractor bookkeeping, and pricing pages

---



## 10. Assessment Questions and Stored Values

The display labels may be refined for clarity, but stored values must remain stable after release.

### Q1. Accounting system

**Question:** What do you currently use to track your business finances?


| Label                | Stored value         |
| -------------------- | -------------------- |
| QuickBooks Online    | `quickbooks_online`  |
| QuickBooks Desktop   | `quickbooks_desktop` |
| Xero                 | `xero`               |
| Wave                 | `wave`               |
| Spreadsheet          | `spreadsheet`        |
| No accounting system | `none`               |
| Other or not sure    | `other_or_unsure`    |


This answer affects recommendations and issue labels but does not add score in scoring version 1.0. Historical calibration may justify adding a software factor later.

### Q2. Months behind

**Question:** How far behind are your books?


| Label                          | Stored value   |
| ------------------------------ | -------------- |
| Current or less than one month | `current`      |
| 1-3 months                     | `1_3`          |
| 4-6 months                     | `4_6`          |
| 7-12 months                    | `7_12`         |
| 13-24 months                   | `13_24`        |
| More than 24 months            | `more_than_24` |
| Not sure                       | `unsure`       |




### Q3. Monthly transaction volume

**Question:** Approximately how many business transactions occur each month?

Helper: Include deposits, purchases, transfers, fees, and payments across all business accounts.


| Label         | Stored value    |
| ------------- | --------------- |
| Fewer than 50 | `under_50`      |
| 50-100        | `50_100`        |
| 101-250       | `101_250`       |
| 251-500       | `251_500`       |
| More than 500 | `more_than_500` |
| Not sure      | `unsure`        |




### Q4. Financial accounts

**Question:** How many bank, credit-card, loan, or payment-platform accounts are involved?


| Label     | Stored value |
| --------- | ------------ |
| 1-2       | `1_2`        |
| 3-4       | `3_4`        |
| 5-7       | `5_7`        |
| 8 or more | `8_plus`     |
| Not sure  | `unsure`     |




### Q5. Reconciliation status

**Question:** When were all business accounts last reconciled?

Helper: Reconciliation means matching the bookkeeping records to bank, card, loan, and payment statements.


| Label                                   | Stored value         |
| --------------------------------------- | -------------------- |
| Last month                              | `last_month`         |
| Within the last 3 months                | `within_3_months`    |
| Within the last 6 months                | `within_6_months`    |
| More than 6 months ago                  | `more_than_6_months` |
| They have never been reconciled         | `never`              |
| I am not sure what reconciliation means | `unsure`             |




### Q6. Payroll

**Question:** Does the business have employees or run payroll?


| Label                                      | Stored value |
| ------------------------------------------ | ------------ |
| No                                         | `none`       |
| Yes, through a payroll provider            | `provider`   |
| Yes, but payroll records may be incomplete | `incomplete` |
| Not sure                                   | `unsure`     |




### Q7. Personal and business activity

**Question:** Are personal and business transactions mixed together?


| Label        | Stored value   |
| ------------ | -------------- |
| No           | `none`         |
| Occasionally | `occasionally` |
| Frequently   | `frequently`   |
| Not sure     | `unsure`       |




### Q8. Additional complexity

**Question:** Which of these apply to the business?

Multiple selections are allowed.


| Label                           | Stored value          |
| ------------------------------- | --------------------- |
| Inventory                       | `inventory`           |
| Sales-tax collection            | `sales_tax`           |
| Business loans                  | `business_loans`      |
| Multiple payment processors     | `multiple_processors` |
| Multiple entities               | `multiple_entities`   |
| Subcontractors or 1099 payments | `subcontractors_1099` |
| None of these                   | `none`                |
| Not sure                        | `unsure`              |


Selection rules:

- `none` is mutually exclusive with every other option.
- Selecting another option after `none` clears `none`.
- `unsure` may be selected only by itself in MVP to avoid ambiguous scoring.
- Store a unique array with a maximum of six values.



### Q9. Deadline

**Question:** Is there an important deadline?


| Label                  | Stored value        |
| ---------------------- | ------------------- |
| Within 14 days         | `within_14_days`    |
| Within 30 days         | `within_30_days`    |
| Within 60 days         | `within_60_days`    |
| More than 60 days away | `more_than_60_days` |
| No known deadline      | `none`              |


When the answer is not `none`, optionally ask for a deadline type:


| Label                             | Stored value           |
| --------------------------------- | ---------------------- |
| Tax filing                        | `tax_filing`           |
| IRS or state notice               | `agency_notice`        |
| Payroll or sales-tax matter       | `payroll_or_sales_tax` |
| Loan or financing request         | `financing`            |
| Business sale or investor request | `sale_or_investor`     |
| Internal reporting need           | `internal_reporting`   |
| Other                             | `other`                |


The optional deadline type does not change urgency in scoring version 1.0. It changes the explanation and internal routing context.

---



## 11. Scoring Specification Version 1.0



### 11.1 Calculation rules

1. Assign raw points to each complexity factor using the tables below.
2. Do not include deadline urgency in the complexity score.
3. Sum raw points. The maximum raw score is 113.
4. Normalize to a 0-100 score:

```text
normalizedScore = round((rawScore / 113) * 100)
```

1. Clamp the output to the inclusive range 0-100.
2. Determine category from the normalized score.
3. Determine urgency independently from the deadline window.
4. Rank factor contributions by raw points to generate the top three factors.
5. When two factors have the same points, use this stable order: months behind, reconciliation, multiple entities, transaction volume, financial accounts, mixed activity, payroll, additional complexity.



### 11.2 Point tables



#### Months behind: maximum 30 raw points


| Value          | Points |
| -------------- | ------ |
| `current`      | 0      |
| `1_3`          | 8      |
| `4_6`          | 14     |
| `7_12`         | 20     |
| `13_24`        | 26     |
| `more_than_24` | 30     |
| `unsure`       | 15     |




#### Monthly transaction volume: maximum 15 raw points


| Value           | Points |
| --------------- | ------ |
| `under_50`      | 0      |
| `50_100`        | 3      |
| `101_250`       | 6      |
| `251_500`       | 10     |
| `more_than_500` | 15     |
| `unsure`        | 6      |




#### Financial accounts: maximum 10 raw points


| Value    | Points |
| -------- | ------ |
| `1_2`    | 0      |
| `3_4`    | 3      |
| `5_7`    | 6      |
| `8_plus` | 10     |
| `unsure` | 3      |




#### Reconciliation status: maximum 20 raw points


| Value                | Points |
| -------------------- | ------ |
| `last_month`         | 0      |
| `within_3_months`    | 5      |
| `within_6_months`    | 10     |
| `more_than_6_months` | 15     |
| `never`              | 20     |
| `unsure`             | 15     |




#### Payroll: maximum 8 raw points


| Value        | Points |
| ------------ | ------ |
| `none`       | 0      |
| `provider`   | 4      |
| `incomplete` | 8      |
| `unsure`     | 4      |




#### Mixed personal and business activity: maximum 10 raw points


| Value          | Points |
| -------------- | ------ |
| `none`         | 0      |
| `occasionally` | 5      |
| `frequently`   | 10     |
| `unsure`       | 5      |




#### Additional complexity excluding multiple entities: maximum 10 raw points


| Selected value        | Points  |
| --------------------- | ------- |
| `inventory`           | 2       |
| `sales_tax`           | 2       |
| `business_loans`      | 2       |
| `multiple_processors` | 2       |
| `subcontractors_1099` | 2       |
| `unsure`              | 3 total |
| `none`                | 0       |


Add selected points and cap this factor at 10.

#### Multiple entities: maximum 10 raw points


| Condition                       | Points |
| ------------------------------- | ------ |
| `multiple_entities` is selected | 10     |
| Otherwise                       | 0      |


Multiple entities is deliberately separated from the additional-complexity subtotal so it is not double counted.

### 11.3 Categories


| Normalized score | Internal key         | Customer-facing label           |
| ---------------- | -------------------- | ------------------------------- |
| 0-24             | `reasonably_current` | Books appear reasonably current |
| 25-44            | `light_catch_up`     | Light catch-up may be required  |
| 45-69            | `moderate_cleanup`   | Moderate cleanup is likely      |
| 70-100           | `complex_cleanup`    | Complex cleanup is likely       |


These labels describe likely scope, not the accuracy of the books and not a professional opinion.

### 11.4 Urgency


| Deadline window     | Internal key | Label    |
| ------------------- | ------------ | -------- |
| `within_14_days`    | `critical`   | Critical |
| `within_30_days`    | `high`       | High     |
| `within_60_days`    | `medium`     | Medium   |
| `more_than_60_days` | `normal`     | Normal   |
| `none`              | `normal`     | Normal   |


The result must be capable of displaying combinations such as `reasonably_current + critical` and `complex_cleanup + normal`.

### 11.5 Top factor generation

Each factor returns a machine key, point contribution, and approved customer-facing sentence. Only factors with more than zero points are eligible.

Examples:

- `months_behind`: "Your books may be 7-12 months behind."
- `reconciliation`: "Your accounts may not have been reconciled for more than six months."
- `mixed_activity`: "Personal and business transactions are frequently mixed."
- `multiple_entities`: "The work may involve more than one business entity."

If fewer than three factors have points, supplement the explanation with non-scoring observations such as no accounting system or an upcoming deadline. Never invent a factor.

### 11.6 Scoring calibration gate

Version 1.0 is a product hypothesis, not a validated estimate. Before public launch, the service owner must enter at least 10 anonymized historical engagements and compare:

- Predicted category
- Actual cleanup category or effort band
- False-low cases
- False-high cases
- Factors missing from the model

If weights or thresholds change, update the rules, fixtures, PRD, and `calculatorVersion` together. Do not silently change results under the same version.

---



## 12. Result Content Requirements



### 12.1 Basic result content by category



#### Books appear reasonably current

The answers suggest that the books may need a review or limited corrections rather than a large catch-up project. A professional should still confirm reconciliations, balances, and reporting before the result is relied upon.

Default next steps:

1. Confirm every business account is reconciled through the latest statement.
2. Review uncategorized and owner-related transactions.
3. Run and review the balance sheet and profit-and-loss report.



#### Light catch-up may be required

The answers suggest a contained amount of catch-up or correction work. The final scope will depend on statement availability, reconciliation differences, and transaction quality.

Default next steps:

1. Gather statements for all affected accounts.
2. Identify the last reliably reconciled month.
3. Avoid making large historical changes until the file is reviewed.



#### Moderate cleanup is likely

The answers suggest multiple periods or accounting areas may require review, correction, and reconciliation before the reports are reliable.

Default next steps:

1. List every bank, card, loan, payroll, and payment account involved.
2. Gather statements and payroll or sales-tax reports for the affected period.
3. Prioritize the earliest external deadline and request a professional scope review.



#### Complex cleanup is likely

The answers suggest a broad cleanup involving significant history, volume, unreconciled activity, or multiple complexity factors. The work should be scoped after records are reviewed.

Default next steps:

1. Preserve the current file and avoid bulk deletions or reclassifications.
2. Gather complete statements and reports for all affected periods and entities.
3. Arrange a professional review and identify any tax, payroll, notice, or financing deadline immediately.



### 12.2 Personalized checklist rules

The full plan is assembled from approved deterministic content blocks. Include only applicable items:


| Condition                                    | Checklist item                                                        |
| -------------------------------------------- | --------------------------------------------------------------------- |
| Any bank/card/payment accounts               | Monthly statements for each affected account                          |
| `business_loans`                             | Loan statements showing principal, interest, and ending balance       |
| Payroll is not `none`                        | Payroll registers, quarterly filings, and year-end forms              |
| `sales_tax`                                  | Sales-tax returns and platform sales reports                          |
| `inventory`                                  | Latest inventory count and valuation method, if available             |
| `multiple_processors`                        | Statements or exports from each processor                             |
| `multiple_entities`                          | Separate entity list, tax classification, and records for each entity |
| `subcontractors_1099`                        | Vendor list, W-9 records, and 1099 filing status                      |
| Mixed activity is not `none`                 | Owner contribution, draw, and personal-transaction notes              |
| Accounting system is `spreadsheet` or `none` | Current spreadsheet or source records and preferred future system     |
| Deadline exists                              | Notice, request, or filing date and any related correspondence        |


Do not ask the visitor to upload these items through the calculator.

### 12.3 Recommended service routing

The recommendation is informational and may include more than one service:

- `reasonably_current`: books review or monthly bookkeeping
- `light_catch_up`: light catch-up bookkeeping
- `moderate_cleanup`: bookkeeping cleanup
- `complex_cleanup`: professional bookkeeping cleanup scope review
- Accounting system `none` or `spreadsheet`: also mention QuickBooks setup or migration review
- Payroll `incomplete`: also mention payroll-record review
- Deadline type `tax_filing`: also mention that tax preparation is a separate service and depends on clean records
- Multiple entities: require professional scoping before a service commitment

The calculator must not claim that a user qualifies for a service or that IntegraFin has accepted an engagement.

### 12.4 Required disclaimer

Display near the basic result and again near the lead form:

> This assessment provides a preliminary scope based only on the information entered. It is not a quote, audit, assurance service, tax opinion, legal opinion, or guarantee. Final scope, timing, and pricing require review of the accounting records. Tax preparation, filings, notices, payroll corrections, and other services may require separate engagements.



### 12.5 Sensitive-information warning

> Do not enter Social Security numbers, tax identification numbers, account numbers, bank details, passwords, tax returns, or other confidential financial records in this calculator.

---



## 13. Functional Requirements



### Assessment


| ID     | Requirement                                                                        | Priority |
| ------ | ---------------------------------------------------------------------------------- | -------- |
| FR-001 | A visitor can start and complete the calculator without an account.                | Must     |
| FR-002 | The calculator presents nine primary questions in the specified order.             | Must     |
| FR-003 | The user can move backward and forward without losing valid answers.               | Must     |
| FR-004 | The current step and total step count are shown as text and visually.              | Must     |
| FR-005 | The calculator prevents continuation when a required answer is missing or invalid. | Must     |
| FR-006 | Q8 enforces its mutually exclusive selection rules.                                | Must     |
| FR-007 | Changing an earlier answer invalidates and recalculates the existing result.       | Must     |
| FR-008 | Restart clears answers and result only after user confirmation.                    | Should   |
| FR-009 | Answers may be restored from session storage after an accidental refresh.          | Should   |




### Calculation and result


| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-010 | A pure TypeScript function calculates score, category, urgency, issues, checklist, and recommended services. | Must     |
| FR-011 | The browser calculates the basic result immediately after Q9.                                                | Must     |
| FR-012 | The server independently validates all answers and recalculates the result before saving.                    | Must     |
| FR-013 | The basic result is visible before the contact form is submitted.                                            | Must     |
| FR-014 | The result shows score, category, urgency, top factors, explanation, next steps, and disclaimer.             | Must     |
| FR-015 | The score and result are available in text and not only as a chart or color.                                 | Must     |
| FR-016 | Every result identifies scoring version `1.0`.                                                               | Must     |
| FR-017 | Client/server mismatch is logged without storing the browser score as authoritative.                         | Must     |




### Lead capture


| ID     | Requirement                                                                                                             | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-018 | The lead form requires full name, consent, and at least one of email or phone.                                          | Must     |
| FR-019 | Client and server validate contact fields and consent.                                                                  | Must     |
| FR-020 | A dedicated assessment submission action accepts answers, not a trusted result object.                                  | Must     |
| FR-021 | A successful submission stores one lead with service `Bookkeeping Cleanup` and source `bookkeeping-cleanup-calculator`. | Must     |
| FR-022 | The stored lead contains structured assessment answers and the server result.                                           | Must     |
| FR-023 | First-touch and submission-page attribution are preserved.                                                              | Must     |
| FR-024 | Duplicate clicks while pending create no more than one lead.                                                            | Must     |
| FR-025 | Existing lead rate limits and honeypot protection apply.                                                                | Must     |
| FR-026 | The full action plan appears only after the lead is saved.                                                              | Must     |
| FR-027 | Email the plan when an email is provided; phone-only leads do not produce an email error.                               | Should   |




### Operations


| ID     | Requirement                                                                                                                                                           | Priority |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-028 | Team notification includes score/category, urgency, months behind, system, volume, accounts, reconciliation, payroll, complexities, deadline, and contact preference. | Must     |
| FR-029 | The dashboard list or summary shows score/category, urgency, months behind, software, volume, deadline, status, and follow-up date.                                   | Must     |
| FR-030 | The full dashboard record displays every structured answer and scoring version.                                                                                       | Must     |
| FR-031 | Existing lead status, response SLA, appointment, and revenue workflows continue to work for calculator leads.                                                         | Must     |




### Analytics and SEO


| ID     | Requirement                                                                         | Priority |
| ------ | ----------------------------------------------------------------------------------- | -------- |
| FR-032 | Track all events specified in Section 17 with no personal information.              | Must     |
| FR-033 | Each successful business event is tracked no more than once per occurrence.         | Must     |
| FR-034 | Page metadata, canonical URL, sitemap entry, and valid structured data are present. | Must     |
| FR-035 | Approved internal pages link to the calculator.                                     | Should   |


---



## 14. Data Contract



### 14.1 Assessment answers

```ts
type BookkeepingAssessmentAnswers = {
  software:
    | "quickbooks_online"
    | "quickbooks_desktop"
    | "xero"
    | "wave"
    | "spreadsheet"
    | "none"
    | "other_or_unsure";
  monthsBehind: "current" | "1_3" | "4_6" | "7_12" | "13_24" | "more_than_24" | "unsure";
  monthlyTransactions: "under_50" | "50_100" | "101_250" | "251_500" | "more_than_500" | "unsure";
  financialAccounts: "1_2" | "3_4" | "5_7" | "8_plus" | "unsure";
  reconciliationStatus:
    | "last_month"
    | "within_3_months"
    | "within_6_months"
    | "more_than_6_months"
    | "never"
    | "unsure";
  payrollStatus: "none" | "provider" | "incomplete" | "unsure";
  mixedPersonalExpenses: "none" | "occasionally" | "frequently" | "unsure";
  complexities: Array<
    | "inventory"
    | "sales_tax"
    | "business_loans"
    | "multiple_processors"
    | "multiple_entities"
    | "subcontractors_1099"
    | "none"
    | "unsure"
  >;
  deadlineWindow: "within_14_days" | "within_30_days" | "within_60_days" | "more_than_60_days" | "none";
  deadlineType?:
    | "tax_filing"
    | "agency_notice"
    | "payroll_or_sales_tax"
    | "financing"
    | "sale_or_investor"
    | "internal_reporting"
    | "other";
};
```



### 14.2 Server result

```ts
type BookkeepingAssessmentResult = {
  calculatorVersion: "1.0";
  rawScore: number;
  score: number;
  category: "reasonably_current" | "light_catch_up" | "moderate_cleanup" | "complex_cleanup";
  urgency: "normal" | "medium" | "high" | "critical";
  factors: Array<{
    key: string;
    points: number;
    explanationKey: string;
  }>;
  issueKeys: string[];
  checklistKeys: string[];
  recommendedServiceKeys: string[];
};
```

Store content keys, not large duplicated result paragraphs, so approved copy may be rendered consistently. Store the score and category as calculated at submission time for reporting integrity.

### 14.3 Lead assessment record

```ts
type BookkeepingAssessmentRecord = {
  calculatorVersion: "1.0";
  answers: BookkeepingAssessmentAnswers;
  result: BookkeepingAssessmentResult;
  contactPreference?: "email" | "phone" | "no_preference";
  consentToContact: true;
  completedAt: Date;
  submittedAt: Date;
};
```

Recommended model field:

```ts
bookkeepingAssessment?: BookkeepingAssessmentRecord;
```



### Data rules

- Use strict Zod enums on the server.
- Reject unknown keys or invalid combinations.
- Do not accept a score, category, checklist, or service recommendation from the browser as authoritative.
- Do not store credentials, account numbers, tax IDs, documents, or free-form financial details.
- Include assessment data in privacy access and deletion workflows.
- Index `bookkeepingAssessment.result.category`, `bookkeepingAssessment.result.urgency`, and `source` only if dashboard queries justify the index.
- Apply an approved retention period before launch.

---



## 15. Technical Design and Codebase Fit



### Existing capabilities confirmed in the repository

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4
- Zod validation
- MongoDB through Mongoose
- Existing lead server actions and rate limiting
- First-touch and submission attribution
- Team notifications and customer confirmation email
- Admin lead operations dashboard
- Analytics helper with an allowlist for event parameters
- Existing bookkeeping service pages and service enum value `Bookkeeping Cleanup`



### Important gaps to implement

1. The current generic `submitLead` action accepts general lead fields but has no structured assessment schema or server-side calculation.
2. `ContactLead` has no bookkeeping assessment field.
3. The dashboard has no calculator summary or detail view.
4. The analytics event-name and safe-parameter allowlists do not include the calculator funnel.
5. No automated unit test framework is currently configured in `package.json`.



### Recommended file structure

```text
src/app/bookkeeping-cleanup-calculator/
|-- page.tsx
|-- BookkeepingCleanupCalculatorClient.tsx
|-- components/
|   |-- CalculatorLanding.tsx
|   |-- AssessmentStep.tsx
|   |-- AssessmentProgress.tsx
|   |-- BasicResult.tsx
|   |-- AssessmentLeadForm.tsx
|   `-- FullActionPlan.tsx
`-- content.ts

src/lib/bookkeeping-cleanup/
|-- schema.ts
|-- scoring.ts
|-- content.ts
|-- types.ts
`-- scoring.test.ts
```

Existing files expected to change:

```text
src/app/actions/leads.ts
src/models/ContactLead.ts
src/components/admin/LeadOperationsDashboard.tsx
src/lib/leadNotifications.ts
src/lib/analytics.ts
src/app/sitemap.ts
src/data/internalLinking.ts
```

Navigation or footer changes are optional until an approved placement is selected.

### Calculation API

```ts
calculateCleanupAssessment(
  answers: BookkeepingAssessmentAnswers,
): BookkeepingAssessmentResult
```

Properties required of this function:

- Pure: no database, time, browser, environment, or network dependency
- Deterministic: same valid answers always return the same result
- Exhaustive: new enum values cause TypeScript or test failures until handled
- Shared: imported by both the client and the server action
- Content-light: returns keys and structured factors rather than JSX



### Submission API

Recommended dedicated action:

```ts
submitBookkeepingAssessmentLead({
  name,
  email,
  phone,
  company,
  contactPreference,
  consentToContact,
  answers,
  source,
  attribution,
  website,
})
```

Server sequence:

1. Apply rate limiting.
2. Parse a strict assessment-lead Zod schema.
3. Verify honeypot and consent.
4. Recalculate the result from validated answers.
5. Connect to MongoDB.
6. Save the general lead and nested assessment atomically as one record.
7. Return the authoritative result and lead ID.
8. Trigger notification and optional confirmation email after the response-safe database save, following the existing pattern.



### State management

Local React state is sufficient for MVP. Do not introduce a state library only for this flow. Use a discriminated page state such as:

```ts
type CalculatorView = "landing" | "assessment" | "basic_result" | "lead_form" | "full_plan";
```

The result must be derived from answers rather than maintained as an independently editable source of truth.

### Security and integrity

- Server validation is mandatory even when the same Zod schema is used in the browser.
- The submitted service and source should be assigned or strictly checked on the server.
- Escape or avoid rendering user-controlled HTML.
- Use fixed options rather than free-form financial descriptions.
- Preserve the existing rate limit of five lead submissions per ten minutes unless product traffic testing justifies a different assessment-specific limit.
- An idempotency key is preferred for strict duplicate prevention. At minimum, disable the submit button while pending and reject repeat requests with the same short-lived key.

---



## 16. Non-Functional Requirements



### Performance

- Calculator interaction must not require network requests before lead submission.
- Scoring should complete within one animation frame on a typical mobile device.
- Avoid loading the admin dashboard, email, or database code into the client bundle.
- The page should meet the site's production Core Web Vitals targets.



### Accessibility

- Meet WCAG 2.2 AA for the calculator flow.
- All questions use a `fieldset` and `legend` or equivalent accessible grouping.
- Full keyboard operation is required.
- Focus moves to the new question heading after step changes.
- Errors are associated with the relevant control and announced.
- Progress is expressed in text, not only by width or color.
- Result creation is announced through an appropriate live region.
- Focus states are visible.
- Motion respects `prefers-reduced-motion`.
- Touch targets are at least 44 by 44 CSS pixels where practical.



### Browser and layout support

- Current Chrome, Edge, Safari, and Firefox
- Common phone widths beginning at 320 CSS pixels
- Tablet and desktop layouts
- No horizontal scrolling in the primary flow



### Reliability and observability

- Log validation failures without PII.
- Log calculator version and mismatch conditions.
- Treat notification or email failure separately from lead-save failure.
- Do not expose stack traces or database details to visitors.



### Privacy

- No PII in analytics.
- No financial documents or credentials.
- Consent state stored with the lead.
- Retention and deletion behavior documented before launch.

---



## 17. Analytics and Measurement



### Events


| Event                         | Trigger                          | Required safe parameters               |
| ----------------------------- | -------------------------------- | -------------------------------------- |
| `cleanup_calculator_view`     | Page becomes visible             | version, page type, attribution        |
| `cleanup_calculator_start`    | Start CTA or first answer, once  | version, attribution                   |
| `cleanup_calculator_step`     | A valid step is completed        | version, step number                   |
| `cleanup_calculator_complete` | Q9 is completed                  | version                                |
| `cleanup_result_view`         | Basic result is first shown      | version, category, score band, urgency |
| `cleanup_lead_form_start`     | First interaction with lead form | version, category                      |
| `cleanup_lead_submit`         | Database save succeeds           | version, category, urgency             |
| `cleanup_consultation_click`  | Consultation CTA selected        | version, category, urgency, CTA name   |




### Safe parameters

- `calculator_version`
- `step_number`
- `result_category`
- `score_band`: `0_24`, `25_44`, `45_69`, or `70_100`
- `months_behind_band`
- `software_category`
- `deadline_urgency`
- Existing traffic attribution fields
- Existing page and device context where available

Never send name, email, phone, business name, exact deadline correspondence, free-form text, or the complete assessment object to analytics.

### Funnel

```text
Views -> Starts -> Completed assessments -> Result views
      -> Lead submissions -> Consultation clicks -> Appointments
      -> Qualified leads -> Proposals -> Clients won
```



### Initial success targets

Targets are hypotheses for the first 30 days:

- Start-to-completion rate: at least 55%
- Result-to-lead conversion: at least 10%
- Qualified rate among calculator leads: at least 40%
- Client/server scoring mismatches: zero
- Sensitive-data analytics incidents: zero
- Duplicate lead defects caused by one submission: zero

Also record step-level abandonment so the team can identify confusing or burdensome questions.

---



## 18. SEO Requirements



### Page metadata

- Canonical: `https://integrafin.tax/bookkeeping-cleanup-calculator`
- Suggested title: `Bookkeeping Cleanup Calculator | IntegraFin`
- Suggested description: `Answer nine simple questions to estimate your bookkeeping cleanup complexity, deadline urgency, and next steps. No records or account details required.`
- Suggested H1: `How Much Work Will It Take to Fix Your Books?`



### On-page intent

Primary topic: bookkeeping cleanup calculator.

Supporting topics:

- Bookkeeping cleanup assessment
- Catch-up versus cleanup bookkeeping
- QuickBooks cleanup
- Factors affecting bookkeeping cleanup scope
- Preparing records for a bookkeeping review



### Structured data

Use only schema that accurately describes visible content. Candidate types:

- `WebPage`
- `SoftwareApplication` or `WebApplication` if supported by the site's schema conventions
- `BreadcrumbList`
- `FAQPage` only when the same questions and answers are visibly present and current search-engine rules permit it



### Internal links

Link to the calculator from the most relevant existing pages after copy approval:

- `/bookkeeping-cleanup`
- `/quickbooks-bookkeeping-services`
- `/small-business-bookkeeping-services`
- `/contractor-bookkeeping-services`
- `/pricing`
- Relevant bookkeeping articles

Add the new route to `src/app/sitemap.ts` and the internal-linking map.

---



## 19. Testing and Acceptance



### Test tooling requirement

The repository currently has no unit test script or test dependency. Before implementing the scoring tests, engineering must choose and configure a TypeScript-compatible runner. Vitest is the recommended lightweight default, but the team may use Node's test runner if it supports the project's TypeScript workflow cleanly.

Required package scripts after setup:

```json
{
  "test": "<test runner command>",
  "test:watch": "<watch command>"
}
```



### Scoring unit tests

- Minimum raw and normalized score
- Maximum raw and normalized score
- Every answer option maps to the documented points
- Category boundaries at 24/25, 44/45, and 69/70 normalized points
- Urgent low-complexity scenario
- Normal-urgency complex scenario
- Additional complexity subtotal cap
- Multiple entities counted once and separately
- `none` and `unsure` invalid selection combinations rejected
- Stable ordering for tied top factors
- Unknown and missing values rejected
- Input object is not mutated
- Same input returns deeply equal output

Because normalization makes exact boundary fixtures non-obvious, store named fixtures that are designed to reach each normalized boundary and assert both raw and normalized values.

### Server/action tests

- Valid email-only lead
- Valid phone-only lead
- Both contact methods
- Neither contact method
- Invalid contact preference combination
- Consent false or missing
- Invalid assessment enum
- Extra unknown assessment key
- Browser-supplied score ignored or rejected
- Correct service and source stored
- Attribution preserved
- Duplicate/idempotency behavior
- Rate-limit behavior
- Database success plus notification failure
- Database success plus email not applicable



### Component and experience tests

- One-question-per-step flow
- Back navigation preserves values
- Updating an answer recalculates result
- Result appears before lead gate
- Form failure preserves result and contact fields
- Loading state prevents duplicate click
- Mobile, tablet, and desktop layouts
- Keyboard-only flow
- Screen-reader announcements and labels
- Reduced-motion behavior
- Refresh/session recovery if included



### Release checks

- `npm run test` passes
- `npm run lint` passes
- `npm run build` passes
- No client/server scoring mismatch in test fixtures
- Analytics payload review finds no PII
- Team notification and dashboard record verified in a test environment
- Metadata, canonical, sitemap, robots, and structured data validated

---



## 20. Definition of Done

The MVP is complete only when all of the following are true:

### Product and content

- Questions, weights, category copy, checklist, CTA, and disclaimer are approved.
- Historical calibration has been completed and documented.
- The free result is useful without lead submission.
- No exact price, timeline, or outcome is promised.



### Engineering

- Nine-step calculator works on mobile and desktop.
- Client and server use the same pure scoring module.
- Server stores its own authoritative result with scoring version.
- Lead notification, confirmation behavior, dashboard visibility, and attribution work.
- Analytics events fire as specified without PII.
- Automated tests, lint, and production build pass.



### Accessibility and privacy

- Keyboard and screen-reader review has been completed.
- Visible focus, errors, progress, and result announcements work.
- No sensitive fields or uploads exist.
- Retention and deletion handling are documented.



### Operations

- Lead owner is assigned.
- Contact response process is documented.
- Scheduling destination is approved and tested.
- Team members understand score versus urgency and do not treat the result as a quote.

---



## 21. Delivery Plan



### Phase 0: decisions and calibration - 3 to 5 working days

1. Assign product owner and bookkeeping service owner.
2. Approve the name, questions, answer labels, disclaimers, and CTA.
3. Decide full-plan delivery and scheduling handoff.
4. Document retention and operational response policy.
5. Score at least 10 historical cleanup cases.
6. Revise weights or categories if calibration shows material errors.

**Exit:** signed-off PRD and scoring version 1.0.

### Phase 1: UX and approved content - 3 to 5 working days

1. Create phone-first wireframes for all six states.
2. Write final content blocks for factors, categories, checklists, and deadlines.
3. Prototype keyboard and screen-reader focus behavior.
4. Conduct five short usability tests with representative users.
5. Update the PRD with decisions.

**Exit:** approved interaction and content specification.

### Phase 2: core calculator - 3 to 4 working days

1. Configure test runner.
2. Implement strict answer schema and TypeScript types.
3. Implement scoring and content-key functions.
4. Write scoring and boundary tests.
5. Build landing, question flow, progress, and basic result.

**Exit:** calculator produces approved results locally with passing tests.

### Phase 3: lead and operations integration - 2 to 4 working days

1. Add the nested assessment model.
2. Add dedicated assessment lead action and validation.
3. Add full action plan and confirmation state.
4. Extend team notification and optional customer email.
5. Extend admin dashboard summary and detail.
6. Verify rate limiting, duplicate prevention, and attribution.

**Exit:** end-to-end test lead is saved, shown, and notified correctly.

### Phase 4: analytics, SEO, QA, and soft launch - 3 to 5 working days

1. Add event names and safe parameters to analytics allowlists.
2. Add metadata, structured data, sitemap, and internal links.
3. Run the full QA matrix.
4. Complete accessibility, privacy, and copy review.
5. Soft launch to a limited audience.

**Exit:** no critical defect; owners approve public launch.

### Phase 5: first 30 days

1. Review funnel and step abandonment weekly.
2. Compare predicted category with professional review outcome.
3. Review lead quality and operational usefulness.
4. Fix the largest usability or qualification problem.
5. Test one CTA or result-content hypothesis at a time.
6. Decide whether to scale, iterate, reposition, or stop.

---



## 22. Build Order for Engineering

This is the recommended dependency order:

1. **Approve rules and copy.** Coding before scoring approval creates expensive rework.
2. **Create shared types and strict schema.** These define every valid state.
3. **Implement and test the pure scoring function.** This is the product's core contract.
4. **Create deterministic content maps.** Map result keys to approved customer text.
5. **Build the questionnaire state machine.** Keep it independent of lead submission.
6. **Build the free result.** Confirm value is delivered before gating.
7. **Extend the data model and add the dedicated server action.** Recalculate on the server.
8. **Build the lead form and full plan.** Connect only after calculator behavior is stable.
9. **Extend notification and dashboard.** Make the collected information operationally useful.
10. **Add analytics, SEO, and internal links.** Measure the completed experience.
11. **Run QA and soft launch.** Calibrate against real professional reviews.

---



## 23. Risks and Mitigations


| Risk                                          | Consequence                              | Required mitigation                                                            |
| --------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| Score is treated as a quote                   | Scope or trust dispute                   | Use complexity language, disclaimer, and professional-review requirement       |
| Scoring underestimates difficult work         | Poor qualification and customer surprise | Historical calibration, versioning, false-low review                           |
| Unknown answers artificially reduce risk      | Misleading low result                    | Assign conservative middle points and explain uncertainty                      |
| Nine steps cause abandonment                  | Fewer completed assessments              | One question per screen, progress, step analytics, usability tests             |
| Result is overly gated                        | Reduced trust                            | Show score, category, urgency, and factors before contact form                 |
| Sensitive details are entered                 | Privacy exposure                         | Fixed choices, no free-form financial field, warnings, no uploads              |
| Browser result is tampered with               | Incorrect stored qualification           | Server recalculation from strict answers                                       |
| Notification failure causes resubmission      | Duplicate leads                          | Treat saved lead as success and track notification separately                  |
| Team does not use structured data             | No operational improvement               | Put summary in notification and dashboard                                      |
| Deadline creates an implied emergency promise | Expectation mismatch                     | Separate urgency from complexity; make no response-time promise until approved |
| Analytics leaks PII                           | Privacy and compliance issue             | Central allowlist, payload QA, no full assessment object                       |


---



## 24. Post-MVP Opportunities

Consider only after scoring and conversion are validated:

- Downloadable or emailed PDF action plan
- Embedded appointment scheduling
- Automated follow-up sequences
- CRM prioritization based on score and urgency
- Industry-specific checklists
- Spanish-language version
- Print-friendly results
- Data-calibrated price bands
- QuickBooks read-only diagnostics with explicit authorization
- AI-written explanations grounded only in approved content blocks

AI must never change the deterministic score or imply that actual records were reviewed.

---



## 25. Open Questions Before Approval

1. Who has final product decision authority?
2. Who approves bookkeeping logic and customer-facing result language?
3. Is the professional books review free, paid, or dependent on the case?
4. Is the complete plan shown on screen, emailed, or both? This PRD recommends both when email exists.
5. What scheduling URL or contact workflow should the final CTA use?
6. What response expectation can operations consistently meet?
7. What is the approved retention period for assessment leads?
8. Which 10 to 20 historical engagements will be used for calibration?
9. Should the public result show the exact score? This PRD recommends yes for transparency.
10. Should phone-only leads receive the full plan by SMS or only see it on screen?

---



## 26. Approval Record


| Area                              | Approver | Decision/date |
| --------------------------------- | -------- | ------------- |
| Product scope                     |          |               |
| Questions and scoring             |          |               |
| Result and checklist content      |          |               |
| Disclaimer and privacy            |          |               |
| Lead handoff and response process |          |               |
| UX and accessibility              |          |               |
| Engineering design                |          |               |
| Public launch                     |          |               |


---



## 27. Immediate Next Actions

1. Review Section 7 and decide the open business policies.
2. Have the bookkeeping service owner review Sections 10 through 12.
3. Select at least 10 anonymized historical cleanup cases.
4. Run those cases through the scoring tables and record predicted versus actual category.
5. Approve or revise scoring version 1.0.
6. Create the phone-first wireframes for the six page states.
7. Convert Sections 13, 15, 17, and 19 into engineering tickets.
8. Begin implementation only after the scoring, disclaimer, and lead handoff are approved.

