# Tax Calculator Update Guide

Last updated: June 16, 2026
Workspace: `d:\integrafin_web`
Primary page: `/tax-calculator`

This file is the Codex implementation guide for improving the IntegraFin tax calculator so it can compete for U.S. tax calculator searches. Read this file before making future tax calculator edits.

## Goal

Build a federal tax calculator page that is accurate within its stated scope, visibly IRS-sourced, useful enough to earn links/internal traffic, and optimized for high-intent U.S. search queries around 2025 filing and 2026 planning.

The page should target national calculator intent first, then support small-business, self-employed, capital gains, and Texas/Katy local long-tail searches.

## Current Page Direction

The calculator should support:

- 2025 federal tax estimates for returns generally filed in 2026.
- 2026 federal tax planning estimates.
- Federal income tax by filing status.
- Standard and itemized deduction inputs.
- Other income input.
- Tax withheld / estimated payments input.
- Qualifying child credit estimate with conservative eligibility language.
- Self-employment tax with optional W-2 wage coordination.
- Long-term and short-term capital gains estimate.
- Scenario comparison.

Do not claim the calculator is official IRS software, IRS-certified, or guaranteed exact.

## Non-Negotiable Accuracy Rules

- Verify tax-year values against IRS or SSA primary sources before publishing or changing copy.
- Use conservative wording such as "estimate," "may apply," "generally," and "for planning."
- Never say "IRS compliant" unless a source or certification supports the exact claim.
- Do not imply the calculator covers every Form 1040 rule.
- Keep the disclaimer visible and specific.
- If a calculation excludes AMT, NIIT, QBI, EITC, refundable credits, state taxes, local taxes, penalties, itemized deduction limits, or phaseouts, say so.
- If tax law changes, update data, UI copy, metadata, schema, and source notes together.

## Required IRS/SSA Source Checks

Before shipping calculator changes, re-check:

- IRS federal income tax rates and brackets: `https://www.irs.gov/filing/federal-income-tax-rates-and-brackets`
- IRS 2026 inflation adjustments: `https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill`
- IRS child tax credit: `https://www.irs.gov/credits-deductions/individuals/child-tax-credit`
- IRS self-employment tax: `https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes`
- IRS capital gains Topic 409: `https://www.irs.gov/taxtopics/tc409`
- SSA contribution and benefit base: `https://www.ssa.gov/oact/cola/cbb.html`

## Competitor Patterns To Match Or Beat

Competitors checked:

- NerdWallet tax calculator
- TurboTax TaxCaster
- H&R Block tax calculator
- SmartAsset income tax calculator
- Calculator.net tax calculator
- TaxAct tax bracket calculator

Common ranking strengths:

- Exact title/H1 match for "tax calculator" and "refund estimator."
- Current tax-year language such as "2025-2026."
- Immediate calculator above the fold.
- Author, editor, reviewer, fact-check date, or tax expert proof.
- Clear "how this calculator works" section.
- FAQ section targeting People Also Ask questions.
- Tables for standard deductions and tax brackets.
- Related tools and related tax guides.
- Strong internal links from blog, services, footer, sitemap, and calculators.
- Broader input coverage than a simple bracket calculator.

IntegraFin should compete by being more transparent, more accurate for self-employed users, and more useful for small-business/1099 planning.

## Primary SEO Target

Primary keyword:

- `2025 and 2026 federal tax calculator`

Preferred H1:

- `2025 and 2026 Federal Tax Calculator & Refund Estimator`

Title tag target:

- `2025 & 2026 Federal Tax Calculator | Refund Estimator`

Meta description target:

- `Estimate 2025 or 2026 federal income tax, refund or balance due, self-employment tax, capital gains, deductions, credits, and filing scenarios using IRS-sourced tables.`

## Keyword Plan

Primary national keywords:

- `tax calculator`
- `federal tax calculator`
- `income tax calculator`
- `tax refund calculator`
- `tax refund estimator`
- `2025 tax calculator`
- `2026 tax calculator`
- `2025 federal tax calculator`
- `2026 federal tax calculator`
- `2025 and 2026 federal tax calculator`

High-intent long-tail keywords:

- `federal income tax calculator 2026`
- `tax refund estimator 2025`
- `tax refund estimator 2026`
- `2026 tax bracket calculator`
- `2025 tax bracket calculator`
- `standard deduction calculator 2026`
- `married filing jointly tax calculator 2026`
- `head of household tax calculator 2026`

