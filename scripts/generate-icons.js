const sharp = require('sharp');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

// App colors
const PRIMARY = '#2FA2FE';
const WHITE = '#FFFFFF';
const BG_LIGHT = '#E6F4FE';

// Microphone SVG icon (white, centered)
function micSvg(size, color = WHITE, bgColor = PRIMARY, padding = 0.25) {
  const p = Math.round(size * padding);
  const iconSize = size - p * 2;
  const cx = size / 2;
  const cy = size / 2;
  const micW = iconSize * 0.28;
  const micH = iconSize * 0.42;
  const micX = cx - micW / 2;
  const micY = cy - micH / 2 - iconSize * 0.05;
  const micR = micW / 2;
  const arcCx = cx;
  const arcCy = micY + micH - micR;
  const arcR = micW / 2 + iconSize * 0.08;
  const standTop = arcCy + arcR + iconSize * 0.02;
  const standBot = standTop + iconSize * 0.1;
  const baseW = iconSize * 0.2;

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="${bgColor}"/>
    <!-- Mic body -->
    <rect x="${micX}" y="${micY}" width="${micW}" height="${micH}" rx="${micR}" fill="${color}"/>
    <!-- Arc -->
    <path d="M${arcCx - arcR} ${arcCy} A${arcR} ${arcR} 0 0 0 ${arcCx + arcR} ${arcCy}"
          fill="none" stroke="${color}" stroke-width="${iconSize * 0.04}" stroke-linecap="round"/>
    <!-- Stand -->
    <line x1="${cx}" y1="${standTop}" x2="${cx}" y2="${standBot}"
          stroke="${color}" stroke-width="${iconSize * 0.04}" stroke-linecap="round"/>
    <!-- Base -->
    <line x1="${cx - baseW / 2}" y1="${standBot}" x2="${cx + baseW / 2}" y2="${standBot}"
          stroke="${color}" stroke-width="${iconSize * 0.04}" stroke-linecap="round"/>
  </svg>`;
}

// Circle mic for adaptive icon foreground (transparent bg)
function micForegroundSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const iconSize = size * 0.4;
  const micW = iconSize * 0.28;
  const micH = iconSize * 0.42;
  const micX = cx - micW / 2;
  const micY = cy - micH / 2 - iconSize * 0.05;
  const micR = micW / 2;
  const arcCy = micY + micH - micR;
  const arcR = micW / 2 + iconSize * 0.08;
  const standTop = arcCy + arcR + iconSize * 0.02;
  const standBot = standTop + iconSize * 0.1;
  const baseW = iconSize * 0.2;
  const sw = iconSize * 0.04;

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${micX}" y="${micY}" width="${micW}" height="${micH}" rx="${micR}" fill="${WHITE}"/>
    <path d="M${cx - arcR} ${arcCy} A${arcR} ${arcR} 0 0 0 ${cx + arcR} ${arcCy}"
          fill="none" stroke="${WHITE}" stroke-width="${sw}" stroke-linecap="round"/>
    <line x1="${cx}" y1="${standTop}" x2="${cx}" y2="${standBot}"
          stroke="${WHITE}" stroke-width="${sw}" stroke-linecap="round"/>
    <line x1="${cx - baseW / 2}" y1="${standBot}" x2="${cx + baseW / 2}" y2="${standBot}"
          stroke="${WHITE}" stroke-width="${sw}" stroke-linecap="round"/>
  </svg>`;
}

// Splash: larger mic on white background
function splashSvg(w, h) {
  const iconSize = 180;
  const cx = w / 2;
  const cy = h / 2;
  const micW = iconSize * 0.28;
  const micH = iconSize * 0.42;
  const micX = cx - micW / 2;
  const micY = cy - micH / 2 - iconSize * 0.05;
  const micR = micW / 2;
  const arcCy = micY + micH - micR;
  const arcR = micW / 2 + iconSize * 0.08;
  const standTop = arcCy + arcR + iconSize * 0.02;
  const standBot = standTop + iconSize * 0.1;
  const baseW = iconSize * 0.2;
  const sw = iconSize * 0.04;
  const bgR = iconSize * 0.45;

  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="${WHITE}"/>
    <!-- Blue circle bg -->
    <circle cx="${cx}" cy="${cy}" r="${bgR}" fill="${PRIMARY}"/>
    <!-- Mic -->
    <rect x="${micX}" y="${micY}" width="${micW}" height="${micH}" rx="${micR}" fill="${WHITE}"/>
    <path d="M${cx - arcR} ${arcCy} A${arcR} ${arcR} 0 0 0 ${cx + arcR} ${arcCy}"
          fill="none" stroke="${WHITE}" stroke-width="${sw}" stroke-linecap="round"/>
    <line x1="${cx}" y1="${standTop}" x2="${cx}" y2="${standBot}"
          stroke="${WHITE}" stroke-width="${sw}" stroke-linecap="round"/>
    <line x1="${cx - baseW / 2}" y1="${standBot}" x2="${cx + baseW / 2}" y2="${standBot}"
          stroke="${WHITE}" stroke-width="${sw}" stroke-linecap="round"/>
  </svg>`;
}

async function generate() {
  // Main icon 1024x1024
  await sharp(Buffer.from(micSvg(1024)))
    .png()
    .toFile(path.join(ASSETS, 'icon.png'));
  console.log('icon.png');

  // Favicon 48x48
  await sharp(Buffer.from(micSvg(48)))
    .png()
    .toFile(path.join(ASSETS, 'favicon.png'));
  console.log('favicon.png');

  // Android adaptive foreground 1024x1024
  await sharp(Buffer.from(micForegroundSvg(1024)))
    .png()
    .toFile(path.join(ASSETS, 'android-icon-foreground.png'));
  console.log('android-icon-foreground.png');

  // Android adaptive background 1024x1024
  await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: PRIMARY }
  })
    .png()
    .toFile(path.join(ASSETS, 'android-icon-background.png'));
  console.log('android-icon-background.png');

  // Android monochrome 1024x1024
  await sharp(Buffer.from(micForegroundSvg(1024)))
    .grayscale()
    .png()
    .toFile(path.join(ASSETS, 'android-icon-monochrome.png'));
  console.log('android-icon-monochrome.png');

  // Splash icon 200x200
  await sharp(Buffer.from(micSvg(200)))
    .png()
    .toFile(path.join(ASSETS, 'splash-icon.png'));
  console.log('splash-icon.png');

  console.log('All icons generated!');
}

generate().catch(console.error);
