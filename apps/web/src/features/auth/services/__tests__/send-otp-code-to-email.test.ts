
import { sendOtpCodeToEmail } from '../send-otp-code-to-email';

global.fetch = jest.fn();

describe('sendOtpCodeToEmail', () => {
  const mockFetch = global.fetch as jest.Mock;
  const originalApiUrl = process.env.API_URL;

  beforeEach(() => {
    process.env.API_URL = 'http://localhost:3030/';
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.API_URL = originalApiUrl;
  });

  it('should make a POST request with the correct body', async () => {
    const email = 'test@example.com';

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const result = await sendOtpCodeToEmail(email);

    expect(mockFetch).toHaveBeenCalledWith(`${process.env.API_URL}auth/send-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    expect(result).toEqual({ success: true, data: '', error: '' });
  });

  it('should return an error if the request is not ok', async () => {
    const email = 'test@example.com';
    const errorResponse = { error: 'Invalid email' };

    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorResponse),
    });

    const result = await sendOtpCodeToEmail(email);
    expect(result).toEqual({ success: false, data: '', error: 'Invalid email' });
  });

  it('should return an error if email is not provided', async () => {
    const result = await sendOtpCodeToEmail('');
    expect(result).toEqual({ success: false, data: '', error: 'Email is required' });
  });

  it('should return an error if API_URL is not set', async () => {
    delete process.env.API_URL;
    const result = await sendOtpCodeToEmail('test@example.com');
    expect(result).toEqual({ success: false, data: '', error: 'API url not set' });
  });
});
