import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const contact = {
  phones: ['+91 961-969-0990', '+91 961-969-0933', '+91 932-385-7548'],
  email: 'jayant@tridentnetholidays.com',
  address:
    '311, 3rd Floor, Hari Om Plaza, Opp. National Park, Near Omkareshwar Mandir, M. G. Road, Borivali East, Mumbai-400066',
}

const internationalDestinations = {
  'Popular Long Breaks': [
    { name: 'Europe', id: 'europe' },
    { name: 'Switzerland', id: 'switzerland' },
    { name: 'Italy', id: 'italy' },
    { name: 'France', id: 'france' },
    { name: 'Turkey', id: 'turkey' },
    { name: 'Iceland', id: 'iceland' },
    { name: 'USA', id: 'usa' },
    { name: 'Norway', id: 'norway' },
    { name: 'Finland', id: 'finland' },
    { name: 'Kenya', id: 'kenya' },
    { name: 'South Africa', id: 'south-africa' },
    { name: 'Japan', id: 'japan' },
    { name: 'Mauritius', id: 'mauritius' },
    { name: 'New Zealand', id: 'new-zealand' },
    { name: 'Egypt', id: 'egypt' },
    { name: 'Australia', id: 'australia' },
  ],
  'Popular Short Breaks': [
    { name: 'Dubai', id: 'dubai' },
    { name: 'Thailand', id: 'thailand' },
    { name: 'Singapore', id: 'singapore' },
    { name: 'Bali', id: 'bali' },
    { name: 'Vietnam', id: 'vietnam' },
    { name: 'Malaysia', id: 'malaysia' },
    { name: 'Maldives', id: 'maldives' },
    { name: 'Bhutan', id: 'bhutan' },
    { name: 'Sri Lanka', id: 'sri-lanka' },
  ],
  'Honeymoon Tour Packages': [
    { name: 'Bali', id: 'bali-honeymoon' },
    { name: 'Maldives', id: 'maldives-honeymoon' },
    { name: 'Europe', id: 'europe-honeymoon' },
    { name: 'Switzerland', id: 'switzerland-honeymoon' },
    { name: 'Paris', id: 'paris-honeymoon' },
    { name: 'Turkey', id: 'turkey-honeymoon' },
    { name: 'Dubai', id: 'dubai-honeymoon' },
    { name: 'Thailand', id: 'thailand-honeymoon' },
    { name: 'Singapore', id: 'singapore-honeymoon' },
    { name: 'Vietnam', id: 'vietnam-honeymoon' },
    { name: 'Malaysia', id: 'malaysia-honeymoon' },
    { name: 'Japan', id: 'japan-honeymoon' },
    { name: 'Greece', id: 'greece-honeymoon' },
    { name: 'Mauritius', id: 'mauritius-honeymoon' },
    { name: 'Seychelles', id: 'seychelles-honeymoon' },
  ],
}

const domesticDestinations = {
  'Popular Destinations': [
    { name: 'Ladakh', id: 'ladakh' },
    { name: 'Spiti', id: 'spiti' },
    { name: 'Kashmir', id: 'kashmir' },
    { name: 'Kerala', id: 'kerala' },
    { name: 'Andaman', id: 'andaman' },
    { name: 'North East', id: 'north-east' },
    { name: 'Sikkim', id: 'sikkim' },
    { name: 'Meghalaya', id: 'meghalaya' },
    { name: 'Rajasthan', id: 'rajasthan' },
    { name: 'Himachal', id: 'himachal' },
    { name: 'Manali', id: 'manali' },
    { name: 'Uttarakhand', id: 'uttarakhand' },
    { name: 'Darjeeling', id: 'darjeeling' },
  ],
  'Honeymoon Tour Packages': [
    { name: 'Kerala', id: 'kerala-honeymoon' },
    { name: 'Kashmir', id: 'kashmir-honeymoon' },
    { name: 'Andaman', id: 'andaman-honeymoon' },
    { name: 'Sikkim', id: 'sikkim-honeymoon' },
    { name: 'Meghalaya', id: 'meghalaya-honeymoon' },
    { name: 'Rajasthan', id: 'rajasthan-honeymoon' },
    { name: 'Ladakh', id: 'ladakh-honeymoon' },
    { name: 'Munnar', id: 'munnar-honeymoon' },
    { name: 'Manali', id: 'manali-honeymoon' },
    { name: 'Shimla', id: 'shimla-honeymoon' },
    { name: 'Darjeeling', id: 'darjeeling-honeymoon' },
    { name: 'Nainital', id: 'nainital-honeymoon' },
    { name: 'Ooty', id: 'ooty-honeymoon' },
  ],
  'Family Tour Packages': [
    { name: 'Kerala', id: 'kerala-family' },
    { name: 'Kashmir', id: 'kashmir-family' },
    { name: 'Andaman', id: 'andaman-family' },
    { name: 'Rajasthan', id: 'rajasthan-family' },
    { name: 'Sikkim', id: 'sikkim-family' },
    { name: 'Meghalaya', id: 'meghalaya-family' },
    { name: 'Ladakh', id: 'ladakh-family' },
    { name: 'Himachal', id: 'himachal-family' },
    { name: 'Manali', id: 'manali-family' },
    { name: 'Shimla', id: 'shimla-family' },
    { name: 'Uttarakhand', id: 'uttarakhand-family' },
    { name: 'Darjeeling', id: 'darjeeling-family' },
    { name: 'Ooty', id: 'ooty-family' },
  ],
}

