# Taswir

Taswir is a generative front-end for Model-Controlled Process (MCP) systems. It connects to an MCP endpoint, fetches available tools, and dynamically renders user interfaces based on tool schemas. Executions run inside real browser sessions powered by Browserbase.

Built with Next.js 14, Tailwind CSS, shadcn/ui, and the Browserbase SDK.

## What It Does

- Connects to an MCP URL with auth
- Fetches tool definitions (name, schema, return type, endpoint)
- Generates input forms from JSON schema
- Executes tools inside Browserbase browser sessions
- Renders output as markdown, list, or plain text
- Streams real-time session logs

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- React JSON Schema Form
- Browserbase SDK

