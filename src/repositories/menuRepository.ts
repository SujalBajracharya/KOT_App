/**
 * Menu Repository
 *
 * Mediates between the API service layer and the rest of the application.
 * Screens and hooks call this repository — never the API service directly.
 *
 * To switch from mock to real REST:
 *   1. Create `src/services/api/restApiService.ts`
 *   2. Replace the import below with the real service
 *   3. Nothing else changes
 */
import { MenuItem } from '../types/api';
import { fetchMenuItems } from '../services/api/mockApiService';

export interface MenuRepositoryResult {
  items: MenuItem[];
  error: string | null;
}

export async function getMenuItems(): Promise<MenuRepositoryResult> {
  try {
    const response = await fetchMenuItems();

    if (!response.success) {
      return { items: [], error: response.message };
    }

    return { items: response.result, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error fetching menu';
    return { items: [], error: message };
  }
}
