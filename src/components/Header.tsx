import React from 'react'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        padding: '1.5rem',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        zIndex: 10,
      }}
    >
      <Rocket size={32} color="var(--accent-color)" />
      <h1
        style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 300,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #fff, var(--accent-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Astronomy Picture of the Day
      </h1>
    </motion.header>
  )
}

export default Header
