import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons'

export const metadata = {
	title: 'Amaç ve Hedefler — SOMET',
}

export default function ZetteModeliPage() {
	return (
		<div>
        <section style={{ marginTop: "-300px" }}>
            <div className="container" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: '#fff', margin: 0, fontSize: 44, lineHeight: 1.05, textAlign: "center" }}>Zihin Engelliye Özelleştirilmiş Toplum Temelli Gelişim ve Kazanım Programı (ZETTE Modeli)</h1>
            <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
                <Link href="/" style={{ color: '#2DD4BF', zIndex: 1, textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</Link>
                <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
                <span style={{ color: '#d1f7ef', fontSize: 15 }}>Zihin Engelliye Özelleştirilmiş Toplum Temelli Gelişim ve Kazanım Programı (ZETTE Modeli)</span>
            </nav>
            </div>
        </section>

			<main style={{ padding: '66px 0' }}>
				<div className="container" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
					<div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.18)', transform: 'translateY(-60px)' }}>
						<img src="/images/zette-moteli.png" alt="Kapı" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
                    <div className="content" style={{ maxWidth: 800, color: '#222', lineHeight: 1.4 }}>
					<div style={{ width: '100%',  gap: 24}}>
						<div style={{ flex: 1 }}>
							<p style={{ marginTop: 0 }}>
								SOMET tarafından geliştirilen ve uygulanan model, “zihin engellileri toplum içinde kendisine yeter, çevresi ile etkin ve uyumlu ilişkiler kurabilen bireyler haline getirerek, toplumun eşit fertleri, sosyo-ekonomik ve kültürel bütünlüğün bir parçası halinde yaşamalarını sağlamak üzere oluşturulmuş bir eğitim programıdır.
							</p>
                            <br/>
                            <p>
                                Program, üç ana prensipe göre hazırlanmıştır:
                            </p>
                            <br/>
                            <p>
                                Kişiye özel hazırlanır.<br/>
Toplum içinde yaşatılarak uygulanır.<br/>
Özyeterlilikten kendi başına yaşama aşamalarını uzanır.<br/>
                            </p>
                            <br/>
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
                            BEKLENEN YARAR
                            </p>
                            <p>
Zihin engelli her bireyin; ağır, tam bakımlık engelliden, kendi ihtiyaçlarını görebilen, üretme yeteneğine sahip zihinsel engelliye kadar tümünün, farklılıklarını telafi ederek, toplumun yaşayan bir ferdi halinde toplumsal hayatta yer almasını sağlayacak, engellinin niteliklerine özgü eğitim, mesleki kazandırma, bakım, ve sağlık hizmetlerini bir bütün halinde ve konsolide bir ortamda verebilecek, akademisyen nitelikli eğitimcilerce hazırlanmış, nitelikli eğitmenler ve sağlık uygulayıcılarıyla yürütülen “Zihin Engelliye Özelleştirilmiş Toplum Temelli Gelişim ve Kazanım Modeli” ortaya çıkarılmıştır. Model sürekli güncellenmektedir. Çalışmadan beklenen en önemli yarar proje modeliyle zihin engellinin farklılıklarını aşarak toplumsallaşması olacaktır. 
                            </p>
                            <br/>
                            <p>
Merkez’de standart uygulamalar yoktur; <strong>bir ölçü her beden uyar yerine, her bedene farklı ölçü gerekir anlayışı</strong> ile her birey kendi başına değerlendirilir. Merkez’de birey odaklı eğitim anlayışı ile engellilerin yeteneklerini, isteklerini, beklentilerini, hedeflerini, ihtiyaçlarını merkeze alan eğitim programları geliştirilerek uygulanır.                            </p>
                            <br/>
                            <p>
Çalışmanın diğer önemli bir yararı da zihin engellilerin toplumun yaşayan bir ferdi haline gelmesiyle birlikte zihin engelli aileleri de sınırlılıklarından kurtularak sosyal ve ekonomik hayatları ile üretim yeteneklerine rahatça devam edebilecek olmalarıdır. 
                            </p>
                            <br/>
                            <p>
Konu edilen model, uygulamada başarılı olduğunda, umuyoruz ki örnek model olarak tanıtımı sayesinde Türkiye genelinde kullanım imkânı sağlanacaktır.                             </p>
                            <br/>
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
                            MODELİN ORTAYA ÇIKIŞ GEREKÇESİ
                            </p>
                                                        <br/>
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
ESKİŞEHİR’DE ZİHİN ENGELLİLİĞİ SORUNUNUN BOYUTU
                            </p>
                            <br/>
                            <p>
                                Genel literatüre göre zekâ düzeyi alt sınır olan IQ 70’in altındaki kişi oranı toplumsal popülasyon içinde %0.8’dir1-3. Bu orana göre 800,000 kişilik nüfus esas alındığında Eskişehir’de olması gereken zihin engelli tanımına uyar kişi sayısı yaklaşık <strong> 6,400’dür</strong>. Ancak bu sayı öğretilebilir ve eğitilebilir, böylece toplumla uyumlu yaşayabilen sınır altı zekâ seviyesine sahip kişileri de kapsamaktadır. 
                            </p>
                            <br/>
                            <p>
                                Devlet İstatistik Enstitüsü Türkiye Özürlüler Çalışması verileri dikkate alındığında, Eskişehir’de mevcut eğitilebilir ve öğretilebilir (hafif veya orta düzeyli zihinsel engelli kişi sayısı <strong>4,500</strong>’dür4. 
                            </p>
                            <br/>
                            <p>
                                Ağır, yani ancak öğretilebilir, bu nedenle özel bakım da gereken zihin engelli oranı ise tüm zihin engelliler içinde yaklaşık olarak %20 oranında kabul edilir5,6. Bu durumda Eskişehir için eğitim ve bakım hizmeti gereken zihin engelli kişi sayısı <strong>1,280</strong> olmaktadır.
                            </p>
                            <br/>
                            <p>
                                Tamamen bakıma muhtaç (kısmi eğitim de alabilir) zihin engelli kişi oranı ise tüm zihin engelliler içinde %0,1’dir7,8. Bu orana göre Eskişehir’de mutlaka tam bakım hizmeti verilmesi gereken zihin engelli kişi sayısı yaklaşık <strong>640</strong> kişi olmaktadır.  
                            </p>
                            <br/>
                            <p>
                                Sonuç olarak Eskişehir’de bakım, gelişim ve mesleki eğitim dahil eğitim ve öğretim hizmeti alması gereken 4,480, eğitim hizmeti alması gereken 1,280, eğitim ve bakım hizmeti alması gereken 640, özelleştirilmiş sağlık hizmeti alması gereken 1,920 zihin engelli kişi var olduğunu kabul etmemiz gerekir.
                            </p>
                            <br/>
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
                                ZİHİN ENGELLİLİK EĞİTİMİ
                            </p>
                            <br/>
                            <p>
                                Bugünkü dünyada zihin engelliler için iki farklı eğitim modeli vardır: “<strong>Eğitim merkezine dayalı eğitim</strong>” ve “<strong>Topluma dayalı eğitim</strong>”.
                            </p>
                            <br/>
                            <p>
                                <strong>Eğitim merkezine dayalı eğitim ile topluma dayalı eğitimin farklılığı:</strong>
                            </p>
                            <br/>
                            <p>
                                Eğitim merkezine dayalı eğitimde engelli düzenli olarak belli gün ve saatlerde özel hazırlanmış eğitim ve rehabilitasyon merkezine götürülür, orada eğitim ve destek programı alır, bakımı ise bakımevlerinde yapılır. Eğer bakımevleri yetmiyorsa aile bakar. Yoksul ailelere birtakım ücretler ödenir. 
                            </p>
                            <br/>
                            <p>
                                Topluma dayalı eğitimde ise engelli bu amaca yönelik eğitim merkezlerinde her gün ve gün içi yeterli süre eğitim ve sosyalleşme aktivitelerine katılır. Vaktinin kalan kısmı ise toplum içinde toplum yaşamıyla birlikte geçirtilir.
                            </p>
                            <br/>
                            <p>
                                Eğitim merkezine dayanan eğitim nispeten daha kolay ve daha az maliyetlidir. Özel uzmanlıklar ve gönüllülük gerektirmez. Sadece eğitim ve bakım merkezleri adı altında devlet veya özel sektör organizasyonların olması yeterlidir. Özel sektör de bunu ticari amaçla para/kâr karşılığı yapar. 
                            </p>
                            <br/>
                            <p>
                                Topluma dayalı eğitim ise karmaşıktır,<strong> eğitim, öğretim, mesleki eğitim ve öğretim, barınma, sağlık, araştırma</strong> gibi birçok unsurun bir araya gelmesini gerektirir, bu bakımdan zordur ve maliyeti yüksektir, ticari amaçla yürütülemez; uzmanlıklar, organizasyonlar, akademi desteği, devlet – özel sektör – gönüllü kuruluşların işbirliklerini gerektirir.
                            </p>
                            <br/>
                            <p>
                                Eğitim merkezine dayanan eğitim 30 yıl öncesine değin gelişmiş ülkelerde uygulanmakta idi. Ancak 1981 yılında Dünya Sağlık Örgütü Uzmanı Ann Shearer’in ilk sorgulaması ile engelli merkezlerinde verilen kapalı eğitim modelleri tartışılmaya başlandı9,10. Mevcut uygulamalara göre “engelli, eğitim ve rehabilitasyon merkezlerine izole edip, toplumdan uzak tutuluyoruz, böylece o da toplum da kurtuluyor” idi. Diğer bir ifadeyle gelişmiş ülkelerde eğitimciler zihin engelli kişilerin eğitim ve rehabilitasyon amacıyla adı eğitim ve rehabilitasyon merkezi olan yerlere kapatıldığını, orada eğitim ve bakım adına toplumdan izole edildiğini fark ettiler. 
                            </p>
                            <br/>
                            <p>
                                Yukarıda tanımlanan bu durum, özürlüler için ayrı merkezlerde (eğitim ve rehabilitasyon merkezleri) hizmet verilmesi, özürlülerle, herhangi bir zamanda özürlü hale gelebilme potansiyeline sahip toplumun geri kalanı arasında derin ayırımlar meydana getirebilmektedir. Çünkü bu hizmette, hizmet verilen özürlü psiko-sosyal ve kültürel varlığı ile kavranmamakta, sadece sakat olması nedeniyle temiz bakılan, iyi yedirilip içilen ve böylece zapt edilen “normal insan dışı” bir varlık olarak tanımlanmaktadır. 
                            </p>
                            <br/>
                            <p>
Gelişmiş ülkelerde “engellilik sorunu”, artık farklı biçimde, bir “insan ve yaşam hakları sorunu” olarak algılanmaya ve yorumlanmaya başlanmıştır. Eğitimciler, sağlıkçılar, ekonomistler, hukukçular, insan hakları savunucuları, engelliler, engelli yakınlarının yoğun arayış ve tartışmaları ortaya tamamen farklı bir kavram çıkarmıştır: “<strong>İnsan hakları ve yaşam hakkı herkes için vardır ve aynıdır</strong>” anlayışı… 
                            </p>
                            <br/>
                            <p>
                                Esas olarak engelli de bir insandır; insan haklarına sahiptir, temel yaşam haklarına diğer insanlar gibi ve onlar kadar sahiptir. Öyleyse zihin engelli de diğer insanlar gibi ve onlarla bir arada yaşamalıdır. Bu yaşamı engelliye temin etmek ise bir toplumsal ve kamusal görevdir; çünkü insan haklarını ve yaşam haklarını eksiksiz temin etmek tam olarak toplumsal-kamusal bir görevdir ve anayasal teminatı vardır. İşte bu anlayıştan da “<strong>Zihin engellinin toplumsallaşması</strong>” modeli ortaya çıktı. Bu modelin beklenen yararlılığı sağlaması için de “<strong>engelliye özelleştirilmiş gelişim ve kazanım</strong>” niteliği programa eklendi11,12.
                            </p>
                            <br/>
                            <p>
                                Gelişmiş ülkelerde uygulamaları yaygınlaşan bu modelin, temel hedefi, zihin engellinin, sahip olduğu yetenekleri olabildiğince üst düzeye çekip, temel sorunlarını kolayca çözmesini sağlayarak insan yaşamı içine, yani toplum içine ayırıma uğramadan katılımının sağlanmasıdır. Engellinin böyle yaşayabilmesi, bunları yapabilmesi bir insan hakları sorunudur, cemiyet bunları engelliye yaptırmakla yükümlüdür. Bu durum, esasen engellinin temel yaşam hakkıdır. 
                            </p>
                            <br/>
                            <p style={{fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8}}>
                                ZİHİN ENGELLİNİN TOPLUMSALLAŞTIRILMASI – Zihin Engelliye Özelleştirilmiş Toplum Temelli Gelişim ve Kazanım Programı (ZETTE Modeli)
                            </p>
                            <br/>
                            <p>
                                Zihin engellinin toplumsallaştırılması, <strong>eğitim, sağlık hizmetleri, bakım ve kendine yetme</strong> olmak dört ana bileşene sahiptir. Bileşenler, engellinin bedensel ve zihinsel özelliklerine göre o engellide bireysel olarak işletilir.
                            </p>
                            <br/>
                            <p>
                                “Engelliye Özelleştirilmiş Gelişim ve Kazanım Modeli”nin amacını organizasyonel olarak iki başlık altına yerleştirebiliriz: “Özürlü bireyler için hayata fırsat eşitliği vermek” ve “özürlülerin her yönüyle yaşam kalitesini artırmak”. 
                            </p>
                            <br/>
                            <p>
                                Yukarıda konu edilen amaçları ulaşmayı sağlayacak hedefler de şunlardır:  “Engelli bireye toplum içinde yaşamaya yönelik eğitim, sağlık hizmeti ve bakım vermek”, “bu eğitim-uygulama için yeterli zamanı ve mekanı oluşturmak”, “bu eğitim-uygulama için kalifiye eğitimci ve uygulayıcı yetiştirmek”.  
                            </p>
                            <br/>
                            <p style={{fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8}}>
                                ZETTE Modeli’nde iki temel hedef vardır:
                            </p>
                            <br/>
                            <ul style={{ marginTop: 8, lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
                                <li>Engelli bireye toplum içinde yaşamaya yönelik eğitim ve uygulama vermek.</li>
                                <li>Bu uygulama ve eğitim için yeterli zamanı ve mekânı kullanmak.</li>
                            </ul>
                            <br/>
                            <p>
                                Konu edilen hedefler altında Engelliye Özelleştirilmiş Gelişim ve Kazanım Modeli’nin uygulama başlıkları şöyledir:
                            </p>
                            <br/>
                            <ol style={{ marginTop: 8, lineHeight: 1.8, listStyleType: 'decimal', paddingLeft: '1.25rem' }}>
                                <li>Özbakım ve özgelişim,</li>
                                <li>Sosyal gelişim,</li>
                                <li>Beceri ve meslek kazanımı; üretici olma,</li>
                                <li>Sağlık ve bakımını sürdürme,</li>
                                <li>Fertleşme ve topluma aidiyet.</li>
                            </ol>
                            <br/>
                            <p>
                                Bu başlıkları daha açık hale yayarsak;
                            </p>
                            <br/>
                            <ol style={{ marginTop: 8, lineHeight: 1.8, listStyleType: 'decimal', paddingLeft: '1.25rem' }}>
                                <li>Kendini ve toplumu tanıma,</li>
                                <li>Kendi temel ihtiyaçlarına yetme,</li>
                                <li>Bedeni geliştirmea,</li>
                                <li>Duyumları geliştirme,</li>
                                <li>Zihni geliştirme,</li>
                                <li>Sağlığı koruma ve geliştirme,</li>
                                <li>Beden ve zihin arasında koordinasyonu arttırma,</li>
                                <li>Toplum içine intibak; sosyalleşme,</li>
                                <li>Yaşamaktan zevk alma,</li>
                                <li>Kendi başına ya da en az yardımla kendi başına yaşama,</li>
                                <li>Kendi başına yaşama olmuyorsa grupla uyum içinde yaşama.</li>
                            </ol>
                            <br/>
                            <p>
                                <strong>ZETTE Modeli</strong>‘nde, temel eğitimi verecek ve koordinasyonu sağlayacak iyi donanımlı bir eğitim merkezi ve geniş bir eğitim ekibi olmalıdır. Bu ekip danışmanlarla ve gönüllü yardımcılarla desteklenir. Eğitim alan kişi eğitiminde yaşamın her anını ve özelliğini görür ve yaşar.
                            </p>
                            <br/>
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
                                Engelliye Özelleştirilmiş Gelişim ve Kazanım Modeli için gereksinimler

                            </p>
                            <br/>
                            <p>
                                Önce engellinin toplumsallaştırılması olarak ifade edilen modelin amaç, hedef ve uygulamaları tartışılmalı, kabullenilmeli ve içselleştirilmelidir. Ardından yukarıda konu edilen uygulama başlıkları için pilot uygulamalar halinde konu edilen eğitim, sağlık, bakım uygulamalarını sağlayacak uygulama ve araştırma merkezleri oluşturulmalı, bu merkezlerde kâr amacı gütmeyen sivil toplum kuruluşları, kamu eğitim otoritesi ve akademi iş birlikleri kurulmalıdır.  Konu edilen bu modelde başlatıcı gereksinim, söz konusu eğitim ve uygulamaların birlikte verilebileceği, bünyesinde çok disiplinli bir araştırma merkezinin de yer alacağı konsolide bir tesis oluşturulmasıdır. 
                            </p>
                            <br/>
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
                                TÜRKİYE’DE ZİHİN ENGELLİ EĞİTİM, BAKIM ve SAĞLIK HİZMETLERİ
                            </p>
                            <br/>
                            <p>
                                Bugün için Türkiye’de uygulanan zihin engelli eğitim ve bakım modeli özel kuruluşlar tarafından ticari iş olarak kâr amaçlı işletilen “eğitim merkezine dayalı eğitim” ile “bakımevleri” dir. 
                            </p>
                            <br/>
                            <p>
                                Milli Eğitim Bakanlığı’na bağlı oldukça iyi hizmetler veren mesleki eğitim okulları vardır, ancak bunlar öğrenci yetenek ve sayısı itibariyle sınırlı olarak hizmet verebilmektedirler. Engellilere özgü sağlık hizmeti verebilen bir ünite ya da birim yoktur.
                            </p>
                            <br/>
                            <p>
                                Devlet, zihin engelliler için eğitim ve bakımı yaygın olarak karşılayabilecek kadro ve mekan imkanlarına sahip olmadığından, bu işleri çoğunlukla engelli başına para ödeyerek özel sektöre yaptırtmaktadır. Yuvarlatılmış Dikdörtgen: Olması gereken:
Engelli kişinin ayakta olduğu 320 saatin en az %50’sini, yani 160 saatini eğitim programı içinde geçirmesi gelişmiş ülkelerdeki uygulamadır. Yani engelli kişi ayda en az 160 saat, haftada en az 40 saat, günde en az 6 saat süreyle eğitim programı içinde olmalıdır. 

Yukarıda önerilen günlük 6 saatlik eğitim programı dışında engelli birey hafta sonları en az 2 saat sosyal program uygulamaları almalıdır. 

Engelli birey ilk sağlık ve diş sağlığı hizmetini kendisine özgü, hemen barındığı ya da eğitim aldığı tesiste tahsis edilmiş ünitede kendisini hakkında deneyimli hekim ve diş hekiminden almalı, gerektiğinde hastane naklini de o hekim bilgilendirme ile yapmalıdır.
                            </p>
                            <br/>
                            <p>
                                Ülkemizde sayıları binleri aşan eğitim ve rehabilitasyon merkezlerinde zihin engelli kişilere “eğitim merkezine dayalı eğitim” verilmeye çalışılmaktadır. Yine sayıları illere göre belirlenmiş bakım merkezlerinde de bu kişilerin bir kısmı bakılmaktadır.  Ancak maalesef hem bu eğitimler yetersizdir hem de gerçekte insana değil, özürlü olması nedeniyle farklı bir varlık olarak kabul edilen kişiye hizmet verme anlayışı üzerine kurgulanmıştır. Ana işlev de ticaret yapmak olmaktadır.  
                            </p>
                            <br />
                            <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
ÖZGÜN DEĞER
                            </p>
                            <br/>
                            <p>
                                Engelliye Özelleştirilmiş Gelişim ve Kazanım Modeli, Türkiye’de ilk kez uygulamaya bu proje ile geçirilecektir. Gelişmiş ülkelerde benzer konsolide çalışmalar vardır (9-12). ZETTE Modeli hazırlanırken bu çalışmalardan yararlanılmış, ancak proje oluşturulurken ülkemiz sosyo-demogrfaik ve sosyo-kültürel özellikleri dikkate alınarak tamamen Türkiye’ye ait bir model oluşturulmuştur. 
                            </p>
                            <br/>
                            <p>
                                ZETTE Modeli’nde her zihinsel engelli birey, engel durumuna, engelinin onda oluşturduğu kayıplara, özbakım ve özyaşam yeteneklerine, bedensel özelliklerine, organ fonksiyonlarına, dirençlerine, psikolojik ve sosyo-psikolojik durumuna bakılarak, ona özgün uyarlanmış ve hedefleri konulmuş bir programa alınacaktır. Program ile öğrenci ilişkisi sürekli denetlenecek, öğrenci gelişiminde yeni ihtiyaçlara göre programı modifiye edilecek ya da başarı durumuna göre bir ileri kategoriye alınacaktır. Nihai amaç “kendi başına yaşam” dır. 
                            </p>
                            <br/>
                            <p>
                                Öğrenci özbakımdan, yaşam becerilerine, sosyal hayata uyumdan, sosyalleşmeye ve üretkenlik kazanmaya, mesleki yetenek geliştirmeden, nihayet fark etmeyeceği destekte kendi başına yaşamaya kadar uzanan bir eğitim ve toplumsallaşma süreci yaşayacaktır. Konu edilen bu eğitim süreci tamamen özgün bir sistemdir. 
                            </p>
                            <br/>
                            <a href="/documents/Zette.pdf" className="donate-btn-detail" target="_blank" rel="noopener noreferrer">Detaylı Bilgi</a>

                            <p style={{fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
                                 KAYNAKLAR
                                 </p>
                            <br/>
                            <ol style={{ marginTop: 8, lineHeight: 1.8, listStyleType: 'decimal', paddingLeft: '1.25rem' }}>
                                <li>World Health Organization Regional Office for Europe. Definition: Intellectual Disability. http://www.euro.who.int/en/health-topics/noncommunicablediseases/ mental-health/news/news/2010/15/childrens-right-to-family-life/definitionintellectual-disability [26.07.2022].</li>
                                <li>Amerikan Psikiyatri Birliği: Psikiyatride Hastalıkların Tanımlanması ve Sınıflandırılması Elkitabı, Yeniden Gözden geçirilmiş Dördüncü Baskı (DSM-4- TR) American Psikiyatri Birliği, Washington DC, 2000’den çev. Köroğlu E. Ankara;Hekimler Yayın Birliği;2001.s.44-45.</li>
                                <li>https://www.uptodate.com/contents/intellectual-disability-id-in-children-clinical-features-evaluation-and-diagnosis?search=%C4%B1ntellectual%20disability%20classification&source=search_result&selectedTitle=1~150&usage_type=default&display_rank=1#H17922307</li>
                                <li>Türkiye İstatistik Kurumu. Engelli İstatistikleri http://tuik.gov.tr/PreTablo .do?alt_ id=1017 [26.07.2022].</li>
                                <li>Harris JC. Intellectual disability: Understanding its development, causes, classification, evaluation, and treatment. New York: Oxford University Press;2006.p. 42-98.</li>
                                <li>https://www.uptodate.com/contents/intellectual-disability-id-in-children-clinical-features-evaluation-and-diagnosis?search=%C4%B1ntellectual%20disability%20classification&source=search_result&selectedTitle=1~150&usage_type=default&display_rank=1#H17922307</li>
                                <li>https://www.gov.uk/government/publications/people-with-learning-disabilities-in-england/chapter-1-education-and-childrens-social-care-updates        
                                </li>
                                <li>Hatton C, Glover G, Emerson E, Brown I. People with learning disabilities in England 2015. Public Health England. https://assets.publishing.service.gov.uk/ government/uploads/system/uploads/attachment_data/file/613182/PWLDIE_201 5_main_report_NB090517.pdf

                                </li>
                                <li>Schalock, R. L., Gardner, J. F., & Bradley, V. J. (2007). Quality of life of persons with intellectual and other developmental disabilities: Applications across individuals, R.L. Schalock et al. / Evaluation and Program Planning 34 (2011) 273–282 281 organizations,

                                </li>
                                <li>WHO: Community-Based Rehabilitation as we have experienced it. http://apps.who.int/iris/bitstream/handle/10665/42629/9241590432.pdf?sequence=1

                                </li>
                                <li>Schalock, R. L., Borthwick-Duffy, S. A., Bradley, V. J., Buntinx, W. H., Coulter, D. L., Craig, E., et al. (2010). Intellectual disability: Definition, classification, and systems of supports. Washington, DC: American Association on Intellectual and Developmental Disabilities. 
                                </li>
                                <li>WHO global disability action plan 2014–2021: better health for all people with disability. http://apps.who.int/iris/bitstream/handle/10665/199544/9789241509619_eng.pdf?sequence=1
                                </li>
                            </ol>
						</div>
					</div>
                </div>
				</div>
			</main>
			<Footer />
		</div>
	)
}