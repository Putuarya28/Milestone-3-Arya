import type { Metadata } from "next";
// import { Questrial } from "next/font/google";
import "@/app/globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Provider from "@/components/Hoc/Provider";
import { CartProvider } from "@/components/CartContext";

// const questrial = Questrial({ subsets: ["latin"], weight: ["400"], variable: "--font-questrial" });

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
        <CartProvider>
          <Provider>
            <ResponsiveNav />
            {children}
          </Provider>
        </CartProvider>
      </body>
    </html>
  );
}