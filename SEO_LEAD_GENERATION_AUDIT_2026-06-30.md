# IntegraFin SEO and Lead Generation Audit

Audit date: 2026-06-30  
Website: https://integrafin.tax/  
Business focus: U.S. tax preparation, accounting, bookkeeping, LLC/business formation, IRS notice/tax resolution help  
Primary goal: more organic traffic and qualified leads

## Executive Summary

IntegraFin has a stronger technical base than the prior June 2026 audit: the live site returns 200 for the important pages, `robots.txt` allows crawling, the XML sitemap is live, the HTML sitemap works, old service URLs redirect, `/test-db` is no longer public, `/industries` is now in the sitemap, and production build passes.

The biggest growth bottleneck is no longer basic crawlability. The current bottleneck is lead-intent coverage and trust. The site has many location pages, but several money services are still buried inside `/services` tabs instead of having dedicated landing pages. The local SEO tracker also shows many new/updated priority URLs still waiting for Google Search Console indexing requests. For local lead generation, Google Business Profile, reviews, citations, and visible proof signals are now more urgent than creating more city pages.

## Validation Performed

- Live homepage, robots, sitemap, HTML sitemap, contact, services, industries, core Texas pages, blog pages, and legacy service redirects checked.
- Sitemap crawl found 43 sitemap URLs; all returned 200 in the crawl.
- Internal-link crawl found 43 unique internal links and no broken internal links.
- `npm run lint` passed.
- `npm run build` passed; 51 static pages generated.
- PageSpeed Insights API was unavailable from this environment due a 429 quota response.
- Lighthouse lab check on homepage: Performance 55, Accessibility 88, Best Practices 100, SEO 92, FCP 3.1s, LCP 5.6s, TBT 610-730ms, CLS 0, total page weight about 648 KiB.

## Main SEO Problems and Fixes

