# Code Conventions

## Component Directory Structure

Every component — whether in `components/home/`, `components/shared/`, or any other
subdirectory — follows a collocated directory pattern:

```
ComponentName/
  ComponentName.tsx           ← the component itself (named export)
  ComponentName.types.ts      ← TypeScript interfaces/types (only if needed outside .tsx)
  ComponentName.constants.ts  ← static data arrays, config values (only if non-trivial)
```

### Rules

- **Always** use named exports, never default exports from component files.
- **Create `.types.ts`** only when types are meaningful enough to reuse or when extracting
  them improves readability. Do not create an empty types file.
- **Create `.constants.ts`** when a component has static data arrays (e.g. nav links,
  pricing tiers, FAQ items). Trivial one-liner values stay inline.
- **No `index.ts` barrel files.** Import directly from the `.tsx` file:
  ```ts
  // correct
  import { Navbar } from "@/components/shared/Navbar/Navbar";

  // wrong
  import { Navbar } from "@/components/shared/Navbar";
  ```
- Component file names and function names must match the directory name exactly.

## Import Aliases

All imports use the `@/` alias resolving to the project root. Never use relative `../` paths
that cross directory boundaries.

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `HeroSection.tsx` |
| Constants files | PascalCase | `HeroSection.constants.ts` |
| Types files | PascalCase | `HeroSection.types.ts` |
| Constants values | SCREAMING_SNAKE_CASE | `PRICING_TIERS` |
| Types/Interfaces | PascalCase | `PricingTier` |
| CSS custom properties | kebab-case | `--brand-gold` |
