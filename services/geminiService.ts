
import { GoogleGenAI, Type } from "@google/genai";
import type { Shot } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateShotList = async (script: string): Promise<Shot[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert AI Director of Photography. Your task is to analyze a screenplay scene and break it down into a professional shot list. For each shot, provide a concise but descriptive summary, suggest a camera angle, describe the lighting, and define the mood.

      The screenplay scene is:
      ---
      ${script}
      ---

      Generate a JSON array of shots based on the schema provided.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              shotNumber: {
                type: Type.INTEGER,
                description: "The sequential number of the shot.",
              },
              description: {
                type: Type.STRING,
                description: "A description of the action and characters in the shot."
              },
              cameraAngle: {
                type: Type.STRING,
                description: "The suggested camera angle (e.g., Wide Shot, Medium Close-Up)."
              },
              lighting: {
                type: Type.STRING,
                description: "The suggested lighting style (e.g., Dim, hazy, warm light)."
              },
              mood: {
                type: Type.STRING,
                description: "The overall mood or tone of the shot (e.g., Tense, Mysterious)."
              },
            },
            required: ["shotNumber", "description", "cameraAngle", "lighting", "mood"],
          },
        },
      },
    });
    
    const jsonStr = response.text.trim();
    const result = JSON.parse(jsonStr);
    return result as Shot[];

  } catch (error) {
    console.error("Error generating shot list:", error);
    throw new Error("Failed to generate shot list from Gemini API.");
  }
};

export const generateStoryboardImage = async (shot: Shot): Promise<string> => {
  try {
    const prompt = `Create a cinematic, photorealistic storyboard image for a film scene. The style should be dramatic and moody.
      Shot Description: ${shot.description}
      Camera Angle: ${shot.cameraAngle}
      Lighting: ${shot.lighting}
      Mood: ${shot.mood}`;
      
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating storyboard image:", error);
    // Return a placeholder if generation fails
    return `https://picsum.photos/seed/${shot.shotNumber}/1280/720`;
  }
};

export const generateSoundSuggestion = async (shot: Shot): Promise<string> => {
  try {
    const prompt = `You are a sound designer for film. Based on the following shot description, provide a single, concise suggestion for a sound effect or music cue. Be brief and evocative. Just return the suggestion, no preamble.

    Shot Description: "${shot.description}"
    Mood: ${shot.mood}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating sound suggestion:", error);
    return "No sound suggestion available.";
  }
};
