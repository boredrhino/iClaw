# Claude Integration Notes for iClaw

This project can use Claude (via Anthropic API) as an alternative LLM provider for reasoning and action selection.

## Setup
1. Get an Anthropic API key: https://console.anthropic.com/
2. Add to .env:
3. Supported models: claude-3-5-sonnet-latest, claude-3-opus, etc.

## Why Claude?
- Strong at structured reasoning and tool use
- Good vision capabilities for screenshot fallback
- Handles long contexts well for complex multi-step goals

In src/llm-providers.ts we will add support similar to Groq/OpenAI.

Placeholder for now – full integration coming soon.
