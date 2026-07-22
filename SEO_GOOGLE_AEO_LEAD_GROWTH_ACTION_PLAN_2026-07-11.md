# IntegraFin Google SEO, AEO, Local Visibility, and Lead Growth Action Plan

Plan date: July 11, 2026  
Website: [https://integrafin.tax](https://integrafin.tax)
Primary market: Katy, Fort Bend County, West Houston, and remote U.S. tax/accounting clients  
Primary business objective: Generate qualified tax, bookkeeping, IRS notice, tax resolution, and LLC tax-setup leads  
Repository: `C:\Users\Public\Downloads\integrafin_web`

## Purpose of This File

This is the single implementation checklist for improving IntegraFin's visibility in Google Search, Google Maps, Google AI Overviews/AI Mode, ChatGPT search, and other answer engines while increasing qualified client inquiries.

This plan does not guarantee rankings. Search visibility depends on competition, location, relevance, website quality, business prominence, reviews, links, user behavior, and search-engine decisions.

## How to Use This Plan

Use these status labels:

- `Not Started`
- `Waiting for Business Information`
- `In Progress`
- `Ready for Review`
- `Completed`
- `Monitoring`
- `Rejected`

For every completed task, record:

- Completion date
- Person responsible
- Exact URL or file changed
- Proof such as Search Console screenshot, live URL, GBP screenshot, analytics event, or test result
- Baseline metric
- Result after 14, 30, 60, and 90 days

---



# 1. Current Audit Snapshot



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



## Main Growth Bottlenecks

1. Verifiable trust, credentials, authorship, and reviews are weaker than competitors.
2. Google Business Profile prominence and local citations need more work.
3. The site has many pages but limited public proof such as named team members, credentials, client reviews, case studies, and community recognition.
4. The homepage and Katy tax-accountant page can compete for the same keyword if their intent is not kept separate.
5. Lead attribution, conversion events, CRM notifications, and source-to-revenue reporting are incomplete.
6. The homepage carousel and media may still hurt mobile LCP and interaction performance.
7. Some titles and descriptions are longer than ideal and may be rewritten.
8. Google has not necessarily recrawled all newly deployed content yet.
9. OAI-SearchBot is allowed by the wildcard robots rule but is not explicitly named.
10. Several visible and structured-data credential claims require verification.



## Current Priority Scores


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

- [ ] Which named team members work for IntegraFin?
- [ ] Which team members are U.S. CPAs?
- [ ] Which team members are Enrolled Agents?
- [ ] Which team members are Chartered Accountants, and in which country/jurisdiction?
- [ ] Which licenses or credentials can be verified publicly?
- [ ] Who can legally and professionally represent clients before the IRS?
- [ ] Which services are directly performed by IntegraFin and which are referred to partners?
- [ ] Does IntegraFin provide a genuine secure client portal? Record its URL and provider.
- [ ] Is a free consultation genuinely offered?
- [ ] Is a 24-hour response time operationally achievable?
- [ ] Does IntegraFin use flat-rate pricing? If yes, document real ranges and scope.
- [ ] Which industries have actual client experience?
- [ ] Which languages are genuinely supported during client service?
- [ ] What is the exact legal entity name used on contracts, invoices, tax documents, GBP, and directories?
- [ ] Is the Katy address client-facing, staffed, and eligible under Google Business Profile rules?
- [ ] Which existing clients have approved public testimonials or case studies?

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
- [ ] Create one Person/ProfilePage entity per real professional only after credentials are verified.
- [ ] Use real name, job title, image, employer, credential, license jurisdiction, profile URL, and verified sameAs links.
- [x] Do not use `alumniOf` for a licensing board.
- [ ] Validate the live About page after deployment.

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
- [ ] Display reviewer name or approved initials, company/industry when permitted, service used, date, and source.
- [ ] Link to the original Google review when possible.
- [ ] Never create fake reviews or mark up self-created reviews as Google ratings.



## 3.4 Replace Generic Trust Sections With Proof

Status: `Done`

Replace generic statements such as `Trust`, `Security`, `Years of Combined Experience`, and `Our Guarantees` with verified proof:

- [ ] Number of years in operation
- [ ] Named professionals and credentials
- [ ] Real Google review count and rating
- [ ] Secure portal provider and process; no provider is claimed until it is verified.
- [ ] Real office photos; current stock imagery is explicitly labeled illustrative and is not presented as team or office proof.
- [ ] Typical response time
- [x] Engagement and onboarding steps
- [ ] Languages genuinely supported
- [ ] Industries with documented client experience
- [ ] Professional memberships
- [ ] Client-retention or service statistics only when measured

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
- [ ] Have a qualified professional or attorney review material claims. Owner action required before final sign-off.

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

- [ ] Confirm the profile is verified.
- [ ] Use the exact legal/public-facing name consistently.
- [ ] Confirm the Katy address complies with GBP rules.
- [ ] Confirm phone, website, hours, holiday hours, and appointment URL.
- [ ] Choose the most accurate primary category.
- [ ] Add accurate secondary categories such as bookkeeping service, tax consultant, accountant, or payroll service only when applicable.
- [ ] Add every real service with short descriptions.
- [ ] Add service areas without creating false offices.
- [ ] Upload real office exterior, suite entrance, interior, team, and work-process photos.
- [ ] Add a logo and cover image.
- [ ] Add appointment and contact links with UTM tracking.
- [ ] Publish one useful GBP post every week.
- [ ] Answer GBP questions using accurate, non-promotional language.
- [ ] Monitor calls, website clicks, messages, directions, and search terms monthly.

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

- [ ] Create a direct Google review link.
- [ ] Ask every eligible real client after a successful milestone.
- [ ] Send the request by email or SMS with no incentive.
- [ ] Do not review-gate or ask only happy clients.
- [ ] Respond to every review professionally.
- [ ] Mention service context naturally in responses without keyword stuffing.
- [ ] Track requests sent, reviews received, rating, and response time.
- [ ] Obtain client permission before reusing review text on the website.

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

- [ ] Bing Places
- [ ] Apple Business Connect
- [ ] Yelp
- [ ] Facebook
- [x] LinkedIn company page - profile and Katy address verified July 14, 2026; older posts with conflicting phone/email still require correction.
- [ ] Katy Area Chamber of Commerce
- [ ] Fort Bend Chamber of Commerce
- [ ] BBB, if the business chooses and qualifies
- [ ] QuickBooks ProAdvisor directory, only for certified professionals
- [ ] IRS preparer directory, only for eligible credentialed professionals
- [ ] Relevant state or professional associations
- [ ] Reputable local business directories

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

- [ ] Export GSC queries and landing pages for the last 90 days.
- [ ] Identify queries where multiple IntegraFin URLs receive impressions.
- [ ] Choose one owner URL per query cluster.
- [ ] Reposition competing pages instead of deleting useful content blindly.
- [ ] Update internal anchors to point to the owner URL.
- [ ] Request indexing after material intent changes.
- [ ] Monitor for 28 days before making another major change.

Pause additional city/state page creation until current pages demonstrate impressions, engagement, and differentiated value.

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

- [ ] Verify live title and description.
- [x] Verify canonical URL in source.
- [ ] Inspect mobile and desktop snippets.
- [ ] Request recrawl for priority pages.
- [ ] Measure CTR in GSC after 28 days.

Source completion record (July 23, 2026):

- Shortened the seven title outliers listed above while preserving their primary intent and IntegraFin branding.
- Production build verification passed before deployment; GSC recrawl and CTR monitoring remain external follow-up actions.

Live verification record (July 23, 2026):

- Deployed in commit `bed58db`; all seven pages returned HTTP 200 with the new titles in rendered production HTML.
- Canonicals remained intact. Search Console recrawl and the 28-day CTR comparison remain external follow-up actions.

---



# 7. P1: On-Page SEO and AEO Page Template

Use this template for every important service, city, and high-intent article.

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

- [ ] Answer the query completely before promoting the service.
- [ ] Add original examples and process knowledge.
- [ ] Do not rewrite competitors or IRS pages without additional value.
- [ ] Do not write to an arbitrary word count.
- [ ] Do not change review dates without substantive review.
- [ ] Disclose substantial AI assistance when readers would reasonably expect disclosure.
- [ ] Have tax content reviewed by a qualified named professional.
- [ ] Correct or archive outdated information promptly.

---



# 8. P1: Structured Data Plan

Structured data must match visible content exactly.

## Root Organization and LocalBusiness

File: `src/lib/seo/schema.ts`

- [x] Add stable `@id` values for the Organization and LocalBusiness entities. Completed July 14, 2026.
- [x] Use the documented public name and legal name. Completed in source July 14, 2026; confirm the same names in GBP before final NAP sign-off.
- [x] Verify website address, phone, hours, geo coordinates, priceRange, and areaServed. Source audit completed July 14, 2026; GBP confirmation remains pending.
- [ ] Add a real business image.
- [x] Keep only verified `sameAs` profiles. LinkedIn retained; unverified Instagram and X profiles removed July 14, 2026.
- [ ] Verify the Yelp URL before keeping it.
- [ ] Do not add self-serving aggregateRating markup.
- [ ] Connect Organization, LocalBusiness, WebSite, WebPage, Service, and Person entities with stable IDs.



## Page-Level Schema

- [ ] Homepage: Organization/LocalBusiness and WebSite.
- [ ] Service pages: Service and BreadcrumbList.
- [ ] City pages: Service, BreadcrumbList, and visible FAQ content.
- [ ] Blog posts: Article/BlogPosting, named author, reviewer where appropriate, dates, image, publisher, and citations.
- [ ] About/team profiles: real Person and ProfilePage only.
- [x] Contact page: ContactPage references the canonical LocalBusiness entity and its contact point. Completed July 14, 2026.
- [ ] Calculator: WebApplication/SoftwareApplication only if implementation accurately matches properties.



## FAQ Schema Limitation

FAQ markup can remain when it matches visible content, but Google normally restricts FAQ rich results to authoritative government and health websites. Do not treat FAQ schema as a ranking shortcut.

## Validation

- [ ] Google Rich Results Test
- [ ] Schema.org Validator
- [ ] GSC Enhancement reports
- [ ] URL Inspection rendered HTML
- [ ] Manual check that schema text matches visible text

---



# 9. P1: ChatGPT, Google AI, and Answer-Engine Visibility

Google says AI Overviews and AI Mode use normal SEO fundamentals. No special AI schema or machine-readable AI file is required.

## 9.1 Robots and Crawler Policy

File: `src/app/robots.ts`

Status: `Source and Live Output Complete - CDN Monitoring Pending`

Current wildcard behavior allows OAI-SearchBot, but add an explicit rule for clarity:

```text
User-agent: OAI-SearchBot
Allow: /
```

- [x] Keep important pages crawlable.
- [ ] Ensure Vercel/CDN/firewall allows published crawler IPs.
- [ ] Decide separately whether to allow GPTBot training access.
- [ ] Keep ChatGPT-User access if user-requested page retrieval is desired.
- [x] Do not block CSS, JavaScript, or important images required for rendering.

Source completion record (July 23, 2026):

- Added an explicit `OAI-SearchBot` allow rule while preserving `/admin` exclusions.
- Wildcard crawling remains enabled for public pages and assets.
- Production `robots.txt` returned HTTP 200 with the explicit rule after deployment `bed58db`.

Crawler purpose:

- OAI-SearchBot: ChatGPT search discovery and citation.
- GPTBot: potential training use.
- ChatGPT-User: user-requested page access.
- Googlebot: Google Search and AI features in Search.
- Google-Extended: controls some Google AI training/grounding uses, not normal Google Search indexing.



## 9.2 Make Content Easy to Cite

- [ ] Put the direct factual answer near the top.
- [ ] Use stable headings and anchors.
- [ ] Cite IRS and state primary sources.
- [ ] Identify author and reviewer.
- [ ] State the applicable tax year and jurisdiction.
- [ ] Include concrete dates instead of vague language.
- [ ] Explain limitations and exceptions.
- [ ] Keep important facts in visible HTML text.
- [ ] Use descriptive ARIA labels on interactive elements.
- [ ] Avoid hiding essential answers behind tabs or client-side interactions.



## 9.3 AI Referral Measurement

- [ ] Create a GA4 segment for `utm_source=chatgpt.com`.
- [ ] Track referrals from ChatGPT, Perplexity, Gemini, Copilot, Bing, and other identifiable sources.
- [ ] Record landing page, service selected, lead quality, appointment, client, and revenue.
- [ ] Review AI referral conversions monthly, not only sessions.

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
- [ ] `booking_complete` - requires a verified Calendly completion integration or webhook.
- [x] `calculator_complete`
- [ ] `portal_click` - listener is ready, but the site has no verified portal destination yet.

Event parameters:

- [x] Service
- [x] Landing page
- [x] Page type
- [x] City/state intent
- [x] Form source
- [x] CTA name
- [ ] Device category - available as a standard GA4 dimension; verify after deployment.
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
- [ ] Add SMS/Slack/Teams notification if operationally useful.
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
- [ ] Provide service-specific document preparation—not sensitive document upload through the public form.
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

Status: `Waiting for Business Information`

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

## 11.2 Real Team Page

- [ ] Real team photos
- [ ] Names and roles
- [ ] Verified credentials
- [ ] Areas of practice
- [ ] Languages
- [ ] Professional memberships
- [ ] Author/reviewer links
- [ ] Personal professional profiles



## 11.3 Case Studies

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

- [ ] Publish an accurate explanation of document handling.
- [ ] Link to the real secure portal.
- [ ] Explain what must not be emailed or submitted publicly.
- [ ] Explain onboarding, engagement letter, document request, review, filing/response, and follow-up.

---



# 12. P1: Content Roadmap

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

- [ ] Current tax year
- [ ] Named author/reviewer
- [ ] Primary official sources
- [ ] Original examples
- [ ] Practical checklist
- [ ] Clear limitations
- [ ] Service CTA
- [ ] Links to owner landing pages
- [ ] Accurate publish and reviewed dates



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



## Hub Structure

Homepage → core service pages → local/service pages → supporting articles → contact/booking

Required actions:

- [ ] Link every article to one primary service page.
- [ ] Link every service page to two or three supporting articles.
- [ ] Link city pages to the correct service owner pages.
- [ ] Link state pages to relevant service hubs without forcing unrelated local anchors.
- [ ] Use descriptive anchor text instead of `Learn More` and `Read More`.
- [ ] Add breadcrumbs to every nested page.
- [ ] Keep priority pages within three clicks of the homepage.
- [ ] Check for orphan pages monthly.
- [ ] Do not add excessive repetitive footer links.

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

The PageSpeed API returned a quota error during the July 11 audit. The previous available project Lighthouse result showed mobile performance around 55, LCP around 5.6 seconds, and TBT around 610–730 ms. Re-test before and after changes.

Targets:

- LCP: 2.5 seconds or less
- INP: 200 ms or less
- CLS: 0.1 or less



## Homepage Performance Tasks

- [x] Replace the autoplay client-side hero carousel with one static server-rendered hero.
- [x] Load only the first essential hero image above the fold.
- [x] Use responsive optimized image output through `next/image`.
- [ ] Replace remote stock images with compressed original office/team images.
- [x] Avoid a 3 MB source image when a smaller source is sufficient.
- [x] Confirm image dimensions and `sizes` values.
- [ ] Lazy-load below-the-fold media.
- [ ] Review third-party script cost.
- [ ] Load analytics in a way that minimizes main-thread blocking.
- [x] Reduce unused client JavaScript in the homepage hero.
- [ ] Test mobile CPU and network throttling.

Source completion record (July 23, 2026):

- Replaced the rotating client component with one server-rendered hero and one priority image.
- Re-encoded the 2.93 MB PNG as a 371 KB JPEG source and labeled it as an illustrative workspace rather than a real IntegraFin office or team photo.
- Kept responsive `next/image` delivery with an explicit `sizes="100vw"` value.
- Production rendered the optimized hero source after deployment `bed58db`; field Core Web Vitals monitoring remains.



## Sitewide Performance Tasks

- [ ] Review Vercel Speed Insights field data.
- [ ] Review GSC Core Web Vitals.
- [ ] Test homepage, contact, calculator, blog, city, and service templates.
- [ ] Check font loading and consider self-hosting fonts if appropriate.
- [ ] Confirm no layout shifts from images, embeds, or dynamic content.
- [ ] Review map iframe impact on the contact page.
- [ ] Check bundle size after each major client component.

---



# 15. P2: Remaining Technical SEO Maintenance

- [ ] Submit and monitor `https://integrafin.tax/sitemap.xml` in GSC.
- [ ] Request indexing for materially changed priority pages.
- [ ] Verify the seven new state pages are discovered and indexed.
- [ ] Review GSC Pages report weekly for crawled-not-indexed and discovered-not-indexed URLs.
- [ ] Check redirects and 404s monthly.
- [ ] Keep lastModified dates accurate; change only after substantial updates.
- [ ] Validate canonical host redirects for HTTP and `www`.
- [ ] Confirm Open Graph images render correctly.
- [ ] Confirm logo URLs used by schema and metadata return 200.
- [ ] Check all external official-source links quarterly.
- [ ] Monitor Search Console manual actions and security issues.
- [ ] Verify admin and thank-you pages are noindex.
- [ ] Do not include low-value utility pages in the sitemap.
- [ ] Review sitemap growth before adding more templated pages.

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



# 17. 30/60/90-Day Execution Plan



## Days 1–14: Fix Trust and Measurement

- [x] Verify or remove all CPA/CA/EA/certified/licensed claims. Completed July 11, 2026; see sections 3.1 and 3.2.
- [x] Remove or replace the inaccurate Person schema. Completed July 11, 2026; see section 3.1.
- [x] Deploy the source change that removes the anonymous testimonial, then verify the live homepage. Production deployment `771dd38` returned HTTP 200 with the testimonial absent on July 14, 2026.
- [x] Owner-deferred follow-up: finish external NAP cleanup by correcting older LinkedIn posts using `(832) 774-1882` and `hello@integrafin.tax`. Website/schema verification is complete; owner will handle the remaining external edits later.
- [x] Deferred by owner: complete and verify GBP. Skipped for now on July 14, 2026.
- [x] Deferred with GBP: start the real review-request workflow when a verified review destination is active or the owner selects another verified review source.
- [x] Add GA4 conversion events. Source complete; GA4 key-event configuration and live DebugView verification remain.
- [x] Add lead attribution fields. Source complete; live UTM lead verification remains.
- [x] Add immediate lead notifications. Source complete; provider environment configuration and live delivery verification remain.
- [x] Create thank-you and booking flow. Source complete; booking-completion integration remains.
- [x] Add explicit OAI-SearchBot permission. Source complete July 23, 2026; live robots verification remains.
- [x] Shorten metadata outliers. Source complete July 23, 2026; live metadata verification and recrawl remain.
- [ ] Request indexing for materially changed priority pages.



## Days 15–30: Improve Proof and Conversion

- [ ] Publish real team profiles.
- [ ] Add real office and team photography.
- [ ] Add secure-portal link and process explanation.
- [ ] Add pricing or scope guidance.
- [x] Replace generic trust blocks with evidence. Deployed and verified July 14, 2026.
- [ ] Create first genuine case study.
- [x] Simplify the homepage hero. Source complete July 23, 2026; live CWV verification remains.
- [x] Improve service-specific CTAs and forms. Source complete July 23, 2026; live form verification remains.
- [ ] Create GSC, GBP, GA4, and CRM dashboard. The protected lead operations dashboard is complete; external dashboard integrations remain.



## Days 31–60: Build Bottom-of-Funnel Authority

- [ ] Publish bookkeeping-cost guide.
- [ ] Publish CP2000 guide.
- [ ] Publish CP14 checklist.
- [ ] Publish bookkeeping-cleanup timeline.
- [ ] Publish Texas LLC first-year calendar.
- [ ] Refresh three older blog posts.
- [ ] Add internal links and reviewer information.
- [ ] Join or complete priority chamber/citation profiles.
- [ ] Earn two or three relevant local/professional backlinks.



## Days 61–90: Optimize Using Real Data

- [ ] Review GSC query-to-page ownership.
- [ ] Review indexed versus submitted URLs.
- [ ] Compare CTR before and after metadata changes.
- [ ] Review GBP discovery terms, calls, messages, and directions.
- [ ] Review AI referral leads.
- [ ] Review form, phone, WhatsApp, and booking conversion rates.
- [ ] Improve pages with impressions but low CTR.
- [ ] Improve pages with traffic but low conversion.
- [ ] Consolidate or rewrite pages with no differentiated value.
- [ ] Earn remaining local backlinks.
- [ ] Publish second case study.
- [ ] Decide whether new state/city content is justified by demand and proof.

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

- [ ] Page returns HTTP 200.
- [ ] Exactly one H1.
- [ ] Unique title and description.
- [ ] Correct canonical URL.
- [ ] Index/follow is correct.
- [ ] Included in sitemap only if indexable and valuable.
- [ ] Mobile layout works.
- [ ] No horizontal overflow.
- [ ] Images load with useful alt text.
- [ ] No console errors.
- [ ] Internal links resolve.
- [ ] External sources resolve.
- [ ] JSON-LD is valid and matches visible content.
- [ ] CTA works.
- [ ] Form success and failure states work.
- [ ] Analytics event fires once.
- [ ] No sensitive data enters analytics.
- [ ] Lead appears in the CRM/database.
- [ ] Notification is delivered.
- [ ] PageSpeed/CWV checked.
- [ ] GSC URL Inspection completed for priority pages.
- [ ] Completion evidence added to this plan or `seo-track.md`.

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



# 22. Final Priority Order

Execute work in this order:

1. Verify and correct trust/credential claims.
2. Complete GBP and build genuine reviews.
3. Install lead attribution, conversion tracking, notifications, and CRM feedback.
4. Add real team, office, portal, pricing/process, and case-study proof.
5. Separate keyword ownership between homepage, local pages, and service pages.
6. Simplify the homepage hero and improve mobile performance.
7. Refresh high-intent service content and older articles.
8. Earn local and professional backlinks.
9. Optimize for AI citations through clear answers, primary sources, authorship, and crawl access.
10. Use GSC, GBP, GA4, and revenue data to decide the next pages and campaigns.

The fastest realistic route to more qualified leads is not publishing more generic pages. It is combining IntegraFin's strong technical/content foundation with verifiable expertise, real local prominence, genuine reviews, clear conversion paths, fast lead follow-up, and source-to-revenue measurement.
