"use client"

import React, { useEffect, useState, useRef } from 'react'

type Project = {
  id: number
  title: string
  image?: string
  link?: string
}

const demoProjects: Project[] = [
  { id: 1, title: "Yeni Eğitim Binası", image: '/images/IMG_4473_3b1e0acb80.jpg', link: "merkez-insaatimiz-basladi" },
  { id: 2, title: "Sera", image: '/images/sera9.jpg', link: "sera" },
  { id: 3, title: "Tiyatro SOMET Sahnede", image: '/images/600290845_10163550713753563_1298238447343315439_n_fdc04562fc.jpg', link: "tiyatro-somet-sahnede" },
  { id: 4, title: "Halk Oyunları", image: '/images/2T8R.jpg', link: "halk-oyunlari" },
  { id: 5, title: "Aşkın ve Sevginin Korosu", image: '/images/Slayt3(2).jpg', link: "askin-ve-sevginin-korosu" },
  { id: 6, title: "Hafif Mobilya Üretimi", image: '/images/Slayt15_0da022bc48.jpg', link: "mobilya-uretim-egitimi" },
  { id: 7, title: "ZETTE-1", image: '/images/UYUO_1_46883e8d9c.jpg', link: "zihinsel-engellilerin-toplum-temelli-egitim-ve-rehabilitasyonlari-zette-1" },
]


const ProjectsGrid: React.FC = () => {
  const projects = demoProjects
  const [visibleCount, setVisibleCount] = useState(4)

  // slider internal state
  const [slide, setSlide] = useState(0) // current slide index within cloned array
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [cardWidthPx, setCardWidthPx] = useState<number | null>(null)
  const stepRef = useRef<number>(0)

  // animation/autoplay guards
  const isAnimatingRef = useRef(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoplayTimer = useRef<number | null>(null)
  const AUTOPLAY_DELAY = 3500 // ms

  useEffect(() => {
    function getVisible() {
      if (window.matchMedia('(max-width: 640px)').matches) return 1
      if (window.matchMedia('(max-width: 1000px)').matches) return 2
      return 4
    }

    function update() {
      setVisibleCount(getVisible())
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // number of clones at each end
  const clones = Math.min(visibleCount, projects.length)

  // Build visible slides with clones: [lastN, ...projects, firstN]
  const slides = [
    ...projects.slice(-clones),
    ...projects,
    ...projects.slice(0, clones),
  ]

  // initialize slide to the first real slide in the cloned array
  useEffect(() => {
    setSlide(clones)
  }, [clones, projects.length])

  // measure step (card width + margin) whenever visibleCount or viewport changes
  function measureStep() {
    const track = trackRef.current
    const vp = viewportRef.current
    if (!track || !vp) return

    const gap = 16 // matches CSS .project-card { margin-right: 16px }

    // compute a pixel-perfect card width so exactly `visibleCount` cards fit the viewport
    const viewportWidth = vp.clientWidth
    const totalGaps = Math.max(0, visibleCount - 1) * gap
    const cardWidth = Math.floor((viewportWidth - totalGaps) / visibleCount)

    // set explicit card width (px) so no fractional or partial cards show
    setCardWidthPx(cardWidth)

    const step = cardWidth + gap
    stepRef.current = step

    // position track so the "slide" index is visible
    const px = -slide * step
    track.style.transition = 'none'
    track.style.transform = `translateX(${px}px)`
  }

  // autoplay helpers
  function startAutoplay() {
    stopAutoplay()
    autoplayTimer.current = window.setInterval(() => {
      if (!isAnimatingRef.current) setSlide(prev => prev + 1)
    }, AUTOPLAY_DELAY) as unknown as number
  }

  function stopAutoplay() {
    if (autoplayTimer.current) {
      window.clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
    }
  }

  useEffect(() => {
    // measure and position track, then start autoplay
    measureStep()

    window.addEventListener('resize', measureStep)

    startAutoplay()

    return () => {
      window.removeEventListener('resize', measureStep)
      stopAutoplay()
    }
    // slides.length included so remeasure when slides change
  }, [visibleCount, slides.length])

  // advance to next slide (with loop)
  function handleNext() {
    // prevent queuing multiple advances while an animation is in progress
    if (isAnimatingRef.current) return
    setSlide(prev => prev + 1)
  }

  // after slide changes, apply transform and mark animating
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const px = -(slide * (stepRef.current || 0))

    track.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)'

    // mark animating; we'll clear this in transitionend handler
    isAnimatingRef.current = true
    setIsAnimating(true)

    track.style.transform = `translateX(${px}px)`
  }, [slide])

  // when transition ends, if we're on a clone, jump to the corresponding real slide without transition
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function onEnd(e: TransitionEvent) {
      // only respond to transform transition endings
      if (e.propertyName !== 'transform') return

      const totalReal = projects.length
      if (slide >= totalReal + clones) {
        // jumped to right-clones; do a soft fade reset to the first real slide
        const resetIndex = clones

        // fade out quickly to mask the instantaneous jump
        track.style.transition = 'opacity 150ms linear'
        track.style.opacity = '0'

        const onFadeOut = (ev: TransitionEvent) => {
          if (ev.propertyName !== 'opacity') return
          track.removeEventListener('transitionend', onFadeOut)

          // jump to reset position without visual transition
          track.style.transition = 'none'
          const px = -(resetIndex * (stepRef.current || 0))
          track.style.transform = `translateX(${px}px)`
          // force reflow
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          track.getBoundingClientRect()

          // restore transitions and fade back in
          track.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms linear'
          track.style.opacity = '1'
          // set logical slide index to the reset position
          setSlide(resetIndex)
        }

        track.addEventListener('transitionend', onFadeOut)
      } else {
        // a normal transform finished — clear animating flags so autoplay / clicks resume
        isAnimatingRef.current = false
        setIsAnimating(false)
      }
    }

    track.addEventListener('transitionend', onEnd)
    return () => track.removeEventListener('transitionend', onEnd)
  }, [slide, clones, projects.length])

  // pause autoplay on hover/focus for better UX
  function handleMouseEnter() {
    stopAutoplay()
  }
  function handleMouseLeave() {
    startAutoplay()
  }

  return (
    <section className="projects-section" aria-labelledby="projects-heading">
      <div className="container">
        <h2 id="projects-heading" className="projects-title"><strong>Sürdürülebilir</strong> Projeler</h2>

        <div className="projects-root" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="projects-viewport" ref={viewportRef}>
            <div className="projects-track" ref={trackRef}>
              {slides.map((p, idx) => {
                const basisCalc = `calc(${100 / visibleCount}% - 24px)`
                const articleStyle = cardWidthPx
                  ? { flex: `0 0 ${cardWidthPx}px` }
                  : { flex: `0 0 ${basisCalc}` }

                return (
                  <article
                    key={`${p.id}-${idx}`}
                    className="project-card"
                    tabIndex={0}
                    style={articleStyle}
                    onClick={() => {
                      if (p.link) {
                        window.location.href = `/${p.link}`;
                      }
                    }}
                  >
                    <div className="project-media">
                      <img src={p.image} alt={p.title} />
                    </div>
                    <div className="project-caption">{p.title}</div>
                  </article>
                )
              })}
            </div>
          </div>
          <button className="projects-arrow" aria-label="Next projects" onClick={handleNext} disabled={isAnimating}>➜</button>
        </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
