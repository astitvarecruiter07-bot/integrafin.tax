# IntegraFin Bookkeeping Cleanup Calculator

## AI Product Manager Working Plan

**Document owner:** Product Manager  
**Business owner:** IntegraFin  
**Product status:** Discovery  
**Current version:** 0.1  
**Last updated:** 2026-08-02  
**Target platform:** `integrafin.tax`  

---

## How to Use This Document

This document is the product's working source of truth. Update it whenever a product decision is made, a requirement changes, a test is completed, or a launch metric is reviewed.

Status markers:

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed
- `[!]` Blocked or requires a decision

Product Manager operating rhythm:

1. Start each week by updating **Current Product Status**.
2. Select the next unchecked items from the current phase.
3. Record major decisions in the **Decision Log**.
4. Do not begin development until the MVP questions, scoring, outputs, and disclaimer are approved.
5. Review funnel metrics weekly after launch.

---

## 1. Product Summary

### Working Product Name

**IntegraFin Bookkeeping Cleanup Calculator**

Alternative customer-facing names to test:

- Bookkeeping Health Check
- How Much Work Will It Take to Fix My Books?
- QuickBooks Cleanup Readiness Calculator
- Catch-Up Bookkeeping Assessment

### One-Sentence Description

A free, mobile-friendly assessment that helps a small-business owner understand the likely condition, urgency, and cleanup complexity of their books before requesting an IntegraFin consultation.

### Customer Promise

> Answer a few simple questions and receive a bookkeeping health score, likely cleanup level, priority issues, and a personalized preparation checklist.

### Business Objective

Generate qualified bookkeeping-cleanup consultations and convert suitable cleanup clients into recurring monthly bookkeeping relationships.

### North-Star Metric

**Qualified consultation requests per 100 completed calculator assessments.**

---

## 2. Problem Statement

Small-business owners often know their books are behind or unreliable, but they do not know:

- How serious the problem is
- Whether they need catch-up work or a deeper cleanup
- What information an accountant will need
- How long the work might take
- Whether bookkeeping cleanup is separate from tax preparation
- What their first practical step should be

IntegraFin currently asks the visitor to request a consultation before giving them a structured preliminary diagnosis. This creates uncertainty for the visitor and gives the team limited qualification information before follow-up.

### Product Opportunity

Give the visitor immediate value while collecting structured information that helps IntegraFin prioritize and qualify the lead.

---

## 3. Target Customer

### Primary User

A U.S. small-business owner who:

- Is behind on bookkeeping
- Uses QuickBooks or another accounting system
- Has unreconciled or unreliable accounts
- Is preparing for a tax, financing, payroll, or agency deadline
- Needs help separating personal and business activity
- Wants to understand what professional cleanup may involve

### High-Priority Segments

1. Businesses 4–24 months behind
2. QuickBooks users with unreconciled accounts
3. Owner-managed LLCs and S corporations
4. Contractors and subcontractor-heavy businesses
5. Businesses with active payroll
6. Businesses preparing for tax filing or financing

### Jobs to Be Done

> When I suspect my bookkeeping is incomplete or incorrect, I want a quick way to understand the likely severity and next steps so I can decide whether to hire professional help.

### Not the Primary User

- Someone seeking a full tax-return calculation
- Someone requesting an audit or assurance opinion
- Someone looking for legal advice
- Someone wanting a guaranteed cleanup price without record review
- Someone attempting to upload confidential documents through a public form

---

## 4. Product Principles

1. **Useful before gated:** Show a basic result before asking for contact details.
2. **Transparent:** Explain which answers influenced the result.
3. **No false precision:** Do not promise an exact price or completion date.
4. **Mobile first:** A business owner should finish the assessment on a phone.
5. **Low effort:** The MVP should take approximately 60–90 seconds.
6. **Privacy conscious:** Do not request sensitive financial data or credentials.
7. **Rules before AI:** Use deterministic, testable scoring for the MVP.
8. **Human-reviewed:** Final scope and price require professional review.
9. **Conversion with trust:** The experience should feel like professional guidance, not a sales trap.

