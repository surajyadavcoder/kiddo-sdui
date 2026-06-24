import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from './ProductCard';
import type { DynamicCollectionBlock, Product } from '../../types/schema';

interface Props {
  block: DynamicCollectionBlock;
}

const CARD_WIDTH = 130;

/**
 * DYNAMIC_COLLECTION
 * -------------------
 * Requirement B (Dynamic Collections & Virtualization Boundaries).
 *
 * This is a horizontal FlatList nested *inside* a single row of the parent
 * vertical FlashList. Two things make this safe instead of janky:
 *
 *  1. `nestedScrollEnabled` + the fact that this is a horizontal list inside
 *     a vertical one means gesture directions never compete — RN's gesture
 *     responder system resolves pan direction before either list claims the
 *     touch, so dragging sideways here cannot steal the vertical feed's
 *     scroll velocity, and vice versa.
 *  2. The horizontal list itself is virtualized (`windowSize`,
 *     `initialNumToRender`, `removeClippedSubviews`) so swiping through 50
 *     items doesn't balloon memory — off-screen cards are unmounted, not
 *     just visually clipped.
 *
 * The whole block is wrapped in React.memo so scrolling the *vertical* feed
 * (which re-renders neighboring FlashList rows as they recycle) does not
 * force this collection — and its internal FlatList — to re-render unless
 * its own data actually changed.
 */
const DynamicCollectionBase: React.FC<Props> = ({ block }) => {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => <ProductCard product={item} width={CARD_WIDTH} />,
    []
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>{block.title}</Text>
      {block.subtitle ? <Text style={styles.subtitle}>{block.subtitle}</Text> : null}

      <FlatList
        data={block.products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        nestedScrollEnabled
        removeClippedSubviews
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        contentContainerStyle={styles.listContent}
        // Each card is a fixed width, so we can compute exact offsets and
        // skip the expensive onLayout measurement pass entirely.
        getItemLayout={(_data, index) => ({
          length: CARD_WIDTH + 12,
          offset: (CARD_WIDTH + 12) * index,
          index,
        })}
      />
    </View>
  );
};

function areEqual(prev: Props, next: Props): boolean {
  if (prev.block.id !== next.block.id) return false;
  if (prev.block.products.length !== next.block.products.length) return false;
  return prev.block.products.every((p, i) => p.id === next.block.products[i]?.id);
}

export const DynamicCollection = memo(DynamicCollectionBase, areEqual);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  listContent: {
    paddingRight: 12,
  },
});
