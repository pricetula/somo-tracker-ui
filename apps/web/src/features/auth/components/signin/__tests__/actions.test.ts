import { sendOtpCodeToEmail, verifyOtpCode } from '../actions';
import { cookies } from 'next/headers';

const API_URL = 'https://api.example.com/';

// Mock Next.js cookies
jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}));

// Mock constants
jest.mock('../../../../shared/lib/constants', () => ({
    COOKIE: {
        AUTH: 'auth_token',
        MAX_AGE: 86400, // 24 hours
    },
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('Authentication Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset environment variable
        process.env.API_URL = API_URL;
    });

    describe('sendOtpCodeToEmail', () => {
        it('should successfully send OTP code', async () => {
            // Arrange
            const email = 'test@example.com';
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true }),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(fetch).toHaveBeenCalledWith(`${API_URL}auth-send-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            expect(result).toEqual({
                success: true,
                data: '',
                error: '',
            });
        });

        it('should handle API error response', async () => {
            // Arrange
            const email = 'test@example.com';
            const errorMessage = 'Invalid email address';
            const mockResponse = {
                ok: false,
                json: jest.fn().mockResolvedValue({ error: errorMessage }),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(result).toEqual({
                success: false,
                data: '',
                error: errorMessage,
            });
        });

        it('should handle API error response without error message', async () => {
            // Arrange
            const email = 'test@example.com';
            const mockResponse = {
                ok: false,
                json: jest.fn().mockResolvedValue({}),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(result).toEqual({
                success: false,
                data: '',
                error: 'Failed to send code',
            });
        });

        it('should handle network/server errors', async () => {
            // Arrange
            const email = 'test@example.com';
            (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(result).toEqual({
                success: false,
                data: '',
                error: 'Network/server error',
            });
        });

        it('should handle JSON parsing errors', async () => {
            // Arrange
            const email = 'test@example.com';
            const mockResponse = {
                ok: false,
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(result).toEqual({
                success: false,
                data: '',
                error: 'Network/server error',
            });
        });
    });

    describe('verifyOtpCode', () => {
        const mockCookieStore = {
            set: jest.fn(),
        };

        beforeEach(() => {
            (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
        });

        it('should successfully verify OTP code and set cookie', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const mockAuthResponse = {
                access_token: 'access_token_123',
                refresh_token: 'refresh_token_123',
                id_token: 'id_token_123',
                token_type: 'Bearer',
                expires_in: 3600,
                message: 'Authentication successful',
            };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockAuthResponse),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(fetch).toHaveBeenCalledWith(`${API_URL}auth-verify-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, email }),
            });

            expect(mockCookieStore.set).toHaveBeenCalledWith(
                'auth_token',
                JSON.stringify({
                    access_token: mockAuthResponse.access_token,
                    refresh_token: mockAuthResponse.refresh_token,
                    id_token: mockAuthResponse.id_token,
                    token_type: mockAuthResponse.token_type,
                    expires_in: mockAuthResponse.expires_in,
                }),
                {
                    httpOnly: true,
                    secure: false, // NODE_ENV is 'test'
                    sameSite: 'lax',
                    maxAge: 86400,
                    path: '/',
                }
            );

            expect(result).toEqual({
                success: true,
                data: mockAuthResponse,
                error: '',
            });
        });

        it('should set secure cookie in production environment', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const mockAuthResponse = {
                access_token: 'access_token_123',
                refresh_token: 'refresh_token_123',
                id_token: 'id_token_123',
                token_type: 'Bearer',
                expires_in: 3600,
                message: 'Authentication successful',
            };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockAuthResponse),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            await verifyOtpCode({ code, email });

            // Assert
            expect(mockCookieStore.set).toHaveBeenCalledWith(
                'auth_token',
                JSON.stringify({
                    access_token: mockAuthResponse.access_token,
                    refresh_token: mockAuthResponse.refresh_token,
                    id_token: mockAuthResponse.id_token,
                    token_type: mockAuthResponse.token_type,
                    expires_in: mockAuthResponse.expires_in,
                }),
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 86400,
                    path: '/',
                }
            );
        });

        it('should handle API error response with error message', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const errorMessage = 'Invalid OTP code';
            const mockResponse = {
                ok: false,
                statusText: 'Bad Request',
                json: jest.fn().mockResolvedValue({ error: errorMessage }),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: errorMessage,
            });
            expect(mockCookieStore.set).not.toHaveBeenCalled();
        });

        it('should handle API error response without error message', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const mockResponse = {
                ok: false,
                statusText: 'Unauthorized',
                json: jest.fn().mockResolvedValue({}),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Unauthorized',
            });
        });

        it('should handle network/server errors', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Server error. Please try again.',
            });
            expect(mockCookieStore.set).not.toHaveBeenCalled();
        });

        it('should handle JSON parsing errors in success response', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const mockResponse = {
                ok: true,
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Server error. Please try again.',
            });
        });

        it('should handle cookies() function errors', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const mockAuthResponse = {
                access_token: 'access_token_123',
                refresh_token: 'refresh_token_123',
                id_token: 'id_token_123',
                token_type: 'Bearer',
                expires_in: 3600,
                message: 'Authentication successful',
            };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockAuthResponse),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);
            (cookies as jest.Mock).mockRejectedValue(new Error('Cookie error'));

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Server error. Please try again.',
            });
        });

        it('should handle cookie.set() errors', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@example.com';
            const mockAuthResponse = {
                access_token: 'access_token_123',
                refresh_token: 'refresh_token_123',
                id_token: 'id_token_123',
                token_type: 'Bearer',
                expires_in: 3600,
                message: 'Authentication successful',
            };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockAuthResponse),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);
            mockCookieStore.set.mockImplementation(() => {
                throw new Error('Cookie set error');
            });

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Server error. Please try again.',
            });
        });
    });

    describe('Edge cases', () => {
        it('should handle missing API_URL environment variable', async () => {
            // Arrange
            delete process.env.API_URL;
            const email = 'test@example.com';

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(result).toEqual({
                success: false,
                data: '',
                error: 'API url not set',
            });
        });

        it('should handle empty email string', async () => {
            // Arrange
            const email = '';
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true }),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Act
            const result = await sendOtpCodeToEmail(email);

            // Assert
            expect(result).toEqual({
                success: false,
                data: '',
                error: 'Email is required',
            });
        });

        it('should handle empty code and email in verifyOtpCode', async () => {
            // Arrange
            const code = '';
            const email = '';

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Code and email are required',
            });
        });

        it('should handle empty code in verifyOtpCode', async () => {
            // Arrange
            const code = '';
            const email = 'test@mail.com';

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Code and email are required',
            });
        });

        it('should handle empty email in verifyOtpCode', async () => {
            // Arrange
            const code = '123456';
            const email = '';

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Code and email are required',
            });
        });

        it('should handle thrown network errors in verifyOtpCode', async () => {
            // Arrange
            const code = '123456';
            const email = 'test@mail.com';
            (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

            // Act
            const result = await verifyOtpCode({ code, email });

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: 'Server error. Please try again.',
            });
        });
    });
});