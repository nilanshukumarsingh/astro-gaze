import React, { useEffect, useState } from 'react'
import { nasaApi, ApodResponse } from '../services'
import { motion } from 'framer-motion'
import './MiniGallery.css'

interface MiniGalleryProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
}

const MiniGallery: React.FC<MiniGalleryProps> = ({ currentDate, onDateSelect }) => {
  const [images, setImages] = useState<ApodResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      const promises = []
      for (let i = 1; i <= 5; i++) {
        const d = new Date(currentDate)
        d.setDate(d.getDate() - i)
        // Skip if date is before APOD start date
        if (d >= new Date('1995-06-16')) {
            promises.push(nasaApi.getApod(d))
        }
      }

      try {
        const results = await Promise.all(promises)
        setImages(results)
      } catch (error) {
        console.error('Failed to fetch gallery images', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [currentDate])

  if (loading || images.length === 0) return null

  return (
    <div className="mini-gallery">
      <h3 className="gallery-title">Previous Days</h3>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <motion.div
            key={img.date}
            className="gallery-item glass-panel"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateSelect(new Date(img.date))}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {img.media_type === 'video' ? (
              <div className="video-thumbnail">Video</div>
            ) : (
              <img src={img.url} alt={img.title} loading="lazy" />
            )}
            <div className="gallery-tooltip">{img.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MiniGallery
