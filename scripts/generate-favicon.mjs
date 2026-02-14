import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..");

const source = join(root, "public", "images", "logo.png");

// Generate 32x32 favicon as ICO-compatible PNG
await sharp(source)
  .resize(32, 32)
  .png()
  .toFile(join(root, "app", "icon.png"));

console.log("Generated app/icon.png (32x32)");

// Generate 180x180 apple-touch-icon
await sharp(source)
  .resize(180, 180)
  .png()
  .toFile(join(root, "app", "apple-icon.png"));

console.log("Generated app/apple-icon.png (180x180)");
