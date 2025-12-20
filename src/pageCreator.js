// create a script to generate pages
// read languages config
// generate page for each language inside pages folder
// use PageTemplate.tsx as template
// inject correct language import

import fs from "fs";
import path from "path";
import { languages } from "./pagesConfig.js";

const srcDir = path.join(process.cwd(), "src");
const pagesDir = path.join(srcDir, "pages");
const translatorTemplatePath = path.join(srcDir, "TranslatorPage.template");
const interpreterTemplatePath = path.join(srcDir, "InterpreterPage.template");
const appPath = path.join(srcDir, "App.tsx");
const routesConfigPath = path.join(srcDir, "generated", "languageRoutes.ts");

// Ensure templates exist
if (!fs.existsSync(translatorTemplatePath) || !fs.existsSync(interpreterTemplatePath)) {
  console.error("❌ Templates not found!");
  process.exit(1);
}

const translatorTemplate = fs.readFileSync(translatorTemplatePath, "utf-8");
const interpreterTemplate = fs.readFileSync(interpreterTemplatePath, "utf-8");

// Ensure pages folder exists
if (!fs.existsSync(pagesDir)) {
  console.error("❌ pages folder not found!");
  process.exit(1);
}

const generatedRoutes = [];

// Step 5: Create files per language
languages.forEach((lang) => {
  const capitalized = lang[0].toUpperCase() + lang.slice(1);
  
  // 1. Generate Translator Page
  const translatorFileName = `${capitalized}Translator.tsx`;
  const translatorFilePath = path.join(pagesDir, translatorFileName);
  const translatorContent = translatorTemplate
    .replaceAll("{lang}", lang)
    .replaceAll("{CapitalizedLang}", capitalized);
  
  fs.writeFileSync(translatorFilePath, `// Auto-generated page for ${lang} Translator\n${translatorContent}`, "utf-8");
  console.log(`✅ Created ${translatorFileName}`);

  // 2. Generate Interpreter Page
  const interpreterFileName = `${capitalized}Interpreter.tsx`;
  const interpreterFilePath = path.join(pagesDir, interpreterFileName);
  const interpreterContent = interpreterTemplate
    .replaceAll("{lang}", lang)
    .replaceAll("{CapitalizedLang}", capitalized);

  fs.writeFileSync(interpreterFilePath, `// Auto-generated page for ${lang} Interpreter\n${interpreterContent}`, "utf-8");
  console.log(`✅ Created ${interpreterFileName}`);

  // 3. Update App.tsx
  let appContent = fs.readFileSync(appPath, "utf-8");
  
  // Add Imports
  const translatorImport = `import ${capitalized}Translator from "./pages/${capitalized}Translator";`;
  const interpreterImport = `import ${capitalized}Interpreter from "./pages/${capitalized}Interpreter";`;

  if (!appContent.includes(translatorImport)) {
    appContent = appContent.replace(
      /import\s+NotFound[\s\S]*?;\n/,
      (match) => `${match}${translatorImport}\n`
    );
  }
  if (!appContent.includes(interpreterImport)) {
    appContent = appContent.replace(
      /import\s+NotFound[\s\S]*?;\n/,
      (match) => `${match}${interpreterImport}\n`
    );
  }

  // Add Routes
  const translatorRoute = `          <Route path="/${lang}/translator" element={<${capitalized}Translator />} />`;
  const interpreterRoute = `          <Route path="/${lang}/interpreter" element={<${capitalized}Interpreter />} />`;

  if (!appContent.includes(translatorRoute)) {
    appContent = appContent.replace(
      /(\{\/\*\s*ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "\*"\s*ROUTE\s*\*\/\})/,
      `${translatorRoute}\n          $1`
    );
  }
  if (!appContent.includes(interpreterRoute)) {
    appContent = appContent.replace(
      /(\{\/\*\s*ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "\*"\s*ROUTE\s*\*\/\})/,
      `${interpreterRoute}\n          $1`
    );
  }

  fs.writeFileSync(appPath, appContent, "utf-8");
  console.log(`🔗 Added routes for ${lang} in App.tsx`);

  // 4. Add to generated routes config
  generatedRoutes.push({
    name: capitalized,
    children: [
      { name: "Translator", path: `/${lang}/translator` },
      { name: "Interpreter", path: `/${lang}/interpreter` }
    ]
  });
});

// Generate languageRoutes.ts
const routesContent = `export interface LanguageRoute {
  name: string;
  path?: string;
  children?: LanguageRoute[];
}

export const languageRoutes: LanguageRoute[] = ${JSON.stringify(generatedRoutes, null, 2)};
`;

// Ensure generated folder exists
const generatedDir = path.join(srcDir, "generated");
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir);
}

fs.writeFileSync(routesConfigPath, routesContent, "utf-8");
console.log("✨ Generated languageRoutes.ts");

console.log("\n✨ Done! All language pages generated successfully.");
