import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { destinationDetails } from '../data/destinations'

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={`fa${star <= rating ? 's' : 'r'} fa-star`}></i>
      ))}
    </div>
  )
}

export default function DestinationPage() {
  const { id } = useParams()
  const dest = destinationDetails[id]
  const gallery = dest?.gallery || []
  const [activeGallery, setActiveGallery] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    if (gallery.length < 2) return
    const timer = setInterval(() => {
      setActiveGallery((prev) => (prev + 1) % gallery.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [gallery.length])

  if (!dest) {
    return (
      <div className="page-shell">
        <div className="not-found-page">
          <i className="fa-solid fa-map-pin"></i>
          <h1>Destination Coming Soon</h1>
          <p>We're adding more destinations every day. Check back soon!</p>
          <Link to="/" className="primary-button">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <div className="dest-page">
        <div className="dest-hero" style={{ backgroundImage: `url(${dest.image})` }}>
          <div className="dest-hero-overlay">
            <Link to="/" className="dest-back-btn">
              <i className="fa-solid fa-arrow-left"></i> Back
            </Link>
            <div className="dest-hero-content">
              <span className="dest-tag">{dest.tagline}</span>
              <h1 className="dest-title">{dest.title}</h1>
              <div className="dest-meta">
                <span><i className="fa-regular fa-clock"></i> {dest.duration}</span>
                <span><i className="fa-solid fa-star"></i> {dest.rating} ({dest.reviews} reviews)</span>
                <span className="dest-price-badge">{dest.price} <small>/person</small></span>
              </div>
              <div className="dest-hero-actions">
                <a className="primary-button" href={`mailto:jayant@tridentnetholidays.com?subject=${encodeURIComponent(`Enquiry for ${dest.title}`)}`}>
                  <i className="fa-solid fa-envelope"></i> Send Enquiry
                </a>
                <a className="secondary-button" href="tel:+919619690990">
                  <i className="fa-solid fa-phone"></i> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="dest-gallery-section">
          <div className="dest-gallery-main">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`dest-gallery-slide ${i === activeGallery ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
            <div className="dest-gallery-controls">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  className={`gallery-dot ${i === activeGallery ? 'active' : ''}`}
                  onClick={() => setActiveGallery(i)}
                />
              ))}
            </div>
          </div>
          <div className="dest-gallery-thumbs">
            {gallery.slice(0, 4).map((img, i) => (
              <button
                key={i}
                className={`gallery-thumb ${i === activeGallery ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => setActiveGallery(i)}
              />
            ))}
          </div>
        </div>

        <div className="dest-body">
          <div className="dest-main-content">
            <section className="dest-section fade-in">
              <h2><i className="fa-solid fa-info-circle"></i> About This Tour</h2>
              <p>{dest.description}</p>
              <div className="dest-price-row">
                <span className="dest-original-price">{dest.originalPrice}</span>
                <span className="dest-current-price">{dest.price}</span>
                <span className="dest-price-label">per person</span>
                <span className="dest-save-badge">Save {Math.round((1 - parseFloat(dest.price.replace(/[^0-9]/g, '')) / parseFloat(dest.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%</span>
              </div>
            </section>

            <section className="dest-section fade-in">
              <h2><i className="fa-solid fa-star"></i> Tour Highlights</h2>
              <div className="dest-highlights-grid">
                {dest.highlights.map((h, i) => (
                  <div key={i} className="highlight-card slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                    <i className="fa-solid fa-check-circle"></i>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="dest-section fade-in">
              <h2><i className="fa-solid fa-list-check"></i> What's Included</h2>
              <div className="dest-inclusions-grid">
                {dest.inclusions.map((inc, i) => (
                  <div key={i} className="inclusion-card scale-in" style={{ animationDelay: `${i * 0.06}s` }}>
                    <i className="fa-solid fa-check"></i>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="dest-section fade-in">
              <h2><i className="fa-solid fa-route"></i> Day-by-Day Itinerary</h2>
              <div className="dest-itinerary">
                {dest.itinerary.map((item, i) => (
                  <div key={i} className="itinerary-card slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="itinerary-number">
                      <span>{item.day}</span>
                    </div>
                    <div className="itinerary-line">
                      <div className="itinerary-dot" />
                      {i < dest.itinerary.length - 1 && <div className="itinerary-connector" />}
                    </div>
                    <div className="itinerary-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="dest-sidebar">
            <div className="dest-price-card">
              <div className="price-card-globe">
                <i className="fa-solid fa-globe"></i>
              </div>
              <div className="price-card-header">
                <span className="price-original">{dest.originalPrice}</span>
                <div className="price-main">
                  <span className="price-amount">{dest.price}</span>
                  <span className="price-per">/person</span>
                </div>
              </div>
              <div className="price-card-rating">
                <StarRating rating={Math.round(dest.rating)} />
                <span>{dest.reviews} reviews</span>
              </div>
              <div className="price-card-features">
                <div className="pcf-item"><i className="fa-solid fa-check-circle"></i> {dest.duration}</div>
                <div className="pcf-item"><i className="fa-solid fa-check-circle"></i> Free Cancellation</div>
                <div className="pcf-item"><i className="fa-solid fa-check-circle"></i> Instant Confirmation</div>
              </div>
              <a className="price-card-cta" href={`mailto:jayant@tridentnetholidays.com?subject=${encodeURIComponent(`Enquiry for ${dest.title}`)}`}>
                <i className="fa-solid fa-envelope"></i> Send Enquiry
              </a>
              <a className="price-card-cta secondary" href="tel:+919619690990">
                <i className="fa-solid fa-phone"></i> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}