import { GoogleGenAI } from '@google/genai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  ai: GoogleGenAI,
  options: Options,
) => {
  const { prompt } = options;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      systemInstruction: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
        Debes de responder en formato JSON, 
        tu tarea es corregirlos y retornar información soluciones, 
        también debes de dar un porcentaje de acierto por el usuario,
        
        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida:
        {
          "userScore": number,
          "errors": string[], // ['error -> solución']
          "message": string // Usa emojis y texto para felicitar al usuario
        }
      `,
      temperature: 0.3,
      maxOutputTokens: 500,
      responseMimeType: 'application/json',
    },
  });

  const jsonResp = JSON.parse(response.text ?? '{}');

  return jsonResp;
};
