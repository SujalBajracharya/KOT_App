/**
 * Authentication domain types for KOT App.
 *
 * Derived from the logical verification API contract.
 */

export interface UserVerificationRequest {
  userName: string;
  password: string;
  deviceId: string;
  version: number;
}

export interface UserAccess {
  allowCancelTable: boolean;
  allowTableTransfer: boolean;
  version: number;
}

export interface UserVerificationResponse {
  status: 'ok' | 'error' | string;
  result: UserAccess;
  message: string;
  success: boolean;
}
