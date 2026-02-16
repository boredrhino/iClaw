
// src/ios-driver.ts - Appium/WebdriverIO session manager for iOS control update

import { remote } from 'webdriverio';
import { config } from './config.js';
import { log } from './logger.js';

let driver: any = null;  // Global driver instance (for simplicity in early prototype)

export async function initIOSDriver() {
  if (driver) {
    log("Driver already initialized");
    return driver;
  }

  log("Initializing Appium session for iOS...");

  const capabilities = {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:udid': config.deviceUDID,
    'appium:deviceName': 'iPhone',  // Generic; can be more specific if needed
    'appium:platformVersion': config.iosPlatformVersion || '17.0',
    'appium:noReset': true,          // Don't reset app state between runs
    'appium:fullReset': false,
    'appium:connectHardwareKeyboard': true,  // Helps with typing
  };

  try {
    driver = await remote({
      hostname: new URL(config.appiumServer).hostname,
      port: Number(new URL(config.appiumServer).port) || 4723,
      path: '/wd/hub',  // Standard Appium path
      capabilities,
    });

    log(`Appium session started successfully! Session ID: ${driver.sessionId}`);
    return driver;
  } catch (error) {
    log(`Failed to start Appium session: ${error.message || error}`, 'error');
    throw error;
  }
}

export async function closeIOSDriver() {
  if (driver) {
    try {
      await driver.deleteSession();
      log("Appium session closed");
    } catch (error) {
      log(`Error closing session: ${error.message || error}`, 'error');
    }
    driver = null;
  }
}

// Placeholder for basic test action
export async function testLaunchSafari() {
  const driver = await initIOSDriver();
  try {
    await driver.activateApp('com.apple.mobilesafari');
    log("Launched Safari successfully (test)");
  } catch (error) {
    log(`Test launch failed: ${error.message || error}`, 'error');
  }
}
