"use client";

import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: redirect,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Wait for session to update, then check role
      setTimeout(async () => {
        const session = await getSession();
        if (session?.user?.role === "admin") {
          router.replace("/admin");
        } else if (result?.url) {
          router.replace(result.url);
        }
      }, 500);
    } catch (error) {
      setError("An unexpected error occurred");
      setIsLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-zinc-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-zinc-700/50">
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-900/30 border border-red-800/50 rounded-lg px-4 py-3 text-red-200 flex items-start">
                <svg
                  className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-zinc-300 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-zinc-900/50 border border-zinc-700 rounded-lg py-2.5 px-4 text-white placeholder-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-zinc-300 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full bg-zinc-900/50 border border-zinc-700 rounded-lg py-2.5 px-4 text-white placeholder-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-zinc-900 disabled:opacity-50 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-zinc-900 border-t border-zinc-700/50">
            <p className="text-xs text-zinc-500 font-medium mb-1">
              Demo Accounts:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <div className="text-xs bg-zinc-800/80 rounded p-2 border border-zinc-700">
                <span className="text-zinc-400">Regular User:</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-zinc-300">john@mail.com</span>
                  <span className="text-zinc-500">changeme</span>
                </div>
              </div>
              <div className="text-xs bg-zinc-800/80 rounded p-2 border border-zinc-700">
                <span className="text-zinc-400">Admin User:</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-zinc-300">admin@mail.com</span>
                  <span className="text-zinc-500">admin123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
