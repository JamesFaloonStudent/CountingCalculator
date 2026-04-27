# Copilot instructions for CountingCalculator

## Build, test, and lint commands

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | Run after pulling dependency changes. |
| Start development server | `npx expo start` | Main local workflow from `README.md`. |
| Start on Android | `npm run android` | Alias for `expo start --android`. |
| Start on iOS | `npm run ios` | Alias for `expo start --ios`. |
| Start on web | `npm run web` | Alias for `expo start --web`. |
| Lint | `npm run lint` | Uses Expo ESLint config (`eslint.config.js`). |
| Reset starter scaffold | `npm run reset-project` | Moves starter code to `app-example/` and recreates `app/`. |
| Run all tests | Not configured | No `test` script currently exists in `package.json`. |
| Run a single test | Not available | Add a test runner and test scripts before this is possible. |

## High-level architecture

- This is an Expo Router app (`package.json` main is `expo-router/entry`), so navigation is file-based from the `app/` directory.
- `app/_layout.tsx` is the app shell and wraps routes with `PaperProvider`; Expo Router headers are disabled (`<Stack screenOptions={{ headerShown: false }} />`).
- The app currently has two routes: `app/index.tsx` (main counting UI) and `app/settings.tsx` (settings screen). Both are wrapped with `AppDrawerLayout`.
- `components/AppDrawerLayout.tsx` owns top-level navigation UI:
  - custom `react-native-paper` app bar
  - custom slide-in drawer surface
  - route-aware title (`Home` / `Settings`) from `usePathname`
  - route changes via `router.push`
- `app/index.tsx` composes the main screen as:
  - `CalculatorTotalComponent` (total display card)
  - `ScrollView` containing `FormLayout`
  - `ButtonGrid` (4x4 keypad-like grid)
- Form fields are data-driven: `FormLayout` maps `defaultCountableMoney` from `types/CountableMoney.ts` into repeated `FormTextInput` rows.
- Runtime config in `app.json` enables `expo-router`, typed routes (`experiments.typedRoutes`), `reactCompiler`, and `newArchEnabled`.

## Key conventions in this repository

- Keep route files in `app/`; shared UI components live in `components/`.
- TypeScript is strict (`tsconfig.json`) and path alias `@/*` maps to repository root.
- Current UI mixes `react-native` primitives with `react-native-paper` components; prefer existing Paper components for cards, app bar, drawer, and inputs.
- Route screens should use `AppDrawerLayout` so header + drawer behavior and styling stay consistent across screens.
- Keep width alignment consistent for core home-screen blocks (`CalculatorTotalComponent`, form `ScrollView`, and `ButtonGrid` currently use 80% width conventions).
- `ButtonGrid` follows a local button metadata array pattern (`id` + `value`) and renders with `map`; preserve stable `id` keys when modifying button sets.
- Money input rows are generated from `defaultCountableMoney`; update that data source when adding/removing denominations instead of hardcoding extra fields.
- Do not edit `expo-env.d.ts` manually (generated Expo environment typing file).

## MCP server configuration

- Workspace MCP config is in `.vscode/mcp.json`.
- Playwright MCP server is configured as `playwright` via `npx @playwright/mcp@latest`.
- Current MCP args run Playwright in `--headless` and `--isolated` mode to make web-flow automation more reliable across environments.
