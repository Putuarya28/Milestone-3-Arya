"use client";
import { usePathname } from "next/navigation";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

export default function ClientNavWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;
  return <ResponsiveNav />;
}