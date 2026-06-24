import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { handleAction } from '../../actions/actionDispatcher';
import type { BannerHeroBlock } from '../../types/schema';

interface Props {
  block: BannerHeroBlock;
}

/**
 * BANNER_HERO
 * -----------
 * Fluid full-width promotional card. Pure presentation — on press it only
 * forwards `block.action` to the centralized dispatcher, it never decides
 * what that action *means*.
 */
const BannerHeroBase: React.FC<Props> = ({ block }) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => handleAction(block.action)}
      style={styles.wrapper}
      accessibilityRole="button"
      accessibilityLabel={block.title}
    >
      <Image source={{ uri: block.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.textOverlay}>
        <Text style={styles.title}>{block.title}</Text>
        {block.subtitle ? (
          <Text style={[styles.subtitle, { color: theme.primary }]}>{block.subtitle}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

function areEqual(prev: Props, next: Props): boolean {
  return prev.block.id === next.block.id && prev.block.image === next.block.image;
}

export const BannerHero = memo(BannerHeroBase, areEqual);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#EEE',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
