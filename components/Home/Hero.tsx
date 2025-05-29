"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Facebook, Instagram} from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"


const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex-1 relative mt-23">
      <div className="flex h-[calc(100vh)]">
        <div className="">
          <Image
            src="/images/BG-guitar.svg"
            alt="Fender Stratocaster Silhouette"
            fill
            className="object-cover -ml-15"
            priority
          />
        </div>
        <div className="w-1/2 bg-neutral-920"></div>
      </div>

      <motion.div
        className="absolute top-[10%] left-[40%] transform -translate-x-1/2 w-[60%] h-[70%] border-8 border-neutral-950 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 20,
          scale: isLoaded ? 1 : 0.95,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
      >
        <div className="absolute top-6 left-6 z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          ></motion.div>
        </div>
        <Image
          src="/images/john-mayer.webp"
          alt="Guitarist with pink Fender guitar"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-[20%] transform -translate-y-1/2 bg-neutral-950 text-white p-8 w-[350px] z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: isLoaded ? 0.9 : 0,
          x: isLoaded ? 0 : 50,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          delay: 0.5,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Bold New Exclusives</h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span className="mr-4">Shop Now</span>
          <motion.div
            animate={{
              y: isLoaded ? [0, 5, 0] : 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-10">
        {[
          { icon: <Facebook className="h-5 w-5 text-black" />, label: "Facebook" },
          { icon: <Instagram className="h-5 w-5 text-black" />, label: "Instagram" },
          {
            icon: (
              <div className="h-5 w-5 flex items-center justify-center">
                <span className="text-xl font-bold">ﾟ</span>
              </div>
            ),
            label: "Social",
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
          >
            <Link href="#" aria-label={item.label}>
              {item.icon}
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}


// Define Chat Bubble Component
const ChatBubble: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.div
      className="fixed bottom-6 right-6  p-3 rounded-full cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.8,
        y: isLoaded ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        delay: 1.2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 15,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
    </motion.div>
  )
}

// Define Home Component
const Home: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <HeroSection />
    <ChatBubble />
  </div>
)

export default Home