const destinationDetails = {
  thailand: {
    name: 'Thailand',
    title: 'Thailand Complete Tour',
    tagline: 'The Land of Smiles',
    duration: '7N / 8D',
    price: '₹54,999',
    originalPrice: '₹79,999',
    rating: 4.9,
    reviews: 2345,
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=80',
    description: 'Experience the magic of Thailand with our all-inclusive tour package. From the bustling streets of Bangkok to the pristine beaches of Phuket and Pattaya, this tour covers everything you need for an unforgettable Thai adventure.',
    highlights: ['Bangkok City Tour', 'Floating Market', 'Coral Island', 'Phuket Beaches', 'Pattaya Nightlife', 'Temple Tours'],
    inclusions: ['Return Flights', '4 Star Hotels', 'Daily Breakfast', 'All Transfers', 'Sightseeing', 'Guide Services'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Bangkok', desc: 'Welcome to Thailand! Arrive at Suvarnabhumi Airport and transfer to your hotel.' },
      { day: 'Day 2', title: 'Bangkok City Tour', desc: 'Visit the Grand Palace, Wat Pho, and enjoy a Chao Phraya River cruise.' },
      { day: 'Day 3', title: 'Floating Market & Pattaya', desc: 'Experience Damnoen Saduak floating market and proceed to Pattaya.' },
      { day: 'Day 4', title: 'Coral Island Tour', desc: 'Enjoy speedboat ride to Coral Island with water sports activities.' },
      { day: 'Day 5', title: 'Pattaya to Phuket', desc: 'Transfer to Phuket and check-in at your beach resort.' },
      { day: 'Day 6', title: 'Phuket City Tour', desc: 'Explore Phuket Town, Big Buddha, and beautiful viewpoints.' },
      { day: 'Day 7', title: 'Phi Phi Islands', desc: 'Day trip to Phi Phi Islands with snorkeling and lunch.' },
      { day: 'Day 8', title: 'Departure', desc: 'Free time until transfer to Phuket Airport for your flight back home.' },
    ],
  },
  dubai: {
    name: 'Dubai',
    title: 'Dubai Luxury Getaway',
    tagline: 'Where Dreams Come True',
    duration: '5N / 6D',
    price: '₹64,999',
    originalPrice: '₹89,999',
    rating: 4.9,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    description: 'Discover the futuristic city of Dubai with our luxury package. Experience world-class attractions, desert safaris, and the iconic Burj Khalifa.',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah', 'Dubai Mall', 'Dhow Cruise', 'Miracle Garden'],
    inclusions: ['Return Flights', '5 Star Hotels', 'Daily Breakfast', 'All Transfers', 'Desert Safari', 'Burj Khalifa Tickets'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Dubai', desc: 'Welcome to Dubai! Arrive at DXB Airport and transfer to your luxurious hotel.' },
      { day: 'Day 2', title: 'Dubai City Tour', desc: 'Visit Burj Khalifa, Dubai Mall, and explore Downtown Dubai.' },
      { day: 'Day 3', title: 'Desert Safari', desc: 'Evening desert safari with dune bashing, camel ride, and BBQ dinner.' },
      { day: 'Day 4', title: 'Palm & Atlantis', desc: 'Visit Palm Jumeirah, Atlantis, and enjoy the Aquaventure waterpark.' },
      { day: 'Day 5', title: 'Shopping & Leisure', desc: 'Free day for shopping at Gold Souk and Mall of Emirates.' },
      { day: 'Day 6', title: 'Departure', desc: 'Check out and transfer to airport for your flight back home.' },
    ],
  },
  kerala: {
    name: 'Kerala',
    title: 'Kerala Backwaters',
    tagline: 'God\'s Own Country',
    duration: '5N / 6D',
    price: '₹24,999',
    originalPrice: '₹34,999',
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
    description: 'Experience the serene beauty of Kerala with our backwaters tour. Enjoy houseboat stay, tea gardens, and cultural experiences.',
    highlights: ['Alleppey Houseboat', 'Munnar Tea Gardens', 'Kochi Fort', 'Kathakali Dance', 'Ayurveda Spa', 'Wildlife Sanctuary'],
    inclusions: ['All Transfers', '4 Star Hotels', 'Houseboat Stay', 'Daily Breakfast', 'Sightseeing', 'Guide Services'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kochi', desc: 'Welcome to Kerala! Arrive at Kochi Airport and transfer to your hotel.' },
      { day: 'Day 2', title: 'Kochi Sightseeing', desc: 'Explore Fort Kochi, Chinese Fishing Nets, and Jewish Synagogue.' },
      { day: 'Day 3', title: 'Munnar Hill Station', desc: 'Drive to Munnar, enjoying the scenic beauty and tea plantations.' },
      { day: 'Day 4', title: 'Munnar Exploration', desc: 'Visit tea gardens, Eravikulam National Park, and local attractions.' },
      { day: 'Day 5', title: 'Alleppey Backwaters', desc: 'Proceed to Alleppey and check into your luxury houseboat.' },
      { day: 'Day 6', title: 'Departure', desc: 'Morning backwater cruise, then transfer to airport for departure.' },
    ],
  },
}

