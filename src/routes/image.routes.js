import express from "express";
import multer from "multer";
import { uploadsPath } from "../utils/path.js";
import {
  getImages,
  getImagesById,
  createImage,
  deleteImage,
} from "../controllers/image.controller.js";
const router = express.Router();
const upload = multer({
  dest: uploadsPath,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
  fileFilter: (req, file, cb) => {
    console.log(file.originalname, file.mimetype);
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      const error = new Error("only image files are allowed");
      error.statusCode = 400;
      cb(error, false);
    }
  },
}); //returns an object that contains several methods likes .single(),.array(),.fields() etc..
router.get("/", getImages);
router.get("/:id", getImagesById);
//router.post(route,middleware,controller)
//upload.single("image") returns a middleware that handles file upload
router.post("/", upload.single("image"), createImage);
router.delete("/:id", deleteImage);
export default router;