---

## 5. Goals and Non-Goals

### MVP Goals

- [ ] Help visitors understand likely bookkeeping-cleanup complexity
- [ ] Generate structured, attributable leads
- [ ] Give IntegraFin useful information before the first call
- [ ] Route qualified users to a cleanup consultation
- [ ] Create a path from cleanup to recurring bookkeeping
- [ ] Measure the complete acquisition and conversion funnel

### MVP Non-Goals

- [ ] Do not connect directly to QuickBooks
- [ ] Do not request document uploads
- [ ] Do not provide a guaranteed quote
- [ ] Do not provide tax, legal, audit, or assurance advice
- [ ] Do not use generative AI to determine the score
- [ ] Do not diagnose fraud or certify bookkeeping accuracy
- [ ] Do not replace professional review

### Possible Future Goals

- AI-written result explanations based on approved content
- Automated PDF or email action plan
- Appointment scheduling inside the result flow
- CRM lead scoring and follow-up automation
- QuickBooks read-only diagnostic integration
- Data-driven price bands calibrated from completed projects

---

## 6. MVP User Journey

```text
Search, blog, service page, advertisement, or referral
                         |
                         v
                Calculator landing page
                         |
                         v
                Starts the assessment
                         |
                         v
               Answers 7–9 questions
                         |
                         v
          Receives free basic score and category
                         |
                         v
       Provides contact details for full action plan
                         |
                         v
       Lead saved, attributed, and team notified
                         |
                         v
         Requests or books a cleanup consultation
                         |
                         v
               Professional file review
                         |
                         v
          Cleanup project and possible monthly work
```

### User Experience Requirements

- One primary question per mobile screen
- Visible progress indicator
- Back and Continue controls
- Answers preserved when navigating backward
- Plain-language questions
- No accounting knowledge required
- Basic result visible without lead submission
- Contact form appears after the basic result
- Clear distinction between preliminary assessment and professional review

---

## 7. Proposed Assessment Questions

All options must be reviewed by the IntegraFin service owner before development.

### Q1. Accounting System

**Question:** What do you currently use to track your business finances?

Options:

- QuickBooks Online
- QuickBooks Desktop
- Xero
- Wave
- Spreadsheet
- No accounting system
- Other or not sure

### Q2. Months Behind

**Question:** How far behind are your books?

Options:

- Current or less than one month
- 1–3 months
- 4–6 months
- 7–12 months
- 13–24 months
- More than 24 months
- Not sure

### Q3. Monthly Transaction Volume

**Question:** Approximately how many business transactions occur each month?

Options:

- Fewer than 50
- 50–100
- 101–250
- 251–500
- More than 500
- Not sure

Helper text: Include deposits, purchases, transfers, fees, and payments across business accounts.

### Q4. Financial Accounts

**Question:** How many bank, credit-card, loan, or payment-platform accounts are involved?

Options:

- 1–2
- 3–4
- 5–7
- 8 or more
- Not sure

### Q5. Reconciliation Status

**Question:** When were all business accounts last reconciled?

Options:

- Last month
- Within the last 3 months
- Within the last 6 months
- More than 6 months ago
- They have never been reconciled
- Not sure what reconciliation means

### Q6. Payroll

**Question:** Does the business have employees or run payroll?

Options:

- No
- Yes, through a payroll provider
- Yes, but payroll records may be incomplete
- Not sure

### Q7. Personal and Business Activity

**Question:** Are personal and business transactions mixed together?

Options:

- No
- Occasionally
- Frequently
- Not sure

### Q8. Additional Complexity

**Question:** Which of these apply to the business?

Allow multiple selections:

- Inventory
- Sales-tax collection
- Business loans
- Multiple payment processors
- Multiple entities
- Subcontractors or 1099 payments
- None of these
- Not sure

### Q9. Deadline

**Question:** Is there an important deadline?

Options:

- Within 14 days
- Within 30 days
- Within 60 days
- More than 60 days away
- No known deadline

