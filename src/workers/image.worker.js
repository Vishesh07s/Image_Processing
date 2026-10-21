import { Worker } from "bullmq";
import path from "node:path";
import { uploadsPath, processedPath } from "../utils/path.js";
import sharp from "sharp";
import pool from "../config/db.js";

//importing worker class from bullmq
const worker = new Worker(
  "image-processing",
  async (job) => {
    const { imageId } = job.data;

    const result = await pool.query(
      `SELECT id,filename,path,mimetype
      FROM images
      WHERE id=$1`,
      [imageId],
    );
    if (result.rows.length === 0) {
      throw new Error(`Image not found: ${imageId}`);
    }

    console.log(result.rows);
    const image = result.rows[0];
    const inputPath = path.join(uploadsPath, image.filename);
    //this path will be used by sharp for img manipulation
    const outputPath = path.join(processedPath, `image-${image.id}.jpg`);
    //this path will store resized image after sharp has done its work
    console.log("Starting Sharp:", inputPath, "->", outputPath);

    try {
      await sharp(inputPath)
        .resize(500, 324, { fit: "cover" })
        .jpeg({ quality: 80 })
        .toFile(outputPath);
      console.log("Sharp processing finished");
    } catch (err) {
      console.error("Sharp error:", err);
    }

    await pool.query("UPDATE images SET processed_path = $1 WHERE id = $2", [
      outputPath,
      image.id,
    ]); //adding output image path to processedpath column
    console.log("sharp finished");

    return {
      imageId: image.id,
      outputPath: outputPath,
    };
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
