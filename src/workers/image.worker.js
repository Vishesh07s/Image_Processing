import { Worker } from "bullmq";
import path from "node:path";
import { uploadsPath, processedPath } from "../utils/path.js";
import sharp from "sharp";
import pool from "../config/db.js";

//importing worker class from bullmq, worker created
const worker = new Worker(
  "image-processing",
  async (job) => {
    const { imageId } = job.data;

    try {
      await pool.query(
        "UPDATE images SET status = 'processing' WHERE id = $1",
        [imageId],
      );

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

      await sharp(inputPath)
        .resize(500, 324, { fit: "cover" })
        .jpeg({ quality: 80 })
        .toFile(outputPath);
      console.log("Sharp processing finished");
      await pool.query("UPDATE images SET processed_path = $1 WHERE id = $2", [
        outputPath,
        image.id,
      ]);
      await pool.query("UPDATE images SET status = 'completed' WHERE id = $1", [
        imageId,
      ]);
      return {
        imageId: image.id,
        outputPath: outputPath,
      };
    } catch (err) {
      console.error("Image processing failed:", err);
      try {
        await pool.query("UPDATE images SET status = 'failed' WHERE id = $1", [
          imageId,
        ]);
      } catch (error) {
        console.error("Failed to update image status:", error);
      }
      throw err;
    }

    //adding output image path to processedpath column
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
