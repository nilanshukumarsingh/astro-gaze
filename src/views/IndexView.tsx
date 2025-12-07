import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { nasaApi, ApodResponse } from '../services'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shuffle, Calendar, Download, ExternalLink } from 'lucide-react'
import MiniGallery from '../components/MiniGallery'
import './IndexView.css'

const IndexView: React.FC = () => {
  const { year, month, day } = useParams<{ year: string; month: string; day: string }>()
  const navigate = useNavigate()

  const [date, setDate] = useState<Date>(() => {
    if (year && month && day) {
      const d = new Date()
      d.setFullYear(parseInt(year))
      d.setMonth(parseInt(month) - 1)
      d.setDate(parseInt(day))
      return d
    }
    return new Date()
  })
  const [response, setResponse] = useState<ApodResponse>(new ApodResponse())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (year && month && day) {
      const newDate = new Date()
      newDate.setFullYear(parseInt(year))
      newDate.setMonth(parseInt(month) - 1)
      newDate.setDate(parseInt(day))
      
      if (newDate.getTime() !== date.getTime()) {
        setDate(newDate)
      }
    }
  }, [year, month, day])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await nasaApi.getApod(date)
        setResponse(res)
        document.title = res.title
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [date])

  const addDays = (d: Date, count: number) => {
    const newDate = new Date(d)
    newDate.setDate(newDate.getDate() + count)
    return newDate
  }

  const pathFromDate = (d: Date) => {
    if (d < new Date('1995-06-16') || d > new Date()) return null
    return `/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    if (!isNaN(newDate.getTime())) {
      const path = pathFromDate(newDate)
      if (path) navigate(path)
    }
  }

  const navigateToDate = (d: Date) => {
    const path = pathFromDate(d)
    if (path) navigate(path)
  }

  const navigateRandom = () => navigate('/random')

  return (
    <div className="apod-view">
      <AnimatePresence mode="wait">
        <motion.div
          key={date.toISOString().split('T')[0]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass-panel content-card"
        >
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <div className="left-column">
                <div className="media-container">
                  {response.media_type === 'video' ? (
                    <iframe
                      className="media-item"
                      src={response.url}
                      title="APOD Video"
                      allowFullScreen
                    />
                  ) : (
                    <a href={response.hdurl || response.url} target="_blank" rel="noreferrer" className="image-link">
                      <img 
                        className="media-item" 
                        src={response.url} 
                        alt={response.title} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/fallback.png';
                          target.onerror = null; // Prevent infinite loop
                        }}
                      />
                      <div className="overlay">
                        <ExternalLink size={24} />
                        <span>View HD</span>
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="image-actions">
                  <div className="meta-row">
                    <div className="meta-item">
                      <span className="meta-label">Date</span>
                      <span className="meta-value">{new Date(response.date).toLocaleDateString()}</span>
                    </div>
                    {response.copyright && (
                      <div className="meta-item">
                        <span className="meta-label">Copyright</span>
                        <span className="meta-value">{response.copyright}</span>
                      </div>
                    )}
                  </div>

                  <div className="action-buttons">
                    {response.hdurl && (
                      <a href={response.hdurl} download className="action-btn primary">
                        <Download size={18} />
                        Download HD
                      </a>
                    )}
                    <a href={response.url} target="_blank" rel="noreferrer" className="action-btn secondary">
                      <ExternalLink size={18} />
                      View Original
                    </a>
                  </div>
                </div>
              </div>

              <div className="info-container">
                <h2 className="title">{response.title}</h2>
                <p className="explanation">{response.explanation}</p>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <MiniGallery currentDate={date} onDateSelect={navigateToDate} />

      <motion.div 
        className="glass-panel controls-bar"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button onClick={() => navigateToDate(addDays(date, -1))} title="Previous Day">
          <ChevronLeft />
        </button>
        
        <button onClick={navigateRandom} title="Random Date">
          <Shuffle />
        </button>

        <div className="date-picker-wrapper">
          <Calendar size={20} />
          <input
            type="date"
            min="1995-06-16"
            max={new Date().toISOString().slice(0, 10)}
            value={date.toISOString().slice(0, 10)}
            onChange={handleDateChange}
          />
        </div>

        <button onClick={() => navigate('/')} title="Today">
          Today
        </button>

        <button 
          onClick={() => navigateToDate(addDays(date, 1))} 
          disabled={!pathFromDate(addDays(date, 1))}
          title="Next Day"
        >
          <ChevronRight />
        </button>
      </motion.div>
    </div>
  )
}

export default IndexView
