import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

function expressiveNarration(getApiKey) {
  return {
    name: 'scytale-expressive-narration',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        const apiKey = getApiKey();
        if (!apiKey) {
          res.statusCode = 503;
          res.end('Expressive narration is not configured');
          return;
        }

        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
            if (body.length > 200_000) {
              res.statusCode = 413;
              res.end('Text is too long');
              return;
            }
          }
          const { text } = JSON.parse(body || '{}');
          if (typeof text !== 'string' || !text.trim()) {
            res.statusCode = 400;
            res.end('Text is required');
            return;
          }

          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash-lite-tts',
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text,
                    speechMetadata: {
                      style: 'Read this as an original, lively science-story narrator for children. Sound bright, playful, warm, and genuinely curious, with expressive changes in pitch and emphasis. Make discoveries exciting and reassuring moments gentle.',
                    },
                  },
                ],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
              },
            },
          });

          const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (!base64Audio) {
            res.statusCode = 502;
            res.end('Expressive narration is temporarily unavailable');
            return;
          }

          const wavBuffer = Buffer.from(base64Audio, 'base64');
          res.setHeader('Content-Type', 'audio/wav');
          res.setHeader('Cache-Control', 'no-store');
          res.end(wavBuffer);
        } catch (error) {
          console.error('Gemini narration request failed:', error.message);
          if (!res.headersSent) {
            res.statusCode = 502;
            res.end('Expressive narration is temporarily unavailable');
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    plugins: [react(), tailwindcss(), expressiveNarration(() => env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)],
  };
});
