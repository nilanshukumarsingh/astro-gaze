import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundView: React.FC = () => {
  return (
    <div className="centered" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <div className="separated" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <span>
          <Link to="/random">Pick a Date</Link>
        </span>
        <span>
          <Link to="/">Todays APOD</Link>
        </span>
      </div>
    </div>
  )
}

export default NotFoundView
