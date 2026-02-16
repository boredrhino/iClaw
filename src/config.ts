// src/config.ts - Environment and config loader
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  llmProvider: process.env.LLM_PROVIDER || 'groq',
  deviceUDID: process.env.DEVICE_UDID,
  // etc.
};

console.log("Placeholder config loaded");