Optional deadline type:

- Tax filing
- IRS or state notice
- Payroll or sales-tax matter
- Loan or financing request
- Business sale or investor request
- Internal reporting need
- Other

---

## 8. Scoring Model

### Scoring Policy

The initial scoring model is a hypothesis. It must be tested against anonymized historical projects before launch and recalibrated after real usage.

### Proposed Complexity Weights

| Factor | Low | Medium | High | Maximum points |
|---|---:|---:|---:|---:|
| Months behind | 0 | 10–20 | 25–30 | 30 |
| Monthly transactions | 0–3 | 6–10 | 15 | 15 |
| Financial accounts | 0–3 | 6 | 10 | 10 |
| Reconciliation status | 0–5 | 10–15 | 20 | 20 |
| Payroll complexity | 0 | 4 | 8 | 8 |
| Mixed personal activity | 0 | 5 | 10 | 10 |
| Additional complexity | 0–4 | 5–8 | 10 | 10 |
| Multiple entities | 0 | 5 | 10 | 10 |

The raw points may exceed 100. Normalize the final complexity score to a 0–100 scale.

### Proposed Result Categories

| Score | Internal key | Customer-facing result |
|---:|---|---|
| 0–24 | `reasonably_current` | Books appear reasonably current |
| 25–44 | `light_catch_up` | Light catch-up may be required |
| 45–69 | `moderate_cleanup` | Moderate cleanup is likely |
| 70–100 | `complex_cleanup` | Complex cleanup is likely |

### Urgency Model

Urgency must remain separate from complexity.

| Deadline | Urgency |
|---|---|
| Within 14 days | Critical |
| Within 30 days | High |
| Within 60 days | Medium |
| More than 60 days | Normal |
| No deadline | Normal |

### Scoring Calibration Tasks

- [ ] Select 10–20 anonymized previous bookkeeping engagements
- [ ] Enter their known starting conditions into the proposed calculator
- [ ] Compare predicted category with actual project complexity
- [ ] Review false-high and false-low results
- [ ] Adjust weights and thresholds
- [ ] Document scoring version as `1.0`
- [ ] Obtain service-owner approval

---

## 9. Result Experience

### Free Basic Result

Display before lead capture:

- Score out of 100
- Result category
- Urgency level
- Top three complexity factors
- Short explanation of what the category means
- Clear disclaimer

Example:

> **Your bookkeeping health score is 46/100**  
> Moderate cleanup is likely.
>
> Your primary complexity factors are eight unreconciled months, four financial accounts, and active payroll.

### Full Action Plan

Available after contact submission:

- Detailed explanation of identified issues
- Recommended sequence of next steps
- Personalized document checklist
- Likely service route
- Questions to prepare for the consultation
- Link to request or book a professional review

### Possible Recommendations

- Books review only
- Light catch-up bookkeeping
- Bookkeeping cleanup
- QuickBooks cleanup or setup
- Cleanup plus business tax preparation
- Cleanup plus payroll-record review
- Monthly bookkeeping after cleanup

### Pricing Policy

For MVP:

- Show scope category, not an exact price
- Do not promise a fixed timeline
- State that scope and pricing require record review

Future price ranges may be introduced only after comparing calculator predictions with completed project data.

---

## 10. Lead Capture Requirements

### Lead Form Fields

Required:

- Full name
- Email or phone
- Consent to be contacted

Optional:

- Business name
- Phone when email is provided
- Preferred contact method

Automatically populated:

- Service: `Bookkeeping Cleanup`
- Source: `bookkeeping-cleanup-calculator`
- Calculator version
- Score
- Result category
- Urgency
- Structured assessment answers
- Marketing attribution

### Proposed CTA Copy

Primary result CTA:

> **Email My Complete Cleanup Action Plan**

Consultation CTA:

> **Request My Books Review**

Alternative CTA to test:

> **Talk to IntegraFin About Fixing My Books**

### Submission Behavior

