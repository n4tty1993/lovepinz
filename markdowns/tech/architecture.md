# Folder Architecture

## Overview

The project follows Next.js App Router conventions combined with a feature-oriented separation of concerns. All source code lives at the root level — there is no `src/` wrapper.

```
/
├── app/                  # Next.js App Router: pages, layouts, and API routes
│   ├── api/              # Server-side API route handlers
│   ├── layout.tsx        # Root layout (HTML shell, global providers)
│   ├── page.tsx          # Homepage (/)
│   ├── product/
│   │   └── page.tsx      # Product Detail Page (/product)
│   └── globals.css       # Global styles and Tailwind CSS entry point
│
├── components/           # Shared React components
│   ├── shared/           # Layout-level components rendered in app/layout.tsx
│   │   ├── Navbar/       # Fixed navigation bar
│   │   └── Footer/       # Site footer
│   ├── home/             # Homepage-specific section components
│   ├── pdp/              # Product Detail Page section components
│   └── ui/               # shadcn/ui primitives (not modified directly; regenerated via CLI)
│
├── core/                 # Core business logic, domain rules, and workflows
│
├── services/             # External service integrations (e.g., email, payment, storage)
│
├── db/                   # Database configuration and connection
│   └── models/           # Mongoose schema models
│
├── hooks/                # Custom React hooks (client-side)
│
├── contexts/             # React Context providers (global state)
│
├── types/                # Shared TypeScript type and interface definitions
│
├── constants/            # App-wide constants (pricing, config values, etc.)
│
├── utils/                # Pure utility/helper functions
│
├── lib/                  # shadcn/ui utility file
│   └── utils.ts          # cn() helper (clsx + tailwind-merge)
│
├── public/               # Static assets served at /
│
└── markdowns/            # Internal project documentation
    ├── business/         # Business overview and goals
    ├── product/          # Product vision and specs
    ├── users/            # Target user personas
    └── tech/             # Technology stack and architecture (this folder)
```

## Directory Responsibilities

### `app/`
Next.js App Router directory. Every folder here maps to a URL segment. Place page components, layouts, loading/error boundaries, and `route.ts` API handlers here. Keep this layer thin — delegate logic to `core/` and `services/`.

### `components/`
Reusable UI components shared across multiple pages. Organized into:
- `shared/` — layout-level components rendered globally via `app/layout.tsx` (e.g. `Navbar/`, `Footer/`). Add here only when a component is truly global.
- `home/` — homepage-specific section components. Each is its own directory. Composed in `app/page.tsx`.
- `pdp/` — Product Detail Page section components. Each is its own directory. Composed in `app/product/page.tsx`. See `markdowns/tech/pdp-architecture.md` for full component tree.
- `ui/` — low-level shadcn/ui primitives (not modified directly; regenerated via CLI)

All components follow the collocated directory pattern — see `markdowns/tech/conventions.md`.

### `core/`
The heart of the application's business logic. Contains domain-specific rules and workflows that are independent of any framework or transport layer (e.g., pricing calculations, proof generation logic).

### `services/`
Integrations with external systems: payment processors, email providers, file storage (e.g., S3), or any third-party APIs. Each service should be isolated in its own file or subfolder.

### `db/`
Database connection setup and Mongoose model definitions. Models define the schema for all MongoDB collections.

### `hooks/`
Custom React hooks for reusable client-side stateful logic (e.g., `useOrderForm`, `usePricing`).

### `contexts/`
React Context providers for global UI state that needs to be shared across the component tree (e.g., cart state, user session).

### `types/`
Shared TypeScript types and interfaces used across multiple layers of the app. Keeps type definitions centralized and avoids duplication.

### `constants/`
Static, unchanging values referenced throughout the app (e.g., pin size options, finish types, minimum order quantities, base pricing tiers).

### `utils/`
Stateless helper functions that perform data transformations, formatting, or calculations. Should have no side effects.

### `lib/`
Reserved for the shadcn/ui `utils.ts` file containing the `cn()` helper function. Do not add unrelated files here.
