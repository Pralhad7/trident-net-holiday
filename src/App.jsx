import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import WorldBackground from './components/WorldBackground'
import DestinationPage from './pages/DestinationPage'
import MICEPage from './pages/MICEPage'
import {
  contact,
  internationalDestinations,
  domesticDestinations,
  destinationDetails,
  internationalPackages,
  domesticPackages,
  miceServices,
  testimonials,
  trustPoints,
  heroImages,
  careerOpenings,
  services,
} from './data/destinations'

const mapQuery = encodeURIComponent(contact.address)
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`
const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

function handleEnquirySubmit(event) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const destination = formData.get('destination')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''
  const subject = `Holiday enquiry from ${name || 'Website visitor'}`
  const body = [
    `Name: ${name || '-'}`,
    `Email: ${email || '-'}`,
    `Preferred destination: ${destination || '-'}`,
    '',
    'Travel notes:',
    message || '-',
  ].join('\n')
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={`fa${star <= rating ? 's' : 'r'} fa-star`} />
      ))}
    </div>
  )
}

function DropdownMenu({ title, categories }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const handleClick = (id) => {
    const dest = destinationDetails[id]
    if (dest) navigate(`/destination/${id}`)
    setIsOpen(false)
  }
  return (
    <div className="nav-dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <a href={`#${title.toLowerCase()}`} className="nav-dropdown-trigger">
        {title} <i className="fa-solid fa-chevron-down"></i>
      </a>
      {isOpen && (
        <div className="nav-dropdown-menu">
          <div className="nav-dropdown-content">
            {Object.entries(categories).map(([category, dests]) => (
              <div key={category} className="nav-dropdown-column">
                <h4>{category}</h4>
                <ul>
                  {dests.map((d) => (
                    <li key={d.id}>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleClick(d.id) }}>{d.name} Tour Packages</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="nav-dropdown-sidebar">
              <div className="sidebar-header"><i className="fa-solid fa-chart-line"></i> Trending This Month</div>
              <ul className="sidebar-destinations">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick('dubai') }}>Dubai Tour Packages</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick('thailand') }}>Thailand Tour Packages</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick('bali') }}>Bali Tour Packages</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick('maldives') }}>Maldives Tour Packages</a></li>
              </ul>
              <div className="sidebar-header top-picks"><i className="fa-solid fa-sparkles"></i> Top Picks</div>
              <div className="sidebar-featured" onClick={() => handleClick('europe')}>
                <img src="https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=600&q=80" alt="Featured" />
                <div className="sidebar-featured-content">
                  <span className="featured-label">Explore Europe</span>
                  <span className="featured-price">Starts @ 1,35,000 /person</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/mice" element={<MICEPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

