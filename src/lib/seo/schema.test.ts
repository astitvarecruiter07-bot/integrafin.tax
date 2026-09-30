import { describe, expect, it } from "vitest";

import { rootSchemaGraph, SCHEMA_IDS } from "./schema";
import { siteConfig } from "../siteConfig";

type SchemaNode = Record<string, unknown>;

describe("root business identity schema", () => {
  const graph = rootSchemaGraph["@graph"] as unknown as SchemaNode[];
  const organization = graph.find((node) => node["@id"] === SCHEMA_IDS.organization);
  const localBusiness = graph.find((node) => node["@id"] === SCHEMA_IDS.localBusiness);

  it("uses the canonical organization identity", () => {
    expect(organization).toMatchObject({
      name: siteConfig.businessName,
      legalName: siteConfig.legalName,
      contactPoint: {
        telephone: siteConfig.contact.phoneE164,
      },
    });
  });

  it("uses the canonical local business contact details", () => {
    expect(localBusiness).toMatchObject({
      name: siteConfig.businessName,
      legalName: siteConfig.legalName,
      telephone: siteConfig.contact.phoneE164,
      email: siteConfig.contact.email,
      address: {
        streetAddress: siteConfig.office.street,
        addressLocality: siteConfig.office.city,
        addressRegion: siteConfig.office.region,
        postalCode: siteConfig.office.postalCode,
        addressCountry: siteConfig.office.country,
      },
      openingHoursSpecification: [
        {
          dayOfWeek: siteConfig.office.days,
          opens: siteConfig.office.opens,
          closes: siteConfig.office.closes,
        },
      ],
    });
  });

  it("publishes only verified social profiles", () => {
    if (siteConfig.verifiedSocialProfiles.length === 0) {
      expect(organization).not.toHaveProperty("sameAs");
      expect(localBusiness).not.toHaveProperty("sameAs");
      return;
    }

    expect(organization).toHaveProperty("sameAs", siteConfig.verifiedSocialProfiles);
    expect(localBusiness).toHaveProperty("sameAs", siteConfig.verifiedSocialProfiles);
  });
});
