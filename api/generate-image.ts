import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || '',
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    prompt,
    imageSize = '1K',
    aspectRatio = '1:1',
    model = 'gemini-3-pro-image-preview',
  } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(200).json({
      success: true,
      imageUrl: '/images/crm_ai_qualification_3d_1786803039452.jpg',
      mock: true,
      prompt,
      imageSize,
      aspectRatio,
      message:
        'Изображение сгенерировано в демо-режиме (настройте GEMINI_API_KEY в Vercel для живой генерации через Gemini 3 Pro).',
    });
  }

  try {
    const ai = getAIClient();
    const targetModel = model.includes('gemini') ? model : 'gemini-3-pro-image-preview';

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as '1:1' | '3:4' | '4:3' | '9:16' | '16:9',
          imageSize: imageSize as '1K' | '2K' | '4K',
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
        details: textResponse || 'The model did not generate an image part.',
      });
    }

    return res.status(200).json({
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
    return res.status(500).json({ error: error.message || 'Internal server error during image generation' });
  }
}
