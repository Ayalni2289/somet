"use client"

import React from 'react'

const Support: React.FC = () => {
  return (
    <section className="support-section" style={{ padding: '72px 0' }}>
      <div className="container" style={{ textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#52107e', fontSize: '40px', margin: '0 0 12px 0', fontWeight: 600 }}>Somet'e Destek Olun</h2>
        <p style={{ maxWidth: 700, margin: '0 auto 18px auto', color: '#333' }}>
          Sevgili dostlar, desteğiniz bizim için çok kıymetli. Daha iyi ve daha sürdürülebilir bir eğitim için, desteklerinizi esirgemeyin. İyi ki varsınız, sizleri seviyoruz.
        </p>
        {/* Heart animation group */}
        <div id="heart-group" aria-hidden="true" style={{ margin: '18px 0', display: 'flex', gap: 18, justifyContent: 'center' }}>
          <i className='fa fa-heart'></i>
          <i className='fa fa-heart'></i>
          <i className='fa fa-heart'></i>
        </div>
        <a href="/bagis" className="donate-btn-light" style={{ borderRadius: 9999, padding: '10px 22px' }}>Detaylı Bilgi</a>
      </div>
    </section>
  )
}

export default Support
