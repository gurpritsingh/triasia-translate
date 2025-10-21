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
const templatePath = path.join(srcDir, "PageTemplate.template");
const appPath = path.join(srcDir, "App.tsx");

// Read the PageTemplate content
if (!fs.existsSync(templatePath)) {
  console.error("❌ PageTemplate.tsx not found!");
  process.exit(1);
}

const templateContent = fs.readFileSync(templatePath, "utf-8");

// Ensure pages folder exists
if (!fs.existsSync(pagesDir)) {
  console.error("❌ pages folder not found!");
  process.exit(1);
}

// Step 5: Create a file per language
languages.forEach((lang) => {
  const capitalized = lang[0].toUpperCase() + lang.slice(1);
  const fileName = `${capitalized}.tsx`;
  const filePath = path.join(pagesDir, fileName);

  // Replace {lang} placeholder with actual language name
  const replaced = templateContent.replaceAll("{lang}", lang);

  const content = `// Auto-generated page for ${lang}\n${replaced}`;
  fs.writeFileSync(filePath, content, "utf-8");

  console.log(`✅ Created ${fileName}`);

  //  Update App.tsx
  let appContent = fs.readFileSync(appPath, "utf-8");

  // Add import if missing
  const importLine = `import ${capitalized} from "./pages/${capitalized}";`;
  if (!appContent.includes(importLine)) {
    appContent = appContent.replace(
      /import\s+NotFound[\s\S]*?;\n/,
      (match) => `${match}${importLine}\n`
    );
  }

  // Add Route if missing
  const routeLine = `          <Route path="/${lang}" element={<${capitalized} />} />`;
  if (!appContent.includes(routeLine)) {
    appContent = appContent.replace(
      /(\{\/\*\s*ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "\*"\s*ROUTE\s*\*\/\})/,
      `${routeLine}\n          $1`
    );
  }

  fs.writeFileSync(appPath, appContent, "utf-8");
  console.log(`🔗 Added route for /${lang} in App.tsx`);
});

console.log("\n✨ Done! All language pages generated successfully.");
