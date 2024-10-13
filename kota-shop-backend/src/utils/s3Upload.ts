import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const getSignedUrl = (imageName: string | null) => {
  const bucketName = process.env.S3_BUCKET_NAME;

  // Check if the bucket name is set
  if (!bucketName) {
    throw new Error("S3_BUCKET_NAME environment variable is not set");
  }

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60 * 30, // 30 minutes
  };

  return s3.getSignedUrl("getObject", params);
};

// Function to upload an image to S3
const uploadImageToS3 = async (imageBuffer: Buffer, imageName: string, mimeType: any) => {
  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3_BUCKET_NAME environment variable is not set");
  }

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: imageBuffer,
    ContentType: mimeType,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    console.error("Error uploading image: ", err);
    throw err;
  }
};

export { getSignedUrl, uploadImageToS3 };
