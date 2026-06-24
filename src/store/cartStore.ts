import { create } from 'zustand';

/**
 * Cart Store
 * ----------
 * Requirement C (Local State Collocation): bumping the quantity on ONE
 * product card must not re-render the other 30+ blocks in the feed.
 *
 * Zustand already only re-renders components that read the slice of state
 * they `useCartStore(selector)` against. As long as every ProductCard reads
 * `state.items[id]` (a single number) rather than the whole `items` map,
 * React only re-renders the card whose own id changed — everything else in
 * the FlashList is untouched. This is paired with React.memo on ProductCard
 * (see components/blocks/ProductCard.tsx) as a second isolation boundary.
 */

export interface CartState {
  /** productId -> quantity */
  items: Record<string, number>;
  totalCount: number;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  getQuantity: (id: string) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  totalCount: 0,

  addItem: (id: string) =>
    set((state) => {
      const nextQty = (state.items[id] ?? 0) + 1;
      return {
        items: { ...state.items, [id]: nextQty },
        totalCount: state.totalCount + 1,
      };
    }),

  removeItem: (id: string) =>
    set((state) => {
      const current = state.items[id] ?? 0;
      if (current <= 0) return state;
      const nextQty = current - 1;
      const nextItems = { ...state.items };
      if (nextQty === 0) {
        delete nextItems[id];
      } else {
        nextItems[id] = nextQty;
      }
      return {
        items: nextItems,
        totalCount: Math.max(0, state.totalCount - 1),
      };
    }),

  getQuantity: (id: string) => get().items[id] ?? 0,
}));

/**
 * Narrow selector hook — import THIS in product cards instead of the raw
 * store. Each card only subscribes to its own quantity, so Zustand's
 * shallow-equality check skips re-rendering cards whose number didn't change.
 */
export const useItemQuantity = (id: string): number =>
  useCartStore((state) => state.items[id] ?? 0);

export const useCartTotalCount = (): number =>
  useCartStore((state) => state.totalCount);
