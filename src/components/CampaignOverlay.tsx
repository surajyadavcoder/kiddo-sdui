import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import type { FullScreenOverlayConfig } from '../types/schema';

interface Props {
  overlay: FullScreenOverlayConfig | null;
}

/**
 * CampaignOverlay
 * ----------------
 * Advanced Deliverable A — Remote Overlay Contexts.
 *
 * Renders the active campaign's full-screen animation (confetti, falling
 * pencils, water splash, etc.) absolutely positioned over the entire
 * screen. `pointerEvents="none"` is the load-bearing line here: it makes
 * the overlay (and everything inside it) invisible to the touch/gesture
 * system, so taps and scrolls pass straight through to the real homepage
 * underneath. Without it, this view would sit on top of the touch
 * hierarchy and silently eat every tap on the feed below.
 *
 * Lottie remote sources are cached by `lottie-react-native`/the underlying
 * image loader automatically when given a `{ uri }` source — no extra
 * pipeline needed for this demo's scope.
 */
const CampaignOverlayBase: React.FC<Props> = ({ overlay }) => {
  if (!overlay) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <LottieView
        source={{ uri: overlay.animation_url }}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.lottie}
      />
    </View>
  );
};

export const CampaignOverlay = memo(CampaignOverlayBase);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
