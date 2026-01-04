"use client"

import React from 'react'

const Hero: React.FC = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: "url('/images/zette-bg.jpg')",
        backgroundSize: '100%',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '64px 0'
      }}
    >
      <div className="container">
        <div style={{ maxWidth: 760, position: 'relative' }}>
          <img src="/images/white-logo.png" alt="" style={{ width: 56, position: 'absolute', left: -36, top: -22, height: 57, display: 'block', transform: 'translateY(-2px)' }} />
          <h1 style={{ fontSize: 48, margin: '8px 0 12px 0' }}>Türkiye'de ilk ve Tek!</h1>
          <p style={{ fontSize: 18, lineHeight: 1.4, marginBottom: 18 }}>
            <strong>Somet</strong> tarafından geliştirilen <span style={{ color: '#ffd24d' }}>ZETTE</span> modeli, kişiye özel programlarla eğitim, sağlık ve bakım hizmetlerini bir araya getiren entegre bir yaklaşım sunuyor.
          </p>
          <a href="/documents/Zette.pdf" className="donate-btn" target="_blank" rel="noopener noreferrer">Detaylı Bilgi</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