| Problem | Why it matters | Exact recommended fix | Priority | Expected impact |
|---|---|---|---|---|
| Priority pages are live but many are still waiting for GSC indexing requests. | Google may not crawl/rank new pages quickly even if they are in sitemap. | In Google Search Console, request indexing for `/texas/katy-tax-accountant`, `/texas/katy-bookkeeping-services`, `/texas/irs-notice-help-katy-tx`, `/texas-tax-accounting-services`, Fulshear, Sugar Land, Richmond, Rosenberg, Cypress, Houston, Spring, The Woodlands, Missouri City. Update `seo-track.md` after each request. | High | Traffic, Technical |
| Homepage and `/texas/katy-tax-accountant` both target `tax accountant Katy TX`. | Cannibalization can split relevance signals and make Google unsure which page should rank. | Keep `/texas/katy-tax-accountant` as the exact local ranking page. Reposition homepage around "Katy tax and accounting firm" plus brand/trust/conversion. Update metadata in `src/app/page.tsx:7-10` after GSC data confirms which URL gets impressions. | High | Traffic |
| LLC formation and business setup are buried inside `/services#startup`. | "LLC formation", "new business tax setup", and "EIN/bookkeeping setup" are high-intent searches; tab content is weaker than a dedicated page. | Create `/llc-formation-tax-setup` or `/business-formation-tax-setup`. Add metadata, FAQ schema, Service schema, pricing/process blocks, IRS EIN links, Texas SOS links, and CTAs. Add it to `src/app/sitemap.ts:10-43`, `src/components/Footer.tsx:16-29`, homepage service cards at `src/app/page.tsx:191-240`, and `/site-map`. | High | Traffic, Leads |
| Core service intent is concentrated into one `/services` page. | Competitors rank with focused pages for tax prep, bookkeeping, tax resolution, and business formation. | Build dedicated pages for `/business-tax-accounting`, `/individual-tax-preparation`, `/tax-resolution`, `/bookkeeping-cleanup`, `/payroll-tax-support`, and `/quickbooks-bookkeeping-services`. Keep `/services` as the hub. | High | Traffic, Leads |
| Local trust/review signals are weak or not verifiable from the public web. | Google local rankings depend heavily on relevance, distance, and prominence; reviews also increase conversion. | Fully optimize Google Business Profile: exact NAP, categories, services, photos, appointment/contact links, weekly posts, and a real review request workflow. Add a real review/testimonial section only after reviews are collected. | High | Leads, Trust |
| Homepage trust block is generic. | "Trust", "Security", and "Years of Combined Experience" are not as persuasive as proof. | Replace the generic trust chips in `src/app/page.tsx:153-179` with proof: real review count, real client industries, secure portal/process, office address, response time, credentials only if verified, and review link. | High | Leads, Trust |
| Schema copy contains strong promise language. | Tax content should avoid unsupported guarantees, especially in structured data. | Tighten `src/lib/seo/schema.ts:115-154` and `157-193`. Remove or qualify phrases like "guarantee accurate tax preparation", "maximum legally allowed refunds", "minimize your overall tax liability", and "settle your tax debt for less" unless legally reviewed and supported by actual terms. | High | Trust, Technical |
| Homepage performance is below ideal for a lead page. | LCP 5.6s and TBT 610-730ms can reduce mobile conversions and may hurt page experience. | Convert `src/components/HeroCarousel.tsx` from a client autoplay carousel into a lighter static/server-rendered hero, or lazy-load slides after first paint. Reduce above-the-fold images, review GA loading in `src/app/layout.tsx:58-67`, and keep only one priority hero image. | Medium | Leads, Technical |
| Generic anchor text appears in Lighthouse. | Google and users get weaker context from "Learn More" and "Read More". | Replace generic anchors in `src/components/HeroCarousel.tsx:179-184` and `src/app/page.tsx:146-149`, `236-238` with descriptive text such as "About IntegraFin tax team", "Business tax and accounting services", and "Individual tax preparation services". | Medium | Traffic, Accessibility |
| Contact forms are functional but not optimized for high-intent segments. | Visitors with IRS notices, LLC formation needs, or bookkeeping cleanup need a faster path to the right action. | Add service-specific form paths and options. Update `src/components/HomeCallbackForm.tsx:92-102` to include LLC formation, IRS notice help, bookkeeping cleanup, S corp/entity tax planning. Add a calendar/booking link or "same/next business day callback" expectation if operationally true. | High | Leads |
| Contact page lacks strong proof near the form. | Visitors decide whether to submit based on trust before the form. | Add proof and reassurance beside `src/app/contact/page.tsx:47-51`: expected response window, secure document handling, no obligation, real office, real review count when available, and "what happens after you submit". | High | Leads |
| Older blog posts are thin and generic. | Several sitemap-listed posts are around 500 words and less competitive than newer source-backed posts. | Refresh or consolidate `src/data/blogData.ts:1042-1149`, especially 2025 tax planning, small-business accounting tips, IRS compliance guide, tax resolution options, payroll best practices, startup financial planning. Expand to 1,200-2,000 words with current IRS/state sources and internal links to service pages. | Medium | Traffic, Trust |
| `/logo.png` returns 404. | Low direct SEO impact, but legacy metadata/tools may request it. | Either add `public/logo.png` or redirect `/logo.png` to `/images/logo1.png`. Current organization schema uses `/logo.svg`, so this is not urgent. | Low | Technical |

## Technical SEO

What is good:

- `https://integrafin.tax/` returns 200.
- `http://integrafin.tax/` and `https://www.integrafin.tax/` 308 redirect to canonical `https://integrafin.tax/`.
- `robots.txt` returns 200 and allows normal crawling while blocking `/admin`.
- XML sitemap returns 200 and contains 43 URLs.
- HTML sitemap returns 200.
- Important pages are indexable with self-canonicals.
- Legacy URLs now redirect to `/services` anchors.
- No broken internal links found in the sitemap crawl.
- `npm run lint` and `npm run build` passed.

Fix next:

- Request indexing for the newly published city/service URLs.
- Validate structured data in Google Rich Results Test after schema wording is tightened.
- Improve mobile lab performance by simplifying the homepage hero and reducing client-side work.
- Add dedicated service pages to the sitemap only after they are built, linked, and internally connected.

