import { describe, it, expect } from "vitest";
import { jonyTerser } from "./jony-terser";

describe("jonyTerser Plugin", () => {
  const plugin = jonyTerser({ dropConsole: true, removeComments: true }) as any;

  it("should remove console.log statements", () => {
    const inputCode = 'console.log("test"); const a = 1;';
    const result = plugin.transform(inputCode, "test.js");
    expect(result.code).not.toContain("console.log");
    expect(result.code).toContain("const a = 1;");
  });

  it("should remove comments correctly", () => {
    const inputCode = `
      // Однострочный комментарий
      const x = 10; 
      /* Многострочный 
         комментарий 
      */
      const y = "http://google.com"; // URL не должен сломаться
    `;
    const result = plugin.transform(inputCode, "test.ts");

    expect(result.code).not.toContain("Однострочный комментарий");
    expect(result.code).not.toContain("Многострочный");
    expect(result.code).toContain("http://google.com");
  });

  it("should compress boolean values", () => {
    const inputCode = "const isTrue = true; const isFalse = false;";
    const result = plugin.transform(inputCode, "test.ts");

    expect(result.code).toContain("!0");
    expect(result.code).toContain("!1");
  });
});
