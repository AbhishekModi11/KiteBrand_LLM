import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
});

export const hasValidOpenAiKey = Boolean(
  process.env.OPENAI_API_KEY && 
  process.env.OPENAI_API_KEY.startsWith("sk-") && 
  !process.env.OPENAI_API_KEY.includes("your_openai_api_key_here")
);
