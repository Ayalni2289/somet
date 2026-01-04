"use client"

import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="site-footer bg-white">
      {/* top purple strip with three circular features */}
      <div className="footer-top bg-[#633FDE] " style={{margin: "50px 0", padding: "30px 0", color: "#FFBF00"}}>
        <div className="container mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/sometzihinsel">
              <i className="fab fa-facebook-f"></i>
              <span>
                <strong className="text-sm font-semibold">Facebook</strong>
                <br />
                <span className="text-xs opacity-90">/sometzihinsel</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/sometzihinselgelisim/">
              <i className="fab fa-instagram"></i>
              <span>
                <strong className="text-sm font-semibold">Instagram</strong>
                <br />
                <span className="text-xs opacity-90">/sometzihinselgelisim</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="/bagis">
              <i className="far fa-heart"></i>
              <span>
                <strong className="text-sm font-semibold">Bağış Yap</strong>
                <br />
                <span className="text-xs opacity-90">Birlikte Hep Daha İyiye...</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* main columns */}
        <div className="footer-main py-12">
        <div className="container mx-auto max-w-6xl px-6">
            <div className="footer-flex flex flex-wrap justify-between gap-8 text-sm text-gray-700">

            <div className="flex-1 min-w-[220px]">
                <h4 className="text-purple-700 font-semibold mb-4">Hakkımızda</h4>
                <ul className="space-y-2">
                <li><a href="/hakkimizda" >Tanım, Misyon, Vizyon</a></li>
                <li><a href="/amac" >Amaç ve Hedefler</a></li>
                <li><a href="/degerlerimiz" >Değerlerimiz</a></li>
                <li><a href="/tarihce" >Tarihçe</a></li>
                <li><a href="/oguzhan-metintas" >Oğuzhan Metintaş</a></li>
                <img src="/images/footer-logo.svg" alt="somet" title='somet' />
                </ul>
            </div>

            <div className="flex-1 min-w-[220px]">
                <h4 className="text-purple-700 font-semibold mb-4">Organizasyon</h4>
                <ul className="space-y-2">
                <li><a href="/kurucularimiz" >Kurucular</a></li>
                <li><a href="/mutevelli-heyet" >Yönetim</a></li>
                <li><a href="/kurucularimiz" >Vakıf Senedi</a></li>
                <li><a href="/tuzuk" >Dernek Tüzüğü</a></li>
                </ul>
            </div>
            <div className="flex-1 min-w-[220px]">
                <h4 className="text-purple-700 font-semibold mb-4">Aktiviteler</h4>
                <ul className="space-y-2">
                <li><a href="/faaliyetlerimiz" >Faaliyetler</a></li>
                <li><a href="/aktiviteler/projelerimiz" >Projeler</a></li>
                <li><a href="/aktiviteler/kurumsal-etkinlikler" >Kurumsal Etkinlikler</a></li>
                </ul>
            </div>

            <div className="flex-1 min-w-[220px]">
                <h4 className="text-purple-700 font-semibold mb-4">Eğitim</h4>
                <ul className="space-y-2">
                <li><a href="/egitim-merkezi" >Eğitim Merkezi</a></li>
                <li><a href="/burs-olanaklarimiz" >ZETTE Modeli</a></li>
                <li><a href="/degerlerimiz" >Zihinsel Yetersizlik</a></li>
                <li><a href="/destek-programlarimiz" >Ailelere Öğütler</a></li>
               </ul>
            </div>
            <div className="flex-1 min-w-[220px]">
                <h4 className="text-purple-700 font-semibold mb-4"><a href="/dayanisma">Dayanışma</a></h4>
                  <ul className="space-y-2">
                    <li><a href="/burs-olanaklarimiz" >Burs İmkanları</a></li>
                    <li><a href="/destek-programlarimiz" >Destek Programlarımız</a></li>
                  </ul>
            </div>

            <div className="flex-1 min-w-[220px]">
                <h4 className="text-purple-700 font-semibold mb-4">İletişim</h4>
                <ul className="space-y-3">
                <li>
                    <div className='contact-box'>
                    <i className='fa fa-phone-volume'></i>
                    <strong>Eğitim Merkezi</strong>
                    <div className="text-xs">0506 235 30 55<br />0222 226 10 06</div>
                    </div>
                </li>
                <li>
                    <div className='contact-box'>
                    <i className='fa fa-phone-volume'></i>
                    <strong>Vakıf Telefon</strong>
                    <div className="text-xs">0533 249 81 91</div>
                    </div>
                </li>
                <li>
                    <div className='contact-box'>
                    <i className='fa fa-envelope'></i>
                    <strong>E-Posta</strong>
                    <div className="text-xs">sometzihinsel@gmail.com</div>
                    </div>
                </li>
                <li>
                    <div className='contact-box'>
                    <i className='fa fa-map-marker-alt'></i>
                    <strong>Adres</strong>
                    <div className="text-xs">Aşağısöğütönü mevkii, Yaşamkent mahallesi, 1539. Sokak, No: 2<br />Tepebaşı
                    , / ESKİŞEHİR</div>
                    </div>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>

      {/* bottom area with centered small portrait */}
        <div className="footer-bottom relative py-12">
            <div className="container mx-auto max-w-6xl px-6 text-center text-gray-500" style={{justifyContent:"center"}}>
                <div className="footer-portrait">
                    <img src="/images/footer.jpg" alt="Oğuzhan" className="portrait" style={{boxShadow: "none"}} />
                    <p style={{fontFamily:"'QueenofEternity', sans-serif", fontSize:"24px"}}>Sevgili Oğuzhan Metintaş Vakfı</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
