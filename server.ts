import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Image Generation Endpoint using gemini-3-pro-image-preview / gemini-3-pro-image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { 
      prompt, 
      imageSize = '1K', 
      aspectRatio = '1:1',
      model = 'gemini-3-pro-image-preview'
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      // Return a simulated high-quality holographic render placeholder if no key configured
      return res.status(200).json({
        success: true,
        imageUrl: '/images/crm_ai_qualification_3d_1786803039452.jpg',
        mock: true,
        prompt,
        imageSize,
        aspectRatio,
        message: 'Изображение сгенерировано в демо-режиме (настройте GEMINI_API_KEY для живой генерации через Gemini 3 Pro).'
      });
    }

    const ai = getAIClient();

    // Map model name: fallback to gemini-3-pro-image or gemini-3.1-flash-image
    const targetModel = model.includes('gemini') ? model : 'gemini-3-pro-image-preview';

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: (aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9") || "1:1",
          imageSize: (imageSize as "1K" | "2K" | "4K") || "1K",
        },
      },
    });

    let generatedImageUrl = '';
    let textResponse = '';

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textResponse += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      return res.status(500).json({ 
        error: 'No image data returned from model', 
        details: textResponse || 'The model did not generate an image part.' 
      });
    }

    return res.json({
      success: true,
      imageUrl: generatedImageUrl,
      prompt,
      imageSize,
      aspectRatio,
      model: targetModel,
      text: textResponse,
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error during image generation',
    });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
