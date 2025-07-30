
import { getAccessTokenFromAuthCookie } from '../get-access-token-from-auth-cookie';
import { getAuthCookieContent } from '../get-auth-cookie-content';
import { AccessTokenMissingError } from '../../errors';

jest.mock('../get-auth-cookie-content');

describe('getAccessTokenFromAuthCookie', () => {
  const mockGetAuthCookieContent = getAuthCookieContent as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the access token from the auth cookie', async () => {
    const accessToken = 'test-access-token';
    mockGetAuthCookieContent.mockResolvedValue({ access_token: accessToken });

    const result = await getAccessTokenFromAuthCookie();

    expect(result).toBe(accessToken);
    expect(mockGetAuthCookieContent).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the auth cookie is not found', async () => {
    mockGetAuthCookieContent.mockResolvedValue(null);

    await expect(getAccessTokenFromAuthCookie()).rejects.toThrow(
      new AccessTokenMissingError('No access token found in auth cookie')
    );
    expect(mockGetAuthCookieContent).toHaveBeenCalledTimes(1);
  });
});
