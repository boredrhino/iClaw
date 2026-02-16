// src/logger.ts - Logging utility
export function log(message: string, level: 'info' | 'error' = 'info') {
  const time = new Date().toISOString();
  console.log(`[${time}] [${level.toUpperCase()}] ${message}`);
}

log("Logger initialized");
