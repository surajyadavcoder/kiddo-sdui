import { Alert, Linking } from 'react-native';
import { useCartStore } from '../store/cartStore';
import type { ActionObject } from '../types/schema';

/**
 * handleAction — the Universal Action Dispatcher (Requirement C)
 * ----------------------------------------------------------------
 * Atomic layout components (banners, product cards, collection rows) never
 * contain business logic. They only ever call `handleAction(node.action)`
 * on press. This module is the single place that knows what each action
 * TYPE means and how to execute it — adding a new action type later means
 * adding one case here, not touching any component.
 */
export function handleAction(action: ActionObject | undefined | null): void {
  if (!action || typeof action.type !== 'string') {
    // Defensive: a malformed/missing action must never crash the app.
    return;
  }

  switch (action.type) {
    case 'ADD_TO_CART': {
      const payload = action.payload as { id?: unknown };
      if (typeof payload?.id === 'string' && payload.id.length > 0) {
        useCartStore.getState().addItem(payload.id);
      }
      return;
    }

    case 'DEEP_LINK': {
      const payload = action.payload as { url?: unknown };
      if (typeof payload?.url === 'string' && payload.url.length > 0) {
        // In production this would route via React Navigation's linking
        // config. We log + best-effort open so the dispatcher contract is
        // demonstrably wired end-to-end without requiring a full nav stack.
        console.log('[ActionDispatcher] DEEP_LINK ->', payload.url);
        if (payload.url.startsWith('http')) {
          Linking.openURL(payload.url).catch(() => undefined);
        }
      }
      return;
    }

    case 'APPLY_MYSTERY_GIFT_COUPON': {
      const payload = action.payload as { couponCode?: unknown };
      const code = typeof payload?.couponCode === 'string' ? payload.couponCode : 'MYSTERY';
      Alert.alert('🎁 Surprise!', `Coupon "${code}" applied to your cart.`);
      return;
    }

    case 'BOOK_EVENT_TICKET': {
      const payload = action.payload as { eventName?: unknown };
      const name = typeof payload?.eventName === 'string' ? payload.eventName : 'this event';
      Alert.alert('🎟️ Booking started', `Reserving your spot for ${name}.`);
      return;
    }

    default: {
      // Unknown action type from the server — fail gracefully, log only.
      console.log('[ActionDispatcher] Unrecognized action type:', action.type);
      return;
    }
  }
}
