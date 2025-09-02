

import { refreshTokenAndSaveToCookie } from '../refresh-token-and-save-to-cookies';
import { saveAuthToCookie } from '../../utils/save-auth-to-cookie';
import { getAuthCookieContent } from '../../utils/get-auth-cookie-content';
import { TokenRefreshFailedError } from '../../errors';
import { postApi } from '@/shared/lib/api';

jest.mock('../../utils/save-auth-to-cookie');
jest.mock('../../utils/get-auth-cookie-content');
jest.mock('@/shared/lib/api');

describe('refreshTokenAndSaveToCookie', () => {
  const mockSaveAuthToCookie = saveAuthToCookie as jest.Mock;
  const mockGetAuthCookieContent = getAuthCookieContent as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should refresh the token and save it to cookies', async () => {
    const refreshToken = 'test-refresh-token';
    const responseData = { access_token: 'new-access-token' };

    mockGetAuthCookieContent.mockResolvedValue({ refresh_token: refreshToken });
    postApi.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseData),
    });

    await refreshTokenAndSaveToCookie();

    expect(mockGetAuthCookieContent).toHaveBeenCalledTimes(1);
    expect(postApi).toHaveBeenCalledWith({
      uri: '/refresh-token',
      body: { refresh_token: refreshToken },
    });
    expect(mockSaveAuthToCookie).toHaveBeenCalledWith(responseData);
  });

  it('should throw an error if the refresh token is not found', async () => {
    mockGetAuthCookieContent.mockResolvedValue(null);

    await expect(refreshTokenAndSaveToCookie()).rejects.toThrow(
      new TokenRefreshFailedError('No refresh token found')
    );
  });

  it('should throw an error if the request is not ok', async () => {
    const refreshToken = 'test-refresh-token';
    const errorResponse = 'Invalid refresh token';

    mockGetAuthCookieContent.mockResolvedValue({ refresh_token: refreshToken });
    postApi.mockResolvedValue({
      ok: false,
      text: () => Promise.resolve(errorResponse),
    });

    await expect(refreshTokenAndSaveToCookie()).rejects.toThrow(
      new TokenRefreshFailedError(errorResponse)
    );
  });
});

