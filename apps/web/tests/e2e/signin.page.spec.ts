import { test, expect } from '@playwright/test'

test.describe('Dashboard Page', () => {
    const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000/'
    const API_URL = process.env.API_URL || 'http://localhost:3030/'
    const SEND_OTP_API = `${API_URL}auth-send-code`
    const VERIFY_OTP_API = `${API_URL}auth-verify-code`

    test.beforeEach(async ({ page }) => {
        await page.goto(`${PUBLIC_URL}/signin`)
    })

    test('displays signin form', async ({ page }) => {
        let resolveSendOtp: any = () => { }
        let resolveVerifyOtp: any = () => { }

        // 1. Mock the API response for sending OTP
        await page.route(SEND_OTP_API, async (route) => {
            await new Promise(resolve => { resolveSendOtp = resolve })
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, data: {}, error: null }),
            })
        })

        // 2. Mock the API response for verifying OTP
        await page.route(VERIFY_OTP_API, async (route) => {
            await new Promise(resolve => { resolveVerifyOtp = resolve })
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true, data: {
                        message: 'Authentication successful',
                        access_token: 'access_token_123',
                        refresh_token: 'refresh_token_123',
                        id_token: 'id_token_123',
                        token_type: 'Bearer',
                        expires_in: 3600,
                    }, error: null
                }),
            })
        })

        // Fill the email input
        const emailInput = await page.locator('#email')
        await expect(emailInput).toBeVisible()
        await emailInput.fill('test@example.com')

        // Click the "Sign in" button to send OTP
        const signInButton = await page.locator('#submit-signin')
        await expect(signInButton).toBeVisible()
        await expect(signInButton).toBeEnabled()
        await signInButton.click()

        // // Expect the button to show loading state
        await expect(signInButton).toBeDisabled()
        await expect(page.getByText('Signing in')).toBeVisible()

        await resolveSendOtp()

        // // Wait for the email sent toast message
        // const toastLinkSent = page.getByText('Link sent')
        // await expect(toastLinkSent).toBeVisible()

        // // Expect the OTP input fields to appear
        const otpInputGroup = page.getByLabel('Verify code')
        await expect(otpInputGroup).toBeVisible()

        // Fill the OTP code (assuming 6 digits)
        // You might need to target each slot specifically if `fill` on the group doesn't work for your InputOTP implementation
        const otpCodeInput = await page.locator('#code')
        await expect(otpCodeInput).toBeVisible()
        await otpCodeInput.fill('123456')

        // Expect the button to show loading state again
        // await expect(page.getByText('Verify')).toBeVisible()

        // Click the "Sign in" button again to verify OTP
        await signInButton.click()

        // Expect the button to show loading state again
        await expect(signInButton).toBeDisabled()
        await expect(page.getByText('Verifying')).toBeVisible()

        await resolveVerifyOtp()

        // // Wait for successful login toast message
        // const toastLoggedIn = await page.getByText('You are now logged in.')
        // await expect(toastLoggedIn).toBeVisible()


        // Expect redirection to the dashboard (based on the `redirect` search param in `beforeEach`)
        await expect(page).toHaveURL(`${PUBLIC_URL}dashboard`)
    })
})
