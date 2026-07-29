# IntegraFin Google SEO, AEO, Local Visibility, and Lead Growth Action Plan

Plan date: July 11, 2026  
Last backlog reconciliation: July 29, 2026
Website: [https://integrafin.tax](https://integrafin.tax)
Primary market: Katy, Fort Bend County, West Houston, and remote U.S. tax/accounting clients  
Primary business objective: Generate qualified tax, bookkeeping, IRS notice, tax resolution, and LLC tax-setup leads  
Repository: `C:\Users\Public\Downloads\integrafin_web`

## Purpose of This File

This is the single implementation checklist for improving IntegraFin's visibility in Google Search, Google Maps, Google AI Overviews/AI Mode, ChatGPT search, and other answer engines while increasing qualified client inquiries.

This plan does not guarantee rankings. Search visibility depends on competition, location, relevance, website quality, business prominence, reviews, links, user behavior, and search-engine decisions.

## How to Use This Plan

Section 17 is the only canonical active task list. Checkboxes in Sections 2–15 are requirement, evidence, or operating checklists that provide detail; they must not be added together or treated as separate backlog items. Section 19 is a reusable QA template, not unfinished project work.

Every active Section 17 task uses one ownership label:

- `[SOURCE]`: can be completed in this repository.
- `[OWNER]`: requires verified business facts, consent, credentials, assets, or a policy decision.
- `[EXTERNAL]`: requires access to Google, Vercel, Resend, Calendly, a directory, or another third-party account.
- `[CONTENT]`: requires research, drafting, primary sources, and qualified review before publication.
- `[RECURRING]`: an operating cadence, not a one-time implementation.

Status rules:

- `[ ]` means genuinely pending.
- `[x]` means the stated scope is complete and has evidence.
- A repository change is not marked externally complete until the live account or production output is verified.
- A deferred task remains pending and is labeled with its dependency; deferral is not completion.
- Reusable QA criteria remain plain bullets and are copied into a release record when used.

For every completed canonical task, record the completion date, responsible party, exact URL or file, verification evidence, and any post-deployment monitoring requirement.

---



# 1. July 11 Audit Baseline and July 29 Reconciliation

The crawl counts and scores in this section are the July 11 baseline, not a live dashboard. Source improvements completed after that date are recorded below and in the relevant completion records. Do not overwrite baseline values without new comparable crawl, GSC, GA4, GBP, and field-performance evidence.



## What Is Working

- Live XML sitemap contains 58 URLs.
- All 58 sitemap URLs returned HTTP 200 in the July 11, 2026 crawl.
- All crawled pages had one H1, a canonical URL, a title, a meta description, and JSON-LD.
- No duplicate title tags were detected.
- HTTPS, HSTS, CSP, canonical-host redirects, robots.txt, and sitemap.xml are active.
- Dedicated pages exist for core services, Katy services, Texas cities, state hubs, IRS notices, bookkeeping, LLC tax setup, and tax tools.
- City pages generally disclose that IntegraFin has one Katy office instead of claiming false offices.
- Newer city, service, and blog pages contain useful FAQs, official sources, internal links, and clear service information.
- Contact and callback forms are functional.
- GA4, Vercel Analytics, and Vercel Speed Insights are installed.



## Current Growth Bottlenecks After Source Reconciliation

1. Verifiable trust, credentials, authorship, and reviews are weaker than competitors.
2. Google Business Profile prominence and local citations need more work.
3. The site has many pages but limited public proof such as named team members, credentials, client reviews, case studies, and community recognition.
4. Query-to-page ownership is implemented in source but requires GSC cannibalization monitoring.
5. Lead attribution, pipeline feedback, AI classification, and conversion-event source code are implemented; GA4 administration, production notification delivery, and booking-completion verification remain.
6. The homepage carousel was replaced with a static optimized hero; field LCP, INP, CLS, and template performance still require measurement.
7. Metadata outliers were shortened; live snippet verification, recrawl, and CTR monitoring remain.
8. Google has not necessarily recrawled all newly deployed content yet.
9. OAI-SearchBot and ChatGPT-User are explicit in source; deployment, CDN behavior, and the separate GPTBot owner policy remain.
10. Unsupported credential claims were removed, but verified professional profiles, authorship, and qualified review still require owner evidence.



## July 11 Baseline Priority Scores


| Area                     | Current Estimate | Target | Priority                  |
| ------------------------ | ---------------- | ------ | ------------------------- |
| Technical SEO            | 9/10             | 9.5/10 | Maintain                  |
| On-page SEO              | 8/10             | 9/10   | Medium                    |
| Content coverage         | 8/10             | 9/10   | Focus quality, not volume |
| Local SEO and prominence | 4/10             | 8/10   | Critical                  |
| E-E-A-T and trust        | 4/10             | 9/10   | Critical                  |
| AI/AEO readiness         | 7/10             | 9/10   | High                      |
| Lead conversion          | 5/10             | 8.5/10 | Critical                  |
| Lead attribution         | 3/10             | 9/10   | Critical                  |


---



# 2. Business Information Required Before SEO Claims Are Updated

These questions must be answered accurately. Do not publish assumptions.

- **Supporting requirement:** Which named team members work for IntegraFin?
- **Supporting requirement:** Which team members are U.S. CPAs?
- **Supporting requirement:** Which team members are Enrolled Agents?
- **Supporting requirement:** Which team members are Chartered Accountants, and in which country/jurisdiction?
- **Supporting requirement:** Which licenses or credentials can be verified publicly?
- **Supporting requirement:** Who can legally and professionally represent clients before the IRS?
- **Supporting requirement:** Which services are directly performed by IntegraFin and which are referred to partners?
- **Supporting requirement:** Does IntegraFin provide a genuine secure client portal? Record its URL and provider.
- **Supporting requirement:** Is a free consultation genuinely offered?
- **Supporting requirement:** Is a 24-hour response time operationally achievable?
- **Supporting requirement:** Does IntegraFin use flat-rate pricing? If yes, document real ranges and scope.
- **Supporting requirement:** Which industries have actual client experience?
- **Supporting requirement:** Which languages are genuinely supported during client service?
- **Supporting requirement:** What is the exact legal entity name used on contracts, invoices, tax documents, GBP, and directories?
- **Supporting requirement:** Is the Katy address client-facing, staffed, and eligible under Google Business Profile rules?
- **Supporting requirement:** Which existing clients have approved public testimonials or case studies?

Do not proceed with credential, award, review, pricing, guarantee, or experience claims until proof is documented.

---



# 3. P0: Trust, Credential, and YMYL Corrections

Tax content is a financial YMYL topic. Every claim must be accurate, attributable, and supportable.

## 3.1 Remove or Replace Inaccurate Person Schema

Status: `Completed`

File: `src/lib/seo/schema.ts`

Current risk:

- `personSchema` uses the generic name `IntegraFin Tax Expert Team`.
- It lists `Texas Board of Public Accountancy` under `alumniOf`, which is not appropriate for a licensing board.
- This schema is included on the About page.

Required update:

- [x] Remove the generic Person schema until a real person can be represented.
- **Supporting requirement:** Create one Person/ProfilePage entity per real professional only after credentials are verified.
- **Supporting requirement:** Use real name, job title, image, employer, credential, license jurisdiction, profile URL, and verified sameAs links.
- [x] Do not use `alumniOf` for a licensing board.
- **Supporting requirement:** Validate the live About page after deployment.

Completion record (July 11, 2026):

- Removed the generic `personSchema` export from `src/lib/seo/schema.ts`.
- Removed the Person-schema import and JSON-LD output from `src/app/about/page.tsx`.
- Removed the incorrect `alumniOf: Texas Board of Public Accountancy` statement.
- Confirmed there are no remaining references to `personSchema`, `IntegraFin Tax Expert Team`, or the inaccurate `alumniOf` value.
- Verification passed: ESLint, TypeScript, and the Next.js production build with all 66 generated pages.
- Deployment/live About-page validation remains a separate post-deployment check.



## 3.2 Audit Visible CPA, CA, EA, Certified, and Licensed Claims

Status: `Completed`

Files requiring review:

- `src/app/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/about/page.tsx`
- `src/app/services/ServicesContent.tsx`
- `src/lib/seo/schema.ts`
- Blog author/reviewer fields

Required update:

- [x] List every occurrence of CPA, CA, EA, certified professional, licensed tax expert, audit representation, and IRS representation.
- [x] Remove the credential claims instead of presenting unverified named credentials.
- [x] Remove every IntegraFin CPA, CA, EA, certified, and licensed-team claim found by the source scan.
- [x] Replace the affected text with neutral descriptions of the tax, accounting, bookkeeping, and support process.
- [x] Keep license-verification links out of the website until a real named professional and credential are approved for publication.

Completion record (July 11, 2026):

- Updated `src/app/page.tsx` to remove the CPA and CA team claim.
- Updated `src/app/contact/page.tsx` to remove the `certified professionals` claim.
- Updated `src/app/services/ServicesContent.tsx` to remove the qualified CPA/CA team claim.
- Updated `src/components/Footer.tsx` to remove the CA team claim.
- Updated `src/app/case-study/CaseStudyClient.tsx` to replace `CPA-Led Teams` with `Coordinated Tax Support`.
- Updated `src/lib/seo/schema.ts` to remove the `licensed tax experts` statement and replace it with engagement-scope language.
- Final exact-term scan found no CPA, EA, certified, or licensed claim in the website source. The only remaining standalone `CA` matches are California's state code and official California government URLs, not credential claims.
- Verification passed: ESLint, TypeScript, `git diff --check`, and the Next.js production build with all 66 generated pages.



## 3.3 Replace Anonymous or Generic Testimonials

Status: `Done`

Current issue:

- Homepage testimonial uses `IntegraFin Client` and `Small Business Owner` without verifiable detail.
- Generic testimonials weaken trust and may appear fabricated.

Required update:

- [x] Remove the generic testimonial until a real approved testimonial is available. Removed from `src/app/page.tsx` in commit `3c27413` and verified absent from the production homepage after deployment commit `771dd38` on July 14, 2026
- **Supporting requirement:** Display reviewer name or approved initials, company/industry when permitted, service used, date, and source.
- **Supporting requirement:** Link to the original Google review when possible.
- **Supporting requirement:** Never create fake reviews or mark up self-created reviews as Google ratings.



## 3.4 Replace Generic Trust Sections With Proof

Status: `Done`

Replace generic statements such as `Trust`, `Security`, `Years of Combined Experience`, and `Our Guarantees` with verified proof:

- **Supporting requirement:** Number of years in operation
- **Supporting requirement:** Named professionals and credentials
- **Supporting requirement:** Real Google review count and rating
- **Supporting requirement:** Secure portal provider and process; no provider is claimed until it is verified.
- **Supporting requirement:** Real office photos; current stock imagery is explicitly labeled illustrative and is not presented as team or office proof.
- **Supporting requirement:** Typical response time
- [x] Engagement and onboarding steps
- **Supporting requirement:** Languages genuinely supported
- **Supporting requirement:** Industries with documented client experience
- **Supporting requirement:** Professional memberships
- **Supporting requirement:** Client-retention or service statistics only when measured

Source completion record (July 14, 2026):

- Replaced the homepage `Our Guarantees`, `Why Trust Us?`, years-of-experience, trust, security, and reliability labels with checkable proof covering the Katy office, documented engagement stages, transparent service areas, and outcome limitations.
- Reworked the About and Contact pages to use factual location, scope, workflow, payment, and outcome-boundary information.
- Labeled illustrative imagery so it cannot be mistaken for real team or office photography.
- Production deployment `57f3f94` was verified on July 14, 2026.



## 3.5 Remove Unsupported Guarantee and Outcome Language

Status: `Source Complete - Qualified Review Pending`

Search for and review:

- `guarantee accurate tax preparation`
- `maximum refund`
- `minimize tax liability`
- `maximize savings`
- `protect against liens and levies`
- `settle for less`
- `audit-ready`
- `full IRS representation`
- `secure portal`
- `flat-rate transparent pricing`

Required update:

- [x] Use conservative language based on engagement scope and taxpayer facts.
- [x] State that results depend on records, law, eligibility, timing, and agency decisions.
- **Supporting requirement:** Have a qualified professional or attorney review material claims. Owner action required before final sign-off.

Completion record (July 14, 2026):

- Rewrote unsupported refund, savings, liability, compliance, representation, settlement, pricing, portal-security, and business-outcome claims across structured data and site content.
- Converted the case-study page from unverified client results into clearly labeled illustrative engagement workflows.
- Added qualifications that results depend on complete records, applicable law, eligibility, timing, written scope, professional authorization, and agency decisions.

---



# 4. P0: Google Business Profile and Local SEO

Local rankings depend heavily on relevance, distance, and prominence. Website pages alone will not overcome weak reviews and local authority.

## 4.1 Google Business Profile

Status: `Deferred by owner on July 14, 2026`

This work is intentionally skipped for now and does not block the remaining execution plan.

- **Supporting requirement:** Confirm the profile is verified.
- **Supporting requirement:** Use the exact legal/public-facing name consistently.
- **Supporting requirement:** Confirm the Katy address complies with GBP rules.
- **Supporting requirement:** Confirm phone, website, hours, holiday hours, and appointment URL.
- **Supporting requirement:** Choose the most accurate primary category.
- **Supporting requirement:** Add accurate secondary categories such as bookkeeping service, tax consultant, accountant, or payroll service only when applicable.
- **Supporting requirement:** Add every real service with short descriptions.
- **Supporting requirement:** Add service areas without creating false offices.
- **Supporting requirement:** Upload real office exterior, suite entrance, interior, team, and work-process photos.
- **Supporting requirement:** Add a logo and cover image.
- **Supporting requirement:** Add appointment and contact links with UTM tracking.
- **Supporting requirement:** Publish one useful GBP post every week.
- **Supporting requirement:** Answer GBP questions using accurate, non-promotional language.
- **Supporting requirement:** Monitor calls, website clicks, messages, directions, and search terms monthly.

Recommended GBP service groups:

- Individual tax preparation
- Business tax preparation
- Monthly bookkeeping
- Bookkeeping cleanup
- QuickBooks bookkeeping
- Payroll-record support
- IRS notice review
- Tax resolution consultation
- LLC tax setup
- Estimated tax planning



## 4.2 Review Acquisition System

Status: `Not Started`

- **Supporting requirement:** Create a direct Google review link.
- **Supporting requirement:** Ask every eligible real client after a successful milestone.
- **Supporting requirement:** Send the request by email or SMS with no incentive.
- **Supporting requirement:** Do not review-gate or ask only happy clients.
- **Supporting requirement:** Respond to every review professionally.
- **Supporting requirement:** Mention service context naturally in responses without keyword stuffing.
- **Supporting requirement:** Track requests sent, reviews received, rating, and response time.
- **Supporting requirement:** Obtain client permission before reusing review text on the website.

Initial target: 10–20 genuine reviews in 90 days only if the real client volume supports it.

## 4.3 Citation and NAP Consistency

Status: `Owner Follow-Up Deferred`

Use one exact business name, address, phone, URL, and hours everywhere.

Canonical website values audited on July 14, 2026:

- Public name: `IntegraFin Tax & Accounting`
- Legal name represented in site contact information/schema: `IntegraFin LLC`
- Address: `2039 N Mason Rd, Suite 604, Katy, TX 77449`
- Phone: `(832) 647-1819`
- Email: `contact@integrafin.tax`
- URL: `https://integrafin.tax/`
- Hours: Monday-Friday, 9:00 AM-6:00 PM

Verification record (July 14, 2026):

- Website source uses one phone, email, address, and hours set across the footer, contact page, and LocalBusiness schema.
- LinkedIn company page was publicly verified at `https://www.linkedin.com/company/integrafin/`; it lists IntegraFin in Katy and the same street address and postal code.
- Structured data and the website footer now keep only the verified LinkedIn company page. Instagram and X URLs were removed until ownership and profile details can be verified.
- Older LinkedIn posts expose conflicting contact details: `hello@integrafin.tax` and `(832) 774-1882`. Correct or remove those public post details after confirming the intended canonical contacts.
- Production deployment `771dd38` was verified on July 14, 2026: the homepage returned HTTP 200, the anonymous testimonial was absent, and the live structured data retained only the verified LinkedIn profile.

Priority profiles:

- **Supporting requirement:** Bing Places
- **Supporting requirement:** Apple Business Connect
- **Supporting requirement:** Yelp
- **Supporting requirement:** Facebook
- [x] LinkedIn company page - profile and Katy address verified July 14, 2026; older posts with conflicting phone/email still require correction.
- **Supporting requirement:** Katy Area Chamber of Commerce
- **Supporting requirement:** Fort Bend Chamber of Commerce
- **Supporting requirement:** BBB, if the business chooses and qualifies
- **Supporting requirement:** QuickBooks ProAdvisor directory, only for certified professionals
- **Supporting requirement:** IRS preparer directory, only for eligible credentialed professionals
- **Supporting requirement:** Relevant state or professional associations
- **Supporting requirement:** Reputable local business directories

Remove or correct duplicate, outdated, or inconsistent profiles.

## 4.4 Local Backlink Program

Status: `Not Started`

Earn real links from:

- Katy and Fort Bend chambers
- Local business associations
- Community sponsorships
- Local nonprofits
- Business incubators
- Coworking spaces
- Attorneys, payroll providers, financial advisers, and insurance partners
- Real estate, medical, dental, construction, restaurant, and professional-service associations
- Local podcasts and business publications
- Scholarship or educational events with genuine community value

Do not buy backlinks, use private blog networks, exchange large numbers of links, or publish generic guest posts solely for links.

Target: five relevant local or professional referring domains in the first 90 days.

---



# 5. P0: Keyword Ownership and Cannibalization Control

Each valuable search intent must have one primary page.

Status: `Source Ownership Implemented - GSC Validation and Monitoring Pending`

| Primary intent                     | Primary URL                        | Supporting pages                          | Required action                                            |
| ---------------------------------- | ---------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| Katy tax and accounting firm       | `/`                                | About, services, Katy city page           | Keep homepage broad and brand/trust focused                |
| Tax accountant Katy TX             | `/texas/katy-tax-accountant`       | Homepage, business tax, individual tax    | Make the city page the exact-intent landing page           |
| Bookkeeping services Katy TX       | `/texas/katy-bookkeeping-services` | Bookkeeping cleanup, QuickBooks, services | Keep local bookkeeping intent here                         |
| Small business tax accountant Katy | `/business-tax-accounting`         | Katy city page, industries                | Add stronger Katy small-business examples                  |
| Individual tax preparation Katy TX | `/individual-tax-preparation`      | Homepage, calculator                      | Add local filing and document intent                       |
| IRS notice help Katy TX            | `/texas/irs-notice-help-katy-tx`   | Tax resolution, notice articles           | Keep CP14, CP2000, Letter 12C focus here                   |
| Tax resolution Katy TX             | `/tax-resolution`                  | IRS notice page, tax resolution articles  | Differentiate resolution process from notice triage        |
| QuickBooks cleanup Katy TX         | `/quickbooks-bookkeeping-services` | Bookkeeping cleanup, Katy bookkeeping     | Clarify software-specific intent                           |
| Bookkeeping cleanup                | `/bookkeeping-cleanup`             | QuickBooks, Katy bookkeeping              | Focus on catch-up and cleanup process                      |
| LLC tax setup Texas                | `/llc-formation-tax-setup`         | Business tax, payroll, bookkeeping        | Focus on tax classification, EIN, books, payroll, calendar |
| Payroll tax support                | `/payroll-tax-support`             | Business tax, LLC setup                   | Focus on records, deposits, forms, notices                 |
| Federal tax calculator             | `/tax-calculator`                  | Calculator guide, individual tax          | Keep informational/tool intent                             |


Required process:

- **Supporting requirement:** Export GSC queries and landing pages for the last 90 days.
- **Supporting requirement:** Identify queries where multiple IntegraFin URLs receive impressions.
- [x] Choose one owner URL per query cluster.
- [x] Reposition competing pages instead of deleting useful content blindly.
- [x] Update internal anchors to point to the owner URL.
- **Supporting requirement:** Request indexing after material intent changes.
- **Supporting requirement:** Monitor for 28 days before making another major change.

Pause additional city/state page creation until current pages demonstrate impressions, engagement, and differentiated value.

Source implementation record (July 29, 2026):

- Added `src/data/keywordOwnership.ts` as the canonical owner, supporting-page, preferred-anchor, and intent-boundary registry for all 12 priority clusters.
- Kept the homepage broad around `Katy tax and accounting firm`; the exact `tax accountant Katy TX` title, structured-data keywords, and internal anchors now resolve to `/texas/katy-tax-accountant`.
- Repositioned `/business-tax-accounting` around Katy small-business tax work and added local business examples.
- Repositioned `/individual-tax-preparation` around Katy filing, document, Texas-residency, and multi-state intent.
- Separated `/texas/irs-notice-help-katy-tx` notice triage (CP14, CP2000, and Letter 12C) from `/tax-resolution` back-tax, unfiled-return, payment, penalty, audit, and payroll-tax intent.
- Separated recurring Katy bookkeeping from platform-agnostic bookkeeping cleanup and software-specific QuickBooks cleanup.
- Repositioned the LLC page around the exact `LLC tax setup Texas` intent.
- Corrected competing internal anchors that sent `Katy Tax Accountant` to `/` or `Tax Resolution` to the generic services section.
- GSC query exports, multi-URL impression analysis, recrawl requests, and the 28-day comparison remain external follow-up work; no claim of search-performance completion is made without that evidence.

---



# 6. P1: Metadata Updates

The July 11 crawl found no missing or duplicate titles, but several outliers should be shortened.

## 6.1 Suggested Title Updates

Status: `Completed - GSC CTR Monitoring Pending`

| URL                                         | Suggested title                             |
| ------------------------------------------- | ------------------------------------------- |
| `/tax-resolution`                           | `Tax Resolution & IRS Notice Help Katy TX \| IntegraFin` |
| `/quickbooks-bookkeeping-services`          | `QuickBooks Bookkeeping & Cleanup Katy TX \| IntegraFin` |
| `/industries`                               | `Industry Tax & Accounting Services \| IntegraFin` |
| `/new-york/buffalo-tax-accountant`          | `Buffalo Tax Accountant for Businesses \| IntegraFin` |
| `/pennsylvania-tax-accounting-services`     | `Pennsylvania Tax & Accounting Services \| IntegraFin` |
| `/pennsylvania/philadelphia-tax-accountant` | `Philadelphia Tax Accountant for Businesses \| IntegraFin` |
| `/pennsylvania/pittsburgh-tax-accountant`   | `Pittsburgh Tax Accountant for Businesses \| IntegraFin` |




## 6.2 Suggested Description Updates

These are drafts and must be checked against real services.


| URL                        | Suggested description                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                        | `IntegraFin is a Katy tax and accounting firm providing tax preparation, bookkeeping, payroll-record support, and IRS notice help. Schedule a consultation.` |
| `/about`                   | `Meet IntegraFin's tax and accounting team, learn how we support Katy businesses and families, and review our approach to accuracy, security, and service.`  |
| `/services`                | `Explore IntegraFin tax preparation, bookkeeping, payroll-record, IRS notice, tax resolution, and LLC tax-setup services for businesses and individuals.`    |
| `/business-tax-accounting` | `Business tax preparation, bookkeeping, financial reporting, payroll-record, and planning support for Katy small businesses. Request a consultation.`        |
| `/industries`              | `Tax and accounting support for real estate, construction, healthcare, professional services, technology, retail, and other growing businesses.`             |
| `/contact`                 | `Contact IntegraFin at our Katy office for tax preparation, bookkeeping, IRS notice, tax resolution, payroll-record, or LLC tax-setup support.`              |
| `/tax-calculator`          | `Estimate 2025 filing or 2026 federal tax using filing status, deductions, credits, self-employment income, and capital gains. Federal estimate only.`       |


After changes:

- **Supporting requirement:** Verify live title and description.
- [x] Verify canonical URL in source.
- **Supporting requirement:** Inspect mobile and desktop snippets.
- **Supporting requirement:** Request recrawl for priority pages.
- **Supporting requirement:** Measure CTR in GSC after 28 days.

Source completion record (July 23, 2026):

- Shortened the seven title outliers listed above while preserving their primary intent and IntegraFin branding.
- Production build verification passed before deployment; GSC recrawl and CTR monitoring remain external follow-up actions.

Live verification record (July 23, 2026):

- Deployed in commit `bed58db`; all seven pages returned HTTP 200 with the new titles in rendered production HTML.
- Canonicals remained intact. Search Console recrawl and the 28-day CTR comparison remain external follow-up actions.

---



# 7. P1: On-Page SEO and AEO Page Template

Use this template for every important service, city, and high-intent article.

Status: `Priority Owner Templates Implemented - Named Professional Review Pending`

## Required Structure

1. One descriptive H1 containing the primary service and location when appropriate.
2. A 40–70 word direct answer directly below the H1.
3. Clear statement of who the service is for.
4. Real situations that cause someone to need the service.
5. Exact services included and excluded.
6. Step-by-step process.
7. Required-document checklist.
8. Timing and deadline information.
9. Pricing approach or factors affecting price.
10. Risks, limitations, and situations requiring legal or other professional advice.
11. Local office/service-area disclosure.
12. Official IRS, state, or regulatory sources.
13. FAQs written in natural language.
14. Named author and reviewer.
15. Published and last-reviewed dates.
16. Service-specific CTA.
17. Related service and article links.



## AEO Answer Formats

Use answer blocks such as:

- `Short answer:`
- `Who this applies to:`
- `What to do next:`
- `Documents to gather:`
- `Important deadline:`
- `When professional help may be useful:`
- `What IntegraFin can and cannot do:`

Use concise paragraphs, numbered steps, checklists, comparison tables, descriptive headings, and plain language. Avoid filler introductions.

## Content Quality Rules

- [x] Answer the query completely before promoting the service.
- [x] Add original examples and process knowledge.
- [x] Do not rewrite competitors or IRS pages without additional value.
- [x] Do not write to an arbitrary word count.
- [x] Do not change review dates without substantive review.
- **Supporting requirement:** Disclose substantial AI assistance when readers would reasonably expect disclosure.
- **Supporting requirement:** Have tax content reviewed by a qualified named professional.
- [x] Correct or archive outdated information promptly.

Source implementation record (July 29, 2026):

- Added a 40-70 word `Short answer:` block directly below the H1 on all 12 priority keyword-owner routes.
- Added `Who this applies to`, included scope, separate-scope exclusions, timing and deadline guidance, pricing factors, limitations, local disclosure, records checklists, official sources, FAQs, CTAs, and related links to the six shared service owner pages.
- Added the same reusable AEO structure to the Texas city-page template, including `/texas/katy-tax-accountant`.
- Added dedicated scope, timing, pricing-factor, and limitation blocks to the Katy bookkeeping and Katy IRS notice pages.
- Reworked the Texas LLC page so its short answer follows the H1 and its exclusions, pricing, checklist, safety notes, official sources, and FAQs are explicit.
- Adapted the homepage and federal calculator to their broader brand/tool intent without forcing irrelevant service-page sections onto them.
- Replaced generic `Reviewed by: IntegraFin tax team` wording with an accurate organization-level content owner and an explicit pending named-reviewer status.
- A named professional reviewer remains blocked until the owner provides a real identity, role, publishable qualifications, and approval. No person or credential was invented.
- Verification passed: ESLint, TypeScript, `git diff --check`, the production build with all 71 generated pages, and rendered-output checks across all 12 priority owner routes.

---



# 8. P1: Structured Data Plan

Structured data must match visible content exactly.

Status: `Canonical Schema Graph Implemented - Live Google Validation Pending`

## Root Organization and LocalBusiness

File: `src/lib/seo/schema.ts`

- [x] Add stable `@id` values for the Organization and LocalBusiness entities. Completed July 14, 2026.
- [x] Use the documented public name and legal name. Completed in source July 14, 2026; confirm the same names in GBP before final NAP sign-off.
- [x] Verify website address, phone, hours, geo coordinates, priceRange, and areaServed. Source audit completed July 14, 2026; GBP confirmation remains pending.
- **Supporting requirement:** Add a real business image.
- [x] Keep only verified `sameAs` profiles. LinkedIn retained; unverified Instagram and X profiles removed July 14, 2026.
- [x] Keep Yelp out of schema until its URL is verified. No Yelp URL is emitted.
- [x] Do not add self-serving aggregateRating markup.
- [x] Connect Organization, LocalBusiness, WebSite, WebPage, and Service entities with stable IDs. Person remains intentionally absent until a real professional is verified.



## Page-Level Schema

- [x] Homepage: Organization/LocalBusiness, WebSite, and WebPage.
- [x] Service pages: Service, WebPage, BreadcrumbList, and visible FAQ content where present.
- [x] City pages: Service, WebPage, BreadcrumbList, and visible FAQ content.
- **Supporting requirement:** Blog posts: Article/BlogPosting, named author, reviewer where appropriate, dates, image, publisher, and citations.
- [x] About page: AboutPage and BreadcrumbList. Real Person/ProfilePage remains intentionally absent until an approved identity is available.
- [x] Contact page: ContactPage references the canonical LocalBusiness entity and its contact point. Completed July 14, 2026.
- [x] Calculator: SoftwareApplication, WebPage, BreadcrumbList, and visible FAQ content accurately match the implemented estimator.



## FAQ Schema Limitation

FAQ markup can remain when it matches visible content, but Google normally restricts FAQ rich results to authoritative government and health websites. Do not treat FAQ schema as a ranking shortcut.

## Validation

- **Supporting requirement:** Google Rich Results Test
- **Supporting requirement:** Schema.org Validator
- **Supporting requirement:** GSC Enhancement reports
- **Supporting requirement:** URL Inspection rendered HTML
- [x] Manual source and generated-HTML check that schema text matches visible text

Source implementation record (July 29, 2026):

- Rebuilt `src/lib/seo/schema.ts` around one canonical `@graph` with stable Organization, LocalBusiness, WebSite, logo, and homepage WebPage IDs.
- Connected the LocalBusiness to its parent Organization and connected WebSite/WebPage publisher, `isPartOf`, `about`, `mainEntity`, and breadcrumb relationships by `@id`.
- Replaced repeated embedded provider objects across shared service, state, city, Texas-city, Houston IRS, Katy IRS notice, Katy bookkeeping, and Texas LLC templates with the canonical LocalBusiness reference.
- Added WebPage entities and stable Service IDs across service and city templates, including all priority keyword-owner pages.
- Added AboutPage, ContactPage, Services CollectionPage, calculator SoftwareApplication/WebPage, calculator-guide Article/WebPage, blog CollectionPage/Blog, and BlogPosting/WebPage connections.
- Replaced disconnected generic blog-team author entities with the canonical IntegraFin Organization. Named Person/reviewer schema remains blocked until a real identity is verified.
- Removed unsupported Instagram, Facebook, and YouTube `sameAs` URLs from the root graph; LinkedIn is the only retained verified profile. Yelp, aggregate ratings, and self-authored review markup are not emitted.
- Did not add a LocalBusiness image because the available site imagery is labeled illustrative and is not verified as a real office or business photo.
- Verification passed: TypeScript, ESLint, `git diff --check`, the production build with all 71 generated pages, JSON parsing of all 239 rendered JSON-LD blocks with zero failures, stable-ID graph checks, and a rendered scan showing no unsupported social, aggregate-rating, or Person claims.
- Google Rich Results Test, Schema.org Validator, Search Console enhancements, and URL Inspection remain post-deployment validation steps.

---



# 9. P1: ChatGPT, Google AI, and Answer-Engine Visibility

Google says AI Overviews and AI Mode use normal SEO fundamentals. No special AI schema or machine-readable AI file is required.

## 9.1 Robots and Crawler Policy

File: `src/app/robots.ts`

Status: `Source Complete - Deployment, CDN Monitoring, and Training Policy Decision Pending`

Current wildcard behavior allows OAI-SearchBot, but add an explicit rule for clarity:

```text
User-agent: OAI-SearchBot
Allow: /
```

- [x] Keep important pages crawlable.
- **Supporting requirement:** Ensure Vercel/CDN/firewall allows published crawler IPs.
- **Supporting requirement:** Decide separately whether to allow GPTBot training access.
- [x] Keep ChatGPT-User access for user-requested page retrieval.
- [x] Do not block CSS, JavaScript, or important images required for rendering.

Source completion record (July 23, 2026):

- Added an explicit `OAI-SearchBot` allow rule while preserving `/admin` exclusions.
- Wildcard crawling remains enabled for public pages and assets.
- Production `robots.txt` returned HTTP 200 with the explicit rule after deployment `bed58db`.

Source completion record (July 29, 2026):

- Added an explicit `ChatGPT-User` allow rule while preserving the `/admin` exclusions.
- Kept `OAI-SearchBot` explicitly allowed for ChatGPT search discovery and citation.
- Did not change GPTBot access. The wildcard policy currently allows it, and any decision to block training access remains an owner policy decision.
- Production `/robots.txt`, CDN/firewall access, and OpenAI crawler-IP behavior must be rechecked after deployment.

Crawler purpose:

- OAI-SearchBot: ChatGPT search discovery and citation.
- GPTBot: potential training use.
- ChatGPT-User: user-requested page access.
- Googlebot: Google Search and AI features in Search.
- Google-Extended: controls some Google AI training/grounding uses, not normal Google Search indexing.



## 9.2 Make Content Easy to Cite

- [x] Put the direct factual answer near the top of shared service, state, city, Texas-city, and Houston IRS templates.
- [x] Use stable headings and anchors on the major answer, scope, process, resource, and FAQ sections.
- [x] Cite IRS and state primary sources on the shared service, Texas-city, and Houston IRS templates.
- **Supporting requirement:** Identify author and reviewer.
- **Supporting requirement:** State the applicable tax year and jurisdiction.
- [x] Include concrete publication or review dates on the high-priority answer templates.
- [x] Explain scope limitations and exceptions on the shared service, Texas-city, and Houston IRS templates.
- [x] Keep the main answers, limitations, and sources in visible server-rendered HTML text.
- [x] Add descriptive state and control relationships to the shared mobile navigation.
- [x] Keep essential answers visible instead of requiring tabs or client-side interactions.

Source completion record (July 29, 2026):

- Added stable fragment targets including `#overview`, `#services`, `#scope`, `#official-resources`, and `#frequently-asked-questions` where those sections apply.
- Added scroll offsets so anchored answers remain visible below the fixed navigation.
- Preserved the existing policy against inventing a named professional reviewer. Authorship and professional credentials remain pending verified owner-supplied information.
- Tax-year and jurisdiction labeling remains a page-by-page editorial check because not every service is tied to one filing year or one jurisdiction.



## 9.3 AI Referral Measurement

- **Supporting requirement:** Create a GA4 segment for `utm_source=chatgpt.com`.
- [x] Track identifiable referrals from ChatGPT, Perplexity, Gemini, Copilot/Bing Chat, Claude, Meta AI, You.com, and Phind.
- [x] Record the AI source with first landing page and UTM data, then retain service, lead quality, appointment, client, and revenue in the lead pipeline.
- **Supporting requirement:** Review AI referral conversions monthly, not only sessions.

Source completion record (July 29, 2026):

- Added first-touch AI referral classification using both `utm_source` and known referring hosts.
- Added a once-per-session GA4 `ai_referral_visit` event with `ai_source`, `traffic_channel`, landing-page, page-type, city/state-intent, and safe campaign parameters.
- Added `aiReferralSource` validation and storage to lead submissions and newsletter submissions.
- Added an AI-referral filter and attribution detail to the admin lead dashboard. Combine it with the 30-day date filter and pipeline statuses to review lead quality, appointments, clients won, and recorded revenue.
- GA4 custom dimensions, the saved comparison/audience, and the monthly operating review remain external admin tasks.
- Google AI Overview and AI Mode visits are not reliably separable as a distinct referral channel. Google includes traffic from these AI features in the normal Search Console Web search-type reporting, so use landing-page and query trends as directional evidence rather than claiming exact AI Overview attribution.

Do not prioritize `llms.txt` ahead of crawlability, authorship, citations, page quality, internal links, performance, and authority.

---



# 10. P0: Lead Conversion and Attribution



## 10.1 GA4 Conversion Events

Status: `Source Complete - GA4 Admin Configuration Pending`

File: `src/app/layout.tsx` and relevant client components

Implement and test:

- [x] `form_view`
- [x] `form_start`
- [x] `generate_lead` - GA4 recommended event used instead of the draft `lead_submit` name.
- [x] `newsletter_submit`
- [x] `phone_click`
- [x] `whatsapp_click`
- [x] `email_click`
- [x] `booking_start`
- **Supporting requirement:** `booking_complete` - requires a verified Calendly completion integration or webhook.
- [x] `calculator_complete`
- **Supporting requirement:** `portal_click` - listener is ready, but the site has no verified portal destination yet.

Event parameters:

- [x] Service
- [x] Landing page
- [x] Page type
- [x] City/state intent
- [x] Form source
- [x] CTA name
- **Supporting requirement:** Device category - available as a standard GA4 dimension; verify after deployment.
- [x] Campaign/source/medium when available

Never send sensitive tax, financial, personal, message, phone, or email content to analytics.

Implementation record (July 15, 2026):

- Added a shared GA4 event helper with an allowlist for parameters and guards against email, phone, and URL values.
- Lead and newsletter conversion events fire only after the server confirms that the submission was stored.
- Added global phone, email, WhatsApp, booking, and future portal click events plus calculator completion events.
- Mark `generate_lead` as a GA4 key event and verify it in DebugView after deployment.

## 10.2 Lead Attribution Fields

Status: `Completed`

Files:

- `src/app/actions/leads.ts`
- `src/models/ContactLead.ts`
- `src/components/ContactForm.tsx`
- `src/components/HomeCallbackForm.tsx`

Capture and store:

- [x] First landing page
- [x] Current submission page
- [x] Referrer
- [x] `utm_source`
- [x] `utm_medium`
- [x] `utm_campaign`
- [x] `utm_content`
- [x] `utm_term`
- [x] `gclid`
- [x] `gbraid`
- [x] `wbraid`
- [x] `msclkid`
- [x] First-touch timestamp
- [x] Submission timestamp

Implementation record (July 15, 2026):

- Browser capture stores first-touch path, query-string-free referrer, approved campaign parameters, and timestamp.
- The server validates and sanitizes attribution before saving it to MongoDB for lead and newsletter submissions.
- The protected Admin Leads view displays source attribution without exposing ad click IDs.

Live verification record (July 23, 2026):

- Production accepted a non-sensitive QA lead and returned a confirmed lead ID.
- A read-only database check confirmed first landing page, submission page, referrer, source, medium, campaign, first-touch time, and submission time.
- The QA record was marked as spam through the authenticated dashboard action after verification.



## 10.3 Lead Status and Revenue Feedback

Status: `Completed`

Expand the lead pipeline:

- New
- Contact attempted
- Contacted
- Qualified
- Appointment booked
- Proposal sent
- Client won
- Client lost
- Unqualified
- Spam
- Duplicate

Track:

- [x] Service requested
- [x] Qualified or unqualified
- [x] Estimated engagement value
- [x] Client won/lost
- [x] Actual revenue
- [x] Reason lost
- [x] Time to first response
- [x] Time to appointment

Implementation update — July 17, 2026:

- Replaced the read-only lead table with an authenticated operations dashboard for status management, filtering, lead details, source attribution, estimated value, won revenue, appointments, internal notes, reason lost, and first-response tracking.
- Added summary metrics for total leads, currently qualified leads, appointments, won clients, won revenue, and open-pipeline value. Closed, lost, spam, duplicate, and legacy-completed records are excluded from open-pipeline value.
- Added a configurable response SLA, overdue-new-lead counts, visible overdue indicators, validation, safe expired-session recovery, and explicit load/action error states.
- Preserved historical `completed` records while requiring all new updates to use the expanded pipeline.
- Verification passed: ESLint, TypeScript, the Next.js production build with all 67 generated pages, authenticated production HTTP loading, session-protected loading, unauthenticated redirect to login, and a clean production server log. Click-level browser verification remains a post-deployment/manual check because the in-app browser was unavailable in this session.



## 10.4 Immediate Notifications

Status: `Waiting for Production Resend Configuration`

- [x] Send an email notification when a lead is submitted.
- **Supporting requirement:** Add SMS/Slack/Teams notification if operationally useful.
- [x] Include only necessary information and use secure handling.
- [x] Establish a configurable response SLA for the dashboard.
- [x] Create in-dashboard alerts when a new lead is not contacted within the SLA.

Implementation record (July 17, 2026):

- Lead email delivery runs after the database save and does not expose customer contact details or message content to the email provider.
- Delivery uses a MongoDB lead-ID idempotency key; failed or missing provider configuration does not discard the lead.
- New leads persist the notification result and check timestamp so delivery configuration and provider failures are visible in the protected dashboard.
- Production requires `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, and `LEAD_NOTIFICATION_TO`; see `LEAD_NOTIFICATIONS_SETUP.md`.

Live verification record (July 23, 2026):

- Deployed delivery-status persistence and dashboard visibility in commit `2a9c7cf`.
- Production QA lead `6a612abfddfc39908dac9830` recorded `notificationStatus: not_configured`; the background task ran, but the required Resend environment configuration is absent or incomplete.
- The QA lead was marked as spam. Add the three required Vercel environment values, redeploy, and repeat the test until the dashboard records `Sent`.

Recommended operational target: respond within 5–15 minutes during business hours when feasible. Publish a response promise only if consistently achievable.

## 10.5 Thank-You and Booking Flow

Status: `Source Complete - Booking Completion Tracking Pending`

- [x] Create `/thank-you` with `noindex`.
- [x] Show what happens next.
- [x] Display response expectations.
- [x] Offer calendar booking using the configured booking URL or the current Calendly fallback.
- **Supporting requirement:** Provide service-specific document preparation—not sensitive document upload through the public form.
- [x] Trigger conversion events only after confirmed success.

Implementation record (July 15, 2026):

- Successful lead submissions route to `/thank-you` only after `submitLead` confirms storage.
- The page is excluded from the sitemap, uses `noindex`, explains follow-up, warns against sending sensitive records through ordinary email, and provides booking and phone options.
- Production returned HTTP 200 for `/thank-you`, retained `noindex`, omitted the URL from the sitemap, and the configured Calendly fallback returned HTTP 200 on July 23, 2026.



## 10.6 Service-Specific CTAs

Status: `Completed`

Replace generic CTAs with intent-specific offers:

- IRS notice: `Request an IRS notice review`
- Bookkeeping: `Request a bookkeeping cleanup assessment`
- Business tax: `Book a small-business tax consultation`
- Individual tax: `Get a filing document checklist`
- LLC setup: `Book an entity tax-setup call`
- Payroll: `Request a payroll-record review`
- Tax calculator: `Request a reviewed estimate`

Source completion record (July 23, 2026):

- Added a shared, validated service list and service-aware CTA labels.
- Added service-prefilled contact links for the main service template, Katy bookkeeping, IRS notice help, and LLC tax setup pages.
- Simplified both public lead forms so the service and one contact method are required while company and situation details remain optional.
- Production rendered the service-prefilled contact form and successfully stored the non-sensitive QA submission before cleanup.

---



# 11. P1: Conversion Content and Trust Assets



## 11.1 Pricing or Scope Guidance

Status: `Source Complete for Scope Guidance - Numeric Pricing Waiting for Business Information`

Create `/pricing` or add pricing factors to service pages.

Possible content:

- Starting price or typical range only when real
- What is included
- What increases cost
- What information is needed for a quote
- One-time versus monthly engagement
- Cleanup versus ongoing bookkeeping
- No-surprise/change-order process

Do not invent pricing or claim flat-rate pricing unless it is consistently offered.

Source completion record (July 29, 2026):

- `/pricing` provides service-by-service inclusions, separate-scope items, quote factors, records needed, and timing without inventing prices.
- Shared service and Texas-city templates also explain inclusions, exclusions, pricing factors, deadlines, and limitations.
- Numeric prices, starting prices, retainers, or flat-rate claims remain blocked until the owner supplies real, consistently used commercial terms.

## 11.2 Real Team Page

Status: `Waiting for Verified Owner Information and Original Assets`

- **Supporting requirement:** Real team photos
- **Supporting requirement:** Names and roles
- **Supporting requirement:** Verified credentials
- **Supporting requirement:** Areas of practice
- **Supporting requirement:** Languages
- **Supporting requirement:** Professional memberships
- **Supporting requirement:** Author/reviewer links
- **Supporting requirement:** Personal professional profiles



## 11.3 Case Studies

Status: `Waiting for Client Permission and Documented Facts`

Create anonymized case studies only with client permission and documented facts.

Suggested structure:

- Client situation
- Records/problem at intake
- Scope of work
- Process
- Deliverables
- Timeframe
- Outcome without exaggeration
- Limitations
- Client quote if approved
- Related service CTA

Initial case-study topics:

- Bookkeeping cleanup before business tax filing
- Monthly close process for a growing service business
- Organizing documents for a CP2000 response
- LLC bookkeeping and payroll-readiness setup
- Multi-state income documentation review



## 11.4 Secure Workflow

Status: `Public-Form Safety Complete - Portal and Full Workflow Waiting for Business Information`

- [x] Publish accurate public-form warnings that prohibit sensitive tax and financial information.
- **Supporting requirement:** Link to the real secure portal.
- [x] Explain what must not be emailed or submitted publicly.
- **Supporting requirement:** Explain onboarding, engagement letter, document request, review, filing/response, and follow-up.

Source completion record (July 29, 2026):

- The contact page and both lead forms warn users not to submit Social Security numbers, bank details, tax returns, or other sensitive records.
- The thank-you page warns users not to send sensitive documents through ordinary email until an approved method is confirmed.
- A public portal URL, provider, access process, retention policy, and complete onboarding workflow must not be invented and remain owner dependencies.

---



# 12. P1: Content Roadmap

Status: `Not Started - Qualified Review Capacity Required`

Do not publish all topics at once. Publish only content that a qualified reviewer can improve and maintain.

## High-Intent Content Queue


| Priority | Proposed topic                                                   | Target intent        | Primary CTA            |
| -------- | ---------------------------------------------------------------- | -------------------- | ---------------------- |
| P0       | How much do bookkeeping services cost in Katy, TX?               | Cost/commercial      | Bookkeeping assessment |
| P0       | What to do after receiving a CP2000 notice                       | Urgent IRS problem   | IRS notice review      |
| P0       | CP14 balance-due notice checklist                                | Urgent IRS problem   | IRS notice review      |
| P0       | Bookkeeping cleanup timeline and document checklist              | Commercial           | Cleanup assessment     |
| P0       | First-year Texas LLC tax and accounting calendar                 | LLC startup          | LLC tax-setup call     |
| P1       | S corporation payroll and reasonable compensation basics         | Business tax/payroll | Business consultation  |
| P1       | Quarterly estimated-tax checklist for 1099 professionals         | Planning             | Reviewed estimate      |
| P1       | Individual tax preparation document checklist                    | Filing               | Tax consultation       |
| P1       | Business tax preparation checklist for LLCs and S corporations   | Filing               | Business consultation  |
| P1       | CP2000 vs audit: what is the difference?                         | IRS information      | IRS notice review      |
| P1       | How to change accountants when your books are behind             | Commercial           | Cleanup assessment     |
| P1       | QuickBooks cleanup warning signs                                 | Commercial           | QuickBooks review      |
| P2       | Tax and bookkeeping checklist for Katy real estate professionals | Industry/local       | Industry consultation  |
| P2       | Tax and bookkeeping checklist for medical and dental practices   | Industry             | Industry consultation  |
| P2       | Payroll and bookkeeping checklist for construction contractors   | Industry/local       | Business consultation  |
| P2       | Multi-state filing document checklist                            | Remote/state         | Tax consultation       |




## Existing Blog Refresh

Refresh older generic posts before publishing many new posts:

- Tax planning strategies
- Small-business accounting tips
- IRS compliance guide
- Tax resolution options
- Payroll best practices
- Financial planning for startups

Refresh checklist:

- **Supporting requirement:** Current tax year
- **Supporting requirement:** Named author/reviewer
- **Supporting requirement:** Primary official sources
- **Supporting requirement:** Original examples
- **Supporting requirement:** Practical checklist
- **Supporting requirement:** Clear limitations
- **Supporting requirement:** Service CTA
- **Supporting requirement:** Links to owner landing pages
- **Supporting requirement:** Accurate publish and reviewed dates



## Editorial Calendar

Recommended sustainable cadence:

- One high-quality article per week or two per month
- One existing-page refresh per week
- One GBP post per week
- One email/newsletter per month
- One local partnership or backlink activity per month

Quality and review capacity determine cadence. Do not publish filler to meet a volume target.

---



# 13. P1: Internal Linking Plan

Status: `Next Repository Task - Not Started`



## Hub Structure

Homepage → core service pages → local/service pages → supporting articles → contact/booking

Required actions:

- **Supporting requirement:** Link every article to one primary service page.
- **Supporting requirement:** Link every service page to two or three supporting articles.
- **Supporting requirement:** Link city pages to the correct service owner pages.
- **Supporting requirement:** Link state pages to relevant service hubs without forcing unrelated local anchors.
- **Supporting requirement:** Use descriptive anchor text instead of `Learn More` and `Read More`.
- **Supporting requirement:** Add breadcrumbs to every nested page.
- **Supporting requirement:** Keep priority pages within three clicks of the homepage.
- **Supporting requirement:** Check for orphan pages monthly.
- **Supporting requirement:** Do not add excessive repetitive footer links.

Suggested anchors:

- `Katy bookkeeping services`
- `IRS notice help in Katy`
- `business tax and accounting services`
- `individual tax preparation services`
- `bookkeeping cleanup support`
- `LLC formation tax setup`
- `payroll tax support`
- `federal tax calculator`

---



# 14. P1: Performance and Core Web Vitals

Status: `Major Homepage Source Work Complete - Template Audit and Field Validation Pending`

The PageSpeed API returned a quota error during the July 11 audit. The previous available project Lighthouse result showed mobile performance around 55, LCP around 5.6 seconds, and TBT around 610–730 ms. Re-test before and after changes.

Targets:

- LCP: 2.5 seconds or less
- INP: 200 ms or less
- CLS: 0.1 or less



## Homepage Performance Tasks

- [x] Replace the autoplay client-side hero carousel with one static server-rendered hero.
- [x] Load only the first essential hero image above the fold.
- [x] Use responsive optimized image output through `next/image`.
- **Supporting requirement:** Replace remote stock images with compressed original office/team images.
- [x] Avoid a 3 MB source image when a smaller source is sufficient.
- [x] Confirm image dimensions and `sizes` values.
- **Supporting requirement:** Audit lazy loading across every below-the-fold media instance; the contact map is already lazy and `next/image` handles non-priority images by default.
- **Supporting requirement:** Review third-party script cost.
- [x] Load Google Analytics through `next/script` instead of a blocking synchronous script; validate its real field cost separately.
- [x] Reduce unused client JavaScript in the homepage hero.
- **Supporting requirement:** Test mobile CPU and network throttling.

Source completion record (July 23, 2026):

- Replaced the rotating client component with one server-rendered hero and one priority image.
- Re-encoded the 2.93 MB PNG as a 371 KB JPEG source and labeled it as an illustrative workspace rather than a real IntegraFin office or team photo.
- Kept responsive `next/image` delivery with an explicit `sizes="100vw"` value.
- Production rendered the optimized hero source after deployment `bed58db`; field Core Web Vitals monitoring remains.



## Sitewide Performance Tasks

- **Supporting requirement:** Review Vercel Speed Insights field data.
- **Supporting requirement:** Review GSC Core Web Vitals.
- **Supporting requirement:** Test homepage, contact, calculator, blog, city, and service templates.
- [x] Use `next/font` for optimized, self-hosted-at-build font delivery with `display: swap`.
- **Supporting requirement:** Confirm no layout shifts from images, embeds, or dynamic content.
- [x] Lazy-load the contact-page map iframe; field impact remains part of the template performance test.
- **Supporting requirement:** Check bundle size after each major client component.

---



# 15. P2: Remaining Technical SEO Maintenance

Status: `Source Baseline Partially Complete - External Validation and Recurring Monitoring Pending`

- **Supporting requirement:** Submit and monitor `https://integrafin.tax/sitemap.xml` in GSC.
- **Supporting requirement:** Request indexing for materially changed priority pages.
- **Supporting requirement:** Verify the seven new state pages are discovered and indexed.
- **Supporting requirement:** Review GSC Pages report weekly for crawled-not-indexed and discovered-not-indexed URLs.
- **Supporting requirement:** Check redirects and 404s monthly.
- **Supporting requirement:** Keep lastModified dates accurate; change only after substantial updates.
- [x] Validate canonical host redirects for HTTP and `www`; confirmed in the July 11 audit snapshot.
- **Supporting requirement:** Confirm Open Graph images render correctly.
- **Supporting requirement:** Confirm logo URLs used by schema and metadata return 200.
- **Supporting requirement:** Check all external official-source links quarterly.
- **Supporting requirement:** Monitor Search Console manual actions and security issues.
- [x] Verify admin and thank-you pages are `noindex` in source; thank-you production output was also verified July 23, 2026.
- [x] Exclude admin and thank-you routes from the sitemap.
- **Supporting requirement:** Review sitemap growth before adding more templated pages.

Source reconciliation record (July 29, 2026):

- Admin pages define `index: false, follow: false`; the thank-you page defines `index: false`.
- The sitemap contains public service, location, content, legal, and utility discovery pages but excludes admin and thank-you routes.
- Live GSC coverage, submitted-versus-indexed counts, Core Web Vitals, link checks, and recurring crawl monitoring remain external work.

---



# 16. Competitor Response Strategy



## Patriots Tax & Bookkeeping

Their visible advantages:

- Chamber listing
- Local recognition
- Long experience claim
- CPA positioning
- Client portal and secure-send tools
- Large service/resource center
- Multilingual positioning

IntegraFin response:

- Build verified local authority and reviews.
- Publish real team credentials.
- Add a secure portal and clear process.
- Win focused searches such as IRS notice help, bookkeeping cleanup, and LLC tax setup.
- Highlight one coordinated workflow across books, tax, payroll records, and notices.



## MM CPA Services

Their visible advantages:

- Named CPA/EA professionals
- Active LinkedIn presence
- Client portal
- Years-of-experience proof
- Ongoing tax updates
- Strong business-service positioning

IntegraFin response:

- Add real professional profiles and reviewer identities.
- Create original, practical content with official sources.
- Publish industry-specific case studies.
- Build a consistent LinkedIn and GBP publishing cadence.



## RT Mallard CPA

Their visible advantages:

- Dedicated service pages
- CPA positioning
- Secure file link
- Consultation flow
- Detailed bookkeeping inclusions

Their visible weakness:

- Some testimonial content appears generic or placeholder-like.

IntegraFin response:

- Use only authentic proof.
- Publish clearer scope, onboarding, deliverables, and pricing factors.
- Add secure document exchange and booking.



## Personal Bookkeeping Competitors

Their visible advantages:

- Real owner story
- QuickBooks certifications
- Transparent pricing
- Direct personal service

IntegraFin response:

- Show real people, response expectations, and relationship ownership.
- Add pricing guidance.
- Explain who manages each engagement.
- Combine personal attention with broader tax/accounting capability.



## Recommended IntegraFin Positioning

Primary message:

`Katy-based tax and accounting support that coordinates bookkeeping, business tax preparation, payroll records, and IRS notice response through one organized process.`

Differentiators must be based on real operations:

- Coordinated tax and bookkeeping workflow
- Katy office plus secure remote support
- IRS notice triage and document organization
- LLC first-year tax and bookkeeping setup
- Plain-English communication
- Multi-state support when genuinely available
- Multilingual support only when genuinely available

---



# 17. Canonical Active Backlog and 30/60/90 Sequence

Last reconciled against the repository: July 29, 2026.

Only the checkboxes in this section are counted as active project tasks. Detailed checklists elsewhere define requirements and evidence. A task is complete only when its definition of done is satisfied; source completion and external verification are recorded separately.

| Active category | Count | Task IDs |
| --- | ---: | --- |
| Repository work ready now | 2 | T-101–T-102 |
| External account work | 6 | T-002–T-005, T-108–T-109 |
| Owner facts, proof, or policy decisions | 6 | T-006–T-008, T-105–T-107 |
| Content requiring review | 2 | T-103–T-104 |
| Recurring work after data is available | 5 | T-201–T-205 |
| **Total active tasks** | **21** | |

## P0: Deploy, Measure, and Unblock Trust

- [x] **T-001 `[EXTERNAL]` Deploy and verify the July 29 source changes.** Completed July 29, 2026. Production `/robots.txt` includes `OAI-SearchBot` and `ChatGPT-User`; representative service/location anchors render; the AI-UTM contact path and deployed analytics classifier/event bundle were verified; runtime GA4/DebugView validation remains correctly assigned to T-003.
- [ ] **T-002 `[EXTERNAL]` Submit the sitemap and request indexing for materially changed priority URLs in GSC.** Dependency: verified Search Console access and T-001. Done when the sitemap is accepted, priority URLs are inspected/requested, and submitted evidence and dates are recorded.
- [ ] **T-003 `[EXTERNAL]` Finish GA4 administration and live event QA.** Dependency: GA4 admin access and T-001. Done when `generate_lead` is a key event; `ai_source` and `traffic_channel` are registered where required; form, phone, booking-start, calculator, and AI-referral events are verified once in DebugView; and no sensitive values appear.
- [ ] **T-004 `[EXTERNAL]` Configure production lead-notification email and verify delivery.** Dependency: approved Resend sender/domain and Vercel environment access. Done when `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, and `LEAD_NOTIFICATION_TO` are configured, a non-sensitive QA lead records `notificationStatus: sent`, and the QA record is cleaned up or marked spam.
- [ ] **T-005 `[EXTERNAL]` Verify Calendly completion ingestion and add `booking_complete` measurement.** Dependency: Calendly webhook/account access and T-001. Done when a test booking is associated with the lead or safely attributed session, appointment status is stored, `booking_complete` fires once without personal data, and cancellation behavior is verified.
- [ ] **T-006 `[OWNER]` Complete the verified business-information packet in Section 2.** Dependency: owner documents and decisions. Done when legal name, address eligibility, team, credentials, representation authority, real services, languages, industries, pricing policy, consultation policy, response expectations, portal, and approved proof assets are documented.
- [ ] **T-007 `[OWNER]` Obtain qualified review of material tax, credential, guarantee, and representation claims.** Dependency: T-006 and an identified qualified reviewer. Done when the reviewer, scope, date, corrections, and approval evidence are recorded without inventing public credentials.
- [ ] **T-008 `[OWNER]` Decide and document the GPTBot training policy.** Dependency: owner consent decision. Done when the choice is recorded and `robots.ts` is changed only if the owner chooses to block training; ChatGPT search and user-requested retrieval remain separate policies.

T-001 completion evidence:

- Release commit `0e9446b` was pushed to `main`.
- GitHub reported successful Vercel deployments for both `integrafin-tax` and `integrafin_web`.
- Live `/robots.txt` returned HTTP 200 with wildcard, `OAI-SearchBot`, and `ChatGPT-User` rules while preserving `/admin` exclusions.
- Live business-tax, Houston city, Houston IRS-notice, California state, and AI-UTM contact URLs returned HTTP 200.
- Stable `overview`, `services` or `direct-answer`, `official-resources`, and `frequently-asked-questions` anchors were verified on the applicable representative templates.
- The served production JavaScript bundle contained `ai_referral_visit`, `integrafin_ai_referral_visit_v1`, and the ChatGPT source classifier. A real-browser GA4 event check is not claimed here and remains part of T-003.

## P1: Repository Work Ready to Start

- [ ] **T-101 `[SOURCE]` Implement intent-based internal linking.** Dependency: none. Done when each article links to one primary owner service, each priority service links to two or three relevant articles, city/state templates link to appropriate service owners, generic `Read More` anchors are replaced where context permits, nested-page breadcrumb coverage is audited, and an orphan/depth report is saved.
- [ ] **T-102 `[SOURCE]` Complete the remaining source performance audit.** Dependency: none. Done when below-the-fold media, third-party scripts, analytics loading, image dimensions, map behavior, and major client bundles are reviewed across homepage, contact, calculator, blog, city, and service templates; safe fixes are implemented; and remaining field-only checks are separated.
- [ ] **T-103 `[CONTENT]` Refresh three older high-opportunity articles.** Dependency: T-007 for final tax review. Done when each chosen article has current dates/rules, primary sources, useful original examples, a practical checklist, limitations, one owner service CTA, accurate modified dates, and reviewer evidence.
- [ ] **T-104 `[CONTENT]` Publish the first bottom-of-funnel guide.** Dependency: keyword validation and T-007. Start with one of: bookkeeping cost in Katy, CP2000 response, CP14 checklist, bookkeeping-cleanup timeline, or Texas LLC first-year calendar. Done when one differentiated guide is published, internally linked, reviewed, indexed, and measured before another guide is approved.
- [ ] **T-105 `[OWNER]` Publish real team and office proof.** Dependency: T-006 plus publishable names, roles, original photos, and credential evidence. Done when the About/team content and schema match verified visible facts and no stock image is presented as proof.
- [ ] **T-106 `[OWNER]` Publish the secure-client workflow.** Dependency: verified portal provider/URL and real operating process. Done when the portal link, document rules, onboarding, engagement letter, request/review/filing flow, and support boundaries are accurately explained.
- [ ] **T-107 `[OWNER]` Publish the first genuine case study.** Dependency: documented facts and client permission. Done when the situation, scope, process, timeframe, outcome, limitations, permission, and related CTA are supported without sensitive information or exaggerated results.
- [ ] **T-108 `[EXTERNAL]` Resume Google Business Profile and genuine-review work when approved by the owner.** Dependency: verified GBP/address eligibility and owner approval. Done when the profile facts, categories, services, photos, appointment UTM, review link, request process, and response policy are verified. This task is pending—not completed—while deferred.
- [ ] **T-109 `[EXTERNAL]` Build priority citations and local/professional authority.** Dependency: T-006 legal/NAP facts. Done when selected Bing, Apple, chamber, professional, and reputable directory profiles use consistent verified data and the first two or three relevant earned links are documented.

## Recurring Tasks After Data Is Available

- [ ] **T-201 `[RECURRING — weekly]` Review GSC indexing, crawl exclusions, manual actions, security issues, redirects, and 404s.** Start after T-002; record each review date and exceptions.
- [ ] **T-202 `[RECURRING — monthly]` Review qualified-lead and revenue performance.** Start after T-003 and T-004; compare organic and AI referrals, landing pages, services, form/phone/booking conversion, lead quality, appointments, clients won, response time, and revenue.
- [ ] **T-203 `[RECURRING — monthly]` Review performance field data.** Start after T-001; use Vercel Speed Insights and GSC Core Web Vitals for the main templates and open specific remediation tasks for regressions.
- [ ] **T-204 `[RECURRING — monthly]` Review query-to-page ownership and content value.** Start after 28 days of stable data; improve low-CTR pages, improve traffic-without-leads pages, and consolidate pages with no differentiated value.
- [ ] **T-205 `[RECURRING — quarterly]` Audit external official-source links, citation consistency, backlinks, sitemap growth, review reuse permissions, and whether more city/state content is justified.**

## Completed Milestones Kept for Reference

- Credential claims and the inaccurate Person schema were removed or corrected July 11, 2026.
- The anonymous testimonial and generic unsupported trust claims were removed and production-verified July 14, 2026.
- Lead attribution, pipeline/revenue feedback, service-aware forms, thank-you flow, and protected lead operations were implemented and tested July 15–23, 2026.
- Homepage hero simplification, source-image optimization, metadata cleanup, pricing/scope guidance, structured-data graph work, and OpenAI search crawler access were implemented by July 29, 2026.
- AI referral classification, GA4 event source code, lead storage, admin filtering, stable citation anchors, and explicit `ChatGPT-User` access were implemented, build-verified, deployed, and HTTP-verified July 29, 2026; T-003 covers the remaining GA4 runtime/account verification.

## Sequence

- Days 1–14: T-001 through T-008, starting all available external configuration and owner-information work in parallel.
- Days 15–30: T-101 and T-102; begin T-105 through T-109 only as their owner dependencies arrive.
- Days 31–60: T-103 and one T-104 guide after qualified review; do not publish the entire content queue at once.
- Days 61–90: run T-201 through T-205 and use measured qualified leads and revenue—not page count—to select the next work.

---



# 18. KPI Dashboard



## Google Search Console

- Total clicks
- Total impressions
- CTR
- Average position
- Branded versus non-branded queries
- Query by landing page
- Local service queries
- Indexed pages
- Crawled-not-indexed pages
- Core Web Vitals
- Manual actions/security issues



## Google Business Profile

- Search terms
- Profile views
- Website clicks
- Calls
- Messages
- Direction requests
- Review count
- Average rating
- Review response rate
- Photo views



## GA4 and Analytics

- Organic landing-page sessions
- Engaged sessions
- Form starts
- Lead submissions
- Phone clicks
- WhatsApp clicks
- Booking completions
- Conversion rate by page
- Conversion rate by device
- Source/medium/campaign
- ChatGPT and AI referrals



## CRM and Revenue

- New leads
- Qualified leads
- Appointments
- Proposals
- Clients won
- Close rate
- Revenue by service
- Revenue by landing page
- Revenue by source
- Cost per acquired client when paid channels are used
- Time to first response



## Reporting Cadence

- Weekly: errors, leads, GBP actions, ranking movement, review requests
- Monthly: traffic, conversions, lead quality, revenue, content results
- Quarterly: content consolidation, backlink quality, service priorities, conversion strategy

Do not judge SEO only by traffic. Qualified leads, clients, and revenue are the business outcomes.

---



# 19. Launch QA Checklist for Every SEO Change

This is a reusable release template, not an active backlog. Copy the applicable items into a dated deployment record and record pass, fail, or not applicable.

- Page returns HTTP 200.
- Exactly one H1.
- Unique title and description.
- Correct canonical URL.
- Index/follow is correct.
- Included in sitemap only if indexable and valuable.
- Mobile layout works.
- No horizontal overflow.
- Images load with useful alt text.
- No console errors.
- Internal links resolve.
- External sources resolve.
- JSON-LD is valid and matches visible content.
- CTA works.
- Form success and failure states work.
- Analytics event fires once.
- No sensitive data enters analytics.
- Lead appears in the CRM/database.
- Notification is delivered.
- PageSpeed/CWV checked.
- GSC URL Inspection completed for priority pages.
- Completion evidence added to this plan or `seo-track.md`.

---



# 20. Practices to Avoid

- Do not create fake reviews, testimonials, credentials, awards, offices, or statistics.
- Do not guarantee rankings, refunds, tax savings, penalty relief, or IRS outcomes.
- Do not mass-produce AI articles or near-duplicate location pages.
- Do not buy low-quality backlinks.
- Do not use private blog networks.
- Do not keyword-stuff headings, anchors, GBP names, or reviews.
- Do not create many pages targeting the same keyword.
- Do not change dates without reviewing content.
- Do not rely on FAQ schema as a ranking strategy.
- Do not send personal or financial information to analytics.
- Do not publish sensitive client information in case studies.
- Do not expose tax documents through a public upload form.
- Do not add `llms.txt` instead of doing fundamental SEO work.
- Do not add more state/city pages until existing expansion is measured.

---



# 21. Official Guidance References

- Google people-first content and E-E-A-T: [https://developers.google.com/search/docs/fundamentals/creating-helpful-content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google AI features and normal SEO requirements: [https://developers.google.com/search/docs/appearance/ai-features](https://developers.google.com/search/docs/appearance/ai-features)
- Google local ranking factors: [https://support.google.com/business/answer/7091](https://support.google.com/business/answer/7091)
- Google structured-data policies: [https://developers.google.com/search/docs/appearance/structured-data/sd-policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- Google LocalBusiness schema: [https://developers.google.com/search/docs/appearance/structured-data/local-business](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- Google FAQ rich-result limitations: [https://developers.google.com/search/blog/2023/08/howto-faq-changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- OpenAI ChatGPT search availability guidance: [https://help.openai.com/en/articles/9237897-chatgpt-search](https://help.openai.com/en/articles/9237897-chatgpt-search)
- OpenAI publisher/developer crawler and referral guidance: [https://help.openai.com/en/articles/12627856-publishers-and-developers-faq](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

---



# 22. Current Priority Order

This summary reflects the July 29, 2026 reconciliation. Section 17 task IDs control execution and completion.

1. T-001 is complete; finish Search Console indexing and GA4/notification/booking configuration next: T-002 through T-005.
2. Complete verified business facts and qualified claim review: T-006 through T-008.
3. Complete intent-based internal linking and the remaining source performance audit: T-101 and T-102.
4. Add real people, office, workflow, portal, and case-study proof only after owner evidence is available: T-105 through T-107.
5. Resume GBP, genuine reviews, citations, and earned local/professional authority when approved: T-108 and T-109.
6. Refresh three existing articles before expanding publication volume: T-103.
7. Publish and measure one bottom-of-funnel guide before approving another: T-104.
8. Run the recurring measurement and maintenance program: T-201 through T-205.
9. Approve new city/state pages only when Search Console demand, differentiated proof, qualified leads, and maintenance capacity justify them.

The fastest realistic route to more qualified leads is not publishing more generic pages. It is combining IntegraFin's strong technical/content foundation with verifiable expertise, real local prominence, genuine reviews, clear conversion paths, fast lead follow-up, and source-to-revenue measurement.
