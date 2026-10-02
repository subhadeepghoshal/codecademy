  # Refactor 07-nav-expo from React Navigation to Expo Router

**Status:** plan only — no code changed yet.
**Target:** Expo SDK 57 (`expo@57.0.23`), `expo-router@57.x`.
**Reference docs:** https://docs.expo.dev/versions/v57.0.0/sdk/router/ and https://docs.expo.dev/router/installation/

---

## 1. Goal

Replace the hand-wired React Navigation setup (`NavigationContainer` + `createBottomTabNavigator` +
`createNativeStackNavigator`) with Expo Router's file-based routing, keeping all four screens and
their behavior. Screen *content* (JSX bodies, styles, copy) does not change — only navigation
plumbing, file locations, and config.

## 2. Decisions already made

| Decision | Choice |
| --- | --- |
| Route shape | **Flat** — the thought detail screen lives outside `(tabs)` and pushes over the tab bar |
| Old code | **Full cleanup** — delete `App.tsx`, `index.ts`, `components/*.tsx`, uninstall `@react-navigation/*` |
| Typed routes | Enabled via `experiments.typedRoutes` |
| Source dir | No `src/` — `app/` sits at the project root, matching the current flat layout |

Consequence of the flat shape: the tab bar is **hidden** while viewing a single thought (today it
stays visible). This is the trade accepted in exchange for no nested navigators.

## 3. Current state

```
07-nav-expo/
  index.ts                        registerRootComponent(App)
  App.tsx                         NavigationContainer + Tab.Navigator, BottomTabsParamList
  components/
    Home.tsx                      tab screen, useNavigation<BottomTabNavigationProp>
    FAQ.tsx                       tab screen, navigation prop
    Thoughts.tsx                  stack screen, useNavigation<NativeStackNavigationProp>
    Thought.tsx                   stack screen, useRoute<RouteProp>
    ThoughtsNavigatior.tsx        nested Stack + StackParamList  (note: filename typo)
  data.ts, types.ts               plain modules, not screens
  app.json                        no scheme, no plugins, no experiments
  package.json                    "main": "index.ts"
  (no babel.config.js)
```

Navigation calls in use today:

- `Home.tsx` → `navigation.navigate("ThoughtsNavigator", { screen: "Thought", params: { id } })`
- `FAQ.tsx` → `navigation.navigate('ThoughtsNavigator', { screen: 'Thoughts' })`
- `Thoughts.tsx` → `navigation.navigate('Thought', { id })` and `navigation.goBack()`
- `Thought.tsx` → `useRoute<RouteProp<StackParamList, "Thought">>().params.id`

## 4. Target state

```
07-nav-expo/
  app/
    _layout.tsx                   root Stack: (tabs) headerless, thought/[id] titled "Thought"
    (tabs)/
      _layout.tsx                 Tabs, headerShown: false
      index.tsx                   Home        (tabBarLabel "Home")
      faq.tsx                     FAQ         (tabBarLabel "Q & A")
      thoughts.tsx                Thoughts    (tabBarLabel "My Thoughts")
    thought/
      [id].tsx                    Thought detail
  data.ts, types.ts               unchanged, stay OUTSIDE app/
```

Route table:

| Screen | Route | Deep link |
| --- | --- | --- |
| Home | `/` | `nav-expo://` |
| FAQ | `/faq` | `nav-expo://faq` |
| Thoughts list | `/thoughts` | `nav-expo://thoughts` |
| Thought detail | `/thought/[id]` | `nav-expo://thought/1` |

> **Why `data.ts` and `types.ts` stay at the root:** every file inside `app/` is treated as a route.
> Non-screen modules placed there would become bogus routes.

---

## 5. How to use the prompts in this plan

Every step below carries a **Prompt** block — paste it into a coding agent as-is, one step at a time,
in order. Rules that make this work:

- **One prompt per turn.** Each assumes the previous steps landed; batching them loses the
  verification between phases.
- **Each prompt names this file.** The agent is expected to open
  `spec/expo-router-refactor-plan.md` and follow the exact snippets there rather than improvising.
- **Run from the project root**, `07-nav-expo/`.
- **Stop on failure.** If a prompt's result doesn't match its stated acceptance check, fix that
  before pasting the next one.
- **Step 14 has an unresolved decision** (the Back button). Settle it before you reach that prompt —
  its prompt will ask.
- Prompts say "don't touch anything else" deliberately. The common failure mode is an agent
  helpfully reformatting or "improving" screen JSX while rewiring navigation, which makes the diff
  unreviewable.

