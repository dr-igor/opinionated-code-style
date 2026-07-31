# @igorlabworks/eslint-config-svelte

Shareable ESLint flat config capturing Svelte-specific conventions: type-aware linting inside `.svelte` `<script>` blocks via `svelte-eslint-parser`, Svelte 5 runes compatibility (`prefer-const` → `svelte/prefer-const`), and an optional SvelteKit sub-export that carves out framework-mandated page option exports from the boolean-naming rule.

Designed to layer on top of `@igorlabworks/eslint-config-typescript` — the two configs are spread together; this package ships only Svelte additions.

## Installing

Released tarballs are attached to GitHub Releases. Install directly from the release URL (no registry or auth required):

```bash
# npm
npm i -D https://github.com/dr-igor/opinionated-code-style/releases/download/svelte-v0.1.0/igorlabworks-eslint-config-svelte-0.1.0.tgz

# pnpm
pnpm add -D https://github.com/dr-igor/opinionated-code-style/releases/download/svelte-v0.1.0/igorlabworks-eslint-config-svelte-0.1.0.tgz
```

Replace `svelte-v0.1.0` with the desired release tag.

Peer dependencies must be installed separately:

```bash
npm i -D eslint typescript typescript-eslint eslint-plugin-svelte svelte-eslint-parser svelte
```

## Usage

In a consuming project's `eslint.config.ts`:

```typescript
import base from "@igorlabworks/eslint-config-typescript"
import svelteConfig from "@igorlabworks/eslint-config-svelte"
import sveltekit from "@igorlabworks/eslint-config-svelte/sveltekit"
import svelteCfg from "./svelte.config.js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  ...base,
  ...svelteConfig({ svelteConfig: svelteCfg, tsconfigRootDir: import.meta.dirname }),
  ...sveltekit, // SvelteKit only — omit for plain Svelte projects
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // app-specific: ignores, globals, rule opt-outs
)
```

`svelteConfig` accepts the project's parsed `svelte.config.js` so `svelte-eslint-parser` knows about preprocessors (e.g. mdsvex). Pass `import.meta.dirname` as `tsconfigRootDir` so the type-aware program is rooted at the consuming project.

The top-level `projectService`/`tsconfigRootDir` block is still required for plain `.ts` files — the Svelte factory only wires them into the `.svelte` parser block.

## Not included

App-specific opt-outs (`svelte/no-navigation-without-resolve`, custom ignores, globals) stay in the consumer's config.
