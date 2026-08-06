import TaxCalculatorClient from "./TaxCalculatorClient";
import { calculatorLandingConfigs, type TaxCalculatorVariant } from "./calculatorLandingConfig";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  organizationRef,
} from "@/lib/seo/schema";
import { serializeJsonLd } from "@/lib/seo/jsonLd";

export default function FocusedTaxCalculatorPage({ variant }: { variant: TaxCalculatorVariant }) {
  const config = calculatorLandingConfigs[variant];
  const pageUrl = `https://integrafin.tax${config.path}`;
  const applicationId = `${pageUrl}#application`;
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": applicationId,
    name: config.h1,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: pageUrl,
    isAccessibleForFree: true,
    description: config.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: organizationRef,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
  };
  const faqSchema = buildFaqSchema(pageUrl, config.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
    { name: "Home", item: "https://integrafin.tax/" },
    { name: "Federal Tax Calculator", item: "https://integrafin.tax/tax-calculator" },
    { name: config.h1, item: pageUrl },
  ]);
  const webPageSchema = buildWebPageSchema({
    url: pageUrl,
    name: config.title,
    description: config.description,
    mainEntityId: applicationId,
  });

  return (
    <>
      {[softwareApplicationSchema, faqSchema, breadcrumbSchema, webPageSchema].map((schema, index) => (
        <script
          key={`${config.path}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
      <TaxCalculatorClient variant={variant} />
    </>
  );
}
