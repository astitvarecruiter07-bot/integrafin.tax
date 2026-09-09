import { describe, expect, it } from "vitest";

import { sanitizeHtml } from "./seo";

describe("sanitizeHtml", () => {
  it("preserves safe article tables used by deadline guides", () => {
    const result = sanitizeHtml(`
      <div class="table-scroll">
        <table>
          <thead><tr><th>Deadline</th><th>Form</th></tr></thead>
          <tbody><tr><td>September 15</td><td>Form 1065</td></tr></tbody>
        </table>
      </div>
    `);

    expect(result).toContain("<table>");
    expect(result).toContain("<th>Deadline</th>");
    expect(result).toContain("<td>Form 1065</td>");
  });

  it("removes executable markup while preserving safe content", () => {
    const result = sanitizeHtml(
      '<p>Tax guide</p><script>alert("xss")</script><a href="javascript:alert(1)">Bad link</a>',
    );

    expect(result).toContain("<p>Tax guide</p>");
    expect(result).not.toContain("<script");
    expect(result).not.toContain("javascript:");
  });
});
