# AGENTS.md - Botebook Backend Agent Guidelines

This document provides instructions and conventions for agents working in this codebase.

## Project Overview

- **Stack**: Node.js + Express.js + TypeScript + MongoDB (Mongoose) + PostgreSQL (TypeORM)
- **Testing**: Jest with `ts-jest`, `supertest`, `mongodb-memory-server`
- **Linting**: ESLint (flat config in `eslint.config.mjs`) + Prettier
- **Type Safety**: TypeScript with `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
- **Validation**: Zod for input validation schemas
- **Auth**: JWT-based with refresh tokens

## Build / Lint / Test Commands

```bash
npm run build          # Build TypeScript to dist/
npm run lint           # Run ESLint
npm run lint:fixed     # Auto-fix lint issues
npm run prettier       # Format code with Prettier
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npx jest src/__tests__/user.test.ts        # Run single test file
npx jest --testNamePattern "return 200"    # Run tests matching a name
npx jest --coverage                        # Run with coverage
npm run dev           # Dev server (nodemon)
npm start             # Build + run
```

## Code Style Guidelines

### TypeScript Conventions

- Use explicit return types on exported functions.
- Prefer `interface` for object shapes; use `type` for unions, intersections.
- Use Zod `z.infer<>` to derive types from schemas (`export type XInput = z.infer<typeof XSchema>["body"]`).
- Avoid `any`; use `unknown` when the type is genuinely unknown.
- `noUncheckedIndexedAccess` is enabled — always guard array/index access.

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Files | kebab-case | `user.service.ts`, `auth.validation.ts` |
| Interfaces | PascalCase with `I` prefix | `IUser`, `IRole` |
| Enums | PascalCase | `ErrorCode`, `UserRole` |
| Functions / Variables | camelCase | `findUserById`, `createUser` |
| Constants | SCREAMING_SNAKE_CASE | `JWT_ACCESS_SECRET` |
| Mongoose Models | PascalCase | `UserModel`, `RoleModel` |
| Test files | `*.test.ts` | `user.test.ts`, `posts.test.ts` |

### Imports

- Use ES module `import` syntax (compiled to CommonJS).
- Order: external libs → internal packages → relative paths.
- Barrel exports from `index.ts` files (e.g., `src/errors/index.errors.ts`).
- Do NOT use `require()` unless for CommonJS-only modules (e.g., `morgan`, `cors`).

### File & Directory Layout

```
src/
├── api/          # Express route definitions
├── controllers/  # Request handlers (auth/, role/, user/)
├── errors/       # Custom error classes + barrel index
├── interface/    # TypeScript interfaces (one per domain)
├── middleware/   # Express middleware + barrel index
├── models/       # Mongoose models
├── services/     # Business logic (DB queries, external calls)
├── validation/   # Zod schemas
├── config/       # Env, DB, logging config
├── utils/        # Pure utility functions (jwt, mail, helpers)
├── __tests__/    # Integration tests (supertest)
├── loader/       # App bootstrap, express setup
├── logs/         # Access logs
├── mails/        # Email templates
└── subscriber/   # Event subscribers
```

### Error Handling

- Use custom error classes extending `Error` (see `src/errors/`).
- `CustomAPIError` base class: `message`, `errorCode` (enum), `statusCode`.
- Specific errors: `BadRequestError`, `NotFoundError`, `ForbiddenError`, `UnAuthenticatedError`, `InternalServerError`.
- Always pass an `ErrorCode` from the enum (numeric codes).
- Never `console.log` errors in production — use the logger (`winston`).
- Global error handler in `src/middleware/errorHandler.middleware.ts`.

### Express Patterns

- Controllers receive `(req, res, next)`. Use `async` handlers with `next(err)` on rejection.
- Middleware order: helmet → cors → body parsers → mongo sanitize → routes → 404 → error handler.
- JWT auth via `AuthJWT` middleware; role authorization via `authorizeRoles`.
- Attach `userData` on `req` from JWT middleware (typed via `IUserMessage`).
- Use `express-async-handler` or wrap controllers with try/catch + `next(err)`.

### Mongoose Models

- Define schemas with TypeScript interfaces (`IUser extends Document`).
- Use `select: false` for sensitive fields (`password`, `OTPCode`).
- Always set `timestamps: true`.
- Reference other models with `ref: "ModelName"` and `Schema.Types.ObjectId`.

### Testing Conventions

- Place tests in `src/__tests__/` with `*.test.ts` naming.
- Use `beforeAll` to call `bootstrap()` and get the Express app.
- Use `afterAll` to disconnect Mongoose and close the in-memory server.
- Use `supertest` for HTTP-level integration tests (`request(app).get(...)`).
- Use `mongodb-memory-server` to avoid needing a real MongoDB instance.
- Arrange/Act/Assert pattern with comments.

```ts
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { Express } from "express";
import { bootstrap } from "../loader/bootstrap";
import mongoose from "mongoose";

let app: Express;

beforeAll(async () => {
  app = await bootstrap();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.getClient().close();
});

describe("GET /api/users", () => {
  it("returns 200", async () => {
    const response = await request(app).get("/api/users").send();
    expect(response.status).toBe(200);
  });
});
```

### Validation (Zod)

Zod schemas are the single source of truth for input validation. Define schemas in `src/validation/` files:

```ts
import { object, z } from "zod";

export const loginUserSchema = z.object({
  body: object({
    email: z.string("Missing Email"),
    password: z.string(),
  }),
});

export type loginUserInput = z.infer<typeof loginUserSchema>["body"];
```

Use the Zod validation middleware to guard routes.

### Linting & Formatting

- `eslint.config.mjs` is the canonical ESLint config (flat config format).
- Active rules: `no-used-vars`, `no-undef`, `prefer-const` (error); `no-console` (warn).
- Run `npm run prettier` before committing.
- Do NOT disable lint rules inline without a comment explaining why.
