# Tax Calculator Views Growth — One-Day Implementation Runbook

**Execution date:** August 6, 2026  
**Workspace:** `C:\Users\Public\Downloads\integrafin_web`  
**Primary page:** `/tax-calculator`  
**Primary outcome:** Increase qualified organic entrances to the calculator by giving each high-intent calculator use case a focused, indexable entry page, then strengthen discovery, measurement, and internal linking.  
**Execution rule:** Complete the numbered sections in order. Do not skip a validation gate to save time.

## Current implementation status — August 6, 2026

Locally completed:

- [x] Baseline lint, TypeScript, and production build recorded and passing.
- [x] Meta client-navigation PageView tracking implemented without adding a second initial PageView.
- [x] Privacy-safe calculator `view_content` / Meta `ViewContent` tracking implemented.
- [x] One shared calculation source supports the existing and focused calculator modes.
- [x] Quarterly estimated tax, self-employment, 1099, and capital-gains routes created.
- [x] Unique metadata, H1s, canonicals, visible FAQs, examples, limitations, and structured data added.
- [x] Homepage calculator module, service/blog/guide links, HTML sitemap, and XML sitemap updated.
- [x] Production build generates all five calculator routes as static pages.
- [x] Local HTTP checks confirm status 200, one H1, self-canonical, index/follow, matching FAQ schema, SoftwareApplication schema, and one XML sitemap entry per calculator URL.
- [x] Full internal-link crawl checked 79 sitemap routes with zero broken links, zero zero-inbound pages, zero deep routes, and zero routes outside the sitemap.

Still requires an external production session:

- [ ] Visually inspect mobile and desktop pages in a connected browser; browser control was unavailable during local execution.
- [ ] Verify Meta Test Events and GA4 DebugView in the production analytics properties.
- [ ] Deploy through the existing production workflow after explicit production approval.
- [ ] Run live URL checks after deployment.
- [ ] Request indexing and confirm the sitemap in Google Search Console.

---

## 1. Read This Before Making Changes

1. Read `cal.md` completely before editing calculator files.
2. Preserve all unrelated user changes in the working tree.
3. Do not change any tax formula, bracket, deduction, credit, wage base, threshold, or due date unless it is reverified against a primary IRS or SSA source.
4. Use the words **estimate**, **planning**, **may**, and **generally** where appropriate.
5. Never describe the calculator as official IRS software, IRS-certified, guaranteed, exact, or a replacement for a filed return.
6. Keep exclusions visible: state and local taxes, AMT, NIIT where applicable, QBI, EITC, refundable-credit limits, penalties, special capital-gain rates, and unimplemented phaseouts.
7. Do not create thin pages that only exchange one keyword for another. Every focused calculator URL must have unique purpose, copy, worked example, FAQ, metadata, and internal links.
8. Reuse one calculation engine. Do not copy tax formulas into multiple route files.

---

## 2. Definition of Done for Today

The task is complete only when all applicable boxes below are checked.

### Required release scope

- [ ] Baseline lint, typecheck, and production build results are recorded.
- [ ] Meta Pixel records a `PageView` on direct loads and client-side route changes without double-counting the initial load.
- [ ] Calculator landing pages record a safe `view_content` event with `calculator_name` and `tax_year` only; no financial inputs or results are sent.
- [ ] The calculator UI supports an explicit initial/focused mode without changing calculation formulas.
- [ ] `/quarterly-estimated-tax-calculator` exists and presents the relevant tool above the fold.
- [ ] `/self-employment-tax-calculator` exists and presents the self-employment tool above the fold.
- [ ] `/1099-tax-calculator` exists with distinct 1099/freelancer intent and is not a duplicate of the self-employment page.
- [ ] `/capital-gains-tax-calculator` exists and presents the capital-gains tool above the fold.
- [ ] `/tax-calculator` remains the broad federal calculator hub.
- [ ] The homepage links directly to the calculator hub and focused calculators.
- [ ] Contextual links are added from the most relevant existing articles and service pages.
- [ ] The XML sitemap and HTML sitemap include every new canonical URL.
- [ ] Each page has unique metadata, one H1, canonical, index/follow, visible FAQ content, and matching structured data.
- [ ] Keyboard, mobile, calculation, analytics, lint, typecheck, and production build QA pass.
- [ ] The deployed URLs return HTTP 200 and display the intended canonical/title/H1.
- [ ] Google Search Console indexing requests and measurement notes are completed manually after deployment.

### Stop-ship conditions

Do not deploy if any of these is true:

