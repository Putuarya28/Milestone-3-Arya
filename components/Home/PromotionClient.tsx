"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

type Guitar = {
  color: string
  bgColor: string
  image: string
}

type PromotionClientProps = {
  guitars: Guitar[]
}

const PromotionClient: React.FC<PromotionClientProps> = ({ guitars }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const element = document.getElementById("promotion-section")
      if (element) {
        const elementPosition = element.offsetTop
        if (scrollPosition > elementPosition) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    setTimeout(() => handleScroll(), 100)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="promotion-section"
      className="w-full flex justify-center items-center py-10 px-2 md:px-0"
    >
      <motion.div
        className="flex flex-row w-full max-w-6xl h-[400px] md:h-[500px] bg-black rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Text Section with gradient */}
        <motion.div
          className="flex flex-col justify-center items-start w-1/3 h-full px-10"
          style={{
            background: "linear-gradient(135deg, #fceabb 0%, #f8b7d8 100%)"
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6 text-left drop-shadow">
            MAY SALE <br /> 20% Discount <br /> For All Electric Guitar
          </h2>
          <Link
            href="/Electric"
            className="mt-4 inline-block bg-black text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-neutral-800 transition-colors duration-200 text-lg"
          >
            Shop Electric Guitars
          </Link>
        </motion.div>

        {/* Guitar Images, flush with no gaps */}
        <div className="flex-1 flex flex-row h-full">
          {guitars.map((guitar, index) => (
            <motion.div
              key={guitar.color}
              className="flex-1 flex items-center justify-center h-full"
              style={{ backgroundColor: guitar.bgColor }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: isVisible ? 0 : 50, opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={guitar.image || "/placeholder.svg"}
                  alt={`${guitar.color} Fender guitar`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default PromotionClient
