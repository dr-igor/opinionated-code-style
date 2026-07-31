import tseslint from "typescript-eslint"

// Mirrors the boolean prefix list in @igorlabworks/eslint-config-typescript.
// ESLint replaces (not merges) naming-convention, so the full list must be
// re-declared here alongside the SvelteKit filter.
const BOOLEAN_PREFIXES = ["is", "has", "should", "can", "did", "will"] as const

export default tseslint.config({
  // SvelteKit page options (prerender/ssr/csr) are framework-mandated boolean
  // export names the app cannot choose; exempt only those from the boolean-prefix
  // rule so app-authored booleans in these files are still checked.
  files: ["src/**/+*.ts"],
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: BOOLEAN_PREFIXES,
        filter: { regex: "^(prerender|ssr|csr)$", match: false },
      },
    ],
  },
})
