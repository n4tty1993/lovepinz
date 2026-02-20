# Technology Stack

## Framework

- **Next.js 16** – App Router, React Server Components (RSC), and API Routes
- **React 19** – UI rendering
- **TypeScript 5** – Strictly typed codebase (`strict: true`)

## Styling

- **Tailwind CSS v4** – Utility-first CSS framework
- **tw-animate-css** – Animation utilities for Tailwind
- **class-variance-authority (CVA)** – Typed variant management for component styles
- **clsx + tailwind-merge** – Conditional class merging without conflicts

## UI Components

- **shadcn/ui** – Component library built on Radix UI primitives (style: `radix-vega`, base color: `neutral`)
- **Radix UI** – Headless, accessible UI primitives
- **Base UI** – Additional headless component primitives
- **Lucide React** – Icon set

## Forms & Validation

- **React Hook Form** – Performant form state management
- **Yup** – Schema-based validation
- **@hookform/resolvers** – Bridge between React Hook Form and Yup

## Database

- **MongoDB** – NoSQL document database
- **Mongoose** – ODM (Object Data Modeling) for MongoDB schema definition and queries

## Performance & Analytics

- **@next/third-parties** – Optimized loading of third-party scripts (e.g., Google Analytics)

## Dev Tooling

- **ESLint** – Linting with `eslint-config-next`
- **PostCSS** – CSS processing pipeline for Tailwind
- **Node.js types** – Type definitions for the Node runtime

## Path Aliases

All imports use the `@/` alias which resolves to the project root:

```ts
"@/*": ["./*"]
```

Common shadcn aliases:
| Alias | Resolves To |
|---|---|
| `@/components` | `./components` |
| `@/components/ui` | `./components/ui` |
| `@/lib` | `./lib` |
| `@/hooks` | `./hooks` |