const internationalPackages = [
  {
    title: 'Thailand Complete Tour',
    duration: '7N / 8D',
    price: '₹54,999',
    originalPrice: '₹79,999',
    rating: 4.9,
    reviews: 2345,
    blurb: 'Bangkok, Pattaya & Phuket - All inclusive with flights, hotels & sightseeing.',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Bangkok', 'Pattaya', 'Phuket', 'Floating Market', 'Coral Island'],
    destinationId: 'thailand',
  },
  {
    title: 'Baku Azerbaijan Experience',
    duration: '4N / 5D',
    price: '₹49,999',
    originalPrice: '₹69,999',
    rating: 4.9,
    reviews: 876,
    blurb: 'Old City heritage, modern architecture & Caucasus mountain views.',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Old City', 'Flame Towers', 'Heydar Aliyev Center', 'Gobustan'],
    destinationId: 'baku',
  },
  {
    title: 'Vietnam Discovery Tour',
    duration: '10N / 11D',
    price: '₹72,999',
    originalPrice: '₹94,999',
    rating: 4.7,
    reviews: 1567,
    blurb: 'Hanoi, Hoi An, Ho Chi Minh & Halong Bay cruise adventure.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Hanoi', 'Halong Bay', 'Hoi An', 'Ho Chi Minh', 'Cu Chi Tunnels'],
    destinationId: 'vietnam',
  },
  {
    title: 'Dubai Luxury Getaway',
    duration: '5N / 6D',
    price: '₹64,999',
    originalPrice: '₹89,999',
    rating: 4.9,
    reviews: 3421,
    blurb: 'Burj Khalifa, desert safari, Dubai Mall & luxury experiences.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah', 'Dubai Mall'],
    destinationId: 'dubai',
  },
  {
    title: 'European Grand Tour',
    duration: '12N / 13D',
    price: '₹1,49,999',
    originalPrice: '₹1,99,999',
    rating: 4.8,
    reviews: 987,
    blurb: 'Paris, Switzerland, Italy & Amsterdam - Classic Europe experience.',
    image: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Paris', 'Switzerland', 'Rome', 'Venice', 'Amsterdam'],
    destinationId: 'europe',
  },
  {
    title: 'Greece Island Hopping',
    duration: '8N / 9D',
    price: '₹89,999',
    originalPrice: '₹1,19,999',
    rating: 4.9,
    reviews: 654,
    blurb: 'Athens, Santorini, Mykonos & Crete - Mediterranean paradise.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Athens', 'Santorini', 'Mykonos', 'Crete', 'Acropolis'],
    destinationId: 'greece',
  },
]

