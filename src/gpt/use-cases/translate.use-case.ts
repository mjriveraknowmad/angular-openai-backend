import { GoogleGenAI } from '@google/genai';

interface Options {
    prompt: string;
    lang: string;
}

export const translateUseCase = async (
    ai: GoogleGenAI,
    { prompt, lang }: Options,
) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
            systemInstruction: `Traduce el siguiente texto al idioma ${lang}:`,
            temperature: 0.2,
        },
    });

    return { message: response.text ?? '' };
};
