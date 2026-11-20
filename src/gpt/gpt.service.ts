import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  private ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // Solo va a llamar casos de uso

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.ai, {
      prompt: orthographyDto.prompt,
    });
  }
}
