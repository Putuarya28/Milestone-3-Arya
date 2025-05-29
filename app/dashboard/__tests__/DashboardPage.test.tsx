import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import DashboardPage from "../page";
import { signOut } from "next-auth/react";
import "@testing-library/jest-dom";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


jest.mock("next-auth/react", () => {
  const actual = jest.requireActual("next-auth/react");
  return {
    ...actual,
    useSession: () => ({
      status: "authenticated",
      data: {
        user: { name: "Test User", email: "test@example.com" },
      },
    }),
    signOut: jest.fn(),
    // @ts-expect-error: Custom SessionProvider mock for testing, type mismatch is expected
    SessionProvider: ({ children }) => children,
  };
});

describe("DashboardPage", () => {
  it("renders account details when 'Account' is active", () => {
    render(<DashboardPage />);
    expect(screen.getByRole("heading", { name: /Account/i })).toBeInTheDocument();
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("shows maintenance message for other sections", () => {
    render(<DashboardPage />);
    fireEvent.click(screen.getByText(/Wishlist/i));
    expect(screen.getByText(/This feature is under maintenance/i)).toBeInTheDocument();
  });

  it("toggles sidebar open/close", () => {
    render(<DashboardPage />);
    // Find the sidebar button for "Account"
    const accountButton = screen.getByRole("button", { name: /Account/i });
    const label = within(accountButton).getByText(/Account/i);

    // The label (span) should be visible initially
    expect(label).toHaveClass("opacity-100");
    expect(label).not.toHaveClass("opacity-0");

    // Close sidebar
    fireEvent.click(screen.getByLabelText(/Close sidebar/i));
    // The label should now have opacity-0 and w-0 classes
    expect(label).toHaveClass("opacity-0");
    expect(label).toHaveClass("w-0");

    // Open sidebar again
    fireEvent.click(screen.getByLabelText(/Open sidebar/i));
    expect(label).toHaveClass("opacity-100");
    expect(label).not.toHaveClass("opacity-0");
  });

  it("calls signOut when sign out button is clicked", () => {
    render(<DashboardPage />);
    const signOutBtn = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutBtn);
    expect(signOut).toHaveBeenCalled();
  });
});