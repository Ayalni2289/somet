export type Article = {
  slug: string
  title: string
  date?: string
  hero?: string
  excerpt?: string
  introQuote?: string
  leftImage?: string
  content?: string // simple HTML or markdown-to-html
  contentStyles?: string // optional per-article CSS (scoped to this page when rendered)
  images?: string[]
}

const articles: Article[] = [
  {
    slug: 'asure-gunu',
    title: 'Bolluğun ve Bereketin Simgesi Aşure Günü',
    date: '2024-10-01',
    hero: '/images/518326697_10162910773673563_6785259642486053039_n.jpg',
    excerpt: 'Topluluk etkinliğimizde aşure dağıtımı ve anılar...',
    content: `
      <p>Aşure günü ile ilgili kısa açıklama. Bu alanı HTML veya markdown dönüştürülmüş HTML olarak kullanabilirsiniz.</p>
      <h2>Etkinlik Özeti</h2>
      <p>Detaylı metin burada yer alır.</p>
    `,
    images: ['/images/1.jpg', '/images/489737962_10162483254123563_2568424746317474059_n.jpg']
  },


  {
    slug: 'sarkilar-dile-geldi',
    title: 'Şarkılar Dile Geldi',
    date: '2024-09-15',
    hero: '/images/52f1311f-0346-464b-8e7d-47c464185079.jpg',
    excerpt: 'Koromuzun konserinden notlar ve fotoğraflar.',
    content: `
      <p>Konserimizde öğrenci ve gönüllülerimizle güzel vakit geçirdik.</p>
    `,
    images: ['/images/20250509_095428-scaled.jpg']
  },
  {
    slug: 'somet-ogretmenler-gunu-icin-sahnede',
    title: 'SOMET Öğretmenler Günü İçin Sahnede',
    date: '2024-10-01',
    hero: '/images/20251124_154810-scaled (1).jpg',
    excerpt: 'Topluluk etkinliğimizde aşure dağıtımı ve anılar...',
    content: `
      <p>SOMET ‘Aşkın ve Sevginin Korosu’ dün Eskişehir Osmangazi Üniversitesi (ESOGÜ) Eğitim Fakültesi’nde düzenlenen Öğretmenler Günü programına katıldı. Bu anlamlı günde gösterisini tamamlayan Aşkın ve Sevginin Koro Şefi Nazan Naz hocamız ve ekip arkadaşlarına teşekkür belgelerini Rektör Yardımcısı Prof. Dr. Emine Gümüşsoy hanımefendi taktim ederken, öğrencilerimize belgelerini Eğitim Fakültesi Dekanı Prof. Dr. Şerife Yücesoy Özkan hanımefendi verdi. SOMET olarak, misafirperverliklerinden dolayı kendilerine teşekkür ederiz.</p>
      <p>SOMET</p>
      <p>24.11.2025</p>
    `,
    images: ['/images/20251124_154810-768x576.jpg', '/images/20251124_153117-768x576.jpg', "/images/20251124_154022-768x576.jpg"]
  },
  {
    slug: 'asure-bollugun-ve-bereketin-simgesi-asure-gunu',
    title: 'Bolluğun ve Bereketin Simgesi ‘Aşure Günü’',
    date: '2024-10-01',
    hero: '/images/518326697_10162910773673563_6785259642486053039_n (1).jpg',
    excerpt: 'Topluluk etkinliğimizde aşure dağıtımı ve anılar...',
    content: `
      <p>Aşure, Hicri takvime göre Muharrem ayının onuncu günü yapılan tatlıdır. İslami inanca göre Muharrem ayının onuncu günü, Nuh peygamber Büyük Tufan’dan sonra karaya ayak bastığında, elinde kalan son malzemelerle bu tatlıyı yapmıştır.
          Bu nedenle aşure, bolluk ve bereketi temsil eder.
          Çok şükür bin şükür bu yılda aşuremizi kaynattık, Allah bin bereket versin.
          Bolluğun bereketin simgesi Aşure günümüz kutlu olsun.
      SOMET ❤️❤️</p>
    `,
    images: ['/images/518326697_10162910773673563_6785259642486053039_n (2).jpg', '/images/518495264_10162910773873563_8233615118212368242_n-768x576.jpg', "/images/518336656_10162910773153563_129922073275642343_n.jpg", "/images/518272916_10162910773368563_1932239171777557006_n.jpg", "/images/518608927_10162910773443563_5743359169317304083_n.jpg"]
  },
  {
    slug: 'sarkilar-dile-geldi',
    title: 'Şarkılar Dile Geldi',
    date: '2024-09-15',
    hero: '/images/52f1311f-0346-464b-8e7d-47c464185079.jpg',
    excerpt: 'Koromuzun konserinden notlar ve fotoğraflar.',
    content: `
      <p>Konserimizde öğrenci ve gönüllülerimizle güzel vakit geçirdik.</p>
    `,
    images: ['/images/20250509_095428-scaled.jpg']
  },
  {
    slug: 'aile-ici-iletisimin-kuvvetlendirilmesi-ve-iletisim-teknikleri',
    title: 'AİLE İÇİ İLETİŞİMİN KUVVETLENDİRİLMESİ VE İLETİŞİM TEKNİKLERİ',
    date: '2024-09-15',
    hero: '/images/RESMALE.jpg',
    excerpt: 'Koromuzun konserinden notlar ve fotoğraflar.',
    content: `
      <strong>PSİKOLOG MURAT CAN ARGIN</strong>
      <p>Aile içi iletişim hayatın her aşaması ve gelecek için oldukça önemlidir. Her anne baba hayatı boyunca çocuklarına en iyi imkânları sağlamak, onları en iyi koşullarda büyütmek ister. Aslında bunun için, yani çocuklara en iyi hayatı sağlamak için yapılabilecek en önemli ve en temel şey; ev içerisinde eşler arasında ve çocukla sağlıklı iletişimin hâkim olduğu bir ortam yaratmaktır. Sağlıklı iletişimin gerçekleştiği bir ortamda karşılaşılacak büyük küçük bütün sorunlar ciddi sonuçlara neden olmadan çözüme kavuşacak ve yaşam kalitesi oldukça yükselecektir.</p>
      <br/>
      <p>Evde akşamları yemek yerken, televizyon izlerken ya da başka bir şeyle uğraşırken gün içerisinde yapılanların, karşılaşılanların anlatıldığı kısa ve yüzeysel konuşmalar aile fertlerinin ilişkisini güçlendirmenin aksine aralarındaki bağın zayıflamasına neden olmaktadır. Yapılan her öylesine konuşma gün içerisinde yaşanan duyguların, olaylara, insanlara karşı düşüncelerin, hislerin geçiştirilmesine, paylaşılmamasına sebep olmaktadır. Bu da bir süre sonra bireylerin onlar için önemli olan konuları konuşmamalarına ve birbirlerinden uzaklaşmalarına yol açar. Bunun sonucunda da anne, baba ya da çocuk bağ kurmak için dışarıda başkalarına yönelmeye başlarlar ve aile içi iletişim bağları zayıflayabilir.</p>
      <br/>
      <p>Kişisel duyguların, fikirlerin paylaşılamadığı ya da bir karşılık görmediği, iletişim ve ilişki açısından doyuma ulaşılamayan evlerde kişilerin dışarıya yönelmesi sonucu aile bireyleri birbirlerine yabancılaşmaya başlamaktadır. Bu durum uzun vadede karşılıklı çatışmalara, üstesinden gelinmesi zor sorunlara yol açmaktadır.</p>
      <br/>
      <p>Herkesin kendini rahatça ifade edebildiği, güvende hissettiği evlerde büyüyen çocuklar kendilerini güzelce ortaya koyabilen, kendilerine güvenen bireyler olarak yetişmektedirler. Bunun tam tersi bir ortamda yetişen çocuklar ise başkalarına bağımlı, fikirlerini ortaya koyamayan yetişkinler olurlar. Bu nedenle hem güçlü bağların oluşması hem de sağlıklı bireylerin yetişmesi açısından aile içi iletişimin önemi çok büyüktür.</p>
      <br/>
      <strong>Aile İçi İletişimi Neler Zayıflatır?</strong>
      <ul>
      <li>Kişilerin birbirini dinlememesi</li>
      <li>Karşıdaki kişinin duygu ve fikirlerinin görmezden gelinmesi, onlara gereken önemin verilmemesi</li>
      <li>Karşıdaki kişinin olduğu gibi kabul edilmemesi</li>
      <li>Bireyleri ilgilendiren konuların yüzeysel bir şekilde konuşulup geçilmesi</li>
      <li>Önceden yaşanmış olumsuz olaylara sıkı sıkıya bağlı kalınması ve dönem dönem bunların gün yüzüne çıkması</li>
      <li>Sürekli eleştirel bir tavır takınılması</li>
      <li>Karşı tarafın kendisini anlatmasına, ifade etmesine izin verilmemesi</li>
      <li>Birlikte yapılan faaliyetlerin önemsenmemesi</li>
      <li>Yalan söylenilmesi</li>
      <li>Karşı tarafı anlamaya değil, yargılamaya yönelik olunması</li>
      <li>İlk adımın, fedakârlıkların hep karşı taraftan beklenilmesi</li>
      <li>Sorunları konuşup çözüme kavuşturmak yerine küsülmesi, konuşulmaması</li>
      <li>Yönlendirme yapılması</li>
      <li>Tehdit etmek</li>
      <li>Kişinin, karşı tarafın söylediklerinden çok kendi yorum ve çıkarımlarına inanması</li>
      <li>Karşı tarafla dalga geçilmesi, onun küçük düşürülmesi</li>
      <li>Şiddete başvurulması</li>
      <li>Hakarette bulunulması</li>
      <li>Karşı tarafa güvenmek yerine yoğunlukla şüpheyle yaklaşılması</li>
      <li>Sorulan soruların cevaplanmaması, geçiştirilmesi</li>
      <li>Emir içeren konuşmalar yapılması</li>
      <li>İlişkide baskın taraf olmaya çalışılması</li>
      <li>Karşı tarafı anlamaya değil suçlamaya yönelik bir tutumun sergilenmesi</li>
      <li>Kendi fikirlerini kabul ettirme çabası</li>
      <li>Yaşanan küçük problemlerin olduğundan büyütülmesi gibi yapılan hatalar aile içi iletişimin zayıflamasına ve aile fertlerinin birbirlerinden bir noktada kopmalarına neden olmaktadır</li>
      </ul>
      <br/>
      <strong>Aile İçi İletişimi Güçlendiren Faktörler</strong>
      <ul>
      <li>Aktif bir dinleyici olun. Bir aile bireyiniz size bir şey anlattığında onu dinlediğinizi, ona önem verdiğinizi beden dilinizle yansıtın</li>
      <li>Her ne olursa olsun karşınızdaki kişiye saygı duyun.</li>
      <li>Karşınızdaki kişiyi olduğu gibi kabul edin</li>
      <li>Olaylara onun gözünden bakmaya çalışın. Empati, bütün ilişkilerin temel taşlarından biridir</li>
      <li>Ailecek birlikte vakit geçirebileceğiniz etkinlikler düzenleyin. Birbirinize zaman ayırın</li>
      <li>Ev içinde demokratik bir ortam oluşturun. Herkesin fikrini ortaya koyduğu ve her fikrin önemli olduğu ortam yaratın</li>
      <li>Yaşanan sorunları yorum katmadan açık ve net bir şekilde ortaya koyun</li>
      <li>Biri bir şey anlattığında telefon, televizyon, gazete gibi başka şeylerle uğraşmak yerine o kişiye, anlatılana odaklanın</li>
      <li>Aileyi ilgilendiren durumlarda herkesin söz hakkı olmasına özen gösterin</li>
      <li>Sizi rahatsız eden bir durum olduğunda susmak yerine olduğu gibi ortaya koyun</li>
      </ul>
      <br/>
      <strong>MUTLU ÇOCUK, MUTLU AİLE…</strong>
      `,
    images: ['/images/RESMALE.jpg'],
    contentStyles: `
      /* Example per-article overrides: make lists circular and larger spacing */
      .article-content ul { list-style-type: circle; margin-left: 1.5rem; color: #333; }
      .article-content li { margin-bottom: 10px; font-size: 16px; }
      .article-content strong { color: #111; }
    `
  }
  ,
]

export default articles
