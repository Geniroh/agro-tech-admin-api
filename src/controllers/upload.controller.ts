import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Files from "../models/file.model";

const s3Client = new S3Client({
  region: "nyc3",
  endpoint: "https://nyc3.digitaloceanspaces.com",
  credentials: {
    accessKeyId: process.env.DO_SPACE_KEY!,
    secretAccessKey: process.env.DO_SPACE_SECRET!,
  },
});

function sanitizeFileName(fileName: string): string {
  const extension = fileName.substring(fileName.lastIndexOf("."));
  const nameWithoutExtension = fileName
    .substring(0, fileName.lastIndexOf("."))
    .replace(/[^a-zA-Z0-9]/g, "");
  return nameWithoutExtension + extension;
}

export const uploadFile = async (req: Request, res: Response) => {
  console.log("REACHED");
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const { originalname, buffer, size } = req.file;

    const bucketName = process.env.DO_BUCKET_NAME;

    if (!bucketName) {
      return res.json({ error: "Bucket name not defined" });
    }

    // Sanitize file name and generate a unique file name
    const sanitizedFileName = sanitizeFileName(originalname);
    const uniqueFileName = `${sanitizedFileName}`;

    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: buffer,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileRecord = {
      name: originalname,
      size: size.toString(),
      url: `https://${bucketName}.${process.env.DO_ENDPOINT}/${originalname}`,
      uploadedAt: new Date(),
    };
    const newFile = await Files.create({
      filename: fileRecord.name,
      size: fileRecord.size,
      url: fileRecord.url,
    });

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error(err);
    return res.json({ error: "File upload failed" });
  }
};
