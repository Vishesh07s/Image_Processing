import pool from "../config/db.js";
const getImages = (req, res) => {
  res.json({
    message: "All images",
  });
};

const getImagesById = (req, res) => {
  const id = req.params.id;
  res.json({
    message: "Image found",
    imageId: id,
  });
};

const createImage = async (req, res) => {
  console.log(req.body);
  const result = await pool.query(
    `INSERT INTO images
    (original_name,filename,mimetype,size,path)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [
      req.file.originalname,
      req.file.filename,
      req.file.mimetype,
      req.file.size,
      req.file.path,
    ],
  );
  res.status(201).json({
    message: "Image uploaded successfully",
    data: result.rows[0],
  });
};

export { getImages, getImagesById, createImage };
