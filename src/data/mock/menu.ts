/**
 * Mock menu data.
 *
 * Item names, categories, and prices reflect a realistic Nepali restaurant menu
 * drawn from the KOT redesign examples.
 *
 * DO NOT use these as production data — for UI development only.
 */
import { ApiResponse, MenuItem } from '../../types/api';

export const mockMenuItems: MenuItem[] = [
  // ── Starters ───────────────────────────────────────────────────────────────
  {
    itemId: 'mi-001',
    itemCode: 'S01',
    itemName: 'Chicken Keema',
    category: 'STARTER',
    unitPrice: 380,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },
  {
    itemId: 'mi-002',
    itemCode: 'S02',
    itemName: 'Paneer Tikka',
    category: 'STARTER',
    unitPrice: 420,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },
  {
    itemId: 'mi-003',
    itemCode: 'S03',
    itemName: 'Mushroom Chilli',
    category: 'STARTER',
    unitPrice: 320,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },
  {
    itemId: 'mi-004',
    itemCode: 'S04',
    itemName: 'Fish Fillet',
    category: 'STARTER',
    unitPrice: 550,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },

  // ── Mains ──────────────────────────────────────────────────────────────────
  {
    itemId: 'mi-005',
    itemCode: 'M01',
    itemName: 'Chicken Meat',
    category: 'MAIN',
    unitPrice: 480,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
    choices: [
      { choiceId: 'c-001', choiceName: 'Boneless', additionalPrice: 50 },
      { choiceId: 'c-002', choiceName: 'With Bone', additionalPrice: 0 },
    ],
  },
  {
    itemId: 'mi-006',
    itemCode: 'M02',
    itemName: 'Chicken Breast',
    category: 'MAIN',
    unitPrice: 520,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },
  {
    itemId: 'mi-007',
    itemCode: 'M03',
    itemName: 'Buff Keema',
    category: 'MAIN',
    unitPrice: 350,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },
  {
    itemId: 'mi-008',
    itemCode: 'M04',
    itemName: 'Chicken Boneless',
    category: 'MAIN',
    unitPrice: 500,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },
  {
    itemId: 'mi-009',
    itemCode: 'M05',
    itemName: 'Chicken Wings',
    category: 'MAIN',
    unitPrice: 450,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },

  // ── Specials ───────────────────────────────────────────────────────────────
  {
    itemId: 'mi-010',
    itemCode: 'SP01',
    itemName: "Chef's Special Thali",
    category: 'SPECIAL',
    unitPrice: 750,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
  },

  // ── Beverages ─────────────────────────────────────────────────────────────
  {
    itemId: 'mi-011',
    itemCode: 'B01',
    itemName: 'Lassi',
    category: 'BEVERAGE',
    unitPrice: 120,
    currency: 'NPR',
    isAvailable: true,
    taxPercent: 13,
    choices: [
      { choiceId: 'c-003', choiceName: 'Sweet', additionalPrice: 0 },
      { choiceId: 'c-004', choiceName: 'Salted', additionalPrice: 0 },
    ],
  },
  {
    itemId: 'mi-012',
    itemCode: 'B02',
    itemName: 'Soft Drink',
    category: 'BEVERAGE',
    unitPrice: 80,
    currency: 'NPR',
    isAvailable: true,
  },
  {
    itemId: 'mi-013',
    itemCode: 'B03',
    itemName: 'Mineral Water',
    category: 'BEVERAGE',
    unitPrice: 60,
    currency: 'NPR',
    isAvailable: true,
  },

  // ── Temporarily unavailable ───────────────────────────────────────────────
  {
    itemId: 'mi-014',
    itemCode: 'S05',
    itemName: 'Veg Spring Roll',
    category: 'STARTER',
    unitPrice: 280,
    currency: 'NPR',
    isAvailable: false,
    taxPercent: 13,
  },
];

export const mockMenuResponse: ApiResponse<MenuItem[]> = {
  status: 'ok',
  result: mockMenuItems,
  message: 'Menu items fetched successfully',
  success: true,
};
