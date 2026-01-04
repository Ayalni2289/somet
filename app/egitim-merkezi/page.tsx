import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'

export const metadata = {
	title: 'Amaç ve Hedefler — SOMET',
}
const members = [
  { name: 'Prof. Dr. Muzaffer METİNTAŞ', role: "SOMET'in Başkanı", img: '/images/muzaffer-metintas.png' },
  { name: 'Mukadder ÇINAR', role: 'Merkez Müdürü – Kurucu', img: '/images/mukadder-cinar.jpg' },
  { name: 'Öznur METİNTAŞ', role: 'Kurumsal İletişim Sorumlusu', img: '/images/Oznur-METINTAS_.png' },
  { name: 'Şaban YARAR', role: 'Özel Eğitim Öğretmeni', img: '/images/Saban-YARAR_.png' },
  { name: 'Alize ŞULAN', role: 'Özel Eğitim Öğretmeni', img: '/images/Alize-SULAN_.png' },
  { name: 'Sevda BULURSOY', role: 'Psikolog', img: '/images/Sevda-BULURSOY_.png' },
  { name: 'Cansel AKTAŞ', role: 'Psikolog', img: '/images/Cansel-AKTAS_.png' },
  { name: 'Şeniz BAŞAKINCI', role: 'El İşi Öğretmeni', img: '/images/Seniz-BASAKINCI_.png' },
  { name: 'Aysel UYANIK', role: 'Eğitmen', img: '/images/Aysel-UYANIK_.png' },
  { name: 'Şahinde KOCATAŞ', role: 'Ablamız', img: '/images/Sahinde-KOCATAS_.png' },
  { name: 'İlhan GÖÇMEN', role: 'Ağabeyimiz', img: '/images/Ilhan-GOCMEN_.png' },
  { name: 'Tunç TARI', role: 'Servis Sorumlusu', img: '/images/Tunc-TARI_.png' },
  { name: 'Gülsevim YAŞAR', role: 'Servis Görevlisi', img: '/images/Gulsevim-YASAR_.png' },
]

export default function EgitimMerkeziPage() {
	return (
		<div>
        <section style={{ marginTop: "-300px" }}>
            <div className="container" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: '#fff', margin: 0, fontSize: 44, lineHeight: 1.05 }}>Eğitim Merkezi ve Eğitim
