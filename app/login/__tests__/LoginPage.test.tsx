import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../page";
import "@testing-library/jest-dom";
import { SignInOptions, SignInResponse } from "next-auth/react";


const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

const mockSignIn = jest.fn();
const mockGetSession = jest.fn();
jest.mock("next-auth/react", () => ({
  signIn: (provider?: string, options?: SignInOptions, authorizationParams?: Record<string, string>): Promise<SignInResponse | undefined> =>
    mockSignIn(provider, options, authorizationParams),
  getSession: () => mockGetSession(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows error message for invalid credentials", async () => {
    mockSignIn.mockResolvedValueOnce({ error: "Invalid email or password" });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });

  it("redirects to /admin for admin user after login", async () => {
    mockSignIn.mockResolvedValueOnce({ error: undefined });
    mockGetSession.mockResolvedValueOnce({ user: { role: "admin" } });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "admin@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "admin123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/admin");
    });
  });

  it("redirects to /dashboard for regular user after login", async () => {
    mockSignIn.mockResolvedValueOnce({ error: undefined });
    mockGetSession.mockResolvedValueOnce({ user: { role: "user" } });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows loading spinner while logging in", async () => {
    // signIn never resolves to simulate loading
    mockSignIn.mockImplementation(() => new Promise(() => {}));
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // The button should now have the accessible name "Signing in..." and be disabled
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });
});