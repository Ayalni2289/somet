import React from 'react'
import Footer from './Footer'
import { getStrapiImageUrl } from '../lib/strapi'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { text } from 'stream/consumers'

type Props = {
  title: string
  date?: string
  breadcrumb?: string
  hero?: string
  introQuote?: string
  leftImage?: string
  content?: string // html
  sections?: any[] // Strapi dynamic zones
  contentStyles?: string
  slug?: string
  images?: string[]
  seoTitle?: string
  seoDescription?: string
}

export default function ArticleTemplate({
  title,
  breadcrumb = title,
  hero,
  introQuote,
  leftImage,
  content,
  sections,
  images,
  contentStyles,
}: Props) {
  const renderSection = (section: any, idx: number) => {
    const type = section?.__component || ''

    /* =======================
       RICH TEXT
    ======================= */
    if (type === 'text.rich-text') {
      return (
        <div key={idx} className="rich-text-container markdown-content"
        style={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflow: 'hidden' // Yatay kaydırmayı tamamen kapatır
      }}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}   disallowedElements={['script', 'iframe']}
>
            {section?.text || ''}
          </ReactMarkdown>
        </div>
      )
    }

    /* =======================
       IMAGE BLOCK
    ======================= */
if (type === 'image.image-block') {
  // Eğer strapiToArticle içinde işlediysen direkt 'section.imageUrl' kullanabilirsin.
  // İşlemediysen en garantisi hem v5 hem v4'ü kontrol etmektir:
  const imgData = section?.image?.data || section?.image;
  const src = getStrapiImageUrl(imgData?.attributes?.url || imgData?.url);

  if (!src) return null;

  return (
    <figure key={idx} style={{ margin: '20px 0' }}>
      <div><p style={{  fontStyle: 'italic' }}>{section.caption}</p></div>
      <img src={src} alt={section?.caption || title} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
    </figure>
  );
}

    /* =======================
       GALLERY BLOCK
    ======================= */
   if (type === 'images.gallery-block') {
  // strapiToArticle içinde 'multipleMedia'yı 'images' dizisine çevirmiştik.
  // Eğer çevirmediysen:
  const mediaItems = section?.multipleMedia?.data || section?.multipleMedia || [];
  
  const imgs = mediaItems.map((m: any, i: number) => {
    // URL'i hem attributes içinden hem de direkt içinden kontrol et
    const url = m?.attributes?.url || m?.url;
    const src = getStrapiImageUrl(url);
    
    if (!src) return null;

    return (
      <div key={`${idx}-${i}`} style={{ borderRadius: 8, overflow: 'hidden' }}>
        <img
          src={src}
          alt={m?.attributes?.alternativeText || m?.alternativeText || ''}
          style={{ width: '100%', display: 'block', height: '200px', objectFit: 'cover' }}
        />
      </div>
    );
  }).filter(Boolean);

  if (!imgs.length) return null;

  return (
    <div key={idx} className="article-gallery" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
      {imgs}
    </div>
  );
}

    return null
  }

  return (
    <div>
      {contentStyles && (
        <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
      )}
    
      <section style={{ marginTop: hero ? '-300px' : '-350px', paddingBottom: hero ? 0 : 100, paddingTop: hero ? 0 : 60 }}>
        <div
          className="container"
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <h1
            style={{
              color: '#fff',
              margin: 0,
              fontSize: 44,
              lineHeight: 1.05,
              textAlign: 'center',
            }}
          >
            {title}
          </h1>

          <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <a
              href="/"
              style={{
                color: '#2DD4BF',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              Ana Sayfa
            </a>
            <span
              style={{
                color: '#2DD4BF',
                margin: '0 10px',
                fontSize: 20,
              }}
            >
              »
            </span>
            <span
              style={{
                color: '#d1f7ef',
                fontSize: 15,
              }}
            >
              {breadcrumb}
            </span>
          </nav>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main style={{ padding: "66px 0", marginTop: hero ? '0px' : '-150px', position: 'relative', zIndex: 10 }}>
        <div
          className="container"
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            alignItems: 'center',
            backgroundColor: hero ? 'transparent' : '#fff',
            borderRadius: hero ? '0px' : '30px 30px 0 0',
            padding: hero ? '0px' : '40px 20px',
          }}
        >
          {hero && (
            <div
              style={{
                width: '100%',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                transform: 'translateY(-60px)',
              }}
            >
              <img
                src={hero}
                alt={title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          )}

          <div
            className="content"
            style={{
              maxWidth: 800,
              color: '#222',
              lineHeight: 1.4,
              width: '100%'
            }}
          >
            {introQuote && (
              <p
                style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: 20,
                  letterSpacing: 0.6,
                }}
              >
                {introQuote}
              </p>
            )}

            <br />

            <div
              style={{
                display: 'flex',
                gap: 24,
                alignItems: 'flex-start',
              }}
            >
              {leftImage && (
                <div style={{ flex: '0 0 240px' }}>
                  <img
                    src={leftImage}
                    alt=""
                    style={{
                      width: 240,
                      borderRadius: 12,
                      boxShadow:
                        '0 6px 18px rgba(0,0,0,0.12)',
                    }}
                  />
                </div>
              )}

              <div className="article-content" style={{ flex: 1 }}>
                {sections && sections.length > 0 ? (
                sections.map(renderSection)
              ) : content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p>İçerik henüz eklenmedi.</p>
              )}
              </div>
            </div>

            {images && images.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <div className="article-gallery">
                  {images.map((src) => (
                    <img key={src} src={src} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}