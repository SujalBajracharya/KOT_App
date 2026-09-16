/**
 * Mock table layout data.
 *
 * Mirrors the shape of ApiResponse<TableLayout[]> that the REST API will return.
 * Table names, floors, and statuses are drawn directly from the KOT redesign.
 *
 * DO NOT use these as production data — for UI development only.
 */
import { ApiResponse, TableLayout, Table } from '../../types/api';

const floor1Tables: Table[] = [
  {
    tableId: 'f1-t1',
    tableNumber: '1',
    floorName: '1st Floor',
    capacity: 4,
    status: 'OCCUPIED',
    occupancy: 3,
    orderId: 'ord-001',
    kotCount: 2,
    elapsedMinutes: 24,
  },
  {
    tableId: 'f1-t2',
    tableNumber: '2',
    floorName: '1st Floor',
    capacity: 2,
    status: 'FREE',
  },
  {
    tableId: 'f1-t3',
    tableNumber: '3',
    floorName: '1st Floor',
    capacity: 6,
    status: 'BILL',
    occupancy: 5,
    orderId: 'ord-002',
    amountDue: 2850,
  },
  {
    tableId: 'f1-t4',
    tableNumber: '4',
    floorName: '1st Floor',
    capacity: 4,
    status: 'OCCUPIED',
    occupancy: 2,
    orderId: 'ord-003',
    kotCount: 1,
    elapsedMinutes: 8,
  },
  {
    tableId: 'f1-t5',
    tableNumber: '5',
    floorName: '1st Floor',
    capacity: 4,
    status: 'FREE',
  },
  {
    tableId: 'f1-t6',
    tableNumber: '6',
    floorName: '1st Floor',
    capacity: 8,
    status: 'OCCUPIED',
    occupancy: 7,
    orderId: 'ord-004',
    kotCount: 3,
    elapsedMinutes: 41,
  },
];

const floor2Tables: Table[] = [
  {
    tableId: 'f2-t1',
    tableNumber: '1',
    floorName: '2nd Floor',
    capacity: 4,
    status: 'HELD',
    occupancy: 4,
    orderId: 'ord-005',
    amountDue: 1460,
  },
  {
    tableId: 'f2-t2',
    tableNumber: '2',
    floorName: '2nd Floor',
    capacity: 4,
    status: 'FREE',
  },
  {
    tableId: 'f2-t3',
    tableNumber: '3',
    floorName: '2nd Floor',
    capacity: 6,
    status: 'OCCUPIED',
    occupancy: 4,
    orderId: 'ord-006',
    kotCount: 1,
    elapsedMinutes: 15,
  },
  {
    tableId: 'f2-t4',
    tableNumber: '4',
    floorName: '2nd Floor',
    capacity: 4,
    status: 'FREE',
  },
];

const counterTables: Table[] = [
  {
    tableId: 'ct-01',
    tableNumber: 'CT 01',
    floorName: 'Counter',
    capacity: 2,
    status: 'OCCUPIED',
    occupancy: 1,
    orderId: 'ord-007',
    kotCount: 1,
    elapsedMinutes: 6,
  },
  {
    tableId: 'ct-02',
    tableNumber: 'CT 02',
    floorName: 'Counter',
    capacity: 2,
    status: 'FREE',
  },
  {
    tableId: 'ct-03',
    tableNumber: 'CT 03',
    floorName: 'Counter',
    capacity: 2,
    status: 'FREE',
  },
];

const diningTables: Table[] = [
  {
    tableId: 'dt-01',
    tableNumber: 'DT 01',
    floorName: 'Dining',
    capacity: 10,
    status: 'OCCUPIED',
    occupancy: 8,
    orderId: 'ord-008',
    kotCount: 4,
    elapsedMinutes: 52,
  },
];

const mockLayouts: TableLayout[] = [
  {
    layoutId: 'layout-floor1',
    layoutName: '1st Floor',
    tables: floor1Tables,
  },
  {
    layoutId: 'layout-floor2',
    layoutName: '2nd Floor',
    tables: floor2Tables,
  },
  {
    layoutId: 'layout-counter',
    layoutName: 'Counter',
    tables: counterTables,
  },
  {
    layoutId: 'layout-dining',
    layoutName: 'Dining',
    tables: diningTables,
  },
];

export const mockTableLayoutsResponse: ApiResponse<TableLayout[]> = {
  status: 'ok',
  result: mockLayouts,
  message: 'Table layouts fetched successfully',
  success: true,
};
