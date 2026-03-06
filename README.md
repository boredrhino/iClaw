# iClaw – iPhone AI Agent

**Turn old iPhones into autonomous AI agents.**  
Give it a plain-English goal → it reads the screen (UI hierarchy via Appium + XCUITest), reasons with an LLM, taps/types/swipes, repeats until done.

Inspired by and adapted from [DroidClaw](https://github.com/unitedbyai/droidclaw) (Android version).

Follow me on X https://x.com/boredrhinoxyz for any official updates or potential tokens for my project.

Community Launched Coin on Pumpfun: 2k5Xj41hxjuhearGAY7oEa1qjsEeMhcMS9zwswztpump

## Features
- Natural language goals & multi-step workflows
- Deterministic YAML flows
- Vision fallback (screenshots → vision LLM)
- Appium-based control (no jailbreak needed)
- Supports Groq, OpenAI, etc.

## Requirements
- Mac with Xcode installed
- iPhone (iOS 12+) with Developer Mode enabled
- Appium (`npm install -g appium` + `appium driver install xcuitest`)
- Bun or Node.js

## Quick Setup
1. `git clone https://github.com/boredrhino/iClaw.git`
2. `cd iClaw && bun install`
3. Copy `.env.example` → `.env` and fill in LLM keys, DEVICE_UDID, etc.
4. Start Appium: `appium &`
5. Run: `bun run src/kernel.ts --goal "Your goal here"`

## Examples
See `examples/workflows/` for JSON workflows and `examples/flows/` for YAML flows.

MIT License • Early prototype – contributions welcome!
