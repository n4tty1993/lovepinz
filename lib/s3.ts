import S3 from "aws-sdk/clients/s3";

export async function uploadFileToS3(params: S3.PutObjectRequest) {
  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
  });

  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function setFileToPrivate(key: string, bucketName: string) {
  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
  });

  try {
    await s3
      .putObjectAcl({
        Bucket: bucketName,
        Key: key,
        ACL: "private",
      })
      .promise();

    console.log(`File with key "${key}" is now private.`);
  } catch (error) {
    console.error("Error setting file ACL to private:", error);
    throw error;
  }
}
