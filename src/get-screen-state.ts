// src/get-screen-state.ts - Retrieve and process current iOS screen state

import { driver } from './ios-driver.js';  // We'll adjust import once driver is singleton/exported properly
import { log } from './logger.js';
import { config } from './config.js';

export async function getScreenState(useVisionFallback = false): Promise<string> {
  try {
    if (!driver) {
      throw new Error("Driver not initialized – call initIOSDriver first");
    }

    log("Fetching screen state via Appium...");

    // Primary: Get UI hierarchy (XML like accessibility tree)
    const pageSource = await driver.getPageSource();
    const sanitized = sanitizePageSource(pageSource);  // We'll add sanitizer later

    if (sanitized.trim().length > 100) {  // Basic sanity check
      log(`Screen hierarchy retrieved (${sanitized.length} chars)`);
      return sanitized;
    }

    log("Hierarchy too small/empty – falling back to vision if enabled", 'warn');
  } catch (error) {
    log(`Page source failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
  }

  // Fallback: Screenshot + vision LLM (placeholder for now)
  if (useVisionFallback) {
    try {
      const screenshotBase64 = await driver.takeScreenshot();
      log("Screenshot captured (base64 length: " + screenshotBase64.length + ")");
      // Future: send to LLM vision model → describe screen
      return "VISION_FALLBACK: [Screenshot base64 placeholder – describe screen here]";
    } catch (visionError) {
      log(`Screenshot failed: ${visionError instanceof Error ? visionError.message : String(visionError)}`, 'error');
    }
  }

  return "ERROR: Could not retrieve screen state";
}

/**
 * Basic sanitizer for iOS XML page source
 * (Adapt later to filter noise, extract key elements like buttons/text/frames)
 */
function sanitizePageSource(xml: string): string {
  // Placeholder: in real version, parse XML, remove redundant attrs, flatten to readable tree/text
  // Use xml2js or cheerio if we add deps later
  const cleaned = xml
    .replace(/<XCUIElementType[^>]*hidden="true"[^>]*>/g, '')  // Remove hidden
    .substring(0, 2000) + "... [truncated]";  // Temp limit to avoid huge logs

  return cleaned;
}
