"use client"

import { useTheme } from "next-themes"
import type React from "react"
import { useEffect, useState } from "react"
import { BiMoon, BiSun } from "react-icons/bi"

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <button onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")} className="p-2 transition">
      {currentTheme === "dark" ? (
        <BiSun className="text-white hover:text-[#FD8DB7] w-8 h-8 cursor-pointer" />
      ) : (
        <BiMoon className="text-white hover:text-[#FD8DB7] w-8 h-8 cursor-pointer" />
      )}
    </button>
  )
}

export default ThemeToggle
