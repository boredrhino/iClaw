// src/kernel.ts - iClaw main entry point (iOS AI agent loop)

import { config } from './config.js';  // We'll create config.ts next
import { log } from './logger.js';

console.log("=====================================");
console.log("     iClaw – iPhone AI Agent v0.1    ");
console.log("=====================================");
log(`Starting with config: LLM=${config.llmProvider}, UDID=${config.deviceUDID || 'not set'}`);

if (!config.deviceUDID) {
  log("ERROR: DEVICE_UDID not set in .env – cannot connect to iPhone", 'error');
  process.exit(1);
}

log("Placeholder: Would now start Appium session and begin reasoning loop...");
log("Goal mode not implemented yet – try running with --goal \"open settings\" in future");

// Simulate a tiny loop
for (let i = 1; i <= 3; i++) {
  log(`Simulated step ${i}/3: Thinking...`);
  // Future: get screen → call LLM → execute action
}

log("iClaw simulation complete. Real agent logic coming soon!");
