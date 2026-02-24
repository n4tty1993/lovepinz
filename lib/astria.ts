export const createTuneFromPack = async ({
  packId,
  title,
  name,
  image_urls,
}: {
  packId: number;
  title: string;
  name: string;
  image_urls: string[];
}) => {
  const response = await fetch(`https://api.astria.ai/p/${packId}/tunes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ASTRIA_API_KEY || ""}`,
    },
    body: JSON.stringify({
      tune: {
        title,
        name,
        image_urls,
      },
    }),
  });

  return response.json();
};

export const createTune = async ({
  title,
  gender,
  kidPhotoUploadLocation,
}: {
  title: string;
  gender: "boy" | "girl";
  kidPhotoUploadLocation: string;
}) => {
  const response = await fetch(`https://api.astria.ai/tunes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ASTRIA_API_KEY || ""}`,
    },
    body: JSON.stringify({
      tune: {
        title,
        name: gender,
        image_urls: [kidPhotoUploadLocation],
        model_type: "faceid",
        branch: "flux1",
      },
    }),
  });

  return response.json();
};

export const getPackGenerationStatusWithTimeout = async (
  tuneId: number,
  timeoutMs = 220000, // Total timeout duration (220 seconds)
  pollingInterval = 15000, // Time between each request (15 seconds)
) => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await fetch(
        `https://api.astria.ai/tunes/${tuneId}/prompts`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ASTRIA_API_KEY || ""}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();

      const allImagesLoaded = data.every(
        (prompt: { images?: string[] }) =>
          Array.isArray(prompt?.images) && prompt.images.length > 0,
      );

      // Check if the images array is populated in all the prompts that was triggered from the pack
      if (allImagesLoaded) {
        // Sort by orig_prompt_id to match original Astria configuration order
        const sortedData = data.sort(
          (a: { orig_prompt_id: number }, b: { orig_prompt_id: number }) =>
            a.orig_prompt_id - b.orig_prompt_id,
        );
        return sortedData.map(({ images }: { images: string[] }) => images);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }

    // Wait for the polling interval before sending the next request
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
  }

  // Timeout fallback
  throw new Error(
    `Image generation timed out after ${timeoutMs / 1000} seconds`,
  );
};