- [ ] Validate on both client and server
- [ ] Save one structured lead record
- [ ] Preserve first-touch and current-page attribution
- [ ] Send a team notification
- [ ] Send a customer confirmation when email is supplied
- [ ] Show a confirmation state
- [ ] Offer phone, WhatsApp, or scheduling as the next step
- [ ] Prevent accidental duplicate submissions
- [ ] Apply existing lead rate limits

---

## 11. Data Requirements

### Proposed Lead Assessment Object

```ts
bookkeepingAssessment: {
  calculatorVersion: "1.0",
  score: 46,
  category: "moderate_cleanup",
  urgency: "high",
  software: "quickbooks_online",
  monthsBehind: "7_12",
  monthlyTransactions: "101_250",
  financialAccounts: "3_4",
  reconciliationStatus: "more_than_6_months",
  payrollStatus: "provider_records_available",
  mixedPersonalExpenses: "occasionally",
  complexities: ["sales_tax", "business_loans"],
  entityCount: "1",
  deadlineWindow: "within_30_days",
  deadlineType: "tax_filing",
  completedAt: "ISO-8601 timestamp"
}
```

### Data Rules

- Store structured values, not only a long message
- Include a scoring version for future recalculation and comparison
- Validate all accepted values on the server
- Do not store credentials, account numbers, tax IDs, or uploaded financial records
- Define how long calculator lead data will be retained
- Include calculator data in lead deletion and privacy workflows

### Admin Dashboard Summary

Display without opening the full lead:

- Score and category
- Urgency
- Months behind
- Software
- Transaction band
- Deadline
- Lead status
- Assigned follow-up date

---

## 12. Technical Plan

### Existing Capabilities to Reuse

The website already includes:

- Next.js and React
- TypeScript
- Tailwind CSS
- Zod validation
- MongoDB through Mongoose
- Lead submission server action
- Lead rate limiting
- Lead attribution
- Team notifications
- Customer confirmation emails
- Lead operations dashboard
- Analytics helpers

### Proposed File Structure

```text
src/app/bookkeeping-cleanup-calculator/
├── page.tsx
└── BookkeepingCleanupCalculatorClient.tsx

src/lib/
├── bookkeepingCleanupAssessment.ts
└── bookkeepingCleanupAssessment.test.ts
```

Existing areas expected to change:

```text
src/app/actions/leads.ts
src/models/ContactLead.ts
src/components/admin/LeadOperationsDashboard.tsx
src/lib/analytics.ts
src/app/sitemap.ts
src/data/internalLinking.ts
```

### Calculation Contract

```ts
calculateCleanupAssessment(answers) => {
  score,
  category,
  urgency,
  issues,
  checklist,
  recommendedService
}
```

### Technical Principles

- Keep scoring in a pure TypeScript module
- Keep approved result content separate from interface components
- Calculate on the client for immediate feedback
- Recalculate and validate on the server before storing
- Never trust a score sent directly by the browser
- Version every scoring change
- Make all result states deterministic and testable

---

## 13. Analytics Plan

### Required Events

| Event | Trigger |
|---|---|
| `cleanup_calculator_view` | Calculator page viewed |
| `cleanup_calculator_start` | First answer or Start selected |
| `cleanup_calculator_step` | Each question completed |
| `cleanup_calculator_complete` | Final question completed |
| `cleanup_result_view` | Basic result displayed |
| `cleanup_lead_form_start` | User interacts with lead form |
| `cleanup_lead_submit` | Lead saved successfully |
| `cleanup_consultation_click` | Consultation CTA selected |

### Safe Analytics Parameters

- Calculator version
- Question step number
- Result category
- Score band, not necessarily exact score
- Months-behind band
- Software category
- Deadline urgency
- Traffic attribution
- Device type

Do not send names, emails, phone numbers, company names, or sensitive answers to analytics platforms.

### Funnel Dashboard

```text
Page views
  -> Starts
    -> Completed assessments
      -> Result views
        -> Lead submissions
          -> Appointments
            -> Qualified leads
              -> Proposals
                -> Clients won
```

