"use client"
import ThemeToggle from "@/components/helper/ThemeToggle"
import { navLinks } from "@/constant/constant"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaShoppingBag } from "react-icons/fa"
import { HiBars3BottomRight } from "react-icons/hi2"
import { useCart } from "@/components/CartContext";
import CartSidebar from "@/components/CartSidebar";

type Props = {
  openNav: () => void
}

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false)
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true)
      else setNavBg(false)
    }

    window.addEventListener("scroll", handler)

    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      <div
        className={`transition-all ${navBg ? "bg-neutral-900 shadow-md" : "fixed"} duration-600 h-[12vh] z-[100] fixed w-full bg-black`}
      >
        <div className="flex items-center h-full justify-between sm:w-[80%] w-[90%] mx-auto">
          {/* LOGO */}
          <Link href="/" className="text-white font-bold text-2x1 sm:text-3xl">
            RevoShop
          </Link>

          {/* NavLinks */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              return (
                <Link
                  href={link.url}
                  key={link.id}
                  className="text-white hover:text-[#FD8DB7] font-semibold transition-all duration-200"
                >
                  <p>{link.label}</p>
                </Link>
              )
            })}
          </div>

          {/* CART */}
          <div className="flex items-center space-x-4">
            <button className="relative" onClick={() => setCartOpen(true)}>
              <FaShoppingBag className="cursor-pointer text-white hover:text-[#FD8DB7] text-3xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* SWITCH THEME */}
            <ThemeToggle />

            {/* HAMBURGER */}
            <HiBars3BottomRight
              onClick={openNav}
              className="hover:text-[#FD8DB7] w-8 h-8 cursor-pointer text-white lg:hidden"
            />
          </div>
        </div>
      </div>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

export default Nav
