import type React from "react"
import PromotionClient from "../Home/PromotionClient"


const guitars = [
  { color: "Blue", bgColor: "#baeff5", image: "/images/tom-delonge-stratocaster.png" },
  { color: "Black", bgColor: "#131313", image: "/images/player-ii-modified-stratocaster-hss-floyd-rose.png" },
  { color: "Pearl", bgColor: "#f2e6d7", image: "/images/player-ii-modified-stratocaster-hss.png" },
  { color: "Red", bgColor: "#710004", image: "/images/tash-sultana-stratocaster.png" },
]


const PromotionSection: React.FC = () => {
  return (
    <section id="promotion-section" className="w-full bg-neutral-920 py-16">
      <div className="container mx-auto px-4">
        
        <div className="hidden">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/5 bg-[#FD8DB7] p-8 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
                May Sale 20% Discount For All Electric Guitar
              </h2>
            </div>

            {guitars.map((guitar) => (
              <div
                key={guitar.color}
                className="w-full md:w-1/5 relative h-80 md:h-[400px]"
                style={{ backgroundColor: guitar.bgColor }}
              >
                
              </div>
            ))}
          </div>
        </div>

        
        <PromotionClient guitars={guitars} />
      </div>
    </section>
  )
}

export default PromotionSection