## On-Page SEO

Strengths:

- Most important pages have one H1, clear titles, descriptions, index/follow robots, canonicals, and schema.
- Texas city pages have strong local copy, local resource links, FAQs, and honest office/service-area disclosures.
- Newer tax blog posts are much stronger than older fallback posts.

Weak spots:

- `/services` is overloaded and tries to rank for too many services.
- The homepage and Katy city page overlap on the exact same primary query.
- Several older blog posts are too thin for competitive tax/accounting terms.
- Generic anchors weaken topical internal links.
- Some service copy overstates benefits and should use conservative tax language.

## Local SEO

Highest-value local actions:

1. Complete/verify Google Business Profile.
2. Use one consistent NAP everywhere: IntegraFin Tax & Accounting or IntegraFin LLC, exact address, phone, website, hours.
3. Primary GBP category should likely be Tax Preparation Service or Accountant; add secondary categories such as Bookkeeping Service, Payroll Service, Tax Consultant if accurate.
4. Add all core services to GBP: tax preparation, bookkeeping, business tax, IRS notice help, tax resolution, payroll records support, LLC/business formation tax setup.
5. Upload real photos: office exterior/interior, team, branded desk/client area, not generic stock.
6. Ask for the first 5-10 real Google reviews from real clients; do not fake reviews.
7. Add free citation profiles: Bing Places, Apple Business Connect, Yelp, Chamber/credible local directories, LinkedIn, Facebook, Nextdoor/Alignable if real.
8. Add weekly GBP posts around tax deadlines, IRS notices, bookkeeping cleanup, and business formation questions.

Do not create more city pages before this is done. The current tracker already has a 10-page Texas cluster waiting for indexing and review/GBP support.

## Competitor Gap Analysis

Local competitors doing better:

- Katy Tax Advisor has a very clear appointment/process flow, a client login, pricing from "starting at $300", testimonials, and visible local proof such as 200+ clients and years of experience.
- FAS Bookkeeping and Tax Services has dedicated bookkeeping pages, request-a-quote flow, address/phone/email visible throughout, team/testimonial pages, and a tax planning guide.

National LLC competitors doing better:

- LegalZoom, ZenBusiness, Northwest Registered Agent, and Tailor Brands have dedicated LLC formation pages with strong price framing such as "$0 + state fees" or "$39 + state fees", clear steps, state-fee language, FAQs, and direct start buttons.

How IntegraFin can realistically compete:

- Do not compete as the cheapest LLC filer.
- Compete as "LLC formation plus tax setup, EIN guidance, bookkeeping setup, S corp tax planning, payroll readiness, and first-year compliance support."
- Build a high-trust page that explains what the IRS and Texas SOS require, what IntegraFin does, what needs legal counsel, what is included, and what happens after formation.

## Content Gaps

Create or improve these pages first:

1. `/llc-formation-tax-setup`
2. `/pricing`
3. `/business-tax-accounting`
4. `/bookkeeping-cleanup`
5. `/tax-resolution`
6. `/individual-tax-preparation`
7. `/payroll-tax-support`
8. `/quickbooks-bookkeeping-services`
9. `/s-corp-election-tax-help`
10. `/texas-franchise-sales-tax-support`

High-intent blog/support topics:

- "LLC vs S corp for taxes: what changes and what does not"
- "Do I need an EIN for my LLC?"
- "New LLC tax setup checklist for the first 90 days"
- "Bookkeeping cleanup before filing taxes: what records to gather"
- "CP14 vs CP2000: what the IRS notice means"
- "S corp reasonable salary basics for small business owners"
- "What to bring to a tax accountant before filing"
- "How much does bookkeeping cleanup cost?"
- "Can a tax accountant help form an LLC?"
- "When should a business hire monthly bookkeeping?"

## Conversion and Lead Generation

What is working:

- Phone number is visible.
- Contact form works.
- WhatsApp link exists.
- Contact page includes address and map.
- Service pages have top and bottom CTAs.