- A known tax fixture changes unexpectedly.
- A focused page shows the wrong calculator mode.
- A page has a canonical pointing to `/tax-calculator` instead of its own unique URL.
- Multiple pages have substantially identical visible copy.
- Calculator inputs, income values, results, email, phone, or other sensitive values appear in analytics payloads.
- Meta sends two initial `PageView` events for one direct page load.
- Lint, TypeScript, build, or representative mobile QA fails.
- A focused route returns anything other than HTTP 200.

---

## 3. Today’s Time Box and Work Order

| Block | Maximum time | Deliverable |
|---|---:|---|
| Baseline and safeguards | 30 minutes | Clean understanding of existing behavior and recorded baseline |
| Analytics measurement | 45 minutes | Reliable PageView and calculator landing view tracking |
| Reusable calculator architecture | 90 minutes | One engine that can open in a focused mode |
| Quarterly estimated tax page | 75 minutes | Highest-priority seasonal page live locally |
| Remaining focused pages | 120 minutes | Self-employment, 1099, and capital-gains pages |
| Homepage and internal links | 60 minutes | Strong crawl and user discovery paths |
| SEO/schema/sitemap | 45 minutes | Indexable and correctly described URLs |
| Full QA and production build | 75 minutes | Release candidate |
| Deploy and Search Console | 45 minutes | Live validation and indexing requests |

If time becomes constrained, finish and deploy blocks in this order:

1. Measurement.
2. Reusable architecture.
3. Quarterly estimated tax page.
4. Homepage and contextual internal links.
5. Self-employment page.
6. Capital-gains page.
7. 1099 page.

Do not publish unfinished or duplicate focused pages just to satisfy the route count.

---

## 4. Target Search Architecture

| URL | Primary intent | Initial tool mode | Distinct value required |
|---|---|---|---|
| `/tax-calculator` | 2025 refund and 2026 federal tax estimate | Federal | Broad hub covering all four tools |
| `/quarterly-estimated-tax-calculator` | 2026 quarterly estimated payments | Self-employment or dedicated quarterly mode | Remaining liability, withholding/payments, current deadlines, planning explanation |
| `/self-employment-tax-calculator` | 2026 Schedule SE and combined federal estimate | Self-employment | Net profit, W-2 wage coordination, SE tax components, deductible half |
| `/1099-tax-calculator` | Freelancer/contractor tax reserve from gross 1099 income | 1099-focused mode | Gross receipts, business expenses, net profit, estimated federal/SE tax, quarterly reserve |
| `/capital-gains-tax-calculator` | 2026 short- and long-term capital gains | Capital gains | Gain type, income stacking, 0%/15%/20% thresholds, exclusions |

### Cannibalization rules

- `/tax-calculator` owns the broad terms `tax calculator`, `federal tax calculator`, and `tax refund estimator`.
- `/quarterly-estimated-tax-calculator` owns quarterly and Form 1040-ES planning intent.
- `/self-employment-tax-calculator` owns Schedule SE and self-employment tax intent.
- `/1099-tax-calculator` owns gross 1099, contractor, freelancer, and tax set-aside intent.
- `/capital-gains-tax-calculator` owns short-term and long-term capital-gains estimate intent.
- Do not target the same primary keyword in two page titles or H1s.
- Cross-link related tools naturally; do not copy the same FAQ set between pages.

---

## 5. Step 1 — Record the Baseline

Run these commands before editing:

```powershell
git -c safe.directory=C:/Users/Public/Downloads/integrafin_web status --short --branch
npm run lint
npx tsc --noEmit
npm run build
```

Record:

- [ ] Existing modified and untracked files.
- [ ] Lint status.
- [ ] TypeScript status.
- [ ] Build status.
- [ ] Existing warnings that are unrelated to this task.
- [ ] `/tax-calculator` desktop behavior.
- [ ] `/tax-calculator` mobile behavior.
- [ ] Federal calculation fixture results.
- [ ] Self-employment calculation fixture results.
- [ ] Capital-gains calculation fixture results.

Suggested smoke fixtures to record before and after refactoring:

| Calculator | Inputs | What must remain stable |
|---|---|---|
| Federal | 2026, Single, $75,000 income, standard deduction, $8,000 withheld | Taxable income, tax, refund/balance label |
| Self-employment | 2026, Single, $80,000 net profit, $0 W-2 wages | SE tax, income tax, total, deductible half, quarterly estimate |
| Capital gains | 2026, Single, $75,000 ordinary income, $0 short-term, $20,000 long-term | Ordinary tax, long-term gain tax, total, displayed rate |

