import { GoogleGenAI } from "@google/genai";

async function generateImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompts = [
    {
      id: "hero",
      prompt: "A high-end, clean, modern garage with a full wall of custom-built wooden rack systems. The racks are made of light-colored 2x4 lumber. They are filled with dozens of black plastic storage totes with distinctive yellow lids. The totes are neatly organized, sliding into the wooden rails. Professional lighting, photorealistic, 4k, architectural photography style.",
      aspectRatio: "3:4"
    },
    {
      id: "wall",
      prompt: "A massive wall-to-wall wooden storage rack system in a spacious garage. The structure is made of light pine wood. It holds rows and columns of black storage bins with yellow lids. The garage floor is clean epoxy. Photorealistic, wide angle, bright daylight.",
      aspectRatio: "4:3"
    },
    {
      id: "mobile",
      prompt: "A mobile wooden storage rack on heavy-duty caster wheels. It is made of light-colored wood and holds 9 black storage totes with yellow lids (3x3 grid). It is in a well-lit workshop or garage. Photorealistic, clean background.",
      aspectRatio: "4:3"
    },
    {
      id: "workbench",
      prompt: "A custom garage storage system that combines a wooden workbench with integrated racks for black and yellow storage totes. The workbench has a smooth plywood top. The racks are built underneath and to the sides. Photorealistic, functional workspace.",
      aspectRatio: "4:3"
    }
  ];

  for (const item of prompts) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: item.prompt }] },
        config: {
          imageConfig: {
            aspectRatio: item.aspectRatio as any,
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // In this environment, I'll just log that it's done and the ID
          // I'll then manually use the tool in the next turn to get the actual data if needed
          // but actually I can just use the tool directly in the next turn.
          console.log(`GENERATED:${item.id}`);
        }
      }
    } catch (e) {
      console.error(`FAILED:${item.id}`, e);
    }
  }
}

generateImages();
