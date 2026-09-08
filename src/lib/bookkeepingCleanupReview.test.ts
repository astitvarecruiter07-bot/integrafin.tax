import { describe, expect, it } from "vitest";
import {
  BookkeepingCleanupReviewInputSchema,
  getCleanupReviewResponseLabel,
  normalizeLeadPhone,
} from "./bookkeepingCleanupReview";

const validInput = {
  name: "Taylor Morgan",
  businessName: "Morgan Services LLC",
  email: "TAYLOR@example.com",
  phone: "",
  primaryNeed: "cleanup_catch_up",
  monthsBehind: "4_12_months",
  consentToContact: true,
  website: "",
  idempotencyKey: "a4f75752-c272-4a1f-a817-f6a8fb4fbb26",
} as const;

describe("BookkeepingCleanupReviewInputSchema", () => {
  it("accepts one contact method and normalizes safe text", () => {
    const parsed = BookkeepingCleanupReviewInputSchema.parse({
      ...validInput,
      name: "  Taylor\u0000 Morgan  ",
    });

    expect(parsed.name).toBe("Taylor Morgan");
    expect(parsed.email).toBe("taylor@example.com");
  });

  it("rejects a request with no contact method", () => {
    const result = BookkeepingCleanupReviewInputSchema.safeParse({
      ...validInput,
      email: "",
      phone: "",
    });

    expect(result.success).toBe(false);
  });

  it("requires the preferred contact method to be present", () => {
    const result = BookkeepingCleanupReviewInputSchema.safeParse({
      ...validInput,
      contactPreference: "phone_call",
    });

    expect(result.success).toBe(false);
  });

  it("rejects impossible target dates", () => {
    const result = BookkeepingCleanupReviewInputSchema.safeParse({
      ...validInput,
      targetDate: "2026-99-99",
    });

    expect(result.success).toBe(false);
  });
});

describe("cleanup review helpers", () => {
  it("normalizes US phone numbers for matching", () => {
    expect(normalizeLeadPhone("(832) 647-1819")).toBe("18326471819");
  });

  it("formats the configured response target", () => {
    expect(getCleanupReviewResponseLabel(60)).toBe("within one business hour");
    expect(getCleanupReviewResponseLabel(120)).toBe("within 2 business hours");
  });
});
