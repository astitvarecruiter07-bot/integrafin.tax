---
name: IntegraFin homepage, Stitch direction
reference: user-provided code.html, screen.png, and DESIGN.md
implemented: 2026-09-30
colors:
  header-and-dark-sections: "#0e1726"
  navy-surface: "#1b2a4a"
  primary-action: "#2563eb"
  legacy-brand-blue: "#003580"
  teal-accent: "#00c2cb"
  light-surface: "#f0f3f7"
  white: "#ffffff"
  text: "#191c1e"
typography:
  family: Inter
  hero-desktop: 62px / 1.06 / 700
  hero-mobile: 34px / 1.06 / 700
  section-heading: 32-42px / 1.13 / 700
  body: 16px / 1.65
layout:
  content-max: 1160px
  section-space-desktop: 100px
  section-space-mobile: 62px
---

## Homepage direction

The current homepage adapts the supplied Stitch composition. It uses a compact dark header, centered navy hero, illustrative financial panel, factual trust strip, alternating bookkeeping/tax/reporting stories, a clear starting-plan section, service and situation cards, problem/approach panels, useful resources, and three closing paths. The existing callback form stays available near the final call to action.

The design uses Inter on the homepage and shared navigation. Bright blue draws attention to the consultation action and links. Teal is reserved for small accents and focus states. White and cool-gray surfaces provide contrast with the dark hero and problem section.

## Content and trust

The supplied HTML is a visual prototype. Its review counts, customer logos, named experts, software integrations, AI assistant, and case-study outcomes were not verified against IntegraFin source material. The implemented page uses factual site details and existing service URLs instead. The hero's figures and workflow panels are marked as illustrations.

The dashboard is a visual explanation of organized books, not a claim that IntegraFin sells access to a live finance application. No fixed pricing, tax savings, or client result is promised.

## Conversion and accessibility

The primary action opens the configured consultation calendar. Secondary actions route to real service, contact, pricing, and resource pages. The existing callback form uses its current lead endpoint. The mobile navigation remains keyboard-accessible and traps focus while open.

Links and buttons have visible focus styles. Responsive checks were performed at 390px, 768px, and desktop widths; there was no horizontal overflow. The page passes TypeScript, ESLint, and the production build in the isolated preview.

## Initial homepage scope

This revision changes the homepage and the shared navigation's visual treatment. Existing inner-page layouts, footer, metadata, structured data, service routes, and lead integrations remain in place.

## Sitewide extension

The public site now uses the same Inter typography and the homepage's navy, blue, teal, and cool-gray design tokens. A shared `saas-page` layer standardizes heading weight, dark hero treatment, primary actions, card radii, form controls, focus states, and reduced-motion behavior.

Service, state, city, and Houston IRS templates carry these styles across their generated routes. The service hero replaces the repeated stock portrait with a structured service-overview panel using each service's existing data. The services hub, about page, and industries page use clearer, action-oriented headlines and consultation paths. The calculator hub uses the navy hero and blue primary action.

Blog, pricing, contact, calculator, case-study, legal, and other public utility pages receive the common page layer. Campaign funnels retain their focused conversion layouts with the shared typography and brand colors. The expired September 15 campaign redirects to the evergreen bookkeeping cleanup page. Administrative routes are outside the public-site design scope.

The update preserves SEO metadata, structured data, article content, route paths, calculator logic, form submissions, and third-party integrations.

## Reference applied across page families

The supplied Stitch design's navy hero, bright blue primary action, white workflow panel, cool-gray section bands, thin card borders, and restrained Inter type now recur on the services hub, pricing, About, Industries, and shared state, city, and Houston IRS templates. The workflow panels use existing service and process copy; they are illustrations of scope and next steps, not software dashboards or client results. About and Industries use code-built record panels in place of remote stock images, so their content remains visible without third-party image loading.

The focused $99 bookkeeping and cleanup-review funnels also use navy heroes, bright blue primary actions, and the shared cool-gray surfaces. Their shorter lead forms and conversion sequences remain intact. The accounting-firm funnel and roofing funnel use the same navy header and blue primary actions while retaining their audience-specific content.

The cleanup-review and roofing thank-you pages carry the same navy header, blue primary action, and cool-gray background so the conversion flow remains visually continuous after submission.
