import React, { useMemo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { CampaignOverlay } from '../components/CampaignOverlay';
import { resolveBlock } from '../registry/componentRegistry';
import { useCartTotalCount } from '../store/cartStore';
import { HOMEPAGE_PAYLOAD } from '../mock/homepageData';
import { CAMPAIGNS } from '../mock/campaigns';
import type { HomepageBlock } from '../types/schema';

/**
 * HomeScreen
 * ----------
 * Requirement D (High Frame-Rate Optimization): the ENTIRE feed — hero
 * banners, 2x2 grids, and horizontal collections alike — streams through
 * one single vertical FlashList. Nothing in this screen renders a second
 * top-level ScrollView/FlatList; every block type is just another row this
 * one list recycles.
 *
 * Campaign resolution: `activeCampaignId` on the payload picks a campaign
 * from `mock/campaigns.ts`. Its `theme` OVERRIDES the baseline payload
 * theme, and its `featuredCollection` is appended to the feed — all derived
 * with `useMemo` so it only recomputes if the campaign id actually changes,
 * not on every render.
 */
const CartBadge: React.FC = () => {
  const count = useCartTotalCount();
  const theme = useTheme();
  if (count === 0) return null;
  return (
    <View style={[styles.badge, { backgroundColor: theme.primary }]}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

const HeaderBar: React.FC = () => {
  const theme = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.primary }]}>
      <Text style={styles.headerTitle}>Tech Kiddo</Text>
      <View style={styles.cartIconWrap}>
        <Text style={styles.cartIcon}>🛒</Text>
        <CartBadge />
      </View>
    </View>
  );
};

const FeedContent: React.FC<{ blocks: HomepageBlock[] }> = ({ blocks }) => {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<HomepageBlock>) => resolveBlock(item),
    []
  );

  const keyExtractor = useCallback((item: HomepageBlock) => item.id, []);

  return (
    <FlashList
      data={blocks}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={220}
      contentContainerStyle={{ backgroundColor: theme.background, padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export const HomeScreen: React.FC = () => {
  const payload = HOMEPAGE_PAYLOAD;

  const activeCampaign = useMemo(
    () => (payload.activeCampaignId ? CAMPAIGNS[payload.activeCampaignId] ?? null : null),
    [payload.activeCampaignId]
  );

  // Campaign theme overrides the baseline payload theme when a campaign is live.
  const resolvedTheme = useMemo(
    () => activeCampaign?.theme ?? payload.theme,
    [activeCampaign, payload.theme]
  );

  // Campaign's featured collection is appended right after the first block
  // so it reads as "today's spotlight" without the mock data needing to
  // know about campaigns at authoring time.
  const resolvedBlocks = useMemo<HomepageBlock[]>(() => {
    if (!activeCampaign?.featuredCollection) return payload.blocks;
    const [first, ...rest] = payload.blocks;
    return [first, activeCampaign.featuredCollection, ...rest];
  }, [activeCampaign, payload.blocks]);

  return (
    <ThemeProvider theme={resolvedTheme}>
      <View style={styles.root}>
        <HeaderBar />
        <FeedContent blocks={resolvedBlocks} />
        <CampaignOverlay overlay={activeCampaign?.overlay ?? null} />
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  cartIconWrap: {
    position: 'relative',
  },
  cartIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
