import type { Campaign } from '../types/schema';

/**
 * Mock Campaigns — Advanced Deliverable A
 * -----------------------------------------
 * Three functionally distinct campaign profiles. Switching `activeCampaignId`
 * in the homepage payload (see homepageData.ts) is enough to flip the entire
 * app's theme + overlay + featured collection at runtime — no binary update,
 * exactly like the assignment's "no release cycle" constraint demands.
 *
 * Lottie/animation URLs point at publicly hosted sample JSON so the overlay
 * pipeline is genuinely exercised (remote fetch + cache) rather than faked
 * with a local asset.
 */
export const CAMPAIGNS: Record<string, Campaign> = {
  back_to_school: {
    id: 'back_to_school',
    name: 'Back to School Mega-Sale',
    theme: {
      primary: '#0047AB', // primary blue
      background: '#FFF8DC',
      accent: '#FFD500', // high-contrast bright yellow
      textPrimary: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      cardBackground: '#FFFFFF',
    },
    overlay: {
      type: 'FULL_SCREEN_OVERLAY',
      animation_url: 'https://assets10.lottiefiles.com/packages/lf20_jR7XKj.json',
    },
    featuredCollection: {
      id: 'collection_back_to_school',
      type: 'DYNAMIC_COLLECTION',
      title: 'Lunchboxes & Bags',
      subtitle: 'Gear up for the new school year',
      products: [
        {
          id: 'sch_001',
          name: 'Dino Bento Lunchbox',
          price: 399,
          mrp: 549,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1591196211490-996f7caca351?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sch_001' } },
        },
        {
          id: 'sch_002',
          name: 'Unicorn School Backpack',
          price: 899,
          mrp: 1199,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sch_002' } },
        },
        {
          id: 'sch_003',
          name: 'Steel Water Bottle 500ml',
          price: 249,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sch_003' } },
        },
        {
          id: 'sch_004',
          name: 'Pencil Pouch Set',
          price: 149,
          unit: 'pack of 2',
          image: 'https://images.unsplash.com/photo-1568205612837-017257d2da8a?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sch_004' } },
        },
        {
          id: 'sch_005',
          name: 'Geometry Box',
          price: 99,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sch_005' } },
        },
      ],
    },
  },

  summer_playhouse: {
    id: 'summer_playhouse',
    name: 'Summer Playhouse Festival',
    theme: {
      primary: '#0099CC', // ocean blue
      background: '#E6F7FF',
      accent: '#00C2D1',
      textPrimary: '#022B3A',
      textOnPrimary: '#FFFFFF',
      cardBackground: '#FFFFFF',
    },
    overlay: {
      type: 'FULL_SCREEN_OVERLAY',
      animation_url: 'https://assets3.lottiefiles.com/packages/lf20_4kx2txye.json',
    },
    featuredCollection: {
      id: 'collection_summer_playhouse',
      type: 'DYNAMIC_COLLECTION',
      title: 'Petting Zoo Tickets',
      subtitle: 'Book a splash-tastic day out',
      products: [
        {
          id: 'sum_001',
          name: 'Petting Zoo Family Pass',
          price: 1499,
          unit: '4 entries',
          image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300',
          action: { type: 'BOOK_EVENT_TICKET', payload: { eventId: 'zoo_01', eventName: 'Petting Zoo' } },
        },
        {
          id: 'sum_002',
          name: 'Inflatable Beach Ball',
          price: 199,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1561211123-79b3ec0f5a4c?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sum_002' } },
        },
        {
          id: 'sum_003',
          name: 'Kids Splash Pool',
          price: 1299,
          mrp: 1599,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sum_003' } },
        },
        {
          id: 'sum_004',
          name: 'Water Splash Pads',
          price: 349,
          unit: 'pack of 4',
          image: 'https://images.unsplash.com/photo-1561553543-e8e1f8e3a2f8?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sum_004' } },
        },
        {
          id: 'sum_005',
          name: 'Sun Hat for Toddlers',
          price: 249,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1519457851617-49a8e3a3a3a4?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'sum_005' } },
        },
      ],
    },
  },

  mystery_gift_carnival: {
    id: 'mystery_gift_carnival',
    name: 'Mystery Gift Carnival',
    theme: {
      primary: '#D7263D', // carnival red
      background: '#FFF0F0',
      accent: '#FFB400',
      textPrimary: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      cardBackground: '#FFFFFF',
    },
    overlay: {
      type: 'FULL_SCREEN_OVERLAY',
      animation_url: 'https://assets.example.com/confetti_carnival.json',
    },
    featuredCollection: {
      id: 'collection_mystery_gift',
      type: 'DYNAMIC_COLLECTION',
      title: 'Unlock a Mystery Gift',
      subtitle: 'Every order over ₹499 wins a surprise',
      products: [
        {
          id: 'mys_001',
          name: 'Mystery Gift Box',
          price: 1,
          unit: 'on orders ₹499+',
          image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300',
          action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'CARNIVAL99' } },
        },
        {
          id: 'mys_002',
          name: 'Confetti Popper Pack',
          price: 129,
          unit: 'pack of 6',
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'mys_002' } },
        },
        {
          id: 'mys_003',
          name: 'Carnival Mask Set',
          price: 199,
          unit: 'pack of 3',
          image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'mys_003' } },
        },
        {
          id: 'mys_004',
          name: 'Surprise Toy Capsule',
          price: 99,
          unit: '1 pc',
          image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'mys_004' } },
        },
        {
          id: 'mys_005',
          name: 'Party Streamers',
          price: 79,
          unit: 'roll',
          image: 'https://images.unsplash.com/photo-1530305408560-82d13781b33a?w=300',
          action: { type: 'ADD_TO_CART', payload: { id: 'mys_005' } },
        },
      ],
    },
  },
};
