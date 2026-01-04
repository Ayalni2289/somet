import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Tanım, Misyon, Vizyon — SOMET',
}

export default function TanimPage() {
  return (
  <div>
        <section style={{ marginTop: "-300px" }}>
            <div className="container" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: '#fff', margin: 0, fontSize: 44, lineHeight: 1.05 }}>Tanım, Misyon, Vizyon</h1>
            <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
                <Link href="/" style={{ color: '#2DD4BF', zIndex: 1, textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</Link>
                <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
                <span style={{ color: '#d1f7ef', fontSize: 15 }}>Tanım, Misyon, Vizyon</span>
            </nav>
            </div>
        </section>

      {/* Main content - image card overlapping the hero */}
      <main style={{ padding: '48px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <div style={{ position: 'relative' }}>
            {/* overlap to match design: image floats into the purple hero area but stays visible */}
            <div style={{ width: '100%', marginTop:"50px", borderRadius: 12, overflow: 'hidden', boxShadow: '0 14px 40px rgba(0,0,0,0.12)', transform: 'translateY(-80px)' }}>
              <img src="/images/somet-hakkimizda.jpg" alt="Topluluk" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
          </div>

          <article style={{ maxWidth: 800,color: '#222', lineHeight: 1.8 , margin: '0 auto'}}>
            <p style={{ textAlign: 'center', fontSize: '20px' }}>
            “<strong>SOMET</strong>, zihinsel engelliler arasında dayanışma sağlamak, engellinin toplumsallaştırılması olarak tanımlanan <strong>“Engelliye Özelleştirilmiş Gelişim ve Kazanım Modeli”</strong> ni uygulayarak tanıtmak, bu model içinde yer alan topluma dayalı eğitim görüşünü geliştirmek, tanıtmak, benimsetmek, yaymak ve örnek uygulamalar yapmak amacıyla kurumsal yapılar halinde faaliyet göstermektedir.”
            </p>
            <br/>
            <p>
              <strong>SOMET</strong>, refah ülkelerinde gördüğümüz, gıpta ettiğimiz, eğitim, spor, tiyatro, sinema, müzik,  tedavi, barınma ve çalışma çabalarının bütünleştirildiği örneklerin, gülen yüzlerin, mutlu gönüllerin ülkemize, cemiyetimize kazandırma çabası, <strong>Oğuzhan Metintaş’ın</strong> da varlığına anlam kazandırılması gayretidir.
            </p>
            <br />
            <p>
             <strong>SOMET</strong>, zihin engelliyi toplumla bütünleştirip, bir fert yaparken onun ailesi ile ilişkisini de en iyi hale getirmeyi önemsemektedir. Bir zihin engelli, hele yoksul bir aile içinde ise, bu durum hiç istenmeyecek olandır.  İşte bu yük, aileden alındıkça, dahası aile bu yük nedeniyle destekler kazanırsa o ölçüde de zihin engelli fert aile içinde itibar kazanır. Dolayısıyla zihin engelli aileleri arasında ekili bir dayanışma oluşturmak da SOMET’in diğer amacıdır. 
            </p>
            <br/>
            <p>
              <strong>SOMET</strong>, zihin engelli için bir “hayat” demek olmalıydı. Onu olabildiğince erken alıp, önce kendi başına gelişmesinin programını yapıp, sonra sahip olduğu yetenekler çerçevesinde eğitip, gerekirse tedavilerini sağlayıp, barınma imkanlarını oluşturup, sonra da uygun olanların mesleki eğitimleri ile bir fert olarak toplum içinde, olabildiğince diğer insanlarla eşit yaşamak halini sağlamak <strong>SOMET</strong>’e hedef olarak verilmiştir.
            </p>
            <br />
            <p>
             Bugünler, bu amaç ve hedeflerin yakalanamaya başlandığını yaşadığımız güzel günlerdir.
            </p>
            <br />
            <p>
             SOMET, bir üst yapı. 
            </p>
            <br/>
            <p>
             SOMET’in altında kurumsal yapılar var:
            </p>
            <br />
            <p>
            SOMET ZİHİNSEL GELİŞİM DERNEĞİ
            </p>
            <p>
            SOMET İKTİSADİ İŞETME
            </p>
            <p>
            ÖZEL ODUNPAZARI ÖZEL EĞİTİM VE REHABİLİTASYON MERKEZİ
            </p>
            <p>
            SEVGİLİ OĞUZHAN METİNTAŞ (SOMET) VAKFI
            </p>
            <br />
            <p>
            Hem erkek hem kadın konukevleri ve bir araştırma merkezi de sırada.
            </p>
            <br/>
            <p style={{ textAlign: 'center', fontSize: '16px', fontWeight:"bolder" }}>
                SOMET
            </p>
          </article>
          
          <div className="last" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 40, padding: '6px 0' }}>
            <div style={{ maxWidth: 420, textAlign: 'right' }}>
              <h3 style={{ fontWeight: 700, marginBottom: 12, textAlign: 'right' }}>Vizyon</h3>
              <p style={{ margin: 0, lineHeight: 1.6, textAlign: 'right' }}>
                Zihin engellilerin toplumun bir ferdi olarak aynı haklarla toplum içinde yaşamlarını sürdürmelerine bilimsel nitelikte, uygulanabilir ve yönlendirici katkılar sağlayacak, kâr amacı gütmeyen bir sivil toplum kuruluşu olmak.
              </p>
            </div>

            <div style={{ maxWidth: 420, textAlign: 'left' }}>
              <h3 style={{ fontWeight: 700, marginBottom: 12, textAlign: 'left' }}>Misyon</h3>
              <p style={{ margin: 0, lineHeight: 1.6, textAlign: 'left' }}>
                Zihin engelliliğinin tüm paydaşları arasında iletişimi ve iş birliği ortamını tesis ederek, eğitim, meslek kazandırma, sağlık hizmetleri, bakım ve barınma sorunlarının çözümüne katkı sağlayacak, bütüncül bir yapılanma içinde bilimsel uygulamalara dayalı çözümler geliştirmek.
              </p>
            </div>
          </div>
          <div style={{ boxSizing: 'border-box', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <img
              src="/images/hakkimizda-gorsel-3.jpg"
              alt="Kapı"
              style={{ width: '100%', maxWidth: 1000, height: 'auto', borderRadius: 10, boxShadow: '0 12px 30px rgba(0,0,0,0.10)' }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
