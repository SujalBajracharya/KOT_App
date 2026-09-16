/**
 * Mock API Service
 *
 * Simulates REST API responses using static mock data.
 * All methods return Promise<ApiResponse<T>> with a small artificial delay
 * to simulate network latency and expose loading states in the UI.
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  When the real REST API is ready:                       │
 * │  Replace this file with a real HTTP implementation      │
 * │  that calls fetch() / axios and parses JSON responses.  │
 * │  The Repository layer and all screens remain unchanged. │
 * └─────────────────────────────────────────────────────────┘
 */
import { ApiResponse, MenuItem, TableLayout } from '../../types/api';
import {
  mockTableLayoutsResponse,
  mockMenuResponse,
} from '../../data/mock';

/** Simulate network round-trip (ms) */
const MOCK_DELAY_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Table endpoints ───────────────────────────────────────────────────────────

export async function fetchTableLayouts(): Promise<
  ApiResponse<TableLayout[]>
> {
  await delay(MOCK_DELAY_MS);
  return mockTableLayoutsResponse;
}

// ── Menu endpoints ────────────────────────────────────────────────────────────

export async function fetchMenuItems(): Promise<ApiResponse<MenuItem[]>> {
  await delay(MOCK_DELAY_MS);
  return mockMenuResponse;
}
