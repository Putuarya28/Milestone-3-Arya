import type { Metadata } from "next";
import "@/app/globals.css";
import Provider from "@/components/Hoc/Provider";
import { CartProvider } from "@/components/CartContext";
import AuthProvider from "@/components/AuthProvider";
import ClientNavWrapper from "@/components/ClientNavWrapper";

export const metadata: Metadata = {
  title: "Revoshop - Guitar Collection",
  description: "Premium guitar shop using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Provider>
            <CartProvider>
              <ClientNavWrapper />
              {children}
            </CartProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}