# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A minimal Node.js + TypeScript sandbox for experimenting with the Anthropic (Claude) SDK. `server.ts` is the entry point — it constructs an `Anthropic` client and makes a single `messages.create` call. Despite the name, `server.ts` is a one-shot script, not a long-running server. TypeScript is executed directly via `tsx` (no build step).

## Commands

- `npm start` — run `server.ts` once via `tsx` (loads `.env` via Node's `--env-file`).
- `npm run dev` — run under `tsx watch` with auto-reload on file changes.
- `npm run typecheck` — type-check the project with `tsc --noEmit`.
- No test runner is configured (`npm test` is a placeholder that exits 1).

## Configuration

Requires a `.env` file at the repo root. API keys are read from `process.env` and re-exported through `constants.ts`:

- `CLAUDE_API_KEY` → `apiKey` (used by the Anthropic client)

## Notes

- ES modules (`"type": "module"`) — use `import`/`export`, not `require`. Relative imports use `.js` extensions (NodeNext resolution), even though the source files are `.ts`.
- Node loads `.env` natively via the `--env-file` flag in the npm scripts, so no `dotenv` dependency is present.
- All secrets flow through `constants.ts`; import keys from there rather than reading `process.env` directly elsewhere.
