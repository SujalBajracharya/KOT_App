/**
 * Table Repository
 *
 * Mediates between the API service layer and the rest of the application.
 * Screens and hooks call this repository — never the API service directly.
 *
 * To switch from mock to real REST:
 *   1. Create `src/services/api/restApiService.ts`
 *   2. Replace the import below with the real service
 *   3. Nothing else changes
 */
import { TableLayout } from '../types/api';
import { fetchTableLayouts } from '../services/api/mockApiService';

export interface TableRepositoryResult {
  layouts: TableLayout[];
  error: string | null;
}

export async function getTableLayouts(): Promise<TableRepositoryResult> {
  try {
    const response = await fetchTableLayouts();

    if (!response.success) {
      return { layouts: [], error: response.message };
    }

    return { layouts: response.result, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error fetching tables';
    return { layouts: [], error: message };
  }
}