Do not hard-code expected fixture numbers from memory. Capture current results, then independently verify tax constants before treating them as approved expectations.

---

## 6. Step 2 — Fix View Measurement Before Growing Traffic

### Files

- `src/app/layout.tsx`
- `src/components/AnalyticsTracker.tsx`
- `src/lib/analytics.ts`
- Optional new component: `src/components/CalculatorPageAnalytics.tsx`

### Meta PageView requirement

The root layout currently sends the initial Meta `PageView`, but Next.js client-side navigation does not remount the root layout. Implement route-change tracking without double-counting the first load.

Recommended behavior:

1. Keep the existing initial Meta `PageView` in `src/app/layout.tsx`.
2. In `AnalyticsTracker`, keep a ref containing the previous pathname.
3. On the first effect execution, store the pathname and do not send an additional Meta PageView.
4. On a later pathname change, send `window.fbq?.("track", "PageView")` exactly once.
5. Do not include query parameters or form values in the Meta call.
6. Test a direct load and an internal `Link` navigation separately.

### GA4 requirement

Do not assume GA4 is missing route views and then create duplicates.

1. Check GA4 DebugView or browser network requests for direct and client-side navigation.
2. If the current GA configuration already records history-based page views, do not add a second manual `page_view`.
3. If it does not, centralize manual GA page views and set the initial configuration appropriately so the first load is not counted twice.
4. Keep page location/title/path only. Never send calculator inputs or results.

### Calculator landing view event

Add one safe event when a calculator landing page becomes visible:

```text
event: view_content
calculator_name: federal_tax | quarterly_estimated_tax | self_employment_tax | 1099_tax | capital_gains_tax
tax_year: 2026
landing_page: current pathname
page_type: calculator
```

Use the existing analytics safety layer. Update `getPageType` so all five calculator URLs return `calculator`.

### Analytics acceptance tests

- [ ] Direct `/tax-calculator` load sends one Meta PageView.
- [ ] Homepage to `/tax-calculator` client navigation sends one additional Meta PageView.
- [ ] Calculator hub to a focused calculator route sends one additional Meta PageView.
- [ ] Each focused page sends one `view_content` event per page view.
- [ ] Completing a calculator still sends `calculator_complete` once.
- [ ] No income, deduction, withholding, result, email, phone, or free text is sent.
- [ ] Browser back/forward navigation produces one PageView per actual route change.

---

## 7. Step 3 — Refactor One Reusable Calculator Engine

### Goal

Focused pages must reuse the existing calculation functions and UI. Route files should supply page metadata/content and an initial calculator mode, not copied tax logic.

### Recommended file structure

```text
src/app/tax-calculator/
  page.tsx
  TaxCalculatorClient.tsx
  calculatorTypes.ts              # optional
  calculatorConfig.ts             # optional shared labels/sources
src/components/tax-calculator/
  TaxCalculatorWorkspace.tsx      # shared year selector, tabs, and tool rendering
  CalculatorLandingLayout.tsx     # focused page presentation
  CalculatorRelatedTools.tsx
  CalculatorSourceBlock.tsx
```

Minimize file movement if it creates unnecessary risk. The required architecture is the behavior, not the exact filenames.

### Component contract

The shared workspace should accept a typed configuration similar to:

```ts
type CalculatorMode =
  | "federal"
  | "quarterly"
  | "selfEmployment"
  | "1099"
  | "capitalGains"
  | "comparison";

type TaxCalculatorWorkspaceProps = {
  initialMode: CalculatorMode;
  initialTaxYear?: "2025" | "2026";
  showAllTabs?: boolean;
  analyticsName: string;
};
```

Requirements:

- [ ] `/tax-calculator` uses `initialMode="federal"` and `showAllTabs=true`.
- [ ] Focused pages use the correct `initialMode`.
- [ ] A focused page may show related-tool links without forcing every tab into the primary UI.
- [ ] State resets intentionally when the selected tax year changes.
- [ ] Existing element labels, error behavior, results, and disclaimer remain accessible.
- [ ] Calculation functions remain single-source.
- [ ] Calculation result events use a distinct safe `calculator_name`.
- [ ] No route page imports or copies bracket arrays or tax functions.

### Refactor validation gate

Before creating focused pages:

- [ ] Run the three smoke fixtures from Step 1.
- [ ] Compare every recorded output with the baseline.
- [ ] Run `npm run lint`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Stop and fix regressions before proceeding.

---

## 8. Step 4 — Build `/quarterly-estimated-tax-calculator` First

### Why first