Self-employed / small-business keywords:

- `self employment tax calculator 2026`
- `1099 tax calculator 2026`
- `freelance tax calculator`
- `independent contractor tax calculator`
- `small business tax calculator`
- `quarterly estimated tax calculator`
- `estimated tax payment calculator 2026`

Capital gains keywords:

- `capital gains tax calculator 2026`
- `long term capital gains tax calculator`
- `short term capital gains tax calculator`
- `investment tax calculator`

Local support keywords:

- `Texas tax calculator`
- `Katy TX tax calculator`
- `Katy tax accountant calculator`
- `self employed tax help Katy TX`
- `small business tax help Katy TX`
- `1099 tax help Katy TX`

## Page Structure Requirements

Recommended page order:

1. Hero with exact H1 and tax-year selector.
2. Calculator tool above the fold.
3. Results panel with refund/balance due, total tax, taxable income, effective rate, marginal rate.
4. Detailed calculation breakdown.
5. "IRS data used" trust section.
6. 2025 vs 2026 comparison table.
7. Federal tax brackets table by filing status.
8. Standard deduction table.
9. Self-employment tax explanation.
10. Capital gains tax explanation.
11. Calculator limitations.
12. FAQ section.
13. CTA for IntegraFin review.
14. Related resources and internal links.

## Calculator Feature Requirements

Federal income tab:

- Tax year selector: 2025 and 2026.
- Filing status: Single, Married Filing Jointly, Married Filing Separately, Head of Household.
- Wage income.
- Other income.
- Tax withheld.
- Estimated tax payments.
- Standard deduction toggle.
- Itemized deductions input.
- Other credits input.
- Qualifying children input.
- Other dependents input if implemented.
- Result breakdown with before-credit and after-credit tax.

Self-employment tab:

- Net self-employment income.
- Optional W-2 wage income.
- Filing status.
- 92.35% SE earnings base.
- Social Security wage base by year.
- Social Security cap reduced by W-2 wages.
- Medicare 2.9%.
- Additional Medicare 0.9% threshold by filing status.
- Half-SE-tax deduction.
- Quarterly estimate with due dates.

Capital gains tab:

- Ordinary income.
- Short-term gains.
- Long-term gains.
- Standard deduction applied before taxable gains are calculated.
- Short-term gains taxed as ordinary income.
- Long-term gains stacked on top of ordinary taxable income.
- Long-term thresholds by tax year and filing status.
- State tax and NIIT excluded unless explicitly added.

Comparison tab:

- Scenario A and Scenario B.
- Filing status, income, deductions.
- Year-aware calculations.
- Show difference, not guaranteed "savings."

## Inputs To Add Later

Add these after core accuracy is stable:

- Age 65 or older.
- Blind taxpayer.
- Spouse age 65 or older.
- Qualified surviving spouse status if supported.
- Traditional IRA contribution.
- 401(k) contribution.
- HSA contribution.
- Student loan interest.
- Child and dependent care credit estimator.
- Education credit warning / estimator.
- OBBBA-specific deductions if applicable and verified.
- State selector, starting with Texas, New York, and Pennsylvania if business strategy requires it.

## Trust Content Requirements

Add a visible trust block near the calculator:

- `Last reviewed: June 16, 2026`
- `Data sources: IRS federal tax brackets, IRS standard deductions, IRS child tax credit guidance, SSA Social Security wage base`
- `Reviewed by: IntegraFin tax team`
- Link to IRS/SSA sources.

Do not hide source links only in the footer.

## FAQ Targets

Add FAQ schema only if each answer is visible on the page.

Recommended FAQs:

- `How accurate is this tax calculator?`
- `Does this calculator estimate my 2025 tax refund?`
- `Can I use this for 2026 tax planning?`
- `Does this include self-employment tax?`
- `Does this include state income tax?`
- `Does this include capital gains tax?`
- `What tax brackets does this calculator use?`
- `Why is my refund different from my tax liability?`
- `Should I use standard or itemized deductions?`
- `When are 2026 estimated tax payments due?`

FAQ answer style:

- Short, direct, conservative.
- Use "estimate" and "may."
- Link to contact page when professional review is needed.

## Internal Link Plan

Add links to `/tax-calculator` from:

