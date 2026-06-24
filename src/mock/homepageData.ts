import type { HomepagePayload } from '../types/schema';

/**
 * Mock Homepage Payload
 * -----------------------
 * Simulates the heavy operational JSON a real backend gateway would push.
 * `activeCampaignId` controls which campaign theme/overlay/collection is
 * live — flip it to any key in `mock/campaigns.ts`, or `null` for the
 * default baseline experience, with zero code changes elsewhere.
 *
 * Note block id `"unknown_promo_001"` of type `"NEW_COMPONENT_V2"` near the
 * end of the feed — this is the Resilience Critical Rule test case. The
 * registry has no factory registered for that type, so it must be dropped
 * silently while every block around it renders normally.
 */
export const HOMEPAGE_PAYLOAD: HomepagePayload = {
  theme: {
    primary: '#FF9933',
    background: '#FFF5E6',
    accent: '#2E7D32',
    textPrimary: '#1A1A1A',
    textOnPrimary: '#FFFFFF',
    cardBackground: '#FFFFFF',
  },
  activeCampaignId: 'mystery_gift_carnival',
  blocks: [
    {
      id: 'banner_001',
      type: 'BANNER_HERO',
      title: 'Diapers & Wipes, Delivered in 10 mins',
      subtitle: 'Up to 40% OFF',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800',
      action: { type: 'DEEP_LINK', payload: { url: '/category/diapers' } },
    },

    {
      id: 'grid_001',
      type: 'PRODUCT_GRID_2X2',
      title: 'Trending in Baby Care',
      products: [
        {
          id: 'p_001',
          name: 'Pampers Pants Diapers (M)',
          price: 499,
          mrp: 599,
          unit: '50 pcs',
          image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_001' } },
        },
        {
          id: 'p_002',
          name: 'Baby Wipes Combo',
          price: 299,
          mrp: 349,
          unit: '3x80 pcs',
          image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_002' } },
        },
        {
          id: 'p_003',
          name: 'Johnson’s Baby Lotion',
          price: 199,
          unit: '500ml',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_003' } },
        },
        {
          id: 'p_004',
          name: 'Cerelac Stage 1',
          price: 249,
          unit: '300g',
          image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_004' } },
        },
      ],
    },

    {
      id: 'collection_001',
      type: 'DYNAMIC_COLLECTION',
      title: 'Summer Essentials',
      subtitle: 'Beat the heat, stay cool',
      products: [
        {
          id: 'c1_001',
          name: 'Mosquito Repellent Patch',
          price: 99,
          unit: 'pack of 24',
          image: 'https://images.unsplash.com/photo-1632934503576-984a6aa1b389?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c1_001' } },
        },
        {
          id: 'c1_002',
          name: 'Cotton Romper Set',
          price: 349,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c1_002' } },
        },
        {
          id: 'c1_003',
          name: 'Baby Sunscreen SPF 50',
          price: 399,
          unit: '100ml',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c1_003' } },
        },
        {
          id: 'c1_004',
          name: 'Foldable Sun Stroller',
          price: 2999,
          mrp: 3499,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1591196211490-996f7caca351?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c1_004' } },
        },
        {
          id: 'c1_005',
          name: 'Electrolyte Sachets',
          price: 149,
          unit: 'pack of 6',
          image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c1_005' } },
        },
      ],
    },

    {
      id: 'collection_002',
      type: 'DYNAMIC_COLLECTION',
      title: 'Snacks under ₹99',
      subtitle: 'Quick bites kids actually eat',
      products: [
        {
          id: 'c2_001',
          name: 'Ragi Puffs',
          price: 49,
          unit: '60g',
          image: 'https://images.unsplash.com/photo-1599490659213-e0b6e8b1c4b2?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c2_001' } },
        },
        {
          id: 'c2_002',
          name: 'Fruit Puree Pouch',
          price: 79,
          unit: '90g',
          image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eee093?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c2_002' } },
        },
        {
          id: 'c2_003',
          name: 'Multigrain Rusk',
          price: 39,
          unit: '200g',
          image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c2_003' } },
        },
        {
          id: 'c2_004',
          name: 'Veggie Sticks',
          price: 59,
          unit: '75g',
          image: 'https://images.unsplash.com/photo-1599490659213-e0b6e8b1c4b2?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c2_004' } },
        },
        {
          id: 'c2_005',
          name: 'Banana Chips (No Sugar)',
          price: 89,
          unit: '100g',
          image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eee093?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c2_005' } },
        },
      ],
    },

    {
      id: 'grid_002',
      type: 'PRODUCT_GRID_2X2',
      title: 'Bath Time Favourites',
      products: [
        {
          id: 'p_005',
          name: 'Baby Shampoo',
          price: 179,
          unit: '200ml',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_005' } },
        },
        {
          id: 'p_006',
          name: 'Hooded Towel',
          price: 449,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1591196211490-996f7caca351?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_006' } },
        },
        {
          id: 'p_007',
          name: 'Rubber Duck Bath Toy',
          price: 99,
          unit: 'pack of 3',
          image: 'https://images.unsplash.com/photo-1632934503576-984a6aa1b389?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_007' } },
        },
        {
          id: 'p_008',
          name: 'No-Tears Body Wash',
          price: 229,
          unit: '300ml',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_008' } },
        },
      ],
    },

    // --- Resilience test case: an unregistered block type from the server.
    // The registry must drop this silently without affecting anything else.
    {
      id: 'unknown_promo_001',
      type: 'NEW_COMPONENT_V2',
      foo: 'bar',
      nested: { whatever: true },
    },

    {
      id: 'collection_003',
      type: 'DYNAMIC_COLLECTION',
      title: 'Toys & Learning',
      subtitle: 'Screen-free playtime picks',
      products: [
        {
          id: 'c3_001',
          name: 'Wooden Stacking Blocks',
          price: 399,
          unit: 'set of 12',
          image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c3_001' } },
        },
        {
          id: 'c3_002',
          name: 'Alphabet Flash Cards',
          price: 249,
          unit: 'set of 26',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c3_002' } },
        },
        {
          id: 'c3_003',
          name: 'Soft Plush Elephant',
          price: 499,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c3_003' } },
        },
        {
          id: 'c3_004',
          name: 'Puzzle Mat',
          price: 699,
          mrp: 899,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c3_004' } },
        },
        {
          id: 'c3_005',
          name: 'Musical Activity Cube',
          price: 1299,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'c3_005' } },
        },
      ],
    },

    {
      id: 'banner_002',
      type: 'BANNER_HERO',
      title: 'New Mom Essentials Kit',
      subtitle: 'Curated for you',
      image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=800',
      action: { type: 'DEEP_LINK', payload: { url: '/category/new-mom-kit' } },
    },

    {
      id: 'grid_003',
      type: 'PRODUCT_GRID_2X2',
      title: 'Feeding Essentials',
      products: [
        {
          id: 'p_009',
          name: 'Anti-Colic Feeding Bottle',
          price: 349,
          unit: '250ml',
          image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_009' } },
        },
        {
          id: 'p_010',
          name: 'Silicone Bibs',
          price: 199,
          unit: 'pack of 2',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_010' } },
        },
        {
          id: 'p_011',
          name: 'Bottle Sterilizer',
          price: 1899,
          mrp: 2299,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1591196211490-996f7caca351?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_011' } },
        },
        {
          id: 'p_012',
          name: 'Baby Food Masher Set',
          price: 149,
          unit: 'set of 3',
          image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'p_012' } },
        },
      ],
    },
  ],
};
