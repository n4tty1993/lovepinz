import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadFileToS3 } from "@/lib/s3";
import {
  createTuneFromPack,
  getPackGenerationStatusWithTimeout,
} from "@/lib/astria";

const DEFAULT_PACK_ID = 4287;
const PET_PACK_ID = 4368;
const S3_BUCKET = "timetotale-qa";

const MOCK_RESPONSE = {
  tuneId: 4210309,
  images: [
    ["https://mp.astria.ai/i5l60lskzp9q8o68p6wef1hbyjkl"],
    ["https://mp.astria.ai/e5frszmg971zfrwl0k8erms5zfep"],
    ["https://mp.astria.ai/0tq6e27y76logt55cjdq9tm2i6b1"],
  ],
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 2000));
    return NextResponse.json(MOCK_RESPONSE);
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const occasion = formData.get("occasion") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const packId = occasion === "pet" ? PET_PACK_ID : DEFAULT_PACK_ID;

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
      packId,
      title: uuidv4(),
      name: occasion === "pet" ? "pet" : "image",
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