This page has immediate seasonal relevance before the September 15, 2026 estimated-tax deadline and aligns with the existing article about a missed June 15 payment.

### Files

- `src/app/quarterly-estimated-tax-calculator/page.tsx`
- Shared calculator component/config files from Step 3
- `src/app/sitemap.ts`
- `src/app/site-map/page.tsx`

### Metadata specification

- **Title:** `2026 Quarterly Estimated Tax Calculator | IntegraFin`
- **H1:** `2026 Quarterly Estimated Tax Calculator`
- **Description:** Explain that freelancers, contractors, business owners, and taxpayers with income not covered by withholding can estimate federal quarterly payments using 2026 planning inputs.
- **Canonical:** `https://integrafin.tax/quarterly-estimated-tax-calculator`
- **Robots:** `index, follow`
- Do not put `Katy` or `Texas` in the national page title.

### Above-the-fold requirements

- [ ] H1 and one short scope paragraph.
- [ ] `2026 planning` is the default.
- [ ] Calculator inputs begin within the first screen on common laptop and mobile sizes.
- [ ] No account required message.
- [ ] Federal-only limitation visible.
- [ ] Current applicable due dates visible near the result, not presented as personalized filing deadlines.

### Required calculator behavior

At minimum, support:

- Filing status.
- Expected annual income or net self-employment profit.
- Optional W-2 wages where relevant.
- Federal withholding.
- Estimated tax payments already made.
- Estimated annual federal income tax.
- Estimated self-employment tax where relevant.
- Remaining estimated liability.
- A clearly labeled planning amount for remaining installments.

Do not simply show annual tax divided by four when prior withholding/payments are entered. Clearly document the formula used. Do not claim the result satisfies the IRS safe-harbor rules unless those rules and inputs are explicitly implemented and verified.

### Unique supporting content

Include:

1. Who may need quarterly estimated payments.
2. 2026 payment-date table.
3. How the estimate is calculated.
4. Withholding versus estimated payments.
5. Safe-harbor overview with conservative wording and source links.
6. What the tool excludes.
7. Worked example for a freelancer or small-business owner.
8. Five to eight page-specific FAQs.
9. Related links to the 1099 and self-employment calculators.

### Primary sources to recheck

- IRS Form 1040-ES and instructions: `https://www.irs.gov/forms-pubs/about-form-1040-es`
- IRS Publication 505: `https://www.irs.gov/forms-pubs/about-publication-505`
- IRS estimated taxes: `https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes`

### Acceptance tests

- [ ] Direct URL returns 200.
- [ ] Correct title, H1, description, and self-canonical.
- [ ] Calculator is visible without selecting another tab.
- [ ] Payment fields affect remaining liability correctly.
- [ ] Results never go below zero without being labeled as overpayment/refund estimate.
- [ ] Due-date language includes disaster/individual-circumstance limitation.
- [ ] No unimplemented safe-harbor promise.
- [ ] Mobile inputs and result cards fit without horizontal scrolling.

---

## 9. Step 5 — Build `/self-employment-tax-calculator`

### Metadata specification

- **Title:** `2026 Self-Employment Tax Calculator | Schedule SE Estimate`
- **H1:** `2026 Self-Employment Tax Calculator`
- **Canonical:** `https://integrafin.tax/self-employment-tax-calculator`
- Primary intent: Schedule SE, Social Security, Medicare, deductible half, and combined federal planning.

### Required distinct content

- Explain net profit versus gross business revenue.
- Explain the 92.35% net-earnings adjustment.
- Explain Social Security and Medicare components.
- Explain coordination with the taxpayer's own W-2 wages.
- Explain the deductible employer-equivalent portion without calling it a dollar-for-dollar credit.
- Display the $400 Schedule SE threshold behavior already represented by the tool.
- Include a worked example using net self-employment profit.
- Include self-employment-specific FAQs.

### Sources

- IRS self-employment tax: `https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes`
- IRS Schedule SE: `https://www.irs.gov/forms-pubs/about-schedule-se-form-1040`
- SSA contribution and benefit base: `https://www.ssa.gov/oact/cola/cbb.html`

### Acceptance tests

- [ ] Self-employment mode appears immediately.
- [ ] `$0` SE tax behavior below the applicable threshold is explained.
- [ ] W-2 wage coordination still works.
- [ ] Additional Medicare Tax and deduction limitations remain accurately described.
- [ ] Page does not duplicate the 1099 page's gross-receipts workflow.

---

## 10. Step 6 — Build `/1099-tax-calculator`

### Metadata specification

