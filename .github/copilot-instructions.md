# Copilot instructions for CountingCalculator

## Build, test, and lint commands

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | Run after pulling dependency changes. |
| Start development server | `npx expo start` | Main local workflow from `README.md`. |
| Start on Android | `npm run android` | Alias for `expo start --android`. |
| Start on iOS | `npm run ios` | Alias for `expo start --ios`. |
| Start on web | `npm run web` | Alias for `expo start --web`. |
| Lint | `npm run lint` | Runs `expo lint` using `eslint-config-expo` (`eslint.config.js`). |
| Reset starter scaffold | `npm run reset-project` | Moves starter code to `app-example/` and recreates `app/`. |
| Run all tests | Not configured | No `test` script currently exists in `package.json`. |
| Run a single test | Not available | Add a test runner and test scripts before this is possible. |

## High-level architecture

- This is an Expo Router app (`package.json` uses `expo-router/entry`), so route files in `app/` define navigation.
- `app/_layout.tsx` is the global shell: it wraps the app in a custom `react-native-paper` dark theme and disables default stack headers (`headerShown: false`).
- Both current routes (`app/index.tsx` and `app/settings.tsx`) render inside `AppDrawerLayout`, so app bar + drawer navigation are centralized in one component.
- `components/AppDrawerLayout.tsx` handles global navigation behavior: menu app bar, slide-in drawer overlay, route-aware title from `usePathname`, and route changes through `router.push`.
- The home screen (`app/index.tsx`) is composed of three blocks in order: `CalculatorTotalComponent`, a scrollable denomination form (`FormLayout`), and `ButtonGrid`.
- Denomination rows are generated from the shared model in `types/CountableMoney.ts`; `FormLayout` maps `defaultCountableMoney` into `FormTextInput` instances.
- `docs/requirements.md` defines the intended product direction: cashier-focused cash counting with fast keyboard-like navigation between denomination fields.
- `app.json` enables Expo Router, typed routes (`experiments.typedRoutes`), React Compiler, and Expo new architecture.

## Key conventions in this repository

- Keep route files in `app/`; shared UI components live in `components/`.
- TypeScript is strict (`tsconfig.json`) and path alias `@/*` maps to repository root.
- Keep screen theming consistent by using `useTheme()` and Paper color tokens instead of introducing ad-hoc colors in feature components.
- Current UI mixes `react-native` primitives with `react-native-paper`; prefer Paper components for cards, app bar, drawer, and inputs when extending UI.
- Route screens should use `AppDrawerLayout` so header + drawer behavior and styling stay consistent across screens.
- Keep width alignment consistent for core home-screen blocks (`CalculatorTotalComponent`, form `ScrollView`, and `ButtonGrid` currently use 80% width conventions).
- `ButtonGrid` follows a local button metadata array pattern (`id` + `value`) and renders with `map`; preserve stable `id` keys when modifying button sets.
- Money input rows are generated from `defaultCountableMoney`; update that source data (ids, names, values) when changing denominations instead of hardcoding fields.
- Keep denomination values in `CountableMoney` as integer cents to match existing calculations and labels.
- Do not edit `expo-env.d.ts` manually (generated Expo environment typing file).
- any code written should use Doc comments for functions and types, and inline comments for complex logic or important notes.