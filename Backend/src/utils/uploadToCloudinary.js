const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(filePath) {
  const mainFolderName = "Employee_CURD";
  const fileNameWithoutExtension = path.basename(
    filePath,
    path.extname(filePath)
  );
  const filePathOnCloudinary = `${mainFolderName}/${fileNameWithoutExtension}`;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: filePathOnCloudinary,
    });
    fs.unlinkSync(filePath);
    return {
      message: "Success",
      url: result.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);

    return {
      message: "Fail",
    };
  }
}

module.exports = { uploadToCloudinary };
