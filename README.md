# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# Expressive Read to Me voice (optional)

SciTale uses the existing browser voice automatically when cloud narration is not configured. To enable the more expressive online narrator for local development, create a Gemini API key, copy `.env.example` to `.env`, and set `GEMINI_API_KEY` in `.env`. Restart the Vite development server afterward. The key is read by the local server and is not sent to the browser.

Cloud narration needs internet access and a Gemini API key. If it is unavailable, Read to Me falls back to the browser voice.