- **Title:** `2026 1099 Tax Calculator for Freelancers & Contractors`
- **H1:** `2026 1099 Tax Calculator`
- **Canonical:** `https://integrafin.tax/1099-tax-calculator`
- Primary intent: how much a freelancer or contractor may need to set aside from gross 1099 income.

### Required distinction from self-employment page

The 1099 page starts from business cash flow; the self-employment page starts from net profit.

Required inputs or clearly connected calculations:

- Gross 1099/contract income.
- Ordinary and necessary business expenses.
- Calculated net profit.
- Filing status.
- Optional W-2 wages.
- Optional federal withholding/payments.
- Estimated income tax.
- Estimated self-employment tax.
- Combined estimate.
- Suggested quarterly planning amount or tax reserve percentage, carefully labeled.

Do not imply all amounts shown on Forms 1099 are automatically taxable profit. Do not provide a state estimate unless a state calculation is actually implemented.

### Unique content

- 1099-NEC versus 1099-K context at a high level.
- Gross receipts versus deductible expenses.
- Why a 1099 worker may owe both income and self-employment tax.
- Recordkeeping checklist.
- Worked example showing gross income, expenses, net profit, and estimated tax.
- FAQs for contractors, freelancers, creators, and side-gig workers.

### Acceptance tests

- [ ] Changing expenses changes net profit and downstream estimates.
- [ ] Expenses cannot produce a misleading negative taxable-profit result.
- [ ] Page clearly distinguishes gross receipts from net profit.
- [ ] No claim that every expense is deductible.
- [ ] The page is materially different from `/self-employment-tax-calculator`.

---

## 11. Step 7 — Build `/capital-gains-tax-calculator`

### Metadata specification

- **Title:** `2026 Capital Gains Tax Calculator | Short & Long Term`
- **H1:** `2026 Capital Gains Tax Calculator`
- **Canonical:** `https://integrafin.tax/capital-gains-tax-calculator`
- Primary intent: short-term and long-term federal capital-gains estimates.

### Required content

- Explain short-term versus long-term holding periods.
- Explain that short-term gains are estimated as ordinary income.
- Explain how long-term gains stack above ordinary taxable income.
- Show selected-year 0%, 15%, and 20% threshold context.
- State clearly that NIIT, collectibles, qualified small-business stock, depreciation recapture, state taxes, carryovers, and other special rules are excluded unless implemented.
- Include one worked example.
- Include page-specific FAQs.

### Source

- IRS Topic 409: `https://www.irs.gov/taxtopics/tc409`

### Acceptance tests

- [ ] Capital-gains mode appears immediately.
- [ ] Short-term gains affect ordinary-income tax.
- [ ] Long-term gains use selected-year capital-gain brackets.
- [ ] Ordinary income affects capital-gain bracket stacking.
- [ ] NIIT exclusion is visible near the tool/result.

---

## 12. Step 8 — Add Unique Schema to Every Page

Use the existing helpers in `src/lib/seo/schema` and the safe JSON-LD serialization pattern already used by the project.

Each focused page should have:

- `WebPage` with its canonical `@id`.
- `SoftwareApplication` aligned with the visible calculator.
- `BreadcrumbList`.
- `FAQPage` only when every schema question and answer is visibly present on that same page.
- Organization/publisher reference consistent with the root schema.

Schema rules:

- [ ] No fake ratings or reviews.
- [ ] No `HowTo` unless the visible page genuinely provides the same steps.
- [ ] No hidden FAQ content.
- [ ] No duplicate `@id` values between calculator pages.
- [ ] Schema names and descriptions match page intent.
- [ ] JSON-LD renders without unsafe `<` sequences or syntax errors.

Validate with:

- Google Rich Results Test.
- Schema.org Validator.
- Rendered-page source inspection.

Structured data does not guarantee a rich result and must not be presented as a guaranteed traffic increase.

---

## 13. Step 9 — Add Homepage and Sitewide Discovery

### Homepage

File: `src/app/page.tsx`

The current popular-guides area links to `/tax-calculator-guide` but not directly to the tool. Add a dedicated calculator module before or within the Tax Knowledge section.

Required module:

- Heading: `Free 2026 Tax Calculators`.
- Short outcome-led explanation.
- Primary button: `Use the Federal Tax Calculator` → `/tax-calculator`.
- Supporting cards for quarterly, self-employment, 1099, and capital gains.
- Calculator links must be normal Next.js `Link` elements and crawlable without JavaScript click handlers.
- Do not promise an exact refund or savings.

### Navbar and footer

