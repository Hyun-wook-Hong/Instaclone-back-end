/* aws-sdk 사용*/
import AWS from "aws-sdk";

AWS.config.update({
    credentials:{
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

// AWS S3
export const uploadToS3 = async (file, userId, folderName) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/uploads/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "instaclone-uploadz",
        Key: objectName,
        ACL: "public-read",
        Body: readStream,
      })
      .promise();
    return Location;
  };