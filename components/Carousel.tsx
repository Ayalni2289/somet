"use client"

import React, { useEffect, useRef, useState } from 'react'

type Slide = {
  img: string
  title?: string
  description?: string
}

const slides: Slide[] = [
  { img: '/images/bagis-slider-2.png', title: '', description: 'Kıymetli bağışlarınızla, daha fazla zihinsel engelli bireye, daha iyi hizmet sağlıyoruz.' },
  { img: '/images/thumbnail_Ana Giriş sayfa.jpg', title: 'Somet 20 Yaşında!', description: 'İlk günkü heyecanla, sevgiyle ve sabırla hep daha iyiye…' },
  { img: '/images/yeni-somet-binasi-2.png', title: 'Bir Hayalden Gerçeğe…', description: 'SOMET’in amaca özgün yapılmış yeni eğitim merkezi hizmete açıldı.' },
]

const Carousel: React.FC = () => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, 7000)
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [])

  // Compute arrow top/height to vertically align with the carousel area
  useEffect(() => {
    const calc = () => {
      const el = containerRef.current
      if (!el) return setArrowStyle({})
      const rect = el.getBoundingClientRect()
      setArrowStyle({ top: rect.top + 'px', height: rect.height + 'px' })
    }
    calc()
    window.addEventListener('resize', calc)
    window.addEventListener('scroll', calc, { passive: true })
    return () => { window.removeEventListener('resize', calc); window.removeEventListener('scroll', calc) }
  }, [])

  const go = (i: number) => {
    setIndex(i % slides.length)
  if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = window.setInterval(() => setIndex(s => (s + 1) % slides.length), 7000) }
  }

  return (
    <section className="carousel-root">
      <div className="container" ref={containerRef}>
      <div id="carousel-slider" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" role="listbox">
          {slides.map((s, i) => (
            <div key={i} className={`carousel-slide ${i === index ? 'active' : ''}`} aria-hidden={i !== index}>
              <div className="carousel-caption">
                <h2>{s.title}</h2>
                <p>{s.description}</p>
              </div>
              <img src={s.img} alt={s.title || `slide-${i}`} />
            </div>
          ))}
        </div>
      </div>
      {/* Side arrows (overlay) - full height clickable area with small circular visual. Placed inside .container so horizontal position is stable */}
     <button
  className="carousel-arrow left carousel-control-prev"
  onClick={() => go((index - 1 + slides.length) % slides.length)}
  aria-label="Previous slide"
>
  <span className="arrow-inner" aria-hidden="true">
    <i className="fas fa-chevron-left"></i>
  </span>
</button>

<button
  className="carousel-arrow right carousel-control-next"
  onClick={() => go((index + 1) % slides.length)}
  aria-label="Next slide"
>
  <span className="arrow-inner" aria-hidden="true">
    <i className="fas fa-chevron-right"></i>
  </span>
</button>

    </div>
  </section>
  )
}

export default Carousel
