/**
 * Tech Kiddo — Server-Driven UI Schema
 * ------------------------------------
 * Every type the wire payload can produce is modeled here so the renderer
 * never has to "trust" the backend. Unknown/malformed nodes are caught at
 * the type layer (via the `UnknownBlock` fallback) and at runtime (via the
 * registry's defensive lookup in `componentRegistry.ts`).
 */

// ---------------------------------------------------------------------------
// Action contracts (Universal Action Dispatcher — Requirement C)
// ---------------------------------------------------------------------------

export type ActionType =
  | 'ADD_TO_CART'
  | 'DEEP_LINK'
  | 'APPLY_MYSTERY_GIFT_COUPON'
  | 'BOOK_EVENT_TICKET'
  | 'UNKNOWN';

export interface AddToCartPayload {
  id: string;
  name?: string;
  price?: number;
  image?: string;
}

export interface DeepLinkPayload {
  url: string;
}

export interface MysteryGiftPayload {
  couponCode: string;
}

export interface BookEventPayload {
  eventId: string;
  eventName?: string;
}

/** Discriminated union — every action the server can send us. */
export type ActionObject =
  | { type: 'ADD_TO_CART'; payload: AddToCartPayload }
  | { type: 'DEEP_LINK'; payload: DeepLinkPayload }
  | { type: 'APPLY_MYSTERY_GIFT_COUPON'; payload: MysteryGiftPayload }
  | { type: 'BOOK_EVENT_TICKET'; payload: BookEventPayload }
  | { type: string; payload: Record<string, unknown> }; // forward-compat catch-all

// ---------------------------------------------------------------------------
// Theme (OTA Runtime Theming — Requirement B)
// ---------------------------------------------------------------------------

export interface ThemePayload {
  primary: string;
  background: string;
  accent?: string;
  textPrimary?: string;
  textOnPrimary?: string;
  cardBackground?: string;
}

// ---------------------------------------------------------------------------
// Product (shared shape used inside grids & collections)
// ---------------------------------------------------------------------------

export interface Product {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  image: string;
  unit?: string;
  action: ActionObject;
}

// ---------------------------------------------------------------------------
// Component block node types — the known, registered renderers
// ---------------------------------------------------------------------------

export type KnownBlockType =
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | 'FULL_SCREEN_OVERLAY';

export interface BaseBlock {
  /** Stable unique id from the backend — used as the keyExtractor source. */
  id: string;
  type: string; // intentionally wide — server may send anything
}

export interface BannerHeroBlock extends BaseBlock {
  type: 'BANNER_HERO';
  title: string;
  subtitle?: string;
  image: string;
  action?: ActionObject;
}

export interface ProductGrid2x2Block extends BaseBlock {
  type: 'PRODUCT_GRID_2X2';
  title?: string;
  products: Product[]; // engine renders first 4 in a 2x2 layout
}

export interface DynamicCollectionBlock extends BaseBlock {
  type: 'DYNAMIC_COLLECTION';
  title: string;
  subtitle?: string;
  products: Product[];
}

/** Anything the registry doesn't recognize. Rendered as `null` (dropped). */
export interface UnknownBlock extends BaseBlock {
  type: string;
  [key: string]: unknown;
}

export type HomepageBlock =
  | BannerHeroBlock
  | ProductGrid2x2Block
  | DynamicCollectionBlock
  | UnknownBlock;

// ---------------------------------------------------------------------------
// Campaign overlay (Live Campaigns — Advanced Deliverable A)
// ---------------------------------------------------------------------------

export interface FullScreenOverlayConfig {
  type: 'FULL_SCREEN_OVERLAY';
  animation_url: string;
}

export interface Campaign {
  id: string;
  name: string;
  theme: ThemePayload;
  overlay: FullScreenOverlayConfig;
  /** Extra collection injected into the feed only while this campaign is live. */
  featuredCollection?: DynamicCollectionBlock;
}

// ---------------------------------------------------------------------------
// Root payload — what the "backend gateway" sends
// ---------------------------------------------------------------------------

export interface HomepagePayload {
  theme: ThemePayload;
  activeCampaignId: string | null;
  blocks: HomepageBlock[];
}
