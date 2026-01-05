"use client"
import { getArticlesByType } from '@/lib/strapi'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type NewsListItem = { label: string; href?: string; img?: string }
type NewsItem = {
  title: string
  list?: NewsListItem[]
  img?: string
  badge?: string
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!

function mapArticlesToNewsItem(articles: any[], badge: string): NewsItem {
  // Veri yoksa boş dön
  if (!articles || articles.length === 0) {
    return { 
      title: '', 
      badge, 
      img: '/images/footer.jpg',
      list: [] 
    };
  }

  // İlk elemanı al
  const firstItem = articles[0];
  const firstAttr = firstItem.attributes || firstItem;

  // --- DEBUG İÇİN EKLENDİ ---
  // Tarayıcı konsolunda (F12) bu çıktıyı kontrol et. Resim verisi nerede duruyor görelim.
  if (badge === 'HABERLER') {
      console.log('HABERLER İlk Kayıt Detayı:', JSON.stringify(firstAttr, null, 2));
  }
  // -------------------------

  // Resim verisini bulmaya çalış (Hem 'Cover' hem 'cover' hem de 'image' deniyoruz)
  const imageField = firstAttr.Cover || firstAttr.cover || firstAttr.Image || firstAttr.image;
  const firstCoverData = imageField?.data;
  
  // URL'yi al
  const rawUrl = firstCoverData?.attributes?.url || firstCoverData?.url;

  // Tam URL'yi oluştur
  const finalImgUrl = rawUrl 
    ? (rawUrl.startsWith('http') ? rawUrl : `${STRAPI_URL}${rawUrl}`)
    : '/images/footer.jpg';

  return {
    title: firstAttr.title,
    badge,
    img: finalImgUrl,

    list: articles.map((a: any) => {
      const attr = a.attributes || a;
      
      // Liste elemanları için de aynı esnek kontrol
      const imgField = attr.Cover || attr.cover || attr.Image || attr.image;
      const imgData = imgField?.data;
      const url = imgData?.attributes?.url || imgData?.url;

      const itemImgUrl = url 
        ? (url.startsWith('http') ? url : `${STRAPI_URL}${url}`)
        : '/images/footer.jpg';

      return {
        label: attr.title,
        href: attr.slug ? `/${attr.slug}` : '#',
        img: itemImgUrl,
      };
    }),
  }
}

const NewsGrid: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([])

  const [current, setCurrent] = useState<string[]>([])
  const [overlayNext, setOverlayNext] = useState<(string | null)[]>([])
  const [overlayPrev, setOverlayPrev] = useState<(string | null)[]>([])
  const [selectedLabel, setSelectedLabel] = useState<(string | null)[]>([])
  const timers = useRef<number[]>([])

  useEffect(() => {
    async function load() {
      const [haberler, duyurular, etkinlikler] = await Promise.all([
        getArticlesByType('haber'),
        getArticlesByType('duyuru'),
        getArticlesByType('etkinlik'),
      ])

      setItems([
        mapArticlesToNewsItem(haberler, 'HABERLER'),
        mapArticlesToNewsItem(duyurular, 'DUYURULAR'),
        mapArticlesToNewsItem(etkinlikler, 'ETKİNLİKLER'),
      ])
    }

    load()
  }, [])

  useEffect(() => {
    setCurrent(items.map(i => i.img || ''))
    setOverlayNext(items.map(() => null))
    setOverlayPrev(items.map(() => null))
    setSelectedLabel(items.map(() => null))
  }, [items])

  const badgeClass = (b?: string) => {
    if (!b) return 'news-badge'
    const slug = b
      .replace(/İ/g, 'I')
      .replace(/ı/g, 'i')
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
    return 'news-badge news-badge--' + slug
  }

const handleHover = (cardIndex: number, src?: string, label?: string) => {
  if (!src) return

  if (timers.current[cardIndex]) {
    window.clearTimeout(timers.current[cardIndex])
    timers.current[cardIndex] = 0
  }

  setOverlayPrev(prev => {
    const c = [...prev]
    c[cardIndex] = overlayNext[cardIndex] ?? current[cardIndex]
    return c
  })

  setOverlayNext(prev => {
    const c = [...prev]
    c[cardIndex] = src
    return c
  })

  setSelectedLabel(prev => {
    const c = [...prev]
    c[cardIndex] = label ?? null
    return c
  })

  timers.current[cardIndex] = window.setTimeout(() => {
    setCurrent(prev => {
      const c = [...prev]
      c[cardIndex] = src
      return c
    })

    setOverlayNext(prev => {
      const c = [...prev]
      c[cardIndex] = null
      return c
    })

    setOverlayPrev(prev => {
      const c = [...prev]
      c[cardIndex] = null
      return c
    })

    timers.current[cardIndex] = 0
  }, 420)
}


  return (
    <section className="news-section">
      <div className="container">
        <h2><strong>Somet</strong> Haberler</h2>
      </div>
      <div className="container">
        <div className="news-grid">
          {items.map((it, i) => (
            <article className="news-card" key={i}>
              <div className="news-card-inner">
                <div className="news-media">
                  <img className="base" src={current[i] || it.img} alt={it.title} />
                  {overlayPrev[i] && <img className="overlay prev" src={overlayPrev[i]!} alt="" />}
                  {overlayNext[i] && <img className="overlay next show" src={overlayNext[i]!} alt="" />}
                  {it.badge && <span className={badgeClass(it.badge)}>{it.badge}</span>}
                  <div className="news-title-overlay">{selectedLabel[i] ?? it.title}</div>
                </div>

                <ul className="news-list">
                  {(it.list || []).map((li, idx) => (
                    <li key={idx}>
                      <Link
                        href={li.href || '#'}
                        onMouseEnter={() => handleHover(i, li.img, li.label)}
                      >
                        {li.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsGrid
