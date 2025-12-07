import React from 'react'
import { Github, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: '1.5rem',
        textAlign: 'center',
        marginTop: 'auto',
        fontSize: '0.9rem',
        opacity: 0.8,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
        <a
          href="https://github.com/nilanshukumarsingh"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          style={{ color: 'white', transition: 'transform 0.2s' }}
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/nilanshukumarsingh/"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          style={{ color: 'white', transition: 'transform 0.2s' }}
        >
          <Linkedin size={20} />
        </a>
      </div>
      <p style={{ margin: 0 }}>
        Built by <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Nilanshu Kumar Singh</span>
      </p>
      <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>
        Powered by <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">NASA API</a>
      </p>
    </footer>
  )
}

export default Footer
