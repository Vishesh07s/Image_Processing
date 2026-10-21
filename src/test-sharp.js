import sharp from "sharp";
import path from "path";
import { uploadsPath } from "./utils/path.js";

const inputPath = path.join(uploadsPath, "4684d952774f7ea4cea913ead0277d0c");

try {
  const metadata = await sharp(inputPath).metadata();
  //.metadata() reads image info. like width,height,format,size
  // console.log("Image metadata: ", metadata);
} catch (err) {
  console.error("Sharp processing failed:", err.message);
}

const outputPath = path.join(uploadsPath, "resized-image.jpg");
const processedPath = path.join(uploadsPath, "processed");
await sharp(inputPath).resize(500).toFile(outputPath); //aspect ratio remains the same so height is automatically calcualted by sharp

console.log("resized image saved:", outputPath);
