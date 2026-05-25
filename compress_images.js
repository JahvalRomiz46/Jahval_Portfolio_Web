import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirsToProcess = [
  'public/Certificates',
  'public/Project Thumbnails'
];

async function processImages() {
  console.log("Starting image compression...");
  
  for (const dir of dirsToProcess) {
    const fullPath = path.resolve(dir);
    if (!fs.existsSync(fullPath)) continue;
    
    const files = fs.readdirSync(fullPath);
    for (const file of files) {
      // Skip if it's already a thumbnail or not an image
      if (file.includes('-thumb') || (!file.endsWith('.png') && !file.endsWith('.jpg'))) {
        continue;
      }
      
      const inputPath = path.join(fullPath, file);
      // Create thumbnail filename (e.g., image.png -> image-thumb.webp)
      const parsed = path.parse(file);
      const thumbPathWebp = path.join(fullPath, `${parsed.name}-thumb.webp`);
      
      console.log(`Compressing ${file} -> ${path.basename(thumbPathWebp)}`);
      
      // Generate optimized WebP thumbnail (width 600px is plenty for grid cards)
      await sharp(inputPath)
        .resize(600)
        .webp({ quality: 80 })
        .toFile(thumbPathWebp);
    }
  }
  console.log("Compression complete!");
}

processImages().catch(console.error);
