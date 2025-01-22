import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCgtvYWh-dMJ_18zL5q3GYO8Nk7xvsUXrA";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// export const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// export async function runSpecial(aiPrompt, topic, description) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage(
//     `${aiPrompt} Topic: ${topic}, Description: ${description} `
//   );
//   return result.response.text();
// }

// export const chatSession = model.startChat({
//   generationConfig,
//   history: [],
// });
