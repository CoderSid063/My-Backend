import { v2 as cloudinary } from "cloudinary";
import { log } from "console";

//i use fs for manage all my files, it is byDefault in NodeJs
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNAY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

// this method take the "local file path" as an argument and upload the file in the cloudnary.
const uploadCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload the file in cloudnary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file upload succesfully
    console.log("file upload in cloudnary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file if the upload operation got failed
  }
};

export { uploadCloudnary };
