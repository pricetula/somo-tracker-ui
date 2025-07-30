
import { verifyOtpCode } from '../verify-otp-code';
import { saveAuthToCookie } from '../../utils/save-auth-to-cookie';

jest.mock('../../utils/save-auth-to-cookie');
global.fetch = jest.fn();

describe('verifyOtpCode', () => {
  const mockFetch = global.fetch as jest.Mock;
  const mockSaveAuthToCookie = saveAuthToCookie as jest.Mock;
  const originalApiUrl = process.env.API_URL;

  beforeEach(() => {
    process.env.API_URL = 'http://localhost:3030/';
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.API_URL = originalApiUrl;
  });

  it('should make a POST request with the correct body and save auth to cookie', async () => {
    const email = 'test@example.com';
    const code = '123456';
    const responseData = { message: 'success' };

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseData),
    });

    const result = await verifyOtpCode({ email, code });

    expect(mockFetch).toHaveBeenCalledWith(`${process.env.API_URL}auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }),
    });
    expect(mockSaveAuthToCookie).toHaveBeenCalledWith(responseData);
    expect(result).toEqual({ success: true, data: responseData, error: '' });
  });

  it('should return an error if the request is not ok', async () => {
    const email = 'test@example.com';
    const code = '123456';
    const errorResponse = { error: 'Invalid code' };

    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorResponse),
    });

    const result = await verifyOtpCode({ email, code });
    expect(result).toEqual({ success: false, data: null, error: 'Invalid code' });
  });

  it('should return an error if code or email are not provided', async () => {
    let result = await verifyOtpCode({ email: '', code: '123456' });
    expect(result).toEqual({ success: false, data: null, error: 'Code and email are required' });

    result = await verifyOtpCode({ email: 'test@example.com', code: '' });
    expect(result).toEqual({ success: false, data: null, error: 'Code and email are required' });
  });

  it('should return an error if API_URL is not set', async () => {
    delete process.env.API_URL;
    const result = await verifyOtpCode({ email: 'test@example.com', code: '123456' });
    expect(result).toEqual({ success: false, data: null, error: 'API url not set' });
  });
});
