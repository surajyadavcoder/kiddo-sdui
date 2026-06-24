import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from './ProductCard';
import type { ProductGrid2x2Block } from '../../types/schema';

interface Props {
  block: ProductGrid2x2Block;
}

/**
 * PRODUCT_GRID_2X2
 * ----------------
 * Balanced 2x2 grid. We deliberately render with plain Views (not a nested
 * virtualization list) because the grid is small, fixed, and lives inside
 * the parent FlashList's single item — nesting a virtualizer here would add
 * overhead for no benefit. Each cell is a memoized ProductCard, so adding to
 * cart on cell #2 never touches cells #1, #3, #4.
 */
const ProductGrid2x2Base: React.FC<Props> = ({ block }) => {
  const theme = useTheme();
  const cells = block.products.slice(0, 4);

  return (
    <View style={styles.wrapper}>
      {block.title ? (
        <Text style={[styles.title, { color: theme.textPrimary }]}>{block.title}</Text>
      ) : null}
      <View style={styles.grid}>
        {cells.map((product) => (
          <View key={product.id} style={styles.cell}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
};

function areEqual(prev: Props, next: Props): boolean {
  if (prev.block.id !== next.block.id) return false;
  if (prev.block.products.length !== next.block.products.length) return false;
  return prev.block.products.every((p, i) => p.id === next.block.products[i]?.id);
}

export const ProductGrid2x2 = memo(ProductGrid2x2Base, areEqual);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    width: '48%',
    marginBottom: 12,
  },
});
