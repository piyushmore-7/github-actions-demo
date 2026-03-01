// =============================================
// Simple Build Script
// Simulates a build process
// =============================================

const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");

console.log("\n🔨 Building project...\n");

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy src to dist (simulating a build)
const srcDir = path.join(__dirname, "..", "src");
const files = fs.readdirSync(srcDir);

files.forEach((file) => {
  const src = path.join(srcDir, file);
  const dest = path.join(distDir, file);
  fs.copyFileSync(src, dest);
  console.log(`  📄 Copied: ${file}`);
});

// Create a build info file
const buildInfo = {
  version: require("../package.json").version,
  buildTime: new Date().toISOString(),
  nodeVersion: process.version,
  files: files,
};

fs.writeFileSync(
  path.join(distDir, "build-info.json"),
  JSON.stringify(buildInfo, null, 2)
);

console.log(`  📄 Created: build-info.json`);
console.log(`\n✅ Build complete! Output in dist/\n`);