A useful preamble to paste once at the start of a fresh session:

```text
This is an Expo SDK 57 project being refactored from React Navigation to Expo Router.
Read spec/expo-router-refactor-plan.md and AGENTS.md before writing code. AGENTS.md
requires consulting https://docs.expo.dev/versions/v57.0.0/ for exact SDK 57 APIs —
do not rely on memory of older Expo versions. Work only on the step I give you, make
no unrelated changes, and tell me what to verify when you're done.
```

---

## 6. Steps

### Phase 0 — Baseline

**1.** Confirm the current app runs: `npm start`, then open Home → Random Thought, FAQ → View
Thoughts, Thoughts → a thought. Note what works so regressions are detectable later.

```text
Run the 07-nav-expo app as it is now (npm start) and report whether it boots without
errors. Don't change any code. List the four screens and the current navigation paths
between them, reading App.tsx and components/, so we have a written baseline of
working behavior to compare against after the Expo Router refactor.
```

**2.** Confirm `npx tsc --noEmit` is clean.

```text
Run npx tsc --noEmit in 07-nav-expo and report the output verbatim. Do not fix
anything — I just need to know the project typechecks clean before we start.
```

**3.** Commit (or stash) so the whole refactor is one revertible step.

```text
Commit the current state of 07-nav-expo as a checkpoint before the Expo Router
refactor, so the whole refactor can be reverted in one step. Use a message like
"Checkpoint 07-nav-expo before Expo Router refactor". Don't push.
```

### Phase 1 — Dependencies

**4.** Install, letting Expo pick SDK-57-compatible versions:

```sh
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

`react-native-safe-area-context`, `react-native-screens` and `expo-status-bar` are already present;
the command is still the right way to run it (it reconciles versions rather than duplicating).
`expo-linking` and `expo-constants` are the genuinely new ones.

```text
Follow step 4 of spec/expo-router-refactor-plan.md: install the Expo Router
dependencies using npx expo install (NOT npm install, so versions match Expo SDK 57).
Afterwards show me the diff of package.json and confirm expo-router resolved to a 57.x
version. Don't change any source files yet.
```

### Phase 2 — Configuration

**5.** `package.json` — change the entry point:

```json
{ "main": "expo-router/entry" }
```

(replaces `"main": "index.ts"`)

```text
Follow step 5 of spec/expo-router-refactor-plan.md: change the "main" field in
07-nav-expo/package.json to "expo-router/entry". Change nothing else in the file, and
do NOT delete index.ts yet — that happens in step 16. Show me the diff.
```

**6.** `app.json` — add `scheme`, the config plugin, and typed routes inside `expo`:

```json
{
  "expo": {
    "scheme": "nav-expo",
    "plugins": ["expo-router"],
    "experiments": { "typedRoutes": true }
  }
}
```

Keep every existing key (`name`, `slug`, `icon`, `ios`, `android`, `web`) as-is. `scheme` is required
for deep links to resolve.

```text
Follow step 6 of spec/expo-router-refactor-plan.md: add "scheme": "nav-expo",
"plugins": ["expo-router"] and "experiments": { "typedRoutes": true } to the expo
object in 07-nav-expo/app.json. Preserve every existing key exactly — name, slug,
version, orientation, icon, userInterfaceStyle, ios, android, web. Show me the diff
and confirm nothing existing was dropped or reordered.
```

**7.** `tsconfig.json` — add the generated route types to `include`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": { "strict": true },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

```text
Follow step 7 of spec/expo-router-refactor-plan.md: add the "include" array to
07-nav-expo/tsconfig.json so Expo Router's generated route types are picked up. Keep
"extends" and "strict" as they are. Show me the resulting file.
```

**8.** `.gitignore` — add `expo-env.d.ts` (Expo generates it). `.expo/` is already ignored, which
covers `.expo/types/`.

```text
Follow step 8 of spec/expo-router-refactor-plan.md: add expo-env.d.ts to the
07-nav-expo .gitignore. First check whether .expo/ is already ignored there (it should
be) and tell me, so we don't add a redundant entry.
```

**9.** **No `babel.config.js` needed.** SDK 57 applies `babel-preset-expo` by default and the old
`expo-router/babel` plugin was removed after SDK 49. Only if a `babel.config.js` is added later must
it include `presets: ['babel-preset-expo']`.

```text
Per step 9 of spec/expo-router-refactor-plan.md, this project intentionally has no
babel.config.js: Expo SDK 57 applies babel-preset-expo by default and the
expo-router/babel plugin was removed after SDK 49. Confirm no babel.config.js exists
in 07-nav-expo and do NOT create one. If you believe SDK 57 requires one, cite the
versioned doc at https://docs.expo.dev/versions/v57.0.0/ before changing anything.
```

### Phase 3 — Create routes

Each new file takes the JSX body and `StyleSheet` block from its old counterpart verbatim; only
imports and the navigation lines differ.

**10.** `app/_layout.tsx` — root Stack. Replaces `NavigationContainer`.

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="thought/[id]" options={{ title: 'Thought' }} />
    </Stack>
  );
}
```