### Initial Internal Targets

These are product hypotheses, not industry guarantees. Review them after the first 30 days.

- Assessment completion rate: at least 55%
- Result-to-lead rate: at least 10%
- Qualified rate among calculator leads: at least 40%
- Zero sensitive-data collection incidents
- Zero scoring/server mismatch defects

---

## 14. SEO and Distribution Plan

### Proposed URL

`/bookkeeping-cleanup-calculator`

### Primary Search Theme

- Bookkeeping cleanup calculator
- Bookkeeping cleanup cost estimator
- QuickBooks cleanup assessment
- Catch-up bookkeeping calculator
- How much work is required to fix bookkeeping?

### Page Requirements

- Clear title and meta description
- One customer-focused H1
- Helpful introductory content
- Calculator visible early on the page
- Explanation of cleanup versus catch-up
- Factors that affect cleanup scope
- FAQ section
- Appropriate WebPage, SoftwareApplication, Breadcrumb, and FAQ schema where valid
- Honest limitations and professional-review language

### Internal Links

Add links from:

- Homepage tools or service section
- Bookkeeping cleanup page
- QuickBooks bookkeeping page
- Small-business bookkeeping page
- Contractor bookkeeping page
- Pricing page
- Relevant blog posts
- Footer or tools navigation if justified

### Launch Distribution

- Google Business Profile post
- Relevant blog content
- Email signature link
- Consultation follow-up emails
- Social posts for local small-business audiences
- Partner referrals
- Paid-search test only after organic funnel behavior is understood

---

## 15. Trust, Privacy, and Disclaimer

### Proposed Disclaimer

> This assessment provides a preliminary scope based only on the information entered. It is not a quote, audit, assurance service, tax opinion, legal opinion, or guarantee. Final scope, timing, and pricing require review of the accounting records. Tax preparation, filings, notices, payroll corrections, and other services may require separate engagements.

### Sensitive-Information Warning

> Do not enter Social Security numbers, tax identification numbers, bank details, passwords, tax returns, or other confidential financial records in this calculator.

### Required Review

- [ ] Bookkeeping service-owner review
- [ ] Privacy-policy review
- [ ] Terms/disclaimer review
- [ ] Marketing-claim review
- [ ] Accessibility review
- [ ] Analytics privacy review

---

## 16. Accessibility Requirements

- Full keyboard navigation
- Visible focus states
- Proper labels and field descriptions
- Error messages connected to the relevant fields
- Progress communicated without relying only on color
- Minimum readable text size on mobile
- Sufficient color contrast
- Motion reduced when the user's device requests it
- Result score explained in text, not only through a gauge
- Screen-reader announcement when a result is generated

---

## 17. MVP Acceptance Criteria

### Calculator

- [ ] Visitor can complete the assessment without creating an account
- [ ] Visitor can go backward without losing answers
- [ ] Progress is clearly visible
- [ ] Result is calculated consistently from approved rules
- [ ] Basic result is visible before contact submission
- [ ] Deadline urgency is separate from complexity
- [ ] Result identifies the factors that influenced the score

### Lead Capture

- [ ] Email or phone is required, but not both
- [ ] Lead is stored with structured assessment data
- [ ] Lead source is `bookkeeping-cleanup-calculator`
- [ ] Service is set to `Bookkeeping Cleanup`
- [ ] Attribution is preserved
- [ ] Team notification includes useful qualification details
- [ ] Customer confirmation does not contain sensitive data
- [ ] Successful submission is tracked exactly once

### Quality

- [ ] Works on common mobile and desktop sizes
- [ ] Keyboard and screen-reader flow is usable
- [ ] Boundary scores are covered by automated tests
- [ ] Invalid server payloads are rejected
- [ ] Analytics contains no personally identifiable information
- [ ] Production build and lint checks pass
- [ ] No confidential document or credential input exists

### Content

