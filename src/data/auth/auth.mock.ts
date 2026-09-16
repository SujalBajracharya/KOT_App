import { UserVerificationResponse } from '@/types/auth';

/**
 * Valid mock user credentials.
 */
export const MOCK_AUTH_CREDENTIALS = {
  userName: 'admin',
  password: 'Ims@1234',
} as const;

/**
 * Mock successful user verification response.
 */
export const mockUserVerificationSuccess: UserVerificationResponse = {
  status: 'ok',
  result: {
    allowCancelTable: true,
    allowTableTransfer: true,
    version: 9108,
  },
  message: 'Login Success',
  success: true,
};

/**
 * Mock failed user verification response for invalid credentials.
 */
export const mockUserVerificationFailure: UserVerificationResponse = {
  status: 'error',
  result: {
    allowCancelTable: false,
    allowTableTransfer: false,
    version: 0,
  },
  message: 'Invalid username or password',
  success: false,
};