- Keep the primary navbar link pointed at `/tax-calculator` to avoid overcrowding navigation.
- Add focused calculator links to a related-tools/footer group only if the footer remains usable on mobile.
- Avoid repeating the same URL several times in the same footer section.

### HTML sitemap

File: `src/app/site-map/page.tsx`

Add a `Tax Calculators` section containing all five calculator URLs with descriptive labels.

### XML sitemap

File: `src/app/sitemap.ts`

Add every new URL with:

- Accurate `lastModified` equal to the real substantive publish date.
- `monthly` change frequency.
- Priority `0.8` or `0.9`; remember priority is only a hint.
- No URLs with query parameters or hash fragments.

### Discovery acceptance tests

- [ ] Homepage has a direct `/tax-calculator` link.
- [ ] Homepage links to each focused calculator.
- [ ] HTML sitemap contains each URL once.
- [ ] XML sitemap contains each canonical URL once.
- [ ] Navbar continues to work on mobile.
- [ ] Footer remains readable and does not become keyword-stuffed.

---

## 14. Step 10 — Add Contextual Internal Links

Add links only where the destination genuinely helps the reader.

### Required existing pages

1. `src/data/blogData.ts`
   - `missed-estimated-tax-payment-june-15-deadline` → quarterly calculator.
   - `reduce-self-employment-tax-business-owners` → self-employment calculator.
   - Relevant 1099/freelancer references → 1099 calculator.
   - Relevant investment/capital-gains references, if present → capital-gains calculator.
2. `src/app/services/ServicesContent.tsx`
   - Link to the hub and the most relevant focused tool.
3. `src/app/tax-calculator-guide/page.tsx`
   - Add a related-calculators section.
4. Relevant business tax, bookkeeping, individual tax preparation, and contractor pages.

### Anchor examples

- `2026 quarterly estimated tax calculator`
- `2026 self-employment tax calculator`
- `1099 tax calculator for freelancers`
- `2026 capital gains tax calculator`
- `2025 and 2026 federal tax calculator`

Rules:

- Vary anchors naturally according to context.
- Do not add the same five-link block to every page.
- Do not add irrelevant calculator links to IRS-notice pages solely for SEO.
- Prefer an explanatory sentence around the link.
- Ensure every new page receives at least three contextual internal links in addition to sitemap/homepage links.

Internal linking reference: `https://developers.google.com/search/docs/appearance/sitelinks`

---

## 15. Step 11 — Content Quality Requirements

Every calculator page must answer the user's question before asking for a consultation.

### Page order

1. H1 and concise scope.
2. Calculator above the fold.
3. Result explanation.
4. Limitations/disclaimer.
5. Worked example.
6. How the calculation works.
7. IRS/SSA sources and last-reviewed date.
8. FAQs.
9. Related calculators and guides.
10. Consultation CTA.

### Trust requirements

- Show a substantive last-reviewed date only after rechecking sources.
- Identify the content owner as `IntegraFin Tax & Accounting team` unless a verified named reviewer is approved for publication.
- Do not invent credentials, reviewer identities, clients, usage counts, testimonials, or accuracy percentages.
- Link directly to primary sources.
- State what the tool does not calculate.
- Keep examples explicitly labeled illustrative.

### Copy review checklist

- [ ] One unique H1.
- [ ] Primary term appears naturally in title, H1, opening explanation, and one relevant subheading.
- [ ] No keyword stuffing.
- [ ] No promise of exact tax, exact refund, exact payment, or guaranteed savings.
- [ ] No stale statement that 2025 filing is current without proper context.
- [ ] 2026 planning is clearly distinguished from a return generally filed in 2027.
- [ ] State-tax exclusion is visible.
- [ ] CTA does not interrupt the calculation.