- [ ] All questions are approved by the service owner
- [ ] All result wording is approved
- [ ] Disclaimer is visible near the result and lead form
- [ ] No guaranteed price, savings, deadline, or outcome is stated

---

## 18. QA Test Matrix

### Scoring Tests

- [ ] Lowest possible complexity
- [ ] Highest possible complexity
- [ ] Score boundary: 24/25
- [ ] Score boundary: 44/45
- [ ] Score boundary: 69/70
- [ ] Urgent but low-complexity scenario
- [ ] Non-urgent but complex scenario
- [ ] Unknown answer combinations
- [ ] Multiple selected complexity factors
- [ ] Client and server return identical results

### Form Tests

- [ ] Email only
- [ ] Phone only
- [ ] Both email and phone
- [ ] Neither email nor phone
- [ ] Invalid email
- [ ] Invalid phone
- [ ] Duplicate click or slow network
- [ ] Rate-limited submission
- [ ] Notification failure with successful database save
- [ ] Confirmation email not applicable when no email supplied

### Experience Tests

- [ ] Small mobile screen
- [ ] Tablet
- [ ] Desktop
- [ ] Keyboard only
- [ ] Screen reader
- [ ] JavaScript error fallback
- [ ] Refresh during assessment
- [ ] Back navigation
- [ ] Reduced-motion preference

---

## 19. Delivery Roadmap

### Phase 0 — Discovery and Approval

Target: 3–5 working days

- [ ] Confirm target customer
- [ ] Confirm business objective
- [ ] Approve working product name
- [ ] Approve questions and answer options
- [ ] Calibrate scoring against historical cases
- [ ] Approve result categories
- [ ] Approve disclaimers
- [ ] Define the consultation handoff
- [ ] Confirm product owner and service owner

**Exit criterion:** Signed-off MVP specification.

### Phase 1 — UX and Content

Target: 3–5 working days

- [ ] Create mobile wireframes
- [ ] Create desktop wireframes
- [ ] Write question helper text
- [ ] Write result content for every category
- [ ] Write checklists for every result pattern
- [ ] Review lead form and consent language
- [ ] Conduct five informal usability tests

**Exit criterion:** Approved, testable user flow and content.

### Phase 2 — Development

Target: 5–8 working days

- [ ] Build scoring module
- [ ] Add automated scoring tests
- [ ] Build calculator page and steps
- [ ] Build result experience
- [ ] Extend lead validation and database model
- [ ] Extend admin dashboard
- [ ] Connect notifications and confirmation
- [ ] Add analytics events
- [ ] Add SEO metadata and structured data
- [ ] Add internal links

**Exit criterion:** Feature complete in a test environment.

### Phase 3 — QA and Soft Launch

Target: 3–5 working days

- [ ] Run QA matrix
- [ ] Validate analytics
- [ ] Validate notifications
- [ ] Validate dashboard data
- [ ] Review accessibility
- [ ] Review copy and disclaimers
- [ ] Release to a limited audience
- [ ] Collect qualitative feedback

**Exit criterion:** No critical defects and approved for public launch.

### Phase 4 — Public Launch and Optimization

Target: First 30 days

- [ ] Publish and add internal links
- [ ] Submit URL for indexing
- [ ] Announce through owned channels
- [ ] Review funnel weekly
- [ ] Review lead quality with the service team
- [ ] Compare calculated categories with actual assessments
- [ ] Fix the largest drop-off point
- [ ] Test one CTA variation
- [ ] Produce the first 30-day product report

**Exit criterion:** Decision to scale, iterate, reposition, or stop.

---

## 20. Prioritized Product Backlog

### Must Have for MVP

- [ ] Landing page
- [ ] Mobile step-by-step questionnaire
- [ ] Progress indicator
- [ ] Deterministic scoring
- [ ] Four result categories
- [ ] Urgency calculation
- [ ] Basic result before lead gate
- [ ] Lead form
- [ ] Structured database storage
- [ ] Team notification
- [ ] Admin dashboard visibility
- [ ] Funnel analytics
- [ ] Disclaimer and privacy warning
- [ ] Automated scoring tests

