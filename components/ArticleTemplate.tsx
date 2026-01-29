import React from 'react'
import Footer from './Footer'
import { getStrapiImageUrl } from '../lib/strapi'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

type relatedArticle = {
  id: number
  title: string
  slug: string
  coverImage?: string
}

type Props = {
  title: string
  date?: string
  breadcrumb?: string
  hero?: string
  introQuote?: string
  leftImage?: string
  content?: string // html fallback
  sections?: any[] // Strapi dynamic zones
  contentStyles?: string
  slug?: string
  images?: string[]
  seoTitle?: string
  seoDescription?: string
  coverImage?: string // coverImage için yeni prop
  serializeSectionsToHtml?: (sections: any[]) => string // fallback html fonksiyonu
  relatedArticles?: relatedArticle[]
  categoryLabel?: string
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export default function ArticleTemplate({
  title,
  breadcrumb = title,
  hero,
  coverImage,
  introQuote,
  leftImage,
  content,
  sections,
  images,
  contentStyles,
  serializeSectionsToHtml,
  relatedArticles,
  categoryLabel,
  pagination,
}: Props) {

  const renderSection = (section: any, idx: number) => {
    const type = section?.__component || ''

    /* =======================
       RICH TEXT
    ======================= */
    if (type === 'text.rich-text') {
      return (
        <div
          key={idx}
          className="rich-text-container markdown-content"
          style={{
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]} disallowedElements={['script', 'iframe']}>
            {section?.text || ''}
          </ReactMarkdown>
        </div>
      )
    }
    if (type === 'sections.download-link') {
      const fileData = section?.file?.data || section?.file;
      const url = getStrapiImageUrl(fileData?.attributes?.url || fileData?.url);

      if (!url) return null;

      return (
        <div key={idx} className="download-block" style={{ margin: '30px 0', textAlign: 'center' }}>
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
          >
            <span>📥</span>
            {section.Label || 'Dosyayı İndir'}
          </a>
        </div>
      );
    }

    /* =======================
        HTML / CUSTOM TEXT (YENİ)
    ======================= */
    if (type === 'html(text)') {
      // Eğer bu alan sadece ham HTML veya özel metin içeriyorsa
      return (
        <div
          key={idx}
          className="custom-html-container"
          dangerouslySetInnerHTML={{ __html: section.json || section.text || '' }}
        />
      );
    }
    /* =======================
       IMAGE BLOCK
    ======================= */
    if (type === 'image.image-block') {
      const imgData = section?.image?.data || section?.image;

      // Dizi kontrolü eklendi (Çoklu resim seçildiyse patlamaması için)
      const targetImage = Array.isArray(imgData) ? imgData[0] : imgData;

      const rawUrl = targetImage?.attributes?.url || targetImage?.url;
      const src = getStrapiImageUrl(rawUrl);

      // Eğer src yoksa null dönmek yerine konsola hata bas (Geliştirme aşamasında)
      if (!src) {
        console.warn('Resim URL oluşturulamadı, section verisi:', section);
        return null;
      }

      return (
        <figure key={idx} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column' }}>
          <img
            src={src}
            alt={section?.caption || title || 'Görsel'}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
          {/* Genelde caption resmin altında olur, yer değiştirdim */}
          {section.caption && (
            <figcaption style={{ fontStyle: 'italic', marginTop: '8px', textAlign: 'center', color: '#666' }}>
              {section.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    /* =======================
       GALLERY BLOCK
    ======================= */
    if (type === 'images.gallery-block') {
      const mediaItems = section?.multipleMedia?.data || section?.multipleMedia || []

      const imgs = mediaItems.map((m: any, i: number) => {
        const url = m?.attributes?.url || m?.url
        const src = getStrapiImageUrl(url)
        if (!src) return null

        return (
          <div key={`${idx}-${i}`} style={{ borderRadius: 8, overflow: 'hidden' }}>
            <img
              src={src}
              alt={m?.attributes?.alternativeText || m?.alternativeText || ''}
              style={{ width: '100%', display: 'block', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        )
      }).filter(Boolean)

      if (!imgs.length) return null

      return (
        <div key={idx} className="article-gallery" style={{ display: 'grid', gap: 12 }}>
          {imgs}
        </div>
      )
    }

    return null
  }

  // Eğer coverImage varsa hero yerine onu kullan
  const heroImage = hero || coverImage

  // Eğer sections yok ama serializeSectionsToHtml fonksiyonu varsa, content olarak kullan
  const fallbackContent = !sections?.length && serializeSectionsToHtml
    ? serializeSectionsToHtml(sections || [])
    : content

  /* =======================
     RELATED ARTICLES PAGINATION
  ======================= */
  const renderPagination = () => {
    if (!pagination || pagination.pageCount <= 1) return null;

    const { page, pageCount } = pagination;
    const items = [];

    // Önceki Sayfa
    if (page > 1) {
      items.push(
        <a
          key="prev"
          href={`?page=${page - 1}`}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: '#fff',
            color: '#333',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            fontWeight: 500
          }}
        >
          ‹
        </a>
      );
    }

    // Sayfa Numaraları
    // Basit bir mantık: 1, ... current-1, current, current+1, ... last
    const showEllipsisStart = page > 3;
    const showEllipsisEnd = page < pageCount - 2;

    const start = Math.max(2, page - 1);
    const end = Math.min(pageCount - 1, page + 1);

    // İlk Sayfa Her Zaman Göster
    items.push(
      <a
        key={1}
        href={`?page=1`}
        style={{
          padding: '8px 14px',
          borderRadius: 8,
          background: page === 1 ? '#5b2b7b' : '#fff',
          color: page === 1 ? '#fff' : '#333',
          textDecoration: 'none',
          boxShadow: page === 1 ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
          fontWeight: 500
        }}
      >
        1
      </a>
    );

    if (showEllipsisStart) {
      items.push(<span key="start-dots" style={{ padding: '8px 4px', color: '#999' }}>...</span>);
    }

    for (let i = start; i <= end; i++) {
      if (i === 1 || i === pageCount) continue; // 1 ve son zaten ekleniyor
      items.push(
        <a
          key={i}
          href={`?page=${i}`}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: page === i ? '#5b2b7b' : '#fff',
            color: page === i ? '#fff' : '#333',
            textDecoration: 'none',
            boxShadow: page === i ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
            fontWeight: 500
          }}
        >
          {i}
        </a>
      );
    }

    if (showEllipsisEnd) {
      items.push(<span key="end-dots" style={{ padding: '8px 4px', color: '#999' }}>...</span>);
    }

    // Son Sayfa Her Zaman Göster (Eğer 1'den büyükse)
    if (pageCount > 1) {
      items.push(
        <a
          key={pageCount}
          href={`?page=${pageCount}`}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: page === pageCount ? '#5b2b7b' : '#fff',
            color: page === pageCount ? '#fff' : '#333',
            textDecoration: 'none',
            boxShadow: page === pageCount ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
            fontWeight: 500
          }}
        >
          {pageCount}
        </a>
      );
    }

    // Sonraki Sayfa
    if (page < pageCount) {
      items.push(
        <a
          key="next"
          href={`?page=${page + 1}`}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: '#fff',
            color: '#333',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            fontWeight: 500
          }}
        >
          ›
        </a>
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40, alignItems: 'center' }}>
        {items}
      </div>
    );
  };

  return (
    <div>
      {contentStyles && <style dangerouslySetInnerHTML={{ __html: contentStyles }} />}

      <section style={{ marginTop: heroImage ? '-300px' : '-350px', paddingBottom: heroImage ? 0 : 100, paddingTop: heroImage ? 0 : 60 }}>
        <div className="container" style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: 44, lineHeight: 1.05, textAlign: 'center' }}>
            {title}
          </h1>

          <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <a href="/" style={{ color: '#2DD4BF', textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</a>
            <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
            <span style={{ color: '#d1f7ef', fontSize: 15 }}>{breadcrumb}</span>
          </nav>
        </div>
      </section>

      <main style={{ padding: "66px 0", marginTop: heroImage ? '0px' : '-150px', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          alignItems: 'center',
          backgroundColor: heroImage ? 'transparent' : '#fff',
          borderRadius: heroImage ? '0px' : '30px 30px 0 0',
          padding: heroImage ? '0px' : '40px 20px',
        }}>

          {heroImage && (
            <div style={{
              width: '100%',
              maxWidth: 800,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
              transform: 'translateY(-60px)',
            }}>
              <img src={heroImage} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <div className="content" style={{ maxWidth: 800, color: '#222', lineHeight: 1.4, width: '100%' }}>
            {introQuote && (
              <p style={{ textAlign: 'center', fontWeight: 700, textTransform: 'uppercase', fontSize: 20, letterSpacing: 0.6 }}>
                {introQuote}
              </p>
            )}

            <br />

            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              {leftImage && (
                <div style={{ flex: '0 0 240px' }}>
                  <img src={leftImage} alt="" style={{ width: 240, borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }} />
                </div>
              )}

              <div className="article-content" style={{ flex: 1 }}>
                {sections && sections.length > 0 ? (
                  sections.map(renderSection)
                ) : fallbackContent ? (
                  <div dangerouslySetInnerHTML={{ __html: fallbackContent }} />
                ) : (
                  <p>İçerik henüz eklenmedi.</p>
                )}
              </div>
            </div>

            {images && images.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <div className="article-gallery">
                  {images.map((src) => <img key={src} src={src} />)}
                </div>
              </div>
            )}
          </div>
        </div>
        {relatedArticles && relatedArticles.length > 0 && (
          <section style={{ background: '#f8fafc', padding: '80px 0' }}>
            <div
              className="container"
              style={{
                maxWidth: 1100,
                margin: '0 auto',
                padding: '0 20px',
                display: "block",
              }}
            >
              <h2
                style={{
                  fontSize: 32,
                  marginBottom: 30,
                  textAlign: 'center',
                }}
              >
                {categoryLabel || 'İlgili İçerikler'}
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 24,
                }}
              >
                {relatedArticles.map((item) => (
                  <a
                    key={item.id}
                    href={`/${item.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: '#111',
                      background: '#fff',
                      borderRadius: 14,
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                      transition: 'transform .2s',
                    }}
                  >
                    {item.coverImage && (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                        }}
                      />
                    )}

                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontSize: 17, lineHeight: 1.4 }}>
                        {item.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination Controls */}
              {renderPagination()}

            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
