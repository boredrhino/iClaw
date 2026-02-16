// src/logger.ts - Simple colored/timestamped logging

export function log(message: string, level: 'info' | 'error' | 'warn' = 'info') {
  const time = new Date().toISOString();
  const prefix = `[${time}]`;
  let colored = message;

  if (level === 'error') colored = `\x1b[31m${message}\x1b[0m`;     // red
  if (level === 'warn')  colored = `\x1b[33m${message}\x1b[0m`;     // yellow

  console.log(`${prefix} [${level.toUpperCase()}] ${colored}`);
}

log("Logger module loaded successfully");
