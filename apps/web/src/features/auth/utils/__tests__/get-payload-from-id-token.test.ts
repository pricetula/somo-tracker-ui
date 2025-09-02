import { getPayloadFromIdToken } from '../get-payload-from-id-token';
import { getAuthCookieContent } from '../get-auth-cookie-content';
import { jwtDecode } from 'jwt-decode';

jest.mock('../get-auth-cookie-content');
jest.mock('jwt-decode');

describe('getPayloadFromIdToken', () => {
  const mockGetAuthCookieContent = getAuthCookieContent as jest.Mock;
  const mockJwtDecode = jwtDecode as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the decoded payload from the id token', async () => {
    const idToken = 'test-id-token';
    const decodedPayload = { email: 'test@example.com', picture: 'test-picture' };

    mockGetAuthCookieContent.mockResolvedValue({ id_token: idToken });
    mockJwtDecode.mockReturnValue(decodedPayload);

    const result = await getPayloadFromIdToken();

    expect(result).toEqual(decodedPayload);
    expect(mockGetAuthCookieContent).toHaveBeenCalledTimes(1);
    expect(mockJwtDecode).toHaveBeenCalledWith(idToken);
  });

  it('should return null if the id token is not found', async () => {
    mockGetAuthCookieContent.mockResolvedValue(null);

    const result = await getPayloadFromIdToken();

    expect(result).toBeNull();
    expect(mockGetAuthCookieContent).toHaveBeenCalledTimes(1);
    expect(mockJwtDecode).not.toHaveBeenCalled();
  });

  it('should throw an error if decoding fails', async () => {
    const idToken = 'test-id-token';
    const errorMessage = 'Invalid token';

    mockGetAuthCookieContent.mockResolvedValue({ id_token: idToken });
    mockJwtDecode.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await expect(getPayloadFromIdToken()).rejects.toThrow(
      `Failed to decode or parse ID token payload: ${errorMessage}`
    );
  });
});
