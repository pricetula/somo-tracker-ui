
import { authenticatedGet } from '../authenticated-get';
import { getAccessTokenFromAuthCookie } from '../get-access-token-from-auth-cookie';
import * as services from '../../services/refresh-token-and-save-to-cookies';
import { getApi } from '@/shared/lib/api';

jest.mock('../get-access-token-from-auth-cookie');
jest.mock('../../services/refresh-token-and-save-to-cookies');
jest.mock('@/shared/lib/api');

describe('authenticatedGet', () => {
    const mockGetAccessToken = getAccessTokenFromAuthCookie as jest.Mock;
    const mockRefreshToken = jest.spyOn(services, 'refreshTokenAndSaveToCookie');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should refresh token and retry if request fails with token expiry error', async () => {
        const accessToken = 'test-access-token';
        const newAccessToken = 'new-access-token';
        const url = '/test-url';
        const errorResponse = '"exp" not satisfied';
        const successResponse = { message: 'success' };

        mockGetAccessToken.mockResolvedValue(accessToken);
        (getApi as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                text: () => Promise.resolve(errorResponse),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(successResponse),
            });
        mockRefreshToken.mockResolvedValue({ access_token: newAccessToken, id_token: '', refresh_token: '', token_type: 'Bearer', expires_in: 3600 });

        await authenticatedGet({ uri: url });

        expect(mockGetAccessToken).toHaveBeenCalledTimes(1);
        expect(getApi).toHaveBeenCalledTimes(2);
        expect(mockRefreshToken).toHaveBeenCalledTimes(1);
        expect(getApi).toHaveBeenCalledWith({
            uri: url,
            token: newAccessToken,
        });
    });
});
