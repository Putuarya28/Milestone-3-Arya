"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    SessionRequired: "You need to be signed in to access this page.",
    AccessDenied: "You do not have permission to access this resource.",
    Verification: "The verification link was invalid or has expired.",
    OAuthSignin: "There was a problem with the OAuth sign-in process.",
    OAuthCallback: "There was a problem with the OAuth callback.",
    OAuthCreateAccount: "There was a problem creating your account.",
    EmailCreateAccount: "There was a problem creating your account.",
    Callback: "There was a problem with the authentication callback.",
    OAuthAccountNotLinked:
      "This email is already associated with another account.",
    EmailSignin: "There was a problem sending the email with sign-in link.",
    Configuration: "There is a problem with the server configuration.",
    Default: "An unexpected authentication error occurred. Please try again.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  // Get appropriate icon and title based on error type
  const getErrorSeverity = () => {
    // Critical errors
    if (
      [
        "Configuration",
        "OAuthSignin",
        "OAuthCallback",
        "OAuthCreateAccount",
        "EmailCreateAccount",
      ].includes(error || "")
    ) {
      return {
        title: "System Error",
        icon: (
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        ),
      };
    }

    // Authentication errors (credentials wrong, etc)
    if (
      ["CredentialsSignin", "OAuthAccountNotLinked", "EmailSignin"].includes(
        error || ""
      )
    ) {
      return {
        title: "Authentication Error",
        icon: (
          <svg
            className="mx-auto h-12 w-12 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        ),
      };
    }

    // Access errors (permission, session required)
    return {
      title: "Access Error",
      icon: (
        <svg
          className="mx-auto h-12 w-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    };
  };

  const { title, icon } = getErrorSeverity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-xl w-96 border border-zinc-700">
        <div className="text-center mb-6">
          {icon}
          <h1 className="mt-3 text-xl font-semibold text-white">{title}</h1>
        </div>

        <div className="bg-red-900/30 border-l-4 border-red-700 p-4 mb-6">
          <p className="text-sm text-red-300">{errorMessage}</p>
          <p className="text-xs text-red-400 mt-1 opacity-80">
            {error && `Error code: ${error}`}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Return to Login
          </Link>
          <Link
            href="/"
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-bold py-2 px-4 rounded text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