This is where the `"Thought"` header title now lives (previously `ThoughtsNavigatior.tsx` →
`options={{ title: "Thought" }}`). It can alternatively be set inside `thought/[id].tsx` with a local
`<Stack.Screen options={{ title: 'Thought' }} />`.

```text
Follow step 10 of spec/expo-router-refactor-plan.md: create
07-nav-expo/app/_layout.tsx as the root Stack layout, using the snippet in that step
exactly. The (tabs) group is headerless and thought/[id] carries the title "Thought".
Create only this file.
```

**11.** `app/(tabs)/_layout.tsx` — replaces `Tab.Navigator`. **Declaration order sets tab order**, so
keep Home → FAQ → Thoughts to match today's bar.

```tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ tabBarLabel: 'Home' }} />
      <Tabs.Screen name="faq" options={{ tabBarLabel: 'Q & A' }} />
      <Tabs.Screen name="thoughts" options={{ tabBarLabel: 'My Thoughts' }} />
    </Tabs>
  );
}
```

`index.tsx` is the default selected tab, which is what `initialRouteName="Home"` did.

```text
Follow step 11 of spec/expo-router-refactor-plan.md: create
07-nav-expo/app/(tabs)/_layout.tsx with the Tabs layout from that step. Tab order is
significant — index (Home), then faq (Q & A), then thoughts (My Thoughts) — because
Expo Router orders tabs by declaration order, not filename. headerShown is false to
match the old Tab.Navigator screenOptions. Create only this file.
```

**12.** `app/(tabs)/index.tsx` — from `components/Home.tsx`. Drop `BottomTabNavigationProp`,
`BottomTabsParamList` and `useNavigation`; use `useRouter`:

```tsx
import { useRouter } from 'expo-router';
const router = useRouter();
// onPressRandomThoughtHandler:
router.push(`/thought/${randomThoughtId}`);
```

Keep `randomIndex` and the `thoughts[...]` lookup exactly as they are.

```text
Follow step 12 of spec/expo-router-refactor-plan.md: create
07-nav-expo/app/(tabs)/index.tsx from components/Home.tsx. Copy the JSX body and the
entire StyleSheet block verbatim — do not reformat, rename, or restyle anything. Only
the navigation wiring changes: remove the BottomTabNavigationProp / BottomTabsParamList
/ useNavigation imports and typing, use useRouter from expo-router, and make the
Random Thought button call router.push(`/thought/${randomThoughtId}`). Keep the
randomIndex helper and the thoughts lookup as-is, importing thoughts from '../../data'.
Leave components/Home.tsx in place for now. Show me the diff between the two files.
```

**13.** `app/(tabs)/faq.tsx` — from `components/FAQ.tsx`. Remove the `FAQProps`/`BottomTabScreenProps`
typing and the destructured `{ navigation }` prop; the component takes no props. Navigate with either
form:

```tsx
<Link href="/thoughts" asChild>
  <Pressable accessibilityRole="button" style={styles.button}>
    <Text style={styles.buttonText}>View Thoughts</Text>
  </Pressable>
</Link>
```

`asChild` is required so the existing `Pressable` keeps its styling instead of being wrapped.

```text
Follow step 13 of spec/expo-router-refactor-plan.md: create
07-nav-expo/app/(tabs)/faq.tsx from components/FAQ.tsx. Copy all the Q&A content and
the StyleSheet verbatim. Remove the FAQProps / BottomTabScreenProps typing and the
destructured { navigation } prop — the component now takes no props. Replace the
"View Thoughts" navigation with a Link to /thoughts using asChild so the existing
Pressable keeps its styles. Leave components/FAQ.tsx in place for now.
```

**14.** `app/(tabs)/thoughts.tsx` — from `components/Thoughts.tsx`. Replace
`navigation.navigate('Thought', { id })` with `router.push(\`/thought/${id}\`)` (or a `Link` with
`asChild`, matching whatever style step 13 settles on). Import `thoughts` from `'../../data'`.

