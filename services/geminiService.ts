
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    sentimentTrend: {
      type: Type.ARRAY,
      description: "An array of sentiment scores over time. Each point should have a 'date' (YYYY-MM-DD) and a 'sentiment' score from -1 (very negative) to 1 (very positive).",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING },
          sentiment: { type: Type.NUMBER },
        },
        required: ["date", "sentiment"],
      },
    },
    wordCloud: {
      type: Type.ARRAY,
      description: "An array of words and their frequencies for a word cloud. Include a mix of the most common positive and negative terms.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          value: { type: Type.NUMBER },
        },
        required: ["text", "value"],
      },
    },
    summary: {
      type: Type.STRING,
      description: "A concise executive summary in markdown format. Identify the top 3 actionable insights for business improvement based on the reviews.",
    },
  },
  required: ["sentimentTrend", "wordCloud", "summary"],
};

export async function analyzeReviews(reviews: string): Promise<AnalysisResult> {
  const prompt = `
    You are a customer sentiment analysis expert. Analyze the following raw text customer reviews.
    1.  For each review, infer a plausible date within the last 30 days to create a daily sentiment trend.
    2.  Generate a list of the 50 most frequent and impactful keywords (both positive and negative) and their frequencies for a word cloud.
    3.  Write a concise executive summary in markdown format that identifies the top 3 most critical and actionable insights for business improvement.
    
    Provide the output in the specified JSON format.
    
    Reviews:
    ---
    ${reviews}
    ---
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: analysisSchema,
    },
  });

  const jsonString = response.text.trim();
  return JSON.parse(jsonString) as AnalysisResult;
}


export async function chatWithBot(history: ChatMessage[], message: string, isThinkingMode: boolean): Promise<string> {
    const modelName = isThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const config = isThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {};

    const contents = [
        ...history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
        model: modelName,
        // @ts-ignore - The type for contents is slightly different but compatible
        contents: contents,
        config: config
    });
    
    return response.text;
}