const domesticPackages = [
  {
    title: 'Kerala Backwaters',
    duration: '5N / 6D',
    price: '₹24,999',
    originalPrice: '₹34,999',
    rating: 4.8,
    reviews: 1876,
    blurb: 'Alleppey houseboat, Munnar tea gardens & Kochi sightseeing.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Alleppey', 'Munnar', 'Kochi', 'Houseboat', 'Tea Gardens'],
    destinationId: 'kerala',
  },
  {
    title: 'Golden Triangle',
    duration: '6N / 7D',
    price: '₹28,999',
    originalPrice: '₹39,999',
    rating: 4.8,
    reviews: 2543,
    blurb: 'Delhi, Agra & Jaipur - India\'s most iconic tour.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Taj Mahal', 'Red Fort', 'Amer Palace', 'Qutub Minar'],
    destinationId: 'golden-triangle',
  },
  {
    title: 'Himachal Pradesh',
    duration: '7N / 8D',
    price: '₹32,999',
    originalPrice: '₹44,999',
    rating: 4.9,
    reviews: 1234,
    blurb: 'Shimla, Manali & Dharamshala - Himalayan adventure.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Shimla', 'Manali', 'Dharamshala', 'Rohtang', 'Mcleodganj'],
    destinationId: 'himachal',
  },
  {
    title: 'Goa Beach Holiday',
    duration: '4N / 5D',
    price: '₹18,999',
    originalPrice: '₹25,999',
    rating: 4.6,
    reviews: 3456,
    blurb: 'Beaches, water sports, nightlife & Portuguese heritage.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Calangute', 'Baga', 'Panaji', 'Dudhsagar', 'Water Sports'],
    destinationId: 'goa',
  },
]

const miceServices = [
  {
    name: 'Corporate Conferences',
    detail: 'State-of-the-art conference venues with AV equipment and dedicated support.',
    icon: 'fa-users-line',
    color: '#5ba9c8',
  },
  {
    name: 'Incentive Tours',
    detail: 'Reward your team with exotic destinations and curated experiences.',
    icon: 'fa-gift',
    color: '#d98a2b',
  },
  {
    name: 'Team Building',
    detail: 'Engaging activities that foster teamwork and communication.',
    icon: 'fa-people-group',
    color: '#5ba9c8',
  },
  {
    name: 'Product Launches',
    detail: 'Grand launches with impactful presentations and media support.',
    icon: 'fa-rocket',
    color: '#d98a2b',
  },
  {
    name: 'Exhibitions',
    detail: 'Professional exhibition management from planning to execution.',
    icon: 'fa-store',
    color: '#5ba9c8',
  },
  {
    name: 'Business Meetings',
    detail: 'Executive boardrooms and meeting spaces with perfect ambiance.',
    icon: 'fa-briefcase',
    color: '#d98a2b',
  },
]

const testimonials = [
  {
    quote: 'Our Thailand tour was absolutely amazing! Trident Net Holidays took care of everything - flights, hotels, sightseeing, and even airport transfers. The experience was seamless and stress-free.',
    author: 'Rahul Sharma',
    location: 'Mumbai',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    quote: 'The MICE conference we organized in Dubai was a huge success! Trident\'s attention to detail and professional service made everything perfect. Highly recommend for corporate events.',
    author: 'Priya Mehta',
    location: 'Delhi',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    quote: 'Our Kerala backwaters experience was magical! The houseboat stay was luxurious and the itinerary was perfectly planned. Trident made our anniversary special.',
    author: 'Amit & Sneha',
    location: 'Pune',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=400&q=80',
  },
  {
    quote: 'Best travel agency ever! We did the Europe tour and everything was perfectly coordinated. Guides were knowledgeable, hotels were great, and no hidden charges.',
    author: 'Vikram Patel',
    location: 'Ahmedabad',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
]

const trustPoints = [
  { icon: 'fa-clock', text: '15+ Years Experience' },
  { icon: 'fa-users', text: '50,000+ Happy Travellers' },
  { icon: 'fa-shield-halved', text: '100% Secure Booking' },
  { icon: 'fa-headset', text: '24/7 Customer Support' },
]

const heroImages = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Discover Paradise in Bali',
    location: 'Bali, Indonesia'
  },
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Experience the Magic of Thailand',
    location: 'Thailand'
  },
  {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Explore the Golden Triangle',
    location: 'India'
  },
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Luxury Redefined in Dubai',
    location: 'Dubai, UAE'
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80',
    tagline: 'God\'s Own Country',
    location: 'Kerala, India'
  }
]

