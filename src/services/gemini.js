import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent("Write a haiku about the ocean");
const text = result.response.text();

console.log(text);