import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'İletişim — Somet',
}

export default function IletisimPage() {
  return (
    <div>
      <section style={{ marginTop: "-300px" }}>
        <div className="container" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: 44, lineHeight: 1.05 }}>İletişim</h1>
          <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <Link href="/" style={{ color: '#2DD4BF', textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</Link>
            <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
            <span style={{ color: '#d1f7ef', fontSize: 15 }}>İletişim</span>
          </nav>
        </div>
      </section>

      <main style={{ padding: '48px 0' }}>
        <div className="container" style={{ flexDirection: 'column', gap: 28 }}>
          {/* Map */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 1100, borderRadius: 8, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.10)' }}>
              <div style={{ width: 1100, borderRadius: 8, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.10)', position: 'relative' }}>
                {/* Top-left info card overlay to mimic Google place card */}
                <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 30, background: '#fff', padding: '12px 14px', borderRadius: 8, boxShadow: '0 8px 22px rgba(0,0,0,0.12)', maxWidth: 420 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Somet Zihinsel Gelişim Derneği</div>
                  <div style={{ fontSize: 13, color: '#333', marginBottom: 8 }}>Aşağısöğütönü mevkii, Yaşamkent mahallesi, 1539. Sokak, No: 2
Tepebaşı , / ESKİŞEHİR</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <a href="https://www.google.com/maps/dir/39.7560784,30.4933619/Ya%C5%9Famkent,+Tepeba%C5%9F%C4%B1%2FEski%C5%9Fehir/@39.7867967,30.4266385,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x14cc140d55555c7d:0x55d2f0c7ec05c6c9!2m2!1d30.4530456!2d39.8192848?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 600 }}>Yol Tarifi</a>
                  </div>
                </div>
                <iframe
                  title="Somet Zihinsel Gelişim Merkezi"
                  src="https://www.google.com/maps?q=39.811985,30.445347&hl=tr&z=16&output=embed"
                  width="100%"
                  height="460"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Contact cards */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 1100 }}>
              <h3 style={{ margin: '28px 0 12px 0', color: '#222', fontSize: 22 }}>Somet Zihinsel Gelişim Merkezi</h3>
              <div className="card" style={{ padding: 22 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <div className="contact-box">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <div>
                        <strong>Eğitim Merkezi</strong>
                        <div className="text-xs" style={{ fontSize: 15 }}>0506 235 30 55<br/>0222 226 10 06</div>
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div className="contact-box">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                      <div>
                        <strong>E-Posta</strong>
                        <div className="text-xs" style={{ fontSize: 15 }}>sometzihinsel@gmail.com</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="contact-box">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <div>
                        <strong>Vakıf Telefon</strong>
                        <div className="text-xs" style={{ fontSize: 15 }}>0533 249 81 91</div>
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div className="contact-box">
                      <i className="fa fa-location-dot" aria-hidden="true"></i>
                      <div>
                        <strong>Adres</strong>
                        <div className="text-xs" style={{ fontSize: 15 }}>Aşağısöğütönü mevkii, Yaşamkent mahallesi, 1539. Sokak, No: 2
Tepebaşı , / ESKİŞEHİR</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </main>
      <Footer />
    </div>
  )
}
