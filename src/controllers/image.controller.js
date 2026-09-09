import pool from "../config/db.js";
const getImages = async (req, res) => {
  const result = await pool.query("SELECT * FROM images");

  res.json({
    message: "All images",
    data: result.rows,
  });
};

const getImagesById = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM images WHERE id=$1", [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Image Not Found",
    });
  }
  res.json({
    message: "Image found",
    data: result.rows[0],
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
