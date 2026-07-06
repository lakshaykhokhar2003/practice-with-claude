# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A minimal Node.js sandbox for experimenting with the Anthropic (Claude) SDK. `server.js` is the entry point — it constructs an `Anthropic` client and makes a single `messages.create` call. Despite the name, `server.js` is a one-shot script, not a long-running server.

## Commands

- `npm start` — run `server.js` once (loads `.env` via Node's `--env-file`).
- `npm run dev` — run under `nodemon` with auto-reload on file changes.
- No test runner is configured (`npm test` is a placeholder that exits 1).

## Configuration

Requires a `.env` file at the repo root. API keys are read from `process.env` and re-exported through `constants.js`:

- `CLAUDE_API_KEY` → `apiKey` (used by the Anthropic client)
- `CHATGPT_API_KEY` → `gptKey` (declared but currently unused)

## Notes

- ES modules (`"type": "module"`) — use `import`/`export`, not `require`.
- Node loads `.env` natively via the `--env-file` flag in the npm scripts, so no `dotenv` dependency is present.
- All secrets flow through `constants.js`; import keys from there rather than reading `process.env` directly elsewhere.