⚠️ **Open question — the "Back" button (line 29–31 today).** Thoughts is now a *tab root*, so
`router.back()` has nothing to pop in the common case; it only does something when the user arrived
from FAQ. Options: (a) delete the button, (b) keep `router.back()` and accept it being inert on direct
tab taps, (c) make it `router.replace('/')` to return Home. **Pick one before implementing.**
Recommendation: (a) — the tab bar already handles going elsewhere.

```text
Follow step 14 of spec/expo-router-refactor-plan.md: create
07-nav-expo/app/(tabs)/thoughts.tsx from components/Thoughts.tsx. Copy the list
rendering and StyleSheet verbatim; drop the useNavigation / NativeStackNavigationProp /
StackParamList imports. Each preview navigates to /thought/<id>. Import thoughts from
'../../data'.

That step flags an open decision about the "Back" button: Thoughts is now a tab root,
so router.back() is inert unless the user came from FAQ. I've decided to: <FILL IN —
(a) delete the button, (b) keep router.back(), or (c) router.replace('/')>. Apply that
choice and nothing else. If I left this blank, stop and ask me instead of guessing.
```

**15.** `app/thought/[id].tsx` — from `components/Thought.tsx`. Replace
`useRoute`/`RouteProp`/`StackParamList` with the router hook:

```tsx
import { useLocalSearchParams } from 'expo-router';
const { id } = useLocalSearchParams<{ id: string }>();
```

Keep the `thoughts.find(...)` lookup and the `if (!thought)` guard. While fixing imports, also correct
the existing bug on that guard: `<View>No thought!</View>` renders raw text inside a `View` — it must
be `<Text>No thought!</Text>` (wrapped in the `View` if the layout wants it). Import `thoughts` from
`'../../data'`.

```text
Follow step 15 of spec/expo-router-refactor-plan.md: create
07-nav-expo/app/thought/[id].tsx from components/Thought.tsx. Replace the
useRoute/RouteProp/StackParamList param reading with
useLocalSearchParams<{ id: string }>() from expo-router. Keep the thoughts.find lookup,
the not-found guard, and the StyleSheet as they are, importing thoughts from
'../../data'. One real bug to fix while you're in there: the guard currently renders
<View>No thought!</View>, which puts raw text in a View and throws at runtime — make it
a <Text> element. Leave components/Thought.tsx in place for now.
```

### Phase 4 — Remove the old implementation

**16.** Delete `App.tsx`, `index.ts`, `components/Home.tsx`, `components/FAQ.tsx`,
`components/Thoughts.tsx`, `components/Thought.tsx`, `components/ThoughtsNavigatior.tsx`, and the
now-empty `components/` directory.

```text
Follow step 16 of spec/expo-router-refactor-plan.md: delete the old React Navigation
implementation from 07-nav-expo — App.tsx, index.ts, all five files under components/,
and the components/ directory itself once empty. Before deleting, grep the project to
confirm nothing under app/ still imports any of them, and confirm data.ts and types.ts
are NOT deleted (they're still used). Report what you removed.
```

**17.** Uninstall the explicit React Navigation packages:

