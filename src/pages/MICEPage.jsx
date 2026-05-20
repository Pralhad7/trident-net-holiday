import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { miceServices, contact } from '../data/destinations'

const miceVideos = [
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80',
]

export default function MICEPage() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [stats, setStats] = useState({ conferences: 0, attendees: 0, countries: 0, satisfaction: 0 })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % miceVideos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const targets = { conferences: 500, attendees: 25000, countries: 30, satisfaction: 98 }
    const duration = 2000
    const step = 16
    const increments = {}
    for (const key in targets) {
      increments[key] = targets[key] / (duration / step)
    }
    let current = { conferences: 0, attendees: 0, countries: 0, satisfaction: 0 }
    const interval = setInterval(() => {
      let done = true
      const next = {}
      for (const key in targets) {
        next[key] = Math.min(current[key] + increments[key], targets[key])
        if (next[key] < targets[key]) done = false
      }
      setStats(next)
      current = next
      if (done) clearInterval(interval)
    }, step)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page-shell">
      <div className="mice-page">
        <div
          className="mice-hero"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80)` }}
        >
          <div className="mice-hero-overlay">
            <Link to="/" className="dest-back-btn">
              <i className="fa-solid fa-arrow-left"></i> Back
            </Link>
            <div className="mice-hero-content">
              <span className="mice-badge">MICE Services</span>
              <h1>Meetings, Incentives,<br />Conferences & Exhibitions</h1>
              <p>Empower your business with world-class corporate travel solutions</p>
              <a className="primary-button" href={`mailto:${contact.email}?subject=MICE%20Enquiry`}>
                <i className="fa-solid fa-envelope"></i> Plan Your Event
              </a>
            </div>
          </div>
        </div>

        <div className="mice-stats-bar">
          <div className="mice-stat">
            <span className="mice-stat-number">{Math.floor(stats.conferences)}+</span>
            <span className="mice-stat-label">Events Executed</span>
          </div>
          <div className="mice-stat">
            <span className="mice-stat-number">{Math.floor(stats.attendees)}+</span>
            <span className="mice-stat-label">Happy Attendees</span>
          </div>
          <div className="mice-stat">
            <span className="mice-stat-number">{Math.floor(stats.countries)}+</span>
            <span className="mice-stat-label">Countries</span>
          </div>
          <div className="mice-stat">
            <span className="mice-stat-number">{Math.floor(stats.satisfaction)}%</span>
            <span className="mice-stat-label">Satisfaction</span>
          </div>
        </div>

        <div className="mice-showcase">
          <div className="mice-showcase-text fade-in">
            <h2>Corporate Excellence<br /><span className="gradient-text">Redefined</span></h2>
            <p>From intimate board meetings to large-scale international conferences, Trident Net Holidays delivers flawless MICE experiences tailored to your business objectives.</p>
          </div>
          <div className="mice-showcase-visual">
            {miceVideos.map((v, i) => (
              <div
                key={i}
                className={`mice-video-slide ${i === activeVideo ? 'active' : ''}`}
                style={{ backgroundImage: `url(${v})` }}
              />
            ))}
            <div className="mice-video-controls">
              {miceVideos.map((_, i) => (
                <button key={i} className={`mice-video-dot ${i === activeVideo ? 'active' : ''}`} onClick={() => setActiveVideo(i)} />
              ))}
            </div>
          </div>
        </div>

        <div className="mice-services-grid">
          <div className="mice-services-title fade-in">
            <h2>Our <span className="gradient-text">Services</span></h2>
            <p>Comprehensive MICE solutions designed for impact</p>
          </div>
          <div className="mice-services-cards">
            {miceServices.map((service, i) => (
              <div key={service.name} className="mice-service-card scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mice-service-image" style={{ backgroundImage: `url(${service.image})` }}>
                  <div className="mice-service-icon" style={{ '--icon-color': service.color }}>
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                </div>
                <div className="mice-service-content">
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mice-gallery">
          <h2 className="fade-in">Event <span className="gradient-text">Gallery</span></h2>
          <div className="mice-gallery-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="mice-gallery-item scale-in"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  backgroundImage: `url(https://images.unsplash.com/photo-${[
                    '1511578314322-379afb476865',
                    '1540575467063-178a50c2df87',
                    '1505373877841-8d25f7d46678',
                    '1560435650-3a8ac0be12d0',
                    '1519389950473-47ba0277781c',
                    '1559223607-a43c990c692c',
                  ][i]}?auto=format&fit=crop&w=800&q=80)`,
                }}
              >
                <div className="mice-gallery-overlay">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  <span>View Event</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mice-cta-section">
          <div className="mice-cta-content fade-in">
            <h2>Ready to Elevate Your Next Event?</h2>
            <p>Let our MICE experts create an unforgettable experience for your organization</p>
            <div className="mice-cta-buttons">
              <a className="primary-button" href={`mailto:${contact.email}?subject=MICE%20Enquiry`}>
                <i className="fa-solid fa-envelope"></i> Contact MICE Team
              </a>
              <a className="secondary-button" href="tel:+919619690990">
                <i className="fa-solid fa-phone"></i> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}