### Should Have

- [ ] Personalized preparation checklist
- [ ] Result email
- [ ] Booking link after submission
- [ ] Save progress in the browser
- [ ] Result-specific CTA copy
- [ ] Print-friendly result
- [ ] FAQ content and schema

### Could Have

- [ ] Downloadable PDF action plan
- [ ] CTA experiment framework
- [ ] Spanish-language version
- [ ] Industry-specific result guidance
- [ ] Automatic follow-up sequence
- [ ] Internal lead-priority score

### Not Now

- [ ] Direct QuickBooks connection
- [ ] Bank connection
- [ ] Financial-document upload
- [ ] AI-generated scoring
- [ ] Guaranteed pricing
- [ ] Automated accounting corrections

---

## 21. AI Product Strategy

### MVP: No Generative AI Required

The MVP should use approved rules and content. This reduces risk, improves consistency, and allows exact testing.

### AI Phase 2

Once the funnel and scoring are validated, AI may:

- Convert structured results into a friendlier explanation
- Personalize an approved preparation checklist
- Summarize the assessment for the service team
- Draft a lead follow-up email
- Suggest discovery-call questions

### AI Guardrails

- AI cannot change the approved score or category
- AI cannot produce an exact quote
- AI cannot claim records were reviewed
- AI cannot give tax or legal conclusions
- AI output must be grounded in approved content blocks
- AI output must have a deterministic fallback
- Do not send sensitive customer data to a model without an approved data policy
- Log prompt and content versions for quality review

### AI Success Test

Only keep AI-generated explanations if they improve at least one of the following without increasing risk:

- Result-to-lead conversion
- Consultation booking rate
- User-reported clarity
- Team preparation time
- Lead qualification accuracy

---

## 22. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Result feels like a guaranteed quote | Trust and scope disputes | Use complexity categories and explicit assumptions |
| Scoring is inaccurate | Low-quality leads or customer confusion | Calibrate against historical projects and version rules |
| Too many questions | High abandonment | Keep MVP to 7–9 questions and measure step drop-off |
| Entire result is gated | Reduced trust and completion | Show useful basic result before lead capture |
| Sensitive information is entered | Privacy and security exposure | Use fixed options and visible warnings; no uploads |
| High-urgency leads expect immediate help | Service expectation mismatch | State response process and do not imply deadlines pause |
| Team ignores calculator data | Lost operational value | Put score and urgency directly in notifications/dashboard |
| AI invents advice | Compliance and trust risk | Keep AI out of scoring and ground future explanations |
| Price range is poorly calibrated | Commercial loss or disputes | Delay price bands until real project data is available |

---

## 23. Open Product Decisions

Resolve these before development begins:

- [!] Final customer-facing product name
- [!] Whether the basic result shows an exact score or only a category
- [!] Whether phone is optional when email is supplied
- [!] Whether the full action plan appears on screen, by email, or both
- [!] Whether consultation booking is embedded or linked
- [!] Whether an initial professional books review is free or paid
- [!] Expected response time that operations can consistently meet
- [!] Historical projects available for scoring calibration
- [!] Data-retention period for calculator leads
- [!] Product owner with final decision authority

---

## 24. Decision Log

| Date | Decision | Owner | Reason | Impact |
|---|---|---|---|---|
| 2026-08-02 | Start with a rules-based bookkeeping cleanup assessment | Product | Faster, safer, and easier to validate than AI scoring | AI explanations deferred |
| 2026-08-02 | Show a basic result before lead capture | Product | Build trust and provide immediate value | Detailed plan becomes the lead incentive |
| 2026-08-02 | Do not provide an exact MVP price | Product | Scope cannot be confirmed without reviewing the books | Use complexity and urgency categories |

Add new decisions above this line or append them chronologically.

---

## 25. Research and Interview Notes

### Customer Interview Questions

