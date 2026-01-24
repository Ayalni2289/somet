// components/CategoryTemplate.tsx
import React from 'react';
import Link from 'next/link';
import Footer from './Footer';
import { getStrapiImageUrl } from '@/lib/strapi';

interface CategoryTemplateProps {
  title: string;
  items: any[];
  currentPage: number;
  breadcrumbParent?: { name: string; href: string };
}

export default function CategoryTemplate({ title, items, currentPage, breadcrumbParent }: CategoryTemplateProps) {
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pagedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <section style={{ marginTop: '-300px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: 44, textAlign: 'center' }}>{title}</h1>
          <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <Link href="/" style={{ color: '#2DD4BF', textDecoration: 'none', fontSize: 15 }}>Ana Sayfa</Link>
            <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
            
            {breadcrumbParent && (
              <>
                <Link href={breadcrumbParent.href} style={{ color: '#2DD4BF', textDecoration: 'none', fontSize: 15 }}>
                  {breadcrumbParent.name}
                </Link>
                <span style={{ color: '#2DD4BF', margin: '0 10px', fontSize: 20 }}>»</span>
              </>
            )}
            
            <span style={{ color: '#d1f7ef', fontSize: 15 }}>{title}</span>
          </nav>
        </div>
      </section>

      <main style={{ padding: '48px 0 80px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={whiteBoxStyle}>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {pagedItems.map((it) => (
                <Link key={it.id} href={`/${it.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={imageWrapperStyle}>
                      <img 
                        src={getStrapiImageUrl(it.img) || '/images/placeholder.jpg'} 
                        alt={it.title} 
                        style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} 
                      />
                    </div>
                    <h3 style={itemTitleStyle}>{it.title}</h3>
                  </article>
                </Link>
              ))}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
                <nav aria-label="Pagination" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {currentPage > 1 && (
                    <Link href={`?page=${currentPage - 1}`} style={{ padding: '8px 12px', borderRadius: 6, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>‹</Link>
                  )}
                  
                  {(() => {
                    const pages = [];
                    const showEllipsisStart = currentPage > 3;
                    const showEllipsisEnd = currentPage < totalPages - 2;
                    
                    // İlk sayfa
                    pages.push(
                      <Link key={1} href={`?page=1`} style={{ padding: '8px 12px', borderRadius: 6, background: currentPage === 1 ? '#5b2b7b' : '#fff', color: currentPage === 1 ? '#fff' : '#6b7280', boxShadow: currentPage === 1 ? 'none' : '0 6px 18px rgba(0,0,0,0.06)' }}>1</Link>
                    );
                    
                    // Sol taraf üç nokta
                    if (showEllipsisStart) {
                      pages.push(<span key="ellipsis-start" style={{ padding: '8px 12px', color: '#6b7280' }}>...</span>);
                    }
                    
                    // Mevcut sayfanın etrafındaki sayfalar
                    const start = Math.max(2, currentPage - 1);
                    const end = Math.min(totalPages - 1, currentPage + 1);
                    
                    for (let i = start; i <= end; i++) {
                      if (i !== 1 && i !== totalPages) {
                        const isActive = i === currentPage;
                        pages.push(
                          <Link key={i} href={`?page=${i}`} style={{ padding: '8px 12px', borderRadius: 6, background: isActive ? '#5b2b7b' : '#fff', color: isActive ? '#fff' : '#6b7280', boxShadow: isActive ? 'none' : '0 6px 18px rgba(0,0,0,0.06)' }}>{i}</Link>
                        );
                      }
                    }
                    
                    // Sağ taraf üç nokta
                    if (showEllipsisEnd) {
                      pages.push(<span key="ellipsis-end" style={{ padding: '8px 12px', color: '#6b7280' }}>...</span>);
                    }
                    
                    // Son sayfa
                    if (totalPages > 1) {
                      pages.push(
                        <Link key={totalPages} href={`?page=${totalPages}`} style={{ padding: '8px 12px', borderRadius: 6, background: currentPage === totalPages ? '#5b2b7b' : '#fff', color: currentPage === totalPages ? '#fff' : '#6b7280', boxShadow: currentPage === totalPages ? 'none' : '0 6px 18px rgba(0,0,0,0.06)' }}>{totalPages}</Link>
                      );
                    }
                    return pages;
                  })()}
                  {currentPage < totalPages && (
                    <Link href={`?page=${currentPage + 1}`} style={{ padding: '8px 12px', borderRadius: 6, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>›</Link>
                  )}
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const whiteBoxStyle: React.CSSProperties = { width: '100%', maxWidth: 1100, background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 12px 40px rgba(0,0,0,0.08)', transform: 'translateY(-60px)', marginTop: "20px" };
const imageWrapperStyle: React.CSSProperties = { borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.08)', background: '#fff' };
const itemTitleStyle: React.CSSProperties = { margin: '12px 0 0 0', color: '#5b2b7b', fontWeight: 800, fontSize: 16, textTransform: 'uppercase', lineHeight: 1.2 };