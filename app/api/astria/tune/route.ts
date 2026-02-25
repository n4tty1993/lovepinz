import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadFileToS3 } from "@/lib/s3";
import {
  createTuneFromPack,
  getPackGenerationStatusWithTimeout,
} from "@/lib/astria";

const PACK_ID = 4287;
const S3_BUCKET = "timetotale-qa";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `uploads/lovepinz/${uuidv4()}-${file.name}`;

    const imageUrl = await uploadFileToS3({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    });

    const tune = await createTuneFromPack({
      packId: PACK_ID,
      title: uuidv4(),
      name: "image",
      image_urls: [imageUrl],
    });

    if (!tune.id) {
      return NextResponse.json(
        { error: tune.base || "Failed to create tune" },
        { status: 400 },
      );
    }

    const images = await getPackGenerationStatusWithTimeout(tune.id);
    return NextResponse.json({ tuneId: tune.id, images });
  } catch (error) {
    console.error("Error creating tune:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}