const careerOpenings = [
  {
    title: 'Travel Consultant',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'We are looking for passionate travel consultants to help our clients plan their dream vacations.',
    responsibilities: ['Client consultation', 'Itinerary planning', 'Booking management', 'Customer support']
  },
  {
    title: 'Marketing Manager',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '5-8 years',
    description: 'Lead our marketing efforts to grow brand awareness and drive sales.',
    responsibilities: ['Digital marketing', 'Campaign management', 'Analytics', 'Team leadership']
  },
  {
    title: 'Sales Executive',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1-3 years',
    description: 'Join our sales team to promote our travel packages and build client relationships.',
    responsibilities: ['Client acquisition', 'Sales presentations', 'Relationship building', 'Target achievement']
  },
  {
    title: 'Tour Coordinator',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '2-5 years',
    description: 'Coordinate tour operations and ensure smooth execution of travel packages.',
    responsibilities: ['Vendor management', 'Logistics coordination', 'Quality assurance', 'Emergency handling']
  }
]

const services = [
  {
    name: 'Air Ticketing',
    detail: 'Flight booking support for domestic and international travel plans.',
    icon: 'fa-plane',
    color: '#5ba9c8',
  },
  {
    name: 'Hotel Booking',
    detail: 'Stay planning across budget, comfort, and semi-luxury categories.',
    icon: 'fa-hotel',
    color: '#d98a2b',
  },
  {
    name: 'Visa Assistance',
    detail: 'Travel documentation guidance to help keep overseas trips stress-free.',
    icon: 'fa-passport',
    color: '#5ba9c8',
  },
  {
    name: 'Passport Services',
    detail: 'Application assistance for travellers preparing for international journeys.',
    icon: 'fa-id-card',
    color: '#d98a2b',
  },
  {
    name: 'Travel Insurance',
    detail: 'Protection options to add confidence before departure.',
    icon: 'fa-shield-halved',
    color: '#5ba9c8',
  },
  {
    name: 'Cruise Booking',
    detail: 'Cruise-led holidays for travellers wanting a different pace of travel.',
    icon: 'fa-ship',
    color: '#d98a2b',
  },
]

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
        <i key={star} className={`fa${star <= rating ? 's' : 'r'} fa-star`}></i>
      ))}
    </div>
  )
}