Google content-quality reference: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`

---

## 16. Step 12 — Accessibility and UX QA

Test at minimum:

- 360 × 800 mobile.
- 768 × 1024 tablet.
- 1440 × 900 desktop.

Checklist:

- [ ] Calculator inputs appear quickly and are not buried under a very tall hero.
- [ ] Every input has a visible associated label.
- [ ] Buttons have meaningful text.
- [ ] Tab controls, if shown, use correct keyboard behavior and expose selected state.
- [ ] Focus indicators are visible.
- [ ] Color is not the only way results or errors are communicated.
- [ ] Result changes are announced appropriately if an accessible live region is used.
- [ ] Currency input formatting does not prevent typing, editing, or screen-reader use.
- [ ] No horizontal scrolling at 360 px.
- [ ] Sticky navigation does not cover the H1 or calculator inputs.
- [ ] Tap targets are comfortably sized.
- [ ] Disclaimers are readable and not hidden in a tooltip.
- [ ] Reduced-motion preferences are respected for nonessential animation.

---

## 17. Step 13 — Calculation and Regression QA

Re-run the baseline fixtures and add focused-route checks.

### Required scenarios

- Federal: all four filing statuses.
- Federal: standard versus itemized deduction.
- Federal: withholding greater and less than estimated liability.
- Federal: zero/blank/invalid income behavior.
- Self-employment: below and above the Schedule SE threshold.
- Self-employment: zero W-2 wages and wages near/above the Social Security wage base.
- Self-employment: Additional Medicare threshold behavior.
- 1099: zero expenses, normal expenses, and expenses equal to/exceeding receipts.
- Quarterly: no payments, withholding only, estimates already paid, remaining liability at zero.
- Capital gains: short-term only, long-term only, mixed gains, zero ordinary income, high ordinary income.
- Year switching: 2025 to 2026 and back.

### Security/privacy checks

- [ ] No calculator values appear in URLs.
- [ ] No calculator values are written to localStorage/sessionStorage.
- [ ] No financial values are sent to analytics.
- [ ] No results are submitted to lead forms automatically.
- [ ] No new API endpoint is introduced unless required and reviewed.

---

## 18. Step 14 — Technical SEO QA

For each of the five URLs, verify:

- [ ] HTTP 200.
- [ ] Unique `<title>`.
- [ ] Unique meta description.
- [ ] Exactly one H1.
- [ ] Self-referencing canonical.
- [ ] `index, follow`.
- [ ] Correct Open Graph URL/title/description.
- [ ] Crawlable internal links.
- [ ] URL appears once in XML sitemap.
- [ ] URL appears in HTML sitemap.
- [ ] Server-rendered HTML contains meaningful page copy.
- [ ] Structured data matches visible content.
- [ ] No accidental redirect chain.
- [ ] No console errors or hydration warnings.

Run:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Then start the production build on an unused port and inspect all routes:

```powershell
npm run start -- -p 3010
```

Do not reuse port 3000 without checking it; prior local logs show `EADDRINUSE` on port 3000.

---

## 19. Step 15 — Final Code Review Before Deployment

Run:

```powershell
git -c safe.directory=C:/Users/Public/Downloads/integrafin_web status --short
git -c safe.directory=C:/Users/Public/Downloads/integrafin_web diff --check
git -c safe.directory=C:/Users/Public/Downloads/integrafin_web diff --stat
```

Review the diff for:

- [ ] Unrelated files.
- [ ] Accidentally copied tax tables.
- [ ] Changed tax constants without source verification.
- [ ] Duplicate metadata or canonical values.
- [ ] Placeholder text.
- [ ] Fake trust claims.
- [ ] Analytics payloads containing financial data.
- [ ] Temporary logs, screenshots, or generated files.
- [ ] Debug output or console logging.
- [ ] Stale dates.

Do not discard or overwrite pre-existing user changes.

---

## 20. Step 16 — Deployment and Live Validation

Deploy using the repository's existing approved deployment workflow. Do not switch providers or production projects.

After deployment, check:

```powershell
Invoke-WebRequest -Uri https://integrafin.tax/tax-calculator -UseBasicParsing
Invoke-WebRequest -Uri https://integrafin.tax/quarterly-estimated-tax-calculator -UseBasicParsing
Invoke-WebRequest -Uri https://integrafin.tax/self-employment-tax-calculator -UseBasicParsing
Invoke-WebRequest -Uri https://integrafin.tax/1099-tax-calculator -UseBasicParsing
Invoke-WebRequest -Uri https://integrafin.tax/capital-gains-tax-calculator -UseBasicParsing
Invoke-WebRequest -Uri https://integrafin.tax/sitemap.xml -UseBasicParsing
```

Live checklist:

- [ ] All routes return HTTP 200.
- [ ] Production title/H1/canonical are correct.
- [ ] Calculator interactions work on mobile and desktop.
- [ ] Meta Pixel Test Events show one PageView per navigation.
- [ ] GA4 DebugView shows expected page and calculator events without duplicates.
- [ ] XML sitemap contains all focused pages.
- [ ] No production console or hydration errors.
- [ ] Contact and site navigation still work.

If live behavior differs materially from the verified local build, stop promotion and use the existing deployment rollback mechanism.

---

## 21. Step 17 — Google Search Console Actions

These are manual external actions and require access to the verified IntegraFin property.

1. Open URL Inspection for each new URL.
2. Run `Test live URL`.
3. Confirm crawling and indexing are allowed.
4. Request indexing.
5. Resubmit `https://integrafin.tax/sitemap.xml` if needed.
6. Record the submission date.
7. Create a Search Console performance filter for URLs containing `calculator`.
8. Export the pre-launch baseline for the existing `/tax-calculator`.

