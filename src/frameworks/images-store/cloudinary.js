const cloudinary = require('cloudinary').v2;

function initCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  return cloudinary;
}

async function uploadImage(filePath) {
  try {
    return initCloudinary().uploader.upload(filePath, {
      folder: 'cupcar/user-photos' // Set the directory for uploaded images to "images" in Cloudinary
    });
  } catch (error) {
  console.log("🚀 ~ file: cloudinary.js:16 ~ uploadImage ~ error:", error)
  }
}

async function deleteImage(publicId) {
  try {
    return initCloudinary().uploader.destroy(publicId)
  } catch (error) {
    console.log("🚀 ~ file: cloudinary.js:16 ~ uploadImage ~ error:", error)
  }
}

module.exports = {
  uploadImage,
  deleteImage
}
