import { GoogleGenAI } from '@google/genai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  ai: GoogleGenAI,
  { prompt }: Options,
) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
    config: {
      systemInstruction: `
          Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de ser en formato markdown,
          los pros y contras deben de estar en una lista,
        `,
      temperature: 0.8,
      maxOutputTokens: 500,
    },
  });

  return {
    role: 'assistant',
    content: response.text ?? '',
  };
};
