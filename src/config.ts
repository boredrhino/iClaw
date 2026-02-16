// src/config.ts - Loads environment variables

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  llmProvider: process.env.LLM_PROVIDER || 'groq',
  groqApiKey: process.env.GROQ_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  appiumServer: process.env.APPIUM_SERVER || 'http://localhost:4723',
  deviceUDID: process.env.DEVICE_UDID,
  iosPlatformVersion: process.env.IOS_PLATFORM_VERSION || '17.0',
  maxSteps: parseInt(process.env.MAX_STEPS || '30', 10),
  stepDelayMs: parseInt(process.env.STEP_DELAY_MS || '2000', 10),
};

if (!config.deviceUDID) {
  console.warn("Warning: DEVICE_UDID is missing – Appium connection will fail");
}
