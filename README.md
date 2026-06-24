# Tech Kiddo — Server-Driven UI Homepage Renderer

A configuration-driven React Native homepage engine built for Tech Kiddo's
Q-commerce app. The client is an intentionally "dumb" renderer: it parses a
JSON payload, looks each block up in a Component Registry, and streams the
result through a single virtualized list — no app-binary release needed to
change what's on the homepage.

## Stack

- **Expo** (React Native 0.85, React 19) — `npx expo start` to run.
- **TypeScript**, `strict: true`.
- **@shopify/flash-list** for the root vertical feed.
- **Native `FlatList`** for the horizontal `DYNAMIC_COLLECTION` rows.
- **Zustand** for cart state.
- **lottie-react-native** for the campaign overlay animation.

## Running it

```bash
npm install
npx expo start
```

Scan the QR with Expo Go, or press `a` / `i` for an emulator.

## Project layout

```
src/
  types/schema.ts            Full strict type model for the wire payload
  registry/componentRegistry.tsx   Factory-pattern hashmap (Requirement A)
  components/blocks/         BANNER_HERO, PRODUCT_GRID_2X2, DYNAMIC_COLLECTION
  components/CampaignOverlay.tsx   FULL_SCREEN_OVERLAY renderer
  context/ThemeContext.tsx   OTA runtime theming (Requirement B)
  actions/actionDispatcher.ts  Universal Action Dispatcher (Requirement C)
  store/cartStore.ts          Zustand cart, selector-isolated
  mock/homepageData.ts        Mock backend payload (incl. one unknown block)
  mock/campaigns.ts           3 live campaign profiles
  screens/HomeScreen.tsx      Root renderer — one FlashList for everything
```

## How each requirement is met

### A. JSON Schema & Component Registry
`registry/componentRegistry.tsx` is a `Record<string, RendererFn>` — a
hashmap, not a `switch`. `resolveBlock(block)` looks up `block.type`; if
nothing is registered, it returns `null` via `UnknownBlockFallback` instead
of throwing. The mock payload (`mock/homepageData.ts`) includes a block of
type `NEW_COMPONENT_V2` specifically to prove this path: it's dropped
silently and every block around it renders untouched.

### B. Dynamic Collections & Virtualization Boundaries
`DynamicCollection.tsx` nests a horizontal `FlatList` inside a single row of
the parent vertical `FlashList`. Because one list scrolls horizontally and
its parent scrolls vertically, RN's gesture responder resolves the pan
direction before either list claims the touch — dragging the carousel can't
steal the feed's vertical momentum. The horizontal list is itself virtualized
(`windowSize`, `initialNumToRender`, `removeClippedSubviews`, a hand-computed
`getItemLayout`) so swiping through many items doesn't leak memory.

### C. Universal Action Dispatcher
Every interactive block (banner, product card) calls
`handleAction(node.action)` from `actions/actionDispatcher.ts` and nothing
else. The dispatcher is the only place that knows what `ADD_TO_CART`,
`DEEP_LINK`, `APPLY_MYSTERY_GIFT_COUPON`, and `BOOK_EVENT_TICKET` actually
*do*. Components stay decoupled from business logic — adding a new action
type means editing one `switch` case in one file.

### D. High Frame-Rate Optimization
`HomeScreen.tsx` renders the **entire** payload — banners, grids, and
collections alike — through one `FlashList`. `keyExtractor` always returns
the server-provided stable `block.id`. Every block component
(`ProductCard`, `BannerHero`, `ProductGrid2x2`, `DynamicCollection`) is
wrapped in `React.memo` with a custom comparator that only looks at the
fields that can actually change the rendered output.

### Advanced — Live Campaigns (Remote Overlay Contexts)
`mock/campaigns.ts` defines three campaigns (Back to School, Summer
Playhouse, Mystery Gift Carnival), each bundling a `theme`, a
`FULL_SCREEN_OVERLAY` Lottie animation, and a `featuredCollection`.
`HomeScreen.tsx` picks the active one off `payload.activeCampaignId` —
switching that one string swaps the entire visual experience at runtime.
`CampaignOverlay.tsx` renders the animation absolutely positioned over the
whole screen with `pointerEvents="none"`, so it never blocks taps/scrolls on
the real UI underneath.

### Advanced — OTA Runtime Theming
`context/ThemeContext.tsx` takes the payload's `theme` block (overridden by
the active campaign's theme, if any) and exposes it via React Context from
the root. Every nested component — buttons, headers, prices — reads
`useTheme()` rather than receiving color props, so a single context value
change reskins the entire tree.

### Advanced — Local State Collocation
`store/cartStore.ts` exposes `useItemQuantity(id)`, a narrow Zustand
selector that subscribes a `ProductCard` to *only* its own quantity. Bumping
one card's count re-renders that card alone — Zustand's shallow-equality
check skips every other subscriber whose slice didn't change — and
`React.memo` on each block component is a second isolation layer against
unrelated parent re-renders.

## Verified

- `npx tsc --noEmit` — zero errors under `strict: true`.
- `npx expo export --platform android` — full Metro bundle compiles
  end-to-end (744 modules, no errors), confirming every import and
  dependency resolves correctly on a real RN runtime.
