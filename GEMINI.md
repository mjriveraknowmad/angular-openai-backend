# react-openai-backend (nest-gpt)

Backend service built with **NestJS** and **TypeScript** providing OpenAI-powered APIs for frontend applications.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [NestJS](https://nestjs.com/) v10 (Express platform)
- **Language**: TypeScript v5.1+
- **AI SDK**: [OpenAI Node SDK](https://github.com/openai/openai-node) v4 (`openai`)
- **Validation**: `class-validator`, `class-transformer`
- **Config**: `@nestjs/config` for `.env` management
- **Formatting & Linting**: Prettier, ESLint

---

## 📁 Project Structure

```text
src/
├── app.module.ts              # Root application module (loads ConfigModule and feature modules)
├── main.ts                    # Application entrypoint (CORS, global ValidationPipe, port 3000)
└── gpt/                       # Main GPT feature module
    ├── gpt.module.ts          # Module definition
    ├── gpt.controller.ts      # HTTP endpoints routing
    ├── gpt.service.ts         # OpenAI client initialization & use-case orchestration
    ├── dtos/                  # Data Transfer Objects with class-validator
    │   ├── index.ts           # Barrel export
    │   └── orthography.dto.ts
    └── use-cases/             # Pure use case functions isolating OpenAI logic & prompts
        ├── index.ts           # Barrel export
        └── orthography.use-case.ts
```

---

## 🏗️ Architectural Patterns & Guidelines

1. **Use-Case Pattern**:
   - Controllers handle HTTP routing and request/response mapping.
   - Services instantiate external dependencies (e.g., `OpenAI`) and delegate to specialized use-case functions.
   - Business logic, prompts, and OpenAI API calls reside inside `use-cases/<feature>.use-case.ts`.
   - Export all use cases and DTOs via their respective `index.ts` barrel files.

2. **DTO & Validation**:
   - Use `class-validator` decorators (`@IsString()`, `@IsInt()`, `@IsOptional()`, etc.) on all input DTOs.
   - `ValidationPipe` is registered globally with `{ whitelist: true, forbidNonWhitelisted: true }`.

3. **OpenAI Interactions**:
   - Prefer structured output (e.g., `response_format: { type: 'json_object' }`) when returning data to the client.
   - Keep system prompts clear and specify JSON return schemas when applicable.
   - Properly parse responses and handle API failures gracefully.

4. **Code Style**:
   - Prettier formatting with single quotes, semicolons, and trailing commas where appropriate.
   - Run `npm run format` and `npm run lint` before committing.

---

## 🚀 Key Commands

| Command | Description |
| :--- | :--- |
| `npm run start:dev` | Start the development server with live reload on port 3000 |
| `npm run build` | Compile the TypeScript application into `dist/` |
| `npm run format` | Format source code with Prettier |
| `npm run lint` | Run ESLint with automatic fixes |
| `npm test` | Run unit tests with Jest |
| `npm run test:e2e` | Run end-to-end tests |

---

## ⚙️ Environment Variables

Copy `.env.template` to `.env` and configure:

```env
OPENAI_API_KEY=your_openai_api_key_here
```
