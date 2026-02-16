// src/kernel.ts - iClaw main entry point (iOS AI agent loop)

import { config } from './config.js';
import { log } from './logger.js';
import { initIOSDriver, closeIOSDriver, testLaunchSafari } from './ios-driver.js';

console.log("=====================================");
console.log("     iClaw – iPhone AI Agent v0.1    ");
console.log("=====================================");
log(`Starting with config: LLM=${config.llmProvider}, UDID=${config.deviceUDID || 'not set'}`);

if (!config.deviceUDID) {
  log("ERROR: DEVICE_UDID not set in .env – cannot connect to iPhone", 'error');
  process.exit(1);
}

async function main() {
  try {
    log("Attempting to initialize iOS driver (Appium session)...");
    const driver = await initIOSDriver();

    log("Driver ready – running basic test: Launch Safari");
    await testLaunchSafari();  // This should open Safari on your connected iPhone

    log("Basic iOS connection and action test PASSED!");
    log("Note: In a real run, this would now enter the reasoning + action loop.");
  } catch (error) {
    log(`Test failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
    log("Common fixes: 1) Appium server running? (appium &)", 'warn');
    log("               2) iPhone connected/trusted/Developer Mode on?", 'warn');
    log("               3) Correct UDID and platform version in .env?", 'warn');
  } finally {
    await closeIOSDriver();
    log("Cleanup complete – session closed.");
  }
}

main().catch((err) => {
  log(`Unexpected error in main: ${err}`, 'error');
  process.exit(1);
});
