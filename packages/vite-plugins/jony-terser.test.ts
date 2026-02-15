import { describe, it, expect } from "vitest";
import { jonyTerser } from "./dist";

describe("jonyTerser Plugin", () => {
  const plugin = jonyTerser({ dropConsole: true }) as any;

  it("should remove console.log statements", () => {
    const inputCode = 'const a = 1; console.log("test"); return a;';
    const result = plugin.transform(inputCode, "test.ts");

    expect(result.code).not.toContain('console.log("test")');
    expect(result.code).toContain("const a = 1;");
  });

  it("should compress boolean values", () => {
    const inputCode = "const isTrue = true; const isFalse = false;";
    const result = plugin.transform(inputCode, "test.ts");

    expect(result.code).toContain("!0"); // true --> !0
    expect(result.code).toContain("!1"); // false --> !1
  });

  it("should remove debugger statements", () => {
    const inputCode = "const x = 10; debugger; return x;";
    const result = plugin.transform(inputCode, "test.ts");

    expect(result.code).not.toContain("debugger");
  });
});