Do not promise immediate indexing or ranking. Google documentation notes that sitemaps and internal links help discovery, but inclusion and ranking are not guaranteed.

Sitemap reference: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`

---

## 22. Measurement Plan After Launch

### Primary KPI

**Qualified organic calculator entrances**, measured as organic landing sessions on the five calculator URLs.

### Supporting metrics

- Search Console impressions by calculator URL.
- Search Console clicks by calculator URL.
- Non-branded query count.
- Average position by target query cluster.
- Organic click-through rate.
- Calculator `view_content` events.
- `calculator_complete` events.
- Completion rate = completions ÷ calculator views.
- Contact or booking actions following a calculator completion.

### Review schedule

- **Day 1:** Validate tracking and indexing requests.
- **Day 3:** Confirm Google can fetch pages and no live errors exist.
- **Day 7:** Check first impressions and query matching; do not overreact to ranking volatility.
- **Day 14:** Improve weak snippets or internal links when evidence supports it.
- **Day 28:** Compare URL-level impressions, clicks, CTR, and completions with baseline.
- **Day 56:** Decide whether content, backlinks, UX, or query targeting is the primary constraint.

Never buy fake views, bot traffic, low-quality traffic packages, or backlinks. They do not create qualified demand and can corrupt measurement or create search risk.

---

## 23. Promotion After Technical Launch

Only promote after live QA passes.

### Immediate owned-channel promotion

- Publish one Google Business Profile update highlighting the 2026 quarterly calculator.
- Publish one LinkedIn post for freelancers and business owners.
- Publish one Facebook post tied to the September 15 planning deadline.
- Add the quarterly calculator to the most relevant email/newsletter content.
- Use the exact canonical URL, not a URL shortener, for primary website links.

### Content follow-up

Prioritize supporting content that answers a real question and links to the appropriate tool:

1. `How to Calculate 2026 Quarterly Estimated Tax Payments`
2. `2026 Self-Employment Tax: Rate, Wage Base, and Example`
3. `How Much Should a 1099 Contractor Set Aside for Taxes?`
4. `2026 Capital Gains Tax Rates and Worked Examples`
5. `Standard Deduction vs. Itemized Deductions for 2026 Planning`

Do not mass-produce thin articles. One strong IRS-sourced article is better than several near-duplicates.

---

## 24. Final Handoff Template

When the implementation is finished, report:

```text
Completed:
- [routes and major changes]

Measurement:
- [Meta PageView result]
- [GA4 result]
- [calculator event result]

Verification:
- lint: pass/fail
- TypeScript: pass/fail
- production build: pass/fail
- route HTTP checks: pass/fail
- mobile/desktop QA: pass/fail

Deployment:
- production URL/version
- live validation result

Search Console:
- URLs inspected
- indexing requested on [date]
- sitemap submitted/confirmed

Known limitations:
- [remaining limitations]

Next measurement review:
- [date]
```

---

## 25. Compact Execution Checklist

Use this only after reading the full runbook.

- [ ] Read `cal.md` and this runbook.
- [ ] Record baseline status, lint, typecheck, build, and calculation fixtures.
- [ ] Fix Meta route-change PageViews without initial duplication.
- [ ] Validate GA4 before adding manual page views.
- [ ] Add privacy-safe calculator page view events.
- [ ] Refactor one reusable calculator workspace.
- [ ] Re-run regression fixtures.
- [ ] Build quarterly calculator page.
- [ ] Build self-employment calculator page.
- [ ] Build distinct 1099 calculator page.
- [ ] Build capital-gains calculator page.
- [ ] Add unique metadata, canonical, schema, FAQs, sources, examples, and disclaimers.
- [ ] Add homepage calculator module.
- [ ] Add contextual internal links.
- [ ] Update HTML and XML sitemaps.
- [ ] Run accessibility and responsive QA.
- [ ] Run analytics and privacy QA.
- [ ] Run lint, typecheck, build, and diff review.
- [ ] Deploy through the existing workflow.
- [ ] Verify all live URLs and tracking.
- [ ] Request indexing and confirm sitemap in Search Console.
- [ ] Schedule Day 3, 7, 14, 28, and 56 reviews.
