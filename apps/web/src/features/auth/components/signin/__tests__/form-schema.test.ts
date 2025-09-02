
import { signinSchema } from '../form-schema'

describe('signinSchema', () => {
    // Test case for valid data when email has not been sent
    it('should validate when email is valid and emailSent is false', () => {
        const data = { email: 'test@example.com', emailSent: false }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(true)
    })

    // Test case for invalid email format
    it('should fail validation for an invalid email format', () => {
        const data = { email: 'invalid-email', emailSent: false }
        const result = signinSchema.safeParse(data)
        const issue = result?.error?.issues?.[0]
        expect(issue).toBeTruthy()
        if (!issue) return
        expect(result.success).toBe(false)
        expect(issue.message).toBe('Invalid email address format.')
    })

    // Test case for when email is required
    it('should fail validation when email is empty', () => {
        const data = { email: '', emailSent: false }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(false)
        const issue = result?.error?.issues?.[0]
        expect(issue).toBeTruthy()
        if (!issue) return
        expect(issue.message).toBe('Required.')
    })

    // Test case for when email exceeds max length
    it('should fail validation when email exceeds 255 characters', () => {
        const longEmail = 'a'.repeat(256) + '@example.com'
        const data = { email: longEmail, emailSent: false }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(false)
        const issue = result?.error?.issues?.[0]
        expect(issue).toBeTruthy()
        if (!issue) return
        expect(issue.message).toBe('Cannot exceed 255 characters.')
    })

    // Test case for when emailSent is true but code is missing
    it('should fail validation if emailSent is true and code is missing', () => {
        const data = { email: 'test@example.com', emailSent: true }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(false)
        const issue = result?.error?.issues?.[0]
        expect(issue).toBeTruthy()
        if (!issue) return
        expect(issue.message).toBe('Code must be exactly 6 digits which was sent to your email')
    })

    // Test case for when emailSent is true and code is not 6 digits
    it('should fail validation if emailSent is true and code is not 6 digits', () => {
        const data = { email: 'test@example.com', code: '12345', emailSent: true }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(false)
        const issue = result?.error?.issues?.[0]
        expect(issue).toBeTruthy()
        if (!issue) return
        expect(issue.message).toBe('Code must be exactly 6 digits which was sent to your email')
    })

    // Test case for when emailSent is true and code contains non-digit characters
    it('should fail validation if emailSent is true and code contains non-digit characters', () => {
        const data = { email: 'test@example.com', code: '12345a', emailSent: true }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(false)
        const issue = result?.error?.issues?.[0]
        expect(issue).toBeTruthy()
        if (!issue) return
        expect(issue.message).toBe('Code must be exactly 6 digits which was sent to your email')
    })

    // Test case for when emailSent is true and code is valid (6 digits)
    it('should pass validation if emailSent is true and code is a 6-digit string', () => {
        const data = { email: 'test@example.com', code: '123456', emailSent: true }
        const result = signinSchema.safeParse(data)
        expect(result.success).toBe(true)
    })
})