function DropdownMenu({ title, categories, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="nav-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a href={`#${title.toLowerCase()}`} className="nav-dropdown-trigger">
        {title} <i className="fa-solid fa-chevron-down"></i>
      </a>
      {isOpen && (
        <div className="nav-dropdown-menu">
          <div className="nav-dropdown-content">
            {Object.entries(categories).map(([category, destinations]) => (
              <div key={category} className="nav-dropdown-column">
                <h4>{category}</h4>
                <ul>
                  {destinations.map((dest) => (
                    <li key={dest.id}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault()
                          onSelect(dest.id)
                          setIsOpen(false)
                        }}
                      >
                        {dest.name} Tour Packages
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="nav-dropdown-sidebar">
              <div className="sidebar-header">
                <i className="fa-solid fa-chart-line"></i> Trending This Month
              </div>
              <ul className="sidebar-destinations">
                <li><a href="#">Dubai Tour Packages</a></li>
                <li><a href="#">Thailand Tour Packages</a></li>
                <li><a href="#">Singapore Tour Packages</a></li>
                <li><a href="#">Malaysia Tour Packages</a></li>
              </ul>
              <div className="sidebar-header top-picks">
                <i className="fa-solid fa-sparkles"></i> Top Picks
              </div>
              <div className="sidebar-featured">
                <img 
                  src="https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=600&q=80" 
                  alt="Featured" 
                />
                <div className="sidebar-featured-content">
                  <span className="featured-label">Explore Europe</span>
                  <span className="featured-price">Starts @ ₹1,35,000 /person</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DestinationDetail({ destination, onBack, email }) {
  return (
    <div className="destination-detail-overlay">
      <div className="destination-detail">
        <button className="detail-close-btn" onClick={onBack}>
          <i className="fa-solid fa-times"></i>
        </button>
        
        <div 
          className="detail-hero"
          style={{ backgroundImage: `url(${destination.image})` }}
        >
          <div className="detail-hero-overlay">
            <div className="detail-hero-content">
              <span className="detail-tag">{destination.tagline}</span>
              <h1>{destination.title}</h1>
              <div className="detail-meta">
                <span><i className="fa-regular fa-clock"></i> {destination.duration}</span>
                <span><i className="fa-solid fa-star"></i> {destination.rating} ({destination.reviews})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container">
          <div className="detail-content">
            <section className="detail-section">
              <h2><i className="fa-solid fa-info-circle"></i> About This Tour</h2>
              <p>{destination.description}</p>
            </section>

            <section className="detail-section">
              <h2><i className="fa-solid fa-star"></i> Tour Highlights</h2>
              <div className="detail-highlights">
                {destination.highlights.map((h, i) => (
                  <span key={i}><i className="fa-solid fa-check-circle"></i> {h}</span>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <h2><i className="fa-solid fa-list-check"></i> What's Included</h2>
              <div className="detail-inclusions">
                {destination.inclusions.map((inc, i) => (
                  <div key={i} className="inclusion-item">
                    <i className="fa-solid fa-check"></i>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <h2><i className="fa-solid fa-route"></i> Day-by-Day Itinerary</h2>
              <div className="detail-itinerary">
                {destination.itinerary.map((item, i) => (
                  <div key={i} className="itinerary-day">
                    <div className="itinerary-day-number">{item.day}</div>
                    <div className="itinerary-day-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="detail-sidebar">
            <div className="price-card">
              <div className="price-card-header">
                <span className="price-original">{destination.originalPrice}</span>
                <div className="price-main">
                  <span className="price-amount">{destination.price}</span>
                  <span className="price-per">/person</span>
                </div>
              </div>
              <div className="price-card-rating">
                <StarRating rating={Math.round(destination.rating)} />
                <span>{destination.reviews} reviews</span>
              </div>
              <a 
                className="price-card-cta"
                href={`mailto:${email}?subject=${encodeURIComponent(`Enquiry for ${destination.title}`)}`}
              >
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

function App() {
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
      setShowBackToTop(scrollTop > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  const handleDestinationSelect = (id) => {
    const dest = destinationDetails[id] || destinationDetails.thailand
    setSelectedDestination(dest)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePackageClick = (pkg, e) => {
    e.preventDefault()
    const dest = destinationDetails[pkg.destinationId] || destinationDetails.thailand
    setSelectedDestination(dest)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedDestination(null)
  }

  if (selectedDestination) {
    return (
      <DestinationDetail 
        destination={selectedDestination} 
        onBack={handleBack}
        email={contact.email}
      />
    )
  }

  return (
    <div className="page-shell" ref={sectionRef}>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <header className="topbar">
        <div className="section-shell topbar-inner">
          <a className="brand" href="#home" aria-label="Trident Net Holidays home" onClick={(e) => { e.preventDefault(); setSelectedDestination(null); }}>
            <img
              className="brand-logo"
              src="/assets/trident-logo.png"
              alt="Trident Net Holidays"
            />
            <span className="brand-meta">
              Travel Division of Trident Time Share (P) Ltd.
            </span>
          </a>

          <nav className="nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setSelectedDestination(null); }}>Home</a>
            <DropdownMenu 
              title="International" 
              categories={internationalDestinations}
              onSelect={handleDestinationSelect}
            />
            <DropdownMenu 
              title="Domestic" 
              categories={domesticDestinations}
              onSelect={handleDestinationSelect}
            />
            <a href="#mice">MICE</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="nav-cta" href={`mailto:${contact.email}`}>
            <i className="fa-solid fa-phone"></i> Plan Your Holiday
          </a>
        </div>
      </header>

      <main className="site-main">
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
            {heroImages.map((slide, index) => (
              <div 
                key={index}
                className={`hero-slide ${index === currentHeroSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-slide-overlay"></div>
              </div>
            ))}
          </div>
          
          <div className="hero-content-wrapper">
            <div className="section-shell hero-section">
              <div className="hero-copy">
                <div className="hero-badge">
                  <i className="fa-solid fa-award"></i> Award Winning Travel Agency
                </div>
                
                <div className="hero-taglines">
                  {heroImages.map((slide, index) => (
                    <div key={index} className={`hero-tagline ${index === currentHeroSlide ? 'active' : ''}`}>
                      <h2>{slide.tagline}</h2>
                      <p className="hero-location"><i className="fa-solid fa-location-dot"></i> {slide.location}</p>
                    </div>
                  ))}
                </div>
                
                <h1>Discover Your Next <span className="highlight-text">Adventure</span></h1>
                <p className="hero-text">
                  Experience world-class travel planning with Trident Net Holidays. 
                  From exotic international destinations to serene domestic getaways, 
                  MICE events to luxury cruises - we craft unforgettable journeys.
                </p>

                <div className="hero-actions">
                  <a className="primary-button" href="#international">
                    <i className="fa-solid fa-globe"></i> Explore International
                  </a>
                  <a className="secondary-button" href="#domestic">
                    <i className="fa-solid fa-map-pin"></i> Discover Domestic
                  </a>
                </div>

                <div className="trust-strip">
                  {trustPoints.map((item, idx) => (
                    <div key={idx} className="trust-item">
                      <i className={`fa-solid ${item.icon}`}></i>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-panel reveal" style={{ animationDelay: '0s' }}>
                <article className="hero-featured-card shimmer">
                  <div 
                    className="hero-featured-image"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1400&q=80)' }}
                  >
                    <div className="hero-badge-overlay">
                      <span className="discount-badge">UP TO 30% OFF</span>
                      <span className="rating-badge"><i className="fa-solid fa-star"></i> 4.9</span>
                    </div>
                  </div>
                  <div className="hero-featured-content">
                    <p className="card-kicker">SPECIAL OFFER</p>
                    <h2>Thailand Dream Tour</h2>
                    <div className="price-row">
                      <span className="current-price">₹54,999</span>
                      <span className="old-price">₹79,999</span>
                      <span className="duration">7N / 8D</span>
                    </div>
                    <div className="highlights-tags">
                      <span><i className="fa-solid fa-check"></i> Flights</span>
                      <span><i className="fa-solid fa-check"></i> Hotels</span>
                      <span><i className="fa-solid fa-check"></i> Sightseeing</span>
                    </div>
                    <a className="cta-button" href="#" onClick={() => handleDestinationSelect('thailand')}>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
          
          <div className="hero-dots">
            {heroImages.map((_, index) => (
              <button 
                key={index}
                className={`hero-dot ${index === currentHeroSlide ? 'active' : ''}`}
                onClick={() => setCurrentHeroSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(91,169,200,0.08)" d="M0,40 C240,90 480,-10 720,40 C960,90 1200,-10 1440,40 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        <section className="section-band international-band" id="international">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-plane-departure"></i> International Tours</p>
              <h2>Explore the World with Our Premium International Packages</h2>
              <p>Handpicked international destinations with flights, hotels, sightseeing and expert guidance.</p>
            </div>

            <div className="package-grid reveal-stagger">
              {internationalPackages.map((item) => (
                <article className="package-card" key={item.title} onClick={(e) => handlePackageClick(item, e)}>
                  <div
                    className="package-media"
                    style={{ '--card-image': `url(${item.image})` }}
                  >
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
                      {item.highlights.slice(0, 3).map((h, i) => (
                        <span key={i}><i className="fa-solid fa-circle-check"></i> {h}</span>
                      ))}
                    </div>
                    <div className="package-footer">
                      <div className="price-block">
                        <span className="price-old">{item.originalPrice}</span>
                        <span className="price-new">{item.price}</span>
                        <span className="price-per">/person</span>
                      </div>
                      <a href="#" className="book-btn">
                        View Details
                      </a>
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

        <section className="section-band domestic-band" id="domestic">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-map-location-dot"></i> Domestic Tours</p>
              <h2>Discover Incredible India with Our Domestic Packages</h2>
              <p>From the majestic Himalayas to serene backwaters, explore India's beauty with us.</p>
            </div>

            <div className="package-grid reveal-stagger">
              {domesticPackages.map((item) => (
                <article className="package-card" key={item.title} onClick={(e) => handlePackageClick(item, e)}>
                  <div
                    className="package-media"
                    style={{ '--card-image': `url(${item.image})` }}
                  >
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
                      {item.highlights.slice(0, 3).map((h, i) => (
                        <span key={i}><i className="fa-solid fa-circle-check"></i> {h}</span>
                      ))}
                    </div>
                    <div className="package-footer">
                      <div className="price-block">
                        <span className="price-old">{item.originalPrice}</span>
                        <span className="price-new">{item.price}</span>
                        <span className="price-per">/person</span>
                      </div>
                      <a href="#" className="book-btn">
                        View Details
                      </a>
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

        <section className="section-band mice-band" id="mice">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-briefcase"></i> MICE Tours</p>
              <h2>Corporate Events & MICE Solutions</h2>
              <p>Professional MICE (Meetings, Incentives, Conferences & Exhibitions) services tailored for your business needs.</p>
            </div>

            <div className="mice-grid reveal-stagger">
              {miceServices.map((service) => (
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
              <a className="primary-button" href={`mailto:${contact.email}`}>
                <i className="fa-solid fa-envelope"></i> Contact MICE Team
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#f7f4ee" d="M0,30 C240,80 480,10 720,40 C960,70 1200,20 1440,50 L1440,100 L0,100 Z" opacity="0.4"/>
            <path fill="rgba(91,169,200,0.05)" d="M0,20 C240,70 480,0 720,30 C960,60 1200,10 1440,40 L1440,100 L0,100 Z"/>
          </svg>
        </div>

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

        <section className="section-band careers-band" id="careers">
          <div className="section-shell">
            <div className="section-heading reveal">
              <p className="section-tag"><i className="fa-solid fa-briefcase"></i> Join Our Team</p>
              <h2>Build Your Career with Trident Net Holidays</h2>
              <p>We're always looking for passionate individuals who love travel and want to help others create unforgettable memories.</p>
            </div>

            <div className="careers-grid reveal-stagger">
              {careerOpenings.map((opening, index) => (
                <article className="career-card" key={opening.title} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="career-icon">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
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
                    <ul>
                      {opening.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
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
                <p>We're always open to talented individuals. Send us your resume and let's explore opportunities together!</p>
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

        <section className="section-band contact-band" id="contact">
          <div className="section-shell contact-section">
            <div className="contact-copy">
              <p className="section-tag"><i className="fa-solid fa-phone-volume"></i> Contact Trident</p>
              <h2>Ready to Start Your Journey?</h2>
              <p>
                Get in touch with our travel experts and let us craft your perfect holiday.
              </p>

              <div className="contact-lines">
                <a href={`mailto:${contact.email}`}><i className="fa-solid fa-envelope"></i> {contact.email}</a>
                {contact.phones.map((phone) => (
                  <a href={`tel:${phone.replaceAll(/[^+\d]/g, '')}`} key={phone}>
                    <i className="fa-solid fa-phone"></i> {phone}
                  </a>
                ))}
                <p><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
              </div>
            </div>

            <article className="map-card reveal" style={{ animationDelay: '0s' }}>
              <div className="map-frame">
                <iframe
                  title="Trident Net Holidays location map"
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="map-card-body">
                <p className="section-tag">Location Map</p>
                <h3>Visit Our Office</h3>
                <p>
                  Find Trident Net Holidays near National Park in Borivali East, Mumbai.
                </p>
                <a className="map-link" href={mapLink} target="_blank" rel="noreferrer">
                  <i className="fa-solid fa-location-arrow"></i> Open In Google Maps
                </a>
              </div>
            </article>

            <form className="enquiry-form reveal" style={{ animationDelay: '0s' }} onSubmit={handleEnquirySubmit}>
              <h3 className="form-title">Send Us an Enquiry</h3>
              <label>
                Your Name
                <input name="name" placeholder="John Doe" required />
              </label>
              <label>
                Email Address
                <input name="email" placeholder="you@example.com" type="email" required />
              </label>
              <label>
                Destination
                <input
                  name="destination"
                  placeholder="Thailand, Kerala, Dubai..."
                />
              </label>
              <label>
                Your Message
                <textarea
                  name="message"
                  placeholder="Tell us about your travel plans..."
                  rows="5"
                />
              </label>
              <button type="submit">
                <i className="fa-solid fa-paper-plane"></i> Send Enquiry
              </button>
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
              <a href="#home" onClick={(e) => { e.preventDefault(); setSelectedDestination(null); }}>Home</a>
              <a href="#international">International Tours</a>
              <a href="#domestic">Domestic Tours</a>
              <a href="#mice">MICE Services</a>
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
        <div className="footer-bottom">
          <p>© 2024 Trident Net Holidays. All rights reserved.</p>
        </div>
      </footer>
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  )
}

export default App
