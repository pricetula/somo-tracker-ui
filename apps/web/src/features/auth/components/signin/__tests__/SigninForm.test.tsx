/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SigninForm } from "../SigninForm"
import "@testing-library/jest-dom"
import { toast } from "sonner"

// Mock ResizeObserver
const ResizeObserverMock = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
global.ResizeObserver = ResizeObserverMock


// Mock dependencies
jest.mock("sonner", () => ({
    toast: Object.assign(jest.fn(), {
        error: jest.fn(),
    }),
}))

const mockPush = jest.fn()
const mockGet = jest.fn()

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    useSearchParams: () => ({
        get: mockGet,
    }),
}))

const mockSendOtpCodeToEmail = jest.fn()
const mockVerifyOtpCode = jest.fn()

describe("SigninForm", () => {
    beforeAll(() => {
        Object.defineProperty(document, "elementFromPoint", {
            // Make sure it"s configurable so we can redefine it if needed,
            // and writable so Jest can track calls if we use jest.fn() later.
            configurable: true,
            value: jest.fn(() => null), // Use jest.fn() if you want to track calls
        })
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should render the initial form with email input and submit button", () => {
        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
        expect(screen.queryByLabelText(/verify code/i)).not.toBeInTheDocument()
    })

    it("should show an error message if email is invalid", async () => {
        const user = userEvent.setup()
        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        await user.type(screen.getByLabelText(/email/i), "invalid-email")
        await user.click(screen.getByRole("button", { name: /sign in/i }))

        expect(await screen.findByText("Invalid email address format.")).toBeInTheDocument()
    })

    it("should call sendOtpCodeToEmail on valid email submission", async () => {
        const user = userEvent.setup()
        mockSendOtpCodeToEmail.mockResolvedValue({ success: true, data: {}, error: "" })
        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        await user.type(screen.getByLabelText(/email/i), "test@example.com")
        await user.click(screen.getByRole("button", { name: /sign in/i }))

        await waitFor(() => {
            expect(mockSendOtpCodeToEmail).toHaveBeenCalledWith("test@example.com")
            expect(toast).toHaveBeenCalledWith("Check your email to sign-in.")
        })

        expect(await screen.findByLabelText(/verify code/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument()
    })

    it("should show an error toast if sendOtpCodeToEmail fails", async () => {
        const user = userEvent.setup()
        mockSendOtpCodeToEmail.mockResolvedValue({ success: false, data: null, error: "Failed to send email" })
        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        await user.type(screen.getByLabelText(/email/i), "test@example.com")
        await user.click(screen.getByRole("button", { name: /sign in/i }))

        await waitFor(() => {
            expect(mockSendOtpCodeToEmail).toHaveBeenCalledWith("test@example.com")
            expect(toast.error).toHaveBeenCalledWith("Failed to send email")
        })
    })

    it("should call verifyOtpCode on code submission", async () => {
        const user = userEvent.setup()
        mockSendOtpCodeToEmail.mockResolvedValue({ success: true, data: {}, error: "" })
        mockVerifyOtpCode.mockResolvedValue({ success: true, data: {}, error: "" })

        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        await user.type(screen.getByLabelText(/email/i), "test@example.com")
        await user.click(screen.getByRole("button", { name: /sign in/i }))

        await screen.findByLabelText(/verify code/i)

        await user.type(screen.getByLabelText(/verify code/i), "123456")
        await user.click(screen.getByRole("button", { name: /verify/i }))

        await waitFor(() => {
            expect(mockVerifyOtpCode).toHaveBeenCalledWith({ code: "123456", email: "test@example.com" })
            expect(toast).toHaveBeenCalledWith("You are now logged in.")
            expect(mockPush).toHaveBeenCalledWith("/")
        })
    })

    it("should show an error toast if verifyOtpCode fails", async () => {
        const user = userEvent.setup()
        mockSendOtpCodeToEmail.mockResolvedValue({ success: true, data: {}, error: "" })
        mockVerifyOtpCode.mockResolvedValue({ success: false, data: null, error: "Invalid code" })

        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        await user.type(screen.getByLabelText(/email/i), "test@example.com")
        await user.click(screen.getByRole("button", { name: /sign in/i }))

        await screen.findByLabelText(/verify code/i)

        await user.type(screen.getByLabelText(/verify code/i), "111111")
        await user.click(screen.getByRole("button", { name: /verify/i }))

        await waitFor(() => {
            expect(mockVerifyOtpCode).toHaveBeenCalledWith({ code: "111111", email: "test@example.com" })
            expect(toast.error).toHaveBeenCalledWith("Invalid code")
        })
    })

    it("should redirect to the given redirect URL on successful login", async () => {
        const user = userEvent.setup()
        mockSendOtpCodeToEmail.mockResolvedValue({ success: true, data: {}, error: "" })
        mockVerifyOtpCode.mockResolvedValue({ success: true, data: {}, error: "" })
        mockGet.mockReturnValue("/dashboard")

        render(<SigninForm sendOtpCodeToEmail={mockSendOtpCodeToEmail} verifyOtpCode={mockVerifyOtpCode} />)

        await user.type(screen.getByLabelText(/email/i), "test@example.com")
        await user.click(screen.getByRole("button", { name: /sign in/i }))

        await screen.findByLabelText(/verify code/i)

        await user.type(screen.getByLabelText(/verify code/i), "123456")
        await user.click(screen.getByRole("button", { name: /verify/i }))

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/dashboard")
        })
    })
})