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
  // Eğer makale listesi boşsa, güvenli bir varsayılan döndür
  if (!articles || articles.length === 0) {
    return { 
      title: 'İçerik Bulunamadı', 
      badge, 
      img: '/images/footer.jpg', // Varsayılan bir resim yolu
      list: [] 
    };
  }

  // İlk elemanı (Ana kart görseli olacak) al
  const firstItem = articles[0];
  const firstAttr = firstItem.attributes || firstItem; // attributes kontrolü

  // Resim URL'sini güvenli bir şekilde bulma
  const firstCoverData = firstAttr.Cover?.data;
  const firstImgUrl = firstCoverData?.attributes?.url || firstCoverData?.url;

  return {
    title: firstAttr.title || 'Başlıksız İçerik',
    badge,
    // Eğer resim URL varsa başına STRAPI_URL ekle, yoksa varsayılanı kullan
    img: firstImgUrl ? `${STRAPI_URL}${firstImgUrl}` : '/images/footer.jpg',

    // Alt liste elemanlarını dönüştür
    list: articles.map((item: any) => {
      const attr = item.attributes || item;
      const coverData = attr.Cover?.data;
      const imgUrl = coverData?.attributes?.url || coverData?.url;

      return {
        label: attr.title || 'Başlıksız',
        href: attr.slug ? `/${attr.slug}` : '#',
        img: imgUrl ? `${STRAPI_URL}${imgUrl}` : '/images/footer.jpg',
      }
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