function HomePage() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroSlide((p) => (p + 1) % heroImages.length), 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const st = document.documentElement.scrollTop
      const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress(sh > 0 ? (st / sh) * 100 : 0)
      setShowBackToTop(st > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const observerRef = useRef(null)
  const sectionRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observerRef.current.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    node.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger')
      .forEach((el) => observerRef.current.observe(el))
  }, [])

  const goToDest = (id) => {
    const dest = destinationDetails[id]
    if (dest) navigate(`/destination/${id}`)
  }

  const handlePkgClick = (pkg, e) => {
    e.preventDefault()
    navigate(`/destination/${pkg.destinationId}`)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="page-shell" ref={sectionRef}>
      <WorldBackground />
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="topbar">
        <div className="section-shell topbar-inner">
          <Link className="brand" to="/">
            <img className="brand-logo" src="/assets/trident-logo.png" alt="Trident Net Holidays" />
            <span className="brand-meta">Travel Division of Trident Time Share (P) Ltd.</span>
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <DropdownMenu title="International" categories={internationalDestinations} />
            <DropdownMenu title="Domestic" categories={domesticDestinations} />
            <Link to="/mice">MICE</Link>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href={`mailto:${contact.email}`}><i className="fa-solid fa-phone"></i> Plan Your Holiday</a>
        </div>
      </header>

      <main className="site-main">
        {/* HERO */}
        <section className="hero-band" id="home">
          <div className="hero-particles">
            <i className="fa-solid fa-globe hero-particle"></i>
            <i className="fa-solid fa-plane hero-particle"></i>
            <i className="fa-solid fa-compass hero-particle"></i>
            <i className="fa-solid fa-map-pin hero-particle"></i>
            <i className="fa-solid fa-sun hero-particle"></i>
            <i className="fa-solid fa-mountain hero-particle"></i>
            <i className="fa-solid fa-umbrella-beach hero-particle"></i>
            <i className="fa-solid fa-location-dot hero-particle"></i>
          </div>
          <div className="hero-slideshow">
            {heroImages.map((slide, i) => (
              <div key={i} className={`hero-slide ${i === currentHeroSlide ? 'active' : ''}`} style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="hero-slide-overlay" />
              </div>
            ))}
          </div>
          <div className="hero-content-wrapper">
            <div className="section-shell hero-section">
              <div className="hero-copy">
                <div className="hero-badge"><i className="fa-solid fa-award"></i> Award Winning Travel Agency</div>
                <div className="hero-taglines">
                  {heroImages.map((slide, i) => (
                    <div key={i} className={`hero-tagline ${i === currentHeroSlide ? 'active' : ''}`}>
                      <h2>{slide.tagline}</h2>
                      <p className="hero-location"><i className="fa-solid fa-location-dot"></i> {slide.location}</p>
                    </div>
                  ))}
                </div>
                <h1>Discover Your Next <span className="highlight-text">Adventure</span></h1>
                <p className="hero-text">Experience world-class travel planning with Trident Net Holidays. From exotic international destinations to serene domestic getaways, MICE events to luxury cruises - we craft unforgettable journeys.</p>
                <div className="hero-actions">
                  <a className="primary-button" href="#international"><i className="fa-solid fa-globe"></i> Explore International</a>
                  <a className="secondary-button" href="#domestic"><i className="fa-solid fa-map-pin"></i> Discover Domestic</a>
                </div>
                <div className="trust-strip">
                  {trustPoints.map((item, idx) => (
                    <div key={idx} className="trust-item"><i className={`fa-solid ${item.icon}`}></i><span>{item.text}</span></div>
                  ))}
                </div>
              </div>
              <div className="hero-panel reveal">
                <article className="hero-featured-card shimmer">
                  <div className="hero-featured-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1400&q=80)' }}>
                    <div className="hero-badge-overlay">
                      <span className="discount-badge">UP TO 30% OFF</span>
                      <span className="rating-badge"><i className="fa-solid fa-star"></i> 4.9</span>
                    </div>
                  </div>
                  <div className="hero-featured-content">
                    <p className="card-kicker">SPECIAL OFFER</p>
                    <h2>Thailand Dream Tour</h2>
                    <div className="price-row">
                      <span className="current-price">54,999</span>
                      <span className="old-price">79,999</span>
                      <span className="duration">7N / 8D</span>
                    </div>
                    <div className="highlights-tags">
                      <span><i className="fa-solid fa-check"></i> Flights</span>
                      <span><i className="fa-solid fa-check"></i> Hotels</span>
                      <span><i className="fa-solid fa-check"></i> Sightseeing</span>
                    </div>
                    <a className="cta-button" href="#" onClick={(e) => { e.preventDefault(); goToDest('thailand') }}>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="hero-dots">
            {heroImages.map((_, i) => (
              <button key={i} className={`hero-dot ${i === currentHeroSlide ? 'active' : ''}`} onClick={() => setCurrentHeroSlide(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(91,169,200,0.08)" d="M0,40 C240,90 480,-10 720,40 C960,90 1200,-10 1440,40 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        {/* INTERNATIONAL */}
        <section className="section-band international-band" id="international">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-plane-departure"></i> International Tours</p>
              <h2>Explore the World with Our Premium International Packages</h2>
              <p>Handpicked international destinations with flights, hotels, sightseeing and expert guidance.</p>
            </div>
            <div className="package-grid reveal-stagger">
              {internationalPackages.map((item) => (
                <article className="package-card" key={item.title} onClick={(e) => handlePkgClick(item, e)}>
                  <div className="package-media" style={{ '--card-image': `url(${item.image})` }}>
                    <div className="package-badges">
                      <span className="badge-offer">Best Seller</span>
                      <span className="badge-rating"><i className="fa-solid fa-star"></i> {item.rating}</span>
                    </div>
                  </div>
                  <div className="package-content">
                    <div className="package-header">
                      <span className="duration"><i className="fa-regular fa-clock"></i> {item.duration}</span>
                      <div className="rating-inline">
                        <StarRating rating={Math.round(item.rating)} />
                        <span className="reviews-count">({item.reviews})</span>
                      </div>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.blurb}</p>
                    <div className="highlights-small">
                      {item.highlights.slice(0, 3).map((h, i) => (<span key={i}><i className="fa-solid fa-circle-check"></i> {h}</span>))}
                    </div>
                    <div className="package-footer">
                      <div className="price-block">
                        <span className="price-old">{item.originalPrice}</span>
                        <span className="price-new">{item.price}</span>
                        <span className="price-per">/person</span>
                      </div>
                      <a href="#" className="book-btn" onClick={(e) => handlePkgClick(item, e)}>View Details</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,60 C360,0 720,100 1080,60 L1080,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(217,138,43,0.06)" d="M0,50 C360,-10 720,90 1080,50 L1080,100 L0,100 Z"/>
          </svg>
        </div>

        {/* DOMESTIC */}
        <section className="section-band domestic-band" id="domestic">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-map-location-dot"></i> Domestic Tours</p>
              <h2>Discover Incredible India with Our Domestic Packages</h2>
              <p>From the majestic Himalayas to serene backwaters, explore India's beauty with us.</p>
            </div>
            <div className="package-grid reveal-stagger">
              {domesticPackages.map((item) => (
                <article className="package-card" key={item.title} onClick={(e) => handlePkgClick(item, e)}>
                  <div className="package-media" style={{ '--card-image': `url(${item.image})` }}>
                    <div className="package-badges">
                      <span className="badge-offer badge-popular">Popular</span>
                      <span className="badge-rating"><i className="fa-solid fa-star"></i> {item.rating}</span>
                    </div>
                  </div>
                  <div className="package-content">
                    <div className="package-header">
                      <span className="duration"><i className="fa-regular fa-clock"></i> {item.duration}</span>
                      <div className="rating-inline">
                        <StarRating rating={Math.round(item.rating)} />
                        <span className="reviews-count">({item.reviews})</span>
                      </div>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.blurb}</p>
                    <div className="highlights-small">
                      {item.highlights.slice(0, 3).map((h, i) => (<span key={i}><i className="fa-solid fa-circle-check"></i> {h}</span>))}
                    </div>
                    <div className="package-footer">
                      <div className="price-block">
                        <span className="price-old">{item.originalPrice}</span>
                        <span className="price-new">{item.price}</span>
                        <span className="price-per">/person</span>
                      </div>
                      <a href="#" className="book-btn" onClick={(e) => handlePkgClick(item, e)}>View Details</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,40 C480,120 960,-20 1440,40 L1440,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(91,169,200,0.06)" d="M0,30 C480,110 960,-30 1440,30 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        {/* SERVICES */}
        <section className="section-band services-band" id="services">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-concierge-bell"></i> Our Services</p>
              <h2>Complete Travel Solutions for Every Need</h2>
            </div>
            <div className="services-grid reveal-stagger">
              {services.map((service, index) => (
                <article className="service-card" key={service.name}>
                  <div className="service-icon-3d" style={{ '--icon-color': service.color }}>
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M720,60 C540,20 360,80 180,40 L0,60 L0,100 L1440,100 L1440,60 C1260,80 1080,20 900,60 Z" opacity="0.4"/>
            <path fill="rgba(217,138,43,0.05)" d="M720,50 C540,10 360,70 180,30 L0,50 L0,100 L1440,100 L1440,50 C1260,70 1080,10 900,50 Z"/>
          </svg>
        </div>

        {/* MICE */}
        <section className="section-band mice-band" id="mice">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-briefcase"></i> MICE Tours</p>
              <h2>Corporate Events & MICE Solutions</h2>
              <p>Professional MICE services tailored for your business needs.</p>
            </div>
            <div className="mice-grid reveal-stagger">
              {miceServices.slice(0, 3).map((service) => (
                <article className="mice-card" key={service.name}>
                  <div className="mice-icon" style={{ '--icon-color': service.color }}>
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </article>
              ))}
            </div>
            <div className="mice-cta reveal">
              <div className="mice-cta-content">
                <h3>Ready to Plan Your Corporate Event?</h3>
                <p>Let our MICE experts create a memorable experience for your team</p>
              </div>
              <Link className="primary-button" to="/mice">
                <i className="fa-solid fa-arrow-right"></i> Explore MICE Services
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,30 C240,80 480,10 720,40 C960,70 1200,20 1440,50 L1440,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(91,169,200,0.05)" d="M0,20 C240,70 480,0 720,30 C960,60 1200,10 1440,40 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        {/* TESTIMONIALS */}
        <section className="section-band testimonials-band">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-comments"></i> Testimonials</p>
              <h2>What Our Travellers Say</h2>
            </div>
            <div className="testimonials-grid reveal-stagger">
              {testimonials.map((review) => (
                <article className="testimonial-card" key={review.author}>
                  <div className="testimonial-header">
                    <img src={review.image} alt={review.author} className="testimonial-avatar" />
                    <div className="testimonial-author">
                      <h4>{review.author}</h4>
                      <p className="testimonial-location"><i className="fa-solid fa-location-dot"></i> {review.location}</p>
                    </div>
                    <div className="testimonial-rating">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <i className="fa-solid fa-quote-left"></i>
                    <p>{review.quote}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M1440,60 C1200,10 960,90 720,50 C480,10 240,80 0,40 L0,100 L1440,100 Z" opacity="0.4"/>
            <path fill="rgba(217,138,43,0.05)" d="M1440,50 C1200,0 960,80 720,40 C480,0 240,70 0,30 L0,100 L1440,100 Z"/>
          </svg>
        </div>

        {/* CAREERS */}
        <section className="section-band careers-band" id="careers">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-briefcase"></i> Join Our Team</p>
              <h2>Build Your Career with Trident Net Holidays</h2>
              <p>We're always looking for passionate individuals who love travel.</p>
            </div>
            <div className="careers-grid">
              {careerOpenings.map((opening, index) => (
                <article className="career-card" key={opening.title} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="career-icon"><i className="fa-solid fa-briefcase"></i></div>
                  <div className="career-header">
                    <h3>{opening.title}</h3>
                    <div className="career-meta">
                      <span><i className="fa-solid fa-location-dot"></i> {opening.location}</span>
                      <span><i className="fa-solid fa-clock"></i> {opening.type}</span>
                      <span><i className="fa-solid fa-user-tie"></i> {opening.experience}</span>
                    </div>
                  </div>
                  <p className="career-description">{opening.description}</p>
                  <div className="career-responsibilities">
                    <h4><i className="fa-solid fa-check-circle"></i> Key Responsibilities</h4>
                    <ul>{opening.responsibilities.map((resp, i) => (<li key={i}>{resp}</li>))}</ul>
                  </div>
                  <a className="career-apply-btn" href={`mailto:${contact.email}?subject=${encodeURIComponent(`Application for ${opening.title}`)}`}>
                    <i className="fa-solid fa-paper-plane"></i> Apply Now
                  </a>
                </article>
              ))}
            </div>
            <div className="careers-cta reveal">
              <div className="careers-cta-content">
                <h3>Don't See a Position That Fits?</h3>
                <p>Send us your resume and let's explore opportunities together!</p>
              </div>
              <a className="primary-button" href={`mailto:${contact.email}?subject=${encodeURIComponent('Spontaneous Application')}`}>
                <i className="fa-solid fa-envelope"></i> Send Your Resume
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,70 C180,30 360,90 540,60 C720,30 900,80 1080,50 C1260,20 1440,70 1440,50 L1440,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(91,169,200,0.05)" d="M0,60 C180,20 360,80 540,50 C720,20 900,70 1080,40 C1260,10 1440,60 1440,40 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        {/* CONTACT */}
        <section className="section-band contact-band" id="contact">
          <div className="section-shell contact-section">
            <div className="contact-copy">
              <p className="section-tag"><i className="fa-solid fa-phone-volume"></i> Contact Trident</p>
              <h2>Ready to Start Your Journey?</h2>
              <p>Get in touch with our travel experts and let us craft your perfect holiday.</p>
              <div className="contact-lines">
                <a href={`mailto:${contact.email}`}><i className="fa-solid fa-envelope"></i> {contact.email}</a>
                {contact.phones.map((phone) => (
                  <a href={`tel:${phone.replaceAll(/[^+\d]/g, '')}`} key={phone}><i className="fa-solid fa-phone"></i> {phone}</a>
                ))}
                <p><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
              </div>
            </div>
            <article className="map-card reveal">
              <div className="map-frame">
                <iframe title="Map" src={mapEmbedSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="map-card-body">
                <p className="section-tag">Location Map</p>
                <h3>Visit Our Office</h3>
                <p>Find Trident Net Holidays near National Park in Borivali East, Mumbai.</p>
                <a className="map-link" href={mapLink} target="_blank" rel="noreferrer"><i className="fa-solid fa-location-arrow"></i> Open In Google Maps</a>
              </div>
            </article>
            <form className="enquiry-form reveal" onSubmit={handleEnquirySubmit}>
              <h3 className="form-title">Send Us an Enquiry</h3>
              <label>Your Name<input name="name" placeholder="John Doe" required /></label>
              <label>Email Address<input name="email" placeholder="you@example.com" type="email" required /></label>
              <label>Destination<input name="destination" placeholder="Thailand, Kerala, Dubai..." /></label>
              <label>Your Message<textarea name="message" placeholder="Tell us about your travel plans..." rows="5" /></label>
              <button type="submit"><i className="fa-solid fa-paper-plane"></i> Send Enquiry</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer-inner">
          <div className="footer-brand">
            <img src="/assets/trident-logo.png" alt="Trident Net Holidays" className="footer-logo" />
            <p>Crafting unforgettable journeys since 2009</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <a href="#international">International Tours</a>
              <a href="#domestic">Domestic Tours</a>
              <Link to="/mice">MICE Services</Link>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <a href="#services">Air Ticketing</a>
              <a href="#services">Hotel Booking</a>
              <a href="#services">Visa Assistance</a>
              <a href="#services">Travel Insurance</a>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phones[0].replaceAll(/[^+\d]/g, '')}`}>{contact.phones[0]}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"> 2024 Trident Net Holidays. All rights reserved.</div>
      </footer>

      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  )
}

export default App