- Homepage calculator module.
- Footer.
- HTML sitemap.
- Blog sidebar.
- `/services`.
- `/texas-tax-accounting-services`.
- `/texas/katy-bookkeeping-services`.
- `/texas/irs-notice-help-katy-tx`.
- Blog posts about self-employment tax, 1099s, tax planning, IRS notices, capital gains, and estimated taxes.

Suggested anchor text:

- `2025 tax refund estimator`
- `2026 federal tax calculator`
- `self-employment tax calculator`
- `1099 tax calculator`
- `capital gains tax calculator`
- `federal income tax estimator`

## Supporting Content Cluster

Create or improve these blog/support pages and link back to the calculator:

- `/blog/2026-federal-tax-brackets-standard-deduction`
- `/blog/2025-tax-refund-estimator-guide`
- `/blog/self-employment-tax-calculator-2026`
- `/blog/1099-tax-calculator-guide`
- `/blog/capital-gains-tax-calculator-2026`
- `/blog/quarterly-estimated-tax-payments-2026`
- `/blog/standard-deduction-vs-itemized-deductions`

Each article should include:

- One primary keyword.
- IRS source links.
- FAQ.
- CTA to `/tax-calculator`.
- CTA to `/contact`.

## Structured Data Requirements

Use only valid visible-content-aligned schema.

Recommended:

- `SoftwareApplication` for calculator.
- `FAQPage` for visible FAQs.
- `BreadcrumbList`.
- Organization/publisher data already consistent with site schema.

Avoid:

- Fake review/rating schema.
- FAQ schema for hidden content.
- Medical/legal/tax claims not visible on page.

## Technical SEO Requirements

- One H1 only.
- Canonical: `https://integrafin.tax/tax-calculator`
- Index/follow.
- Include in XML sitemap.
- Include in HTML sitemap.
- Ensure title and layout metadata do not conflict.
- Ensure page loads without client errors.
- Keep result text readable on mobile.
- Avoid claims that could trigger YMYL trust issues.

## Conversion Requirements

Add CTAs without turning the page into a sales page:

- `Need a reviewed estimate?`
- `Book a tax review`
- `Talk to IntegraFin`
- Phone and contact email.

Recommended CTA placement:

- After calculator result.
- After limitations section.
- Near FAQ end.

## Implementation Phases

Phase 1: Accuracy and trust

- Verify all 2025/2026 constants.
- Fix logic issues.
- Add source/trust block.
- Strengthen disclaimer.
- Run `npm run lint` and `npm run build`.

Phase 2: Ranking page expansion

- Add IRS data used section.
- Add tax-year comparison table.
- Add standard deduction and bracket tables.
- Add FAQ.
- Add structured data.
- Update metadata.

Phase 3: Internal links

- Add footer and sitemap links if not present.
- Link from services and local pages.
- Link from relevant blogs.
- Update XML sitemap date.

Phase 4: Supporting content cluster

- Publish 3 to 5 IRS-sourced support articles.
- Add internal links back to calculator.
- Submit updated calculator and new support URLs in Google Search Console.

Phase 5: Live validation

- Confirm live page returns `200`.
- Confirm title/meta/H1 are updated live.
- Confirm canonical is correct.
- Confirm sitemap has fresh `lastModified`.
- Run mobile/desktop visual check.
- Request indexing in Google Search Console.

## Verification Commands

Run from `d:\integrafin_web`:

```powershell
npm run lint
npm run build
```

Optional live checks after deployment:

```powershell
Invoke-WebRequest -Uri https://integrafin.tax/tax-calculator -UseBasicParsing
Invoke-WebRequest -Uri https://integrafin.tax/sitemap.xml -UseBasicParsing
```

## Definition Of Done

The calculator update is not done until:

- 2025 and 2026 are selectable.
- Tax data is IRS/SSA verified.
- Result labels use "estimate."
- All known exclusions are disclosed.
- Page has source/trust section.
- FAQ and supporting content exist.
- Internal links are added.
- `npm run lint` passes.
- `npm run build` passes.
- Live URL is checked after deploy.
- Search Console indexing request is made.

## Future Codex Instruction

When asked to continue calculator SEO work, Codex should:

1. Read this `cal.md` file first.
2. Check `git status --short`.
3. Avoid staging unrelated local SEO markdown unless the user asks.
4. Verify IRS/SSA sources before changing tax facts.
5. Implement the next unfinished phase.
6. Run lint/build.
7. Report exact files changed and live/local verification status.
