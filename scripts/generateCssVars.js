// scripts/generateCssVars.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ↓––––– Compute __dirname in an ES module: –––––↓
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now use __dirname exactly as before:
const tokensPath = path.resolve(__dirname, "../src/themes/tokens.json");
const outPath = path.resolve(__dirname, "../src/css/_generated-vars.css");

const raw = fs.readFileSync(tokensPath, "utf-8");
const tokens = JSON.parse(raw);

let css = "/* This file is auto-generated. Do not edit directly. */\n\n";
for (const [schemeName, schemeObj] of Object.entries(tokens.schemes)) {
  css += `:root.${schemeName} {\n`;
  for (const [key, value] of Object.entries(schemeObj)) {
    // convert camelCase / PascalCase → kebab-case
    const varName = key
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
      .toLowerCase();
    css += `  --color-${varName}: ${value};\n`;
  }
  css += `}\n\n`;
}

fs.writeFileSync(outPath, css);
console.log("✅ Generated CSS vars at", outPath);