</h1>
            <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
                <Link href="/" style={{ color: '#2DD4BF', zIndex: 1, textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</Link>
                <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
                <span style={{ color: '#d1f7ef', fontSize: 15 }}>Eğitim Merkezi ve Eğitim
</span>
            </nav>
            </div>
        </section>



			<main style={{ padding: '66px 0' }}>
				<div className="container" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
					<div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.18)', transform: 'translateY(-60px)' }}>
						<img src="/images/hakkimizda-gorsel-3.jpg" alt="Kapı" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
                    <div className="content" style={{ maxWidth: 800, color: '#222', lineHeight: 1.4 }}>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
                			{members.slice(0, 8).map((m, i) => (
                  				<div key={`y-${i}`} style={{ background: '#fafafa', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.02)' }}>
                    				<div style={{ width: 140, height: 140, margin: '0 auto 14px', borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      				<img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    				</div>
                    			<div style={{ fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 8 }}>{m.name}</div>
                    	<div style={{ color: '#666', fontSize: 14 }}>{m.role}</div>
                  </div>
                ))}
              		</div>
					</div>
										<div style={{ maxWidth: 920, color: '#222', lineHeight: 1.6 }}>
											<h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Özel Odunpazarı Özel Eğitim ve Rehabilitasyon Merkezi</h2>

											<p>
												Özel gereksinimi olan bireylere hizmet vermeyi amaçlayan <strong>Özel Odunpazarı Özel Eğitim ve Rehabilitasyon Merkezi</strong>, SOMET tarafından maddi bir kazanç beklentisi olmadan, eğitim faaliyetlerini geliştirerek devam ettirmek üzere kurulmuştur.
											</p>

											<p>
												Merkez, <strong>Milli Eğitim Bakanlığı</strong>’nın uygun gördüğü ve denetlediği çerçevede faaliyet göstermektedir. Merkez’de zihinsel engelliliği/yetersizliği olan bireyleri hayata hazırlamak, onlara en üst seviyede bağımsızlık kazandırmak; fiziksel, ruhsal, sosyal ve duygusal alanlarda eğitim alarak gelişmelerini sağlamak; toplum içinde sahip oldukları yeteneklere uygun düzeyde bağımsız yaşamalarını ve kendi kendilerine yetebilen fertler olmalarını sağlamak amaçlanır. Bu doğrultuda, Birleşmiş Milletler tarafından benimsenen ve önerilen zihin engelliye özelleştirilmiş toplum temelli gelişim ve kazanım modeli olan <strong>ZETTE (Zihinsel Engellilerin Toplum Temelli Eğitimi)</strong> Programı uygulanır.
											</p>

											<p>
												Merkez’de standart uygulamalar yoktur; "bir ölçü her bedene uymaz" anlayışıyla her birey ayrı değerlendirilir. Birey odaklı eğitim anlayışı ile engellilerin yetenekleri, istekleri, beklentileri, hedefleri ve ihtiyaçları merkeze alınarak eğitim programları geliştirilir ve uygulanır.
											</p>

											<h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 12 }}>ZETTE Programı’nda iki temel hedef vardır:</h3>
											<ul style={{ marginTop: 8, paddingLeft: '1.25rem' }}>
												<li>Engelli bireye toplum içinde yaşama yönelik eğitim ve uygulama vermek.</li>
												<li>Bu uygulama ve eğitim için yeterli zamanı ve mekânı kullanmak.</li>
											</ul>

											<p>
												ZETTE Programı’nda temel eğitimi verecek ve koordinasyonu sağlayacak iyi donanımlı bir eğitim merkezi ve geniş bir eğitim ekibi olmalıdır. Bu ekip danışmanlar ve gönüllü yardımcılarla desteklenir. Eğitim alan kişi eğitim sürecinde yaşamın her anını ve özelliğini görür ve yaşar.
											</p>

											<h4 style={{ fontSize: 15, fontWeight: 700, marginTop: 12 }}>ZETTE Programı’nda eğitim uygulama başlıkları şöyledir:</h4>
											<ul style={{ marginTop: 8, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
												<li>Kendini ve toplumu tanıma.</li>
												<li>Kendine yetme.</li>
												<li>Bedeni geliştirme.</li>
												<li>Zihni geliştirme.</li>
												<li>Beden ve zihin arasında koordinasyonu arttırma.</li>
												<li>Toplum içine intibak; sosyalleşme.</li>
												<li>Yaşamı kazanma.</li>
											</ul>
										</div>
										<section style={{ padding: '24px 0' }}>
											<div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
												<div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
													<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
														{[
															'/images/A10-300x225.jpg',
															'/images/MF6Z-300x225.jpg',
															'/images/J4RS-300x225.jpg',
															'/images/A2-300x225.jpg',
															'/images/3ZFO-300x225.jpg',
															'/images/IMG_00062-300x225.jpg',
															'/images/G0J9-300x225.jpg',
															'/images/20130625_152609-300x225.jpg',
															'/images/IMG_00043-300x225.jpg',
															'/images/A4-300x225.jpg',
															'/images/20130625_161427-300x225.jpg',
															'/images/YHK8-300x225.jpg',
														].map((src, idx) => (
															<div key={idx} style={{ overflow: 'hidden', borderRadius: 10 }}>
																<img src={src} alt={`Eğitim görseli ${idx + 1}`} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
															</div>
														))}
													</div>
												</div>
											</div>

														{/* Formatted ZETTE program and Merkez education section (placed after gallery) */}
														<div style={{ maxWidth: 920, margin: '18px auto 0', color: '#222', lineHeight: 1.6 }}>
															<h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>ZETTE Programı beş aşamadan oluşmaktadır:</h3>
															<ol style={{ marginLeft: '1.25rem', marginBottom: 16 }}>
																<li>Özbakım ve özgelişim,</li>
																<li>Sosyal gelişim,</li>
																<li>Sağlık ve bakımı sürdürme,</li>
																<li>Beceri ve meslek kazanımı; üretici olma,</li>
																<li>Fertleşme ve topluma aidiyet.</li>
															</ol>

															<h2 style={{ fontSize: 30, fontWeight: 800, marginTop: 8, marginBottom: 12 }}>Merkez'de Eğitim Programı Uygulaması</h2>
															<p style={{ marginBottom: 12 }}>
																Merkez, ZETTE Programı aşamalarını sağlamak için <strong>tam</strong> ve <strong>yarı zamanlı</strong> seanslarla öğrencilerimize en uzun sürede ve en kaliteli eğitimi verebilme anlayışıyla hareket etmektedir. Uzun süreli eğitimin, birçok gelişim basamağında öğrenciyi daha ileriye taşıdığına inanılmaktadır.
															</p>

															<p style={{ marginBottom: 8 }}>Merkezimizde eğitim saatleri aşağıdaki zaman aralıklarında yürütülür:</p>
															<ul style={{ marginTop: 8, paddingLeft: '1.25rem', listStyleType: 'disc' }}>
																<li style={{ marginBottom: 8 }}><strong>Tam gün öğrenciler için: haftada 40; ayda 160 saat</strong></li>
																<li style={{ marginBottom: 8 }}><strong>Yarım gün öğrenciler için: haftada 15; ayda 60 saat</strong></li>
																<li style={{ marginBottom: 8 }}><strong>Bireysel eğitim alan öğrenciler için: haftada 10; ayda 40 saat</strong></li>
																<li style={{ marginBottom: 8 }}><strong>Cumartesi günleri: ücretli destek programı</strong></li>
															</ul>

															<p style={{ marginTop: 12 }}>
																Modern eğitim sistemleri, tecrübe ağırlıklı uygulamalardır. Öncelikle bireyin yalnız başına yaşamını sürdürebilmesini sağlayacak kazanım dersleri, ardından <strong>resim, müzik, tiyatro, gösteri ve beden eğitimi</strong> gibi programlarla öğrencinin sosyal ve yaratıcı yönleri desteklenir. Bu dersler; <strong>yaşam, beden ve ruh gelişimini; insani yaratıcılığı</strong> besleyen çalışmalardır.
															</p>

															<p>
																<strong>Yüzebilmek,</strong> bir çocuğun hayatta boğulmaması için olduğu kadar özgüven kazanımı için de önemlidir. Dersler sırasında zihinsel engelli bireyler yeteneklerini keşfeder, yaratıcılıkları gelişir ve günlük yaşama uyumları artar. Öğretmenler ve öğrenciler birbirlerinden öğrenir ve birlikte gelişirler.
															</p>
														</div>
														<div className="container" style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 60 }}>
												<div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
													<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
														{[
															'/images/OZ10A.jpg',
															'/images/20130624_143250.jpg',
															'/images/Y2N0.jpg',
															'/images/VX9K.jpg',
															'/images/A1-300x225.jpg',
															'/images/OTQK.jpg',
															'/images/OZ3.jpg',
															'/images/OZ8.jpg',
															'/images/A5-300x225.jpg',
															'/images/20130612_1132431.jpg',
															'/images/OZ1.jpg',
															'/images/20130612_113912.jpg',
														].map((src, idx) => (
															<div key={idx} style={{ overflow: 'hidden', borderRadius: 10 }}>
																<img src={src} alt={`Eğitim görseli ${idx + 1}`} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
															</div>
														))}
													</div>
												</div>
											</div>
											<div className="container" style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 60 }}>
												<div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
													<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
														{[
															'/images/Sevginin-ve-Akn-Korosu.jpg',
															'/images/DSC03285.jpg',
															'/images/9JND.jpg',
															'/images/toplu.jpg',
															'/images/Slayt143.jpg',
															'/images/semazen.jpg',
															'/images/IMG_00061.jpg',
															'/images/OZ1.jpg',
															'/images/Slayt210.jpg',
															'/images/DSCF1673.jpg',
															'/images/DSCF1679.jpg',
															'/images/N96D.jpg',
														].map((src, idx) => (
															<div key={idx} style={{ overflow: 'hidden', borderRadius: 10 }}>
																<img src={src} alt={`Eğitim görseli ${idx + 1}`} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
															</div>
														))}
													</div>
												</div>
											</div>
											<div className="container" style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 60 }}>
												<div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
													<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
														{[
															'/images/OZ7.jpg',
															'/images/DSCF1569.jpg',
															'/images/2HZM.jpg',
															'/images/FM8A.jpg',
															'/images/yemek1.jpg',
															'/images/3QP2.jpg',
															'/images/Slayt24.jpg',
															'/images/5DZE.jpg',
															'/images/9N4Z.jpg',
															'/images/IMG_00076.jpg',
															'/images/Slayt19.jpg',
															'/images/RNYJ.jpg',
														].map((src, idx) => (
															<div key={idx} style={{ overflow: 'hidden', borderRadius: 10 }}>
																<img src={src} alt={`Eğitim görseli ${idx + 1}`} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
															</div>
														))}
													</div>
												</div>
											</div>
										</section>
				</div>
			</main>
			<Footer />
		</div>
	)
}

