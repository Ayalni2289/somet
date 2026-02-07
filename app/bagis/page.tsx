import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Bağış — SOMET',
}

export default function BagisPage() {
  return (
    <div>
      <section style={{ marginTop: "-300px" }}>
        <div className="container" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: 44, lineHeight: 1.05 }}>Somet’e Destek Olun</h1>
          <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <Link href="/" style={{ color: '#2DD4BF', zIndex: 1, textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</Link>
            <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
            <span style={{ color: '#d1f7ef', fontSize: 15 }}>Somet’e Destek Olun</span>
          </nav>
        </div>
      </section>

      {/* Main content - image card overlapping the hero */}
      <main style={{ padding: '48px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, backgroundColor: 'white', borderRadius: 22 }}>
          <div style={{ position: 'relative' }}>
          </div>
          <article style={{ maxWidth: 800, width: '100%', color: '#222', lineHeight: 1.8, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', width: '100%', maxWidth: 520, marginTop: 100, position: 'relative', paddingTop: 20 }}>
              <h1 style={{ fontSize: 40, lineHeight: 1.2, color: '#510179', fontWeight: 700 }}>
                Somet’e Destek Olun
              </h1>
              <div
                id="heart-group"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 50,
                  display: 'flex',
                  gap: 12,
                  color: '#510179',
                  fontSize: 18,
                }}
              >
                <i className="fa fa-heart" />
                <i className="fa fa-heart" style={{ opacity: 0.8 }} />
                <i className="fa fa-heart" style={{ opacity: 0.6 }} />
              </div>
              <p>
                Sevgili dostlar, desteğiniz bizim için çok kıymetli. Daha iyi ve daha sürdürülebilir bir eğitim için, desteklerinizi esirgemeyin. İyi ki varsınız, sizleri seviyoruz.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 100, alignItems: "center", gap: 24, justifyContent: "center", flexWrap: 'wrap' }}>
              <img src="/images/qnb.jpg" alt="Somet’e Destek Olun" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong style={{ fontSize: 18, lineHeight: 1.2, color: "#2C016B", fontWeight: 700 }}>Somet Zihinsel Gelişim Derneği</strong>
                <p>Eskişehir Vergi Dairesi: 7651702086</p>
                <p style={{ fontSize: 24, lineHeight: 1.2, fontWeight: 700 }}>TR28 0011 1000 0000 0092 8988 44</p>
              </div>
            </div>
            <div style={{ height: 100, width: '100%' }} aria-hidden="true" />
            <img src="/images/destek.png" alt="Somet’e Destek Olun" style={{ width: '175%', marginBottom: -100, marginTop: -120 }} />
            <p style={{ textAlign: 'center', fontSize: 12, lineHeight: 1.2, fontWeight: 400 }}>Somet’e olan cömert katkılarınızdan dolayı minnettarız
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
