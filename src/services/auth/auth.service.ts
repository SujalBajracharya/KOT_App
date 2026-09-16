import {
  MOCK_AUTH_CREDENTIALS,
  mockUserVerificationFailure,
  mockUserVerificationSuccess,
} from '@/data/auth/auth.mock';
import {
  UserVerificationRequest,
  UserVerificationResponse,
} from '@/types/auth';

/**
 * Authentication Service.
 *
 * Encapsulates authentication API calls.
 * Currently uses mock data with simulated network latency.
 * Future REST API integration will replace the implementation here
 * without modifying UI screens or hooks.
 */
export async function userVerification(
  request: UserVerificationRequest,
): Promise<UserVerificationResponse> {
  // Simulate network latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const isUserValid =
    request.userName.trim().toLowerCase() ===
    MOCK_AUTH_CREDENTIALS.userName.toLowerCase();
  const isPasswordValid = request.password === MOCK_AUTH_CREDENTIALS.password;

  if (isUserValid && isPasswordValid) {
    return mockUserVerificationSuccess;
  }

  return mockUserVerificationFailure;
}
