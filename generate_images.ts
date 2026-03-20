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
    },
    {
      id: "detail",
      prompt: "A close-up detail shot of a custom wooden garage rack system. Shows the light-colored wood rails and how the yellow lid of a black storage tote slides perfectly into the wooden support. High detail on wood grain and plastic texture. Photorealistic, shallow depth of field.",
      aspectRatio: "4:3"
    }
  ];

  const results = [];

  for (const item of prompts) {
    console.log(`Generating ${item.id}...`);
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
        results.push({ id: item.id, data: part.inlineData.data });
      }
    }
  }

  // In a real scenario, I'd write these to files or return them.
  // Since I need to update the React code, I'll output the base64 strings (truncated for logs)
  // and then use them in the components.
  console.log("GENERATION_COMPLETE");
  results.forEach(r => {
    console.log(`IMAGE_ID:${r.id}`);
    console.log(`IMAGE_DATA:${r.data}`);
  });
}

generateImages();
