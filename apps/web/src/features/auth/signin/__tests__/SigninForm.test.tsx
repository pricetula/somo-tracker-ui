// SigninForm.test.tsx
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SigninForm } from '../SigninForm'; // Adjust path if necessary
import '@testing-library/jest-dom'; // For extended matchers

// -----------------------------------------------------------------------------
// MOCKING DEPENDENCIES
// -----------------------------------------------------------------------------

// Mock the next/navigation module
// Jest will automatically pick up the mock from __mocks__/next/navigation.js
jest.mock('next/navigation');

// Mock the custom useToast hook
// Jest will automatically pick up the mock from __mocks__/@/shared/hooks/use-toast.js
jest.mock('@/shared/hooks/use-toast');

// Mock `lucide-react`'s Loader2Icon since it's an SVG component and might cause issues
// if not handled properly in JSDOM or if it's not crucial to test its rendering logic.
// We'll just return a simple div.
jest.mock('lucide-react', () => ({
    Loader2Icon: () => <div data-testid="loader-icon" />,
}));

// Mock the shared UI components that are often simple wrappers or might have
// internal dependencies that are not needed for this component's logic testing.
// This is a common practice to isolate the component under test.
jest.mock('@/shared/components/ui/form', () => ({
    Form: ({ children, ...props }) => <div>{children}</div>,
    FormControl: ({ children }) => <div>{children}</div>,
    // UPDATED: FormField mock to correctly pass 'id' from 'name' prop
    FormField: ({ render, name }) => {
        const fieldProps = {
            name: name,
            id: name, // This is crucial for linking the label and input
            value: '', // Provide a default value for controlled inputs
            onChange: jest.fn(),
            onBlur: jest.fn(),
            ref: jest.fn(), // Mock the ref as it's often passed
        };
        return render({ field: fieldProps });
    },
    FormItem: ({ children }) => <div>{children}</div>,
    FormLabel: ({ children, ...rest }) => <label {...rest}>{children}</label>,
    FormMessage: () => <div />,
}));

jest.mock('@/shared/components/ui/input', () => ({
    Input: (props) => <input {...props} />,
}));

jest.mock('@/shared/components/ui/input-otp', () => ({
    InputOTP: ({ children, ...props }) => <div {...props}>{children}</div>,
    InputOTPGroup: ({ children }) => <div>{children}</div>,
    InputOTPSlot: (props) => <input data-testid={`otp-slot-${props.index}`} {...props} />,
}));

jest.mock('@/shared/components/ui/button', () => ({
    Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

// Mock the form-schema
// We'll use the original signinSchema, but ensure any other types are mocked if needed.
// IMPORTANT: Changed './form-schema' to '../form-schema' to correctly resolve the path from the test file.
jest.mock('../form-schema', () => ({
    signinSchema: {
        // Mock a simplified schema for testing purposes if the original is too complex
        // For this component, the original Zod schema imported should work fine if Zod is installed.
        // If issues arise, a simplified mock might be needed.
        // For now, let's assume the original `signinSchema` import works with `zodResolver`.
    },
    // Ensure `type SigninSchema` is also available if it's used directly in the test file
    // For this example, we don't directly use SigninSchema in the test.
}));


// -----------------------------------------------------------------------------
// TEST SUITE
// -----------------------------------------------------------------------------

describe('SigninForm', () => {
    // Mock implementations for the props
    const mockSendOtpCodeToEmail = jest.fn();
    const mockVerifyOtpCode = jest.fn();

    // Import the mocked useRouter and useSearchParams from next/navigation
    // so we can access their mock implementations for assertions
    const { useRouter, useSearchParams } = require('next/navigation');
    const { useToast } = require('@/shared/hooks/use-toast');

    beforeEach(() => {
        // Reset mocks before each test to ensure isolation
        mockSendOtpCodeToEmail.mockClear();
        mockVerifyOtpCode.mockClear();
        useRouter().push.mockClear();
        useSearchParams().get.mockClear();
        useToast().toast.mockClear();

        // Reset default mock return values for hooks if needed
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            route: '/',
            pathname: '/',
            query: {},
            asPath: '/',
        }));
        useSearchParams.mockImplementation(() => ({
            get: jest.fn((param) => {
                if (param === 'redirect') {
                    return '/dashboard'; // Default for tests
                }
                return null;
            }),
        }));
        useToast.mockImplementation(() => ({
            toast: jest.fn(),
        }));
    });

    it('renders the email input and sign in button initially', () => {
        render(
            <SigninForm
                sendOtpCodeToEmail={mockSendOtpCodeToEmail}
                verifyOtpCode={mockVerifyOtpCode}
            />
        );

        // Check if the email input is present
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email for otp sign-in/i)).toBeInTheDocument();

        // Check if the sign in button is present and not disabled
        const signInButton = screen.getByRole('button', { name: /sign in/i });
        expect(signInButton).toBeInTheDocument();
        expect(signInButton).not.toBeDisabled();

        // Check that the OTP input is NOT initially rendered
        expect(screen.queryByLabelText(/verify code/i)).not.toBeInTheDocument();
    });
});
