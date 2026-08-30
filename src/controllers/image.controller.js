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

const createImage = (req, res) => {
  console.log(req.body);
  res.status(201).json({
    message: "Image uploaded successfully",
    data: req.file,
  });
};

export { getImages, getImagesById, createImage };
