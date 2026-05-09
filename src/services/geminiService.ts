import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Excuse {
  excuse: string;
  category: string;
}

export async function generateExcuse(mood?: string): Promise<Excuse> {
  const prompt = `Generate a cute, slightly cheeky, and aesthetic excuse to call a crush. 
  The mood context is: ${mood || 'random cute'}.
  The excuse should be creative and not too cringey, but definitely sweet.
  
  Example: "I saw a cloud that looked exactly like that one cat video you sent me and I just had to tell you."
  Example: "I'm at the grocery store and I can't remember if you said you liked the blue or pink Gatorade more."`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          excuse: { type: Type.STRING, description: "The excuse text" },
          category: { type: Type.STRING, description: "A one-word category (e.g., Sweet, Funny, Random)" }
        },
        required: ["excuse", "category"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    return {
      excuse: "I just really wanted to hear your voice.",
      category: "Sweet"
    };
  }
}
