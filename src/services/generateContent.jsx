// import { useEffect } from "react";
import { model } from "../config/geminiAPI";

export default async function generateContent({ responseType, inputPrompt }) {

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: responseType,
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(inputPrompt);
  return (result.response.text());
}

