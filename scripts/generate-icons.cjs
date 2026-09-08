const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const root = path.resolve(__dirname, '..');
  const pub = path.join(root, 'public');

  // 1. Optimize og-image.jpg to standard 1200x630
  const origOg = path.join(pub, 'og-image-orig.jpg');
  const og = path.join(pub, 'og-image.jpg');
  if (!fs.existsSync(origOg)) {
    fs.copyFileSync(og, origOg);
  }
  await sharp(origOg)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, progressive: true })
    .toFile(og);
  console.log('Optimized og-image.jpg to 1200x630, size:', fs.statSync(og).size);

  // 2. Full-bleed SVG for Apple touch icon (avoids transparent corners showing black on iOS)
  const fullBleedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <rect width="128" height="128" fill="#064e3b"/>
  <rect x="4" y="4" width="120" height="120" stroke="#10b981" stroke-width="2" stroke-opacity="0.3"/>
  <path d="M64 24C44 24 32 40 32 60C32 82 48 98 68 98C88 98 96 84 96 70C96 46 80 24 64 24Z" fill="#10b981" fill-opacity="0.25"/>
  <path d="M64 28C48 28 38 42 38 58C38 76 50 90 66 90C82 90 88 78 88 66C88 46 76 28 64 28Z" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
  <path d="M42 66L54 66L60 48L68 80L74 62L80 66L86 66" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="86" cy="66" r="3" fill="#34d399"/>
</svg>`;

  const standardSvg = fs.readFileSync(path.join(pub, 'favicon.svg'));

  // Apple Touch Icon (180x180) at root
  await sharp(Buffer.from(fullBleedSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(pub, 'apple-touch-icon.png'));
  console.log('Generated public/apple-touch-icon.png (180x180)');

  // 32x32 PNG for desktop browser tabs
  await sharp(standardSvg)
    .resize(32, 32)
    .png()
    .toFile(path.join(pub, 'favicon-32x32.png'));
  console.log('Generated public/favicon-32x32.png');

  // 16x16 PNG for classic browser tabs and bookmarks
  await sharp(standardSvg)
    .resize(16, 16)
    .png()
    .toFile(path.join(pub, 'favicon-16x16.png'));
  console.log('Generated public/favicon-16x16.png');

  // Maskable icons for Android PWA launcher with standard 80% safe-zone padding
  const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
  <rect width="160" height="160" fill="#064e3b"/>
  <g transform="translate(16, 16)">
    <rect x="4" y="4" width="120" height="120" stroke="#10b981" stroke-width="2" stroke-opacity="0.3"/>
    <path d="M64 24C44 24 32 40 32 60C32 82 48 98 68 98C88 98 96 84 96 70C96 46 80 24 64 24Z" fill="#10b981" fill-opacity="0.25"/>
    <path d="M64 28C48 28 38 42 38 58C38 76 50 90 66 90C82 90 88 78 88 66C88 46 76 28 64 28Z" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
    <path d="M42 66L54 66L60 48L68 80L74 62L80 66L86 66" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="86" cy="66" r="3" fill="#34d399"/>
  </g>
</svg>`;

  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(pub, 'icons', 'icon-maskable-512x512.png'));
  console.log('Generated public/icons/icon-maskable-512x512.png');

  await sharp(Buffer.from(maskableSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(pub, 'icons', 'icon-maskable-192x192.png'));
  console.log('Generated public/icons/icon-maskable-192x192.png');
}

run().catch(console.error);
