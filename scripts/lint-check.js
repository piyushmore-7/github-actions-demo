// =============================================
// Simple Lint Check (No dependencies needed!)
// Checks for common code issues
// =============================================

const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src");
let issues = 0;

console.log("\n🔍 Running Lint Check...\n");

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, i) => {
    // Check for console.log (should use proper logging)
    if (line.includes("console.log") && !line.trim().startsWith("//")) {
      console.log(`  ⚠️  ${filePath}:${i + 1} - Found console.log (use proper logger)`);
      issues++;
    }

    // Check for var usage (should use let/const)
    if (/\bvar\b/.test(line) && !line.trim().startsWith("//")) {
      console.log(`  ❌ ${filePath}:${i + 1} - Use 'let' or 'const' instead of 'var'`);
      issues++;
    }

    // Check for very long lines
    if (line.length > 120) {
      console.log(`  ⚠️  ${filePath}:${i + 1} - Line too long (${line.length} chars > 120)`);
      issues++;
    }
  });
}

// Scan all JS files in src/
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (file.endsWith(".js")) {
      checkFile(full);
    }
  });
}

scanDir(srcDir);

console.log(`\n📋 Lint: ${issues} issue(s) found\n`);

// Note: We're treating these as warnings, not errors
// Change to process.exit(1) if you want lint to fail the build
