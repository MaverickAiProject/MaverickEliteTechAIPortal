export async function imageGenerator(data, aiModel) {
  const response = await fetch(aiModel, {
    headers: {
      Authorization:
        "Bearer " + import.meta.env.VITE_HUGGING_FACE_IMAGE_GENERATION_API,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }

  const result = await response.blob();
  return URL.createObjectURL(result);
}
