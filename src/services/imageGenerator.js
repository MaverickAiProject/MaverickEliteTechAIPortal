function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // `result` contains base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
}

export async function imageGenerator(data, aiModel) {
  try {
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
      alert("Failed to fetch image. Please try again.");
      return;
    }

    const blob = await response.blob();
    const base64 = await blobToBase64(blob); // Convert to base64
    return base64;
  } catch (error) {
    console.log(error);
  }
}
