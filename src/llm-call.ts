// src/llm-call.ts - Basic LLM reasoning call (Groq-first, extensible to others)

import { config } from './config.js';
import { log } from './logger.js';
import Groq from '@groq/groq-sdk';  // For Groq provider

// Placeholder for other providers (OpenAI, Claude, etc.)
// import OpenAI from 'openai';

let groqClient: Groq | null = null;

function getGroqClient() {
  if (!groqClient) {
    if (!config.groqApiKey) {
      throw new Error("GROQ_API_KEY missing in .env");
    }
    groqClient = new Groq({ apiKey: config.groqApiKey });
  }
  return groqClient;
}

export async function callLLM(
  goal: string,
  screenState: string,
  previousThink: string = ""
): Promise<{ thought: string; action: string }> {
  log("Calling LLM for reasoning...");

  const systemPrompt = `
You are an autonomous iOS agent controlling an iPhone via Appium.
Your goal: ${goal}

Current screen state (XCUITest XML hierarchy):
${screenState.substring(0, 4000)}... [truncated if too long]

Previous thought: ${previousThink || "None"}

Analyze the screen.
Think step-by-step what to do next.
Output ONLY JSON:
{
  "thought": "Your short reasoning here",
  "action": "next_action_here OR done"
}

Valid action formats:
- tap:x,y (coordinates)
- tap:element_id_or_label
- type:text into element_id
- swipe:direction (up/down/left/right)
- launch:bundle.id
- done (goal achieved)
`.trim();

  try {
    const client = getGroqClient();
    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "What is your next step?" }
      ],
      model: "llama-3.1-70b-versatile",  // Fast & capable Groq model
      temperature: 0.3,
      max_tokens: 300,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0]?.message?.content || "{}";
    log(`LLM raw response: ${response.substring(0, 200)}...`);

    const parsed = JSON.parse(response);
    return {
      thought: parsed.thought || "No thought provided",
      action: parsed.action || "none"
    };
  } catch (error) {
    log(`LLM call failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
    return { thought: "Error during reasoning", action: "error" };
  }
}

// Simple test function (for kernel integration)
export async function testLLMCall(goal: string = "Open Safari and search for news") {
  const fakeState = "<XCUIElementTypeApplication ...>Placeholder home screen XML</XCUIElementTypeApplication>";
  const result = await callLLM(goal, fakeState);
  log(`Test LLM result - Thought: ${result.thought} | Action: ${result.action}`);
}
