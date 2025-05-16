import React from 'react'
import Hero from './Hero'
import PromotionSection from '../Home/Promotion'

const Home = () => {
  return (
    <div className='h-[2000px] overflow-hidden'>
      <Hero />
      <PromotionSection />
    </div>
    
  )
}

export default Home