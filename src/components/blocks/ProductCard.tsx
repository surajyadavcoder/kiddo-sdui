import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { handleAction } from '../../actions/actionDispatcher';
import { useItemQuantity } from '../../store/cartStore';
import type { Product } from '../../types/schema';

interface ProductCardProps {
  product: Product;
  width?: number;
}

/**
 * ProductCard
 * -----------
 * The card most likely to suffer cascading re-renders, so it gets two
 * isolation layers:
 *  1. `useItemQuantity(id)` — a narrow Zustand selector. Only THIS card
 *     re-renders when ITS quantity changes; siblings reading a different
 *     id are untouched.
 *  2. `React.memo` with a custom comparator — guards against re-renders
 *     from parent list re-renders (e.g. scroll-triggered FlashList updates)
 *     when the underlying product data hasn't actually changed.
 */
const ProductCardBase: React.FC<ProductCardProps> = ({ product, width }) => {
  const theme = useTheme();
  const quantity = useItemQuantity(product.id);

  const onAdd = () => handleAction(product.action);

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }, width ? { width } : null]}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <Text style={[styles.name, { color: theme.textPrimary }]} numberOfLines={2}>
        {product.name}
      </Text>
      <View style={styles.priceRow}>
        <Text style={[styles.price, { color: theme.textPrimary }]}>₹{product.price}</Text>
        {product.mrp && product.mrp > product.price ? (
          <Text style={styles.mrp}>₹{product.mrp}</Text>
        ) : null}
      </View>
      {product.unit ? <Text style={styles.unit}>{product.unit}</Text> : null}

      <Pressable
        onPress={onAdd}
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        accessibilityRole="button"
        accessibilityLabel={`Add ${product.name} to cart`}
      >
        <Text style={[styles.addButtonText, { color: theme.textOnPrimary }]}>
          {quantity > 0 ? `ADDED (${quantity})` : 'ADD'}
        </Text>
      </Pressable>
    </View>
  );
};

function areEqual(prev: ProductCardProps, next: ProductCardProps): boolean {
  return (
    prev.product.id === next.product.id &&
    prev.product.price === next.product.price &&
    prev.product.name === next.product.name &&
    prev.width === next.width
  );
}

export const ProductCard = memo(ProductCardBase, areEqual);

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    backgroundColor: '#EEE',
    marginBottom: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    minHeight: 34,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  mrp: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  unit: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  addButton: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
