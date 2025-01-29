const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDE_API_KEY,
    api_secrete:process.env.CLOUDE_API_SECRETE,

})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerFormat: ["png","jpg","jpeg"]
    },
  });

  module.exports={
    cloudinary,
    storage,
  }