```sh
npm uninstall @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

Expo Router depends on React Navigation internally, so the navigators still work — these were only
needed for the direct imports now gone.

```text
Follow step 17 of spec/expo-router-refactor-plan.md: uninstall
@react-navigation/native, @react-navigation/native-stack and
@react-navigation/bottom-tabs from 07-nav-expo. These were only needed for direct
imports, which are gone — Expo Router pulls in React Navigation internally, so the
navigators keep working. Confirm no source file imports @react-navigation/* before
removing, then show me the package.json diff.
```

**18.** `BottomTabsParamList` and `StackParamList` disappear with their files. Typed routes replace
them; no param-list type needs re-creating.

```text
Per step 18 of spec/expo-router-refactor-plan.md: verify that no param-list types
(BottomTabsParamList, StackParamList) or @react-navigation type imports remain anywhere
in 07-nav-expo. Typed routes replace them — do not re-create equivalent types. Grep and
report; change code only if you find a leftover reference.
```

### Phase 5 — Verify

**19.** `npx tsc --noEmit` — must be clean. Typed-route errors mean a `href` string doesn't match a
real route file.

```text
Follow step 19 of spec/expo-router-refactor-plan.md: run npx tsc --noEmit in
07-nav-expo and report the output. If there are typed-route errors, a href or
router.push path doesn't match a real file under app/ — fix the path, don't loosen the
types or cast to any.
```

**20.** `npx expo start --clear` — the `--clear` matters; a stale Metro cache after an entry-point
change is the most common "it won't boot" cause here.

```text
Follow step 20 of spec/expo-router-refactor-plan.md: start the app with
npx expo start --clear (the --clear is required after changing the entry point — stale
Metro cache is the usual cause of a failed boot here). Report whether it bundles
cleanly and paste any error output.
```

**21.** Manual pass:

- All three tabs render, labelled Home / Q & A / My Thoughts, in that order, with no tab header.
- Home → **Random Thought** opens a thought with header title **"Thought"** and a back arrow; tab bar
  is hidden (expected under the flat layout).
- FAQ → **View Thoughts** lands on the Thoughts tab.
- Thoughts → any preview opens that thought; header back arrow returns to the list.
- Whatever was decided in step 14 for the Back button behaves as intended.

```text
Walk through the manual checklist in step 21 of spec/expo-router-refactor-plan.md in
the running app and report each item as pass or fail: tab labels and order (Home,
Q & A, My Thoughts) with no tab header; Home's Random Thought opening a detail screen
titled "Thought" with a back arrow and the tab bar hidden; FAQ's View Thoughts landing
on the Thoughts tab; a list preview opening the right thought and the back arrow
returning to the list; and the step 14 Back button decision behaving as intended. Don't
fix anything yet — report first.
```

**22.** Deep links (this is the payoff of the refactor — unreachable in the old setup):

```sh
npx uri-scheme open nav-expo://thought/1 --ios
npx uri-scheme open nav-expo://faq --ios
```

```text
Follow step 22 of spec/expo-router-refactor-plan.md: with the app running, test deep
linking using npx uri-scheme open for nav-expo://thought/1 and nav-expo://faq. Report
whether each opens the correct screen. If nothing happens, check that "scheme":
"nav-expo" is present in app.json and that the app was rebuilt after it was added.
```

**23.** Web, since `react-native-web` and `react-dom` are already installed: `npm run web`, then
confirm the URL bar shows `/faq`, `/thoughts`, `/thought/1` and that browser back/forward work.

```text
Follow step 23 of spec/expo-router-refactor-plan.md: run npm run web and verify the
URL bar reflects the routes (/faq, /thoughts, /thought/1) as you navigate, and that
browser back and forward buttons work. This is new capability the old React Navigation
setup didn't have. Report what you observe.
```

---

## 7. Old → new API cheat sheet

| React Navigation | Expo Router |
| --- | --- |
| `NavigationContainer` | `app/_layout.tsx` (implicit) |
| `createBottomTabNavigator` | `<Tabs>` in `app/(tabs)/_layout.tsx` |
| `createNativeStackNavigator` | `<Stack>` in a `_layout.tsx` |
| `Tab.Screen` / `Stack.Screen` | a file in the matching directory |
| `initialRouteName="Home"` | `index.tsx` in that directory |
| `useNavigation()` + `navigate` | `useRouter()` + `router.push` / `.navigate` / `.replace` |
| `navigation.goBack()` | `router.back()` |
| `useRoute().params.id` | `useLocalSearchParams<{ id: string }>()` |
| `ParamList` types | generated route types (`experiments.typedRoutes`) |
| `options={{ title }}` | same, on `Stack.Screen` in a layout, or locally in the route file |

## 8. Gotchas

- **Entry point.** `"main": "expo-router/entry"` plus deleting `index.ts` must happen together;
  either one alone breaks startup. Steps 5 and 16 are deliberately split for reviewability, so the
  app is expected *not* to boot between them.
- **Nothing but routes in `app/`.** A helper module dropped there becomes a route.
- **Tab order** comes from `Tabs.Screen` declaration order, not alphabetical filenames.
- **`scheme` is mandatory** for deep linking; without it step 22 silently fails.
- **`Link` needs `asChild`** when wrapping a styled `Pressable`.
- **Route strings are case- and path-sensitive**: `/thought/1` (detail) vs `/thoughts` (list) differ
  by one character — an easy typo, caught by typed routes.
- **Group folders** `(tabs)` do not appear in the URL; Home is `/`, not `/(tabs)`.

## 9. Rollback

The whole refactor is one commit's worth of change. To abort: `git checkout -- .` plus
`git clean -fd app/` (and `npm install` to restore the uninstalled packages). Phase 0's commit is the
safety net.
