const fs = require('fs');
const path = require('path');

// Copy favicon files from public to .next/static
const publicDir = path.join(__dirname, '..', 'public');
const nextStaticDir = path.join(__dirname, '..', '.next', 'static');

// Create static directory if it doesn't exist
if (!fs.existsSync(nextStaticDir)) {
  fs.mkdirSync(nextStaticDir, { recursive: true });
}

// Copy favicon_io directory
const faviconSourceDir = path.join(publicDir, 'favicon_io');
const faviconDestDir = path.join(nextStaticDir, 'favicon_io');

if (fs.existsSync(faviconSourceDir)) {
  if (!fs.existsSync(faviconDestDir)) {
    fs.mkdirSync(faviconDestDir, { recursive: true });
  }
  
  // Copy all files from favicon_io
  const files = fs.readdirSync(faviconSourceDir);
  files.forEach(file => {
    const sourceFile = path.join(faviconSourceDir, file);
    const destFile = path.join(faviconDestDir, file);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied ${file} to static directory`);
  });
}

// Copy individual favicon files to root of static
const faviconFiles = [
  'favicon.ico',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png'
];

faviconFiles.forEach(file => {
  const sourceFile = path.join(publicDir, file);
  const destFile = path.join(nextStaticDir, file);
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied ${file} to static directory`);
  }
});

// Copy site.webmanifest
const manifestSource = path.join(publicDir, 'site.webmanifest');
const manifestDest = path.join(nextStaticDir, 'site.webmanifest');

if (fs.existsSync(manifestSource)) {
  fs.copyFileSync(manifestSource, manifestDest);
  console.log('Copied site.webmanifest to static directory');
}

console.log('Asset copying completed!');
