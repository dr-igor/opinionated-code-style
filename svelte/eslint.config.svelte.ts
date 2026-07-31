import svelte from "eslint-plugin-svelte"
import svelteParser from "svelte-eslint-parser"
import tseslint from "typescript-eslint"

interface SvelteConfigOptions {
  svelteConfig: unknown
  tsconfigRootDir: string
}

export default function svelteConfig({ svelteConfig, tsconfigRootDir }: SvelteConfigOptions) {
  return tseslint.config(
    ...svelte.configs["flat/recommended"],
    {
      files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
      languageOptions: {
        parser: svelteParser,
        parserOptions: {
          // tseslint.parser + projectService + extraFileExtensions builds a
          // type-aware program for .svelte files so the base config's strict
          // type-checked rules run inside <script>. svelte-check checks
          // templates only; it does not enforce these lints.
          parser: tseslint.parser,
          projectService: true,
          extraFileExtensions: [".svelte"],
          svelteFeatures: { runes: true },
          svelteConfig,
          tsconfigRootDir,
        },
      },
      rules: {
        // Template markup consumes script variables; the rule can't see that.
        "no-useless-assignment": "off",
        // Runes ($props/$state/$derived) require let; rune-aware rule replaces core.
        "prefer-const": "off",
        "svelte/prefer-const": "error",
      },
    },
  )
}