What is stopping leads:

- No clear booking/calendar path.
- No visible review count or Google review link.
- No pricing or starting-price guidance.
- No service-specific intake flow.
- No dedicated LLC formation landing page despite this being a main service.
- Homepage proof is generic and could belong to any firm.
- "Contact Us" is weaker than "Book a tax consultation" or "Get bookkeeping cleanup help".

Recommended CRO changes:

- Add a top nav CTA: "Book Consultation" or "Call (832) 647-1819".
- Add a short qualification form for "IRS notice", "LLC formation", "bookkeeping cleanup", and "tax filing".
- Add a pricing page with "starting at" ranges or "quote after review" ranges by service.
- Add real testimonials/reviews after collecting them.
- Add trust proof near every form: response time, secure document handling, office address, and what happens next.

## 30-Day Improvement Roadmap

Week 1:

- Request GSC indexing for all waiting priority URLs.
- Complete Google Business Profile and add real photos/services.
- Create review request link and ask 5 real clients.
- Tighten risky schema language.
- Replace generic anchor text on homepage.
- Add LLC formation, bookkeeping cleanup, IRS notice, and S corp/entity options to forms.

Week 2:

- Build `/llc-formation-tax-setup`.
- Add the page to sitemap, HTML sitemap, homepage, footer, and services hub.
- Add IRS EIN, IRS LLC classification, IRS Pub. 583, and Texas SOS Form 205 references.
- Create a conversion block: "Formation plus tax setup" with CTA and document checklist.

Week 3:

- Build `/pricing` or `/how-we-price-tax-bookkeeping-services`.
- Add starting ranges or scoped quote logic.
- Add "what affects price" FAQs.
- Add internal links from services, contact, and footer.

Week 4:

- Refresh 2 thin blog posts: IRS compliance guide and startup financial planning.
- Add internal links from blogs to LLC formation, bookkeeping cleanup, IRS notice, tax calculator, and contact.
- Rerun Lighthouse and live crawl.
- Update `seo-track.md` with indexing/review/GBP status.

## 90-Day Bigger Moves

- Build the service-page cluster listed above.
- Build a review/testimonial system and add real review schema only if reviews are first-party and policy-compliant.
- Create 2-4 source-backed blog posts per month supporting high-intent service pages.
- Build citation/backlink assets: Chamber profile, local partner pages, accountant/bookkeeping directories, LinkedIn articles, YouTube/short-form tax explainers linking to service pages.
- Use GSC data to decide whether homepage or `/texas/katy-tax-accountant` should target exact "tax accountant Katy TX" and adjust copy accordingly.

## Source Links Used

- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google local ranking guidance: https://support.google.com/business/answer/7091
- Google local business structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google link text guidance: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Lighthouse descriptive link text: https://developer.chrome.com/docs/lighthouse/seo/link-text
- Katy Tax Advisor: https://katytaxadvisor.com/
- Katy Tax Advisor pricing: https://katytaxadvisor.com/cost-tax-preparation/
- Katy Tax Advisor reviews/testimonials: https://katytaxadvisor.com/client-recommendations/
- FAS Bookkeeping and Tax Services: https://fas-accountingsolutions.com/
- FAS bookkeeping page: https://fas-accountingsolutions.com/bookkeeping-services-katy/
- FAS quote/testimonial page: https://fas-accountingsolutions.com/request-a-quote-bookkeeping-and-tax-services/
- LegalZoom business formation: https://www.legalzoom.com/business/business-formation/
- ZenBusiness LLC page: https://www.zenbusiness.com/llc/
- Northwest Registered Agent formation: https://www.northwestregisteredagent.com/incorporation-service
- Tailor Brands pricing: https://www.tailorbrands.com/product-pricing
- IRS LLC classification: https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc
- IRS EIN: https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number
- IRS Publication 583: https://www.irs.gov/publications/p583
- Texas SOS Form 205 instructions: https://www.sos.state.tx.us/corp/instructions/205.shtml
