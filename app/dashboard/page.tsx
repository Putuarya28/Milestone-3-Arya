"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiHeart, FiGift, FiTruck, FiCheckCircle, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const sections = [
  { key: "account", label: "Account", icon: <FiUser size={20} /> },
  { key: "wishlist", label: "Wishlist", icon: <FiHeart size={20} /> },
  { key: "voucher", label: "Voucher", icon: <FiGift size={20} /> },
  { key: "delivery", label: "Delivery Process", icon: <FiTruck size={20} /> },
  { key: "delivered", label: "Delivered", icon: <FiCheckCircle size={20} /> },
];

export default function DashboardPage() {
  const { status, data } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-zinc-950">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-10 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-xl text-gray-900 dark:text-zinc-100 font-medium mb-1">
            Authenticating
          </h3>
          <p className="text-gray-600 dark:text-zinc-400">Verifying your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-black">
      {/* Sidebar */}
      <aside
        className={`relative z-100 h-screen bg-zinc-900 flex flex-col py-8 px-4 transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        {/* Toggle Button */}
        <button
          className="absolute top-4 bg-blue-600 text-white rounded-full p-1 shadow-lg z-10 transition"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>

        <nav className="flex flex-col gap-2 flex-1 mt-12">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center gap-2 text-left py-2 rounded-lg font-medium transition
                ${
                  sidebarOpen && activeSection === section.key
                    ? "bg-blue-600 text-white"
                    : "text-zinc-200 hover:bg-zinc-800"
                }
              `}
            >
              
              <span
                className={`flex items-center justify-center rounded-full transition-all duration-300
                  w-8 h-8
                  ${
                    !sidebarOpen && activeSection === section.key
                      ? "bg-blue-600 text-white"
                      : "bg-transparent"
                  }
                `}
              >
                {section.icon}
              </span>
              
              <span
                className={`transition-all duration-300 ${
                  sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={`mt-10 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition
            ${sidebarOpen ? "" : "text-xs py-1"}
          `}
        >
          {sidebarOpen ? "Sign Out" : <FiX size={18} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-zinc-100 capitalize">
            {sections.find((s) => s.key === activeSection)?.label}
          </h2>
          {activeSection === "account" ? (
            <>
              <div className="mb-3">
                <span className="text-gray-600 dark:text-zinc-400">Name: </span>
                <span className="font-mono text-gray-800 dark:text-zinc-100">
                  {data?.user?.name || "Unknown"}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 dark:text-zinc-400">Email: </span>
                <span className="font-mono text-gray-800 dark:text-zinc-100">
                  {data?.user?.email || "Unknown"}
                </span>
              </div>
            </>
          ) : (
            <p className="text-gray-600 dark:text-zinc-400 text-lg text-center">
              This feature is under maintenance.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}