1. What made you realize your bookkeeping needed help?
2. What did you find most confusing before contacting an accountant?
3. How did you estimate how far behind the books were?
4. What information were you comfortable sharing online?
5. Would a health score have helped you take action sooner?
6. Which result would be most useful: severity, timeline, checklist, or cost range?
7. What would make you distrust an online bookkeeping calculator?
8. What would convince you to request a professional review?

### Service-Team Interview Questions

1. Which intake facts best predict cleanup effort?
2. Which answers frequently turn out to be inaccurate?
3. What makes a lead unsuitable?
4. Which situations require urgent escalation?
5. Which services are normally separate from cleanup?
6. What information makes the first call more productive?
7. Which cleanup clients are most likely to become monthly clients?

### Notes

Record research findings here:

- _No interviews recorded yet._

---

## 26. Weekly Product Status

### Current Product Status

**Week of:** 2026-08-03  
**Phase:** Discovery and Approval  
**Overall status:** Not started  

#### Completed This Week

- Product concept selected
- Initial PM working plan created

#### Planned Next

- [ ] Assign product owner and bookkeeping service owner
- [ ] Review the nine proposed questions
- [ ] Collect 10–20 anonymized historical cleanup examples
- [ ] Decide whether the professional review is free or paid
- [ ] Approve customer-facing product name

#### Blockers

- Historical project data for scoring calibration has not been selected
- Final operational handoff and response expectation are not defined

#### Key Metric

- No production baseline yet

---

## 27. Post-Launch Weekly Review Template

Copy this section for each weekly review.

### Week of YYYY-MM-DD

#### Funnel

| Metric | This week | Previous week | Change |
|---|---:|---:|---:|
| Calculator page views |  |  |  |
| Assessment starts |  |  |  |
| Completed assessments |  |  |  |
| Lead submissions |  |  |  |
| Consultation clicks |  |  |  |
| Appointments |  |  |  |
| Qualified leads |  |  |  |
| Clients won |  |  |  |
| Revenue won |  |  |  |

#### Quality Review

- Most common result category:
- Highest-abandonment question:
- Calculated versus actual complexity:
- Common customer confusion:
- Common unqualified-lead reason:
- Service-team feedback:

#### Decisions and Experiments

- Change made:
- Hypothesis:
- Primary metric:
- Result:
- Decision:

---

## 28. Launch Readiness Checklist

### Product

- [ ] Questions approved
- [ ] Scoring calibrated
- [ ] Result content approved
- [ ] Consultation handoff confirmed
- [ ] Product owner approves launch

### Engineering

- [ ] Calculator tests pass
- [ ] Server validation passes
- [ ] Lead is stored correctly
- [ ] Dashboard displays assessment summary
- [ ] Notifications work
- [ ] Analytics events work
- [ ] Lint passes
- [ ] Production build passes

### Trust and Compliance

- [ ] Disclaimer approved
- [ ] Privacy warning displayed
- [ ] No sensitive fields exist
- [ ] Analytics contains no personal information
- [ ] Accessibility review completed

### Marketing

- [ ] Metadata approved
- [ ] Internal links added
- [ ] Sitemap updated
- [ ] Launch announcement prepared
- [ ] Supporting content identified

### Operations

- [ ] Lead owner assigned
- [ ] Response-time expectation confirmed
- [ ] Consultation script updated
- [ ] Lead-qualification rubric documented
- [ ] Cleanup-to-monthly offer documented

---

## 29. Immediate Next Actions

Complete these actions in order:

1. [ ] Assign the product owner and bookkeeping service owner.
2. [ ] Approve or revise the nine assessment questions.
3. [ ] Gather 10–20 anonymized historical cleanup engagements.
4. [ ] Test and calibrate the scoring model.
5. [ ] Decide what the free result includes.
6. [ ] Decide whether the professional file review is free or paid.
7. [ ] Approve the disclaimer and sensitive-data warning.
8. [ ] Create mobile wireframes.
9. [ ] Conduct five short usability tests.
10. [ ] Convert the approved specification into engineering tasks.

Do not begin building a QuickBooks connection or generative-AI scoring system during the MVP.

