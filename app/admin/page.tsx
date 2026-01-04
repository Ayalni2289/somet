import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '40px 20px',
      background: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Admin Panel
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          <div style={{
            padding: '24px',
            border: '2px solid #5b2b7b',
            borderRadius: '8px',
            background: '#f9f9f9'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0',
              color: '#5b2b7b',
              fontSize: '20px'
            }}>
              Strapi Admin Panel
            </h2>
            <p style={{ 
              margin: '0 0 20px 0',
              color: '#666',
              lineHeight: '1.6'
            }}>
              İçerik yönetimi için Strapi admin panelini kullanın. Post oluşturma, düzenleme ve yayınlama işlemlerini buradan yapabilirsiniz.
            </p>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#5b2b7b',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            >
              Strapi Admin'e Git →
            </a>
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#856404'
            }}>
              ⚠️ Strapi çalışmıyorsa, önce Strapi'yi başlatmanız gerekir!
            </div>
          </div>

          
        </div>
        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#e7f3ff',
          border: '1px solid #2196F3',
          borderRadius: '8px'
        }}>
          <h3 style={{ 
            margin: '0 0 12px 0',
            color: '#1976D2',
            fontSize: '18px'
          }}>
            📚 Kurulum Rehberi
          </h3>
          <p style={{ 
            margin: '0 0 16px 0',
            color: '#1976D2',
            lineHeight: '1.6'
          }}>
            Detaylı kurulum adımları için <strong>STRAPI_SETUP.md</strong> dosyasına bakabilirsiniz.
          </p>
          <ul style={{ 
            margin: 0,
            paddingLeft: '20px',
            color: '#1976D2',
            lineHeight: '1.8'
          }}>
            <li>Post ve Category Content Type'larını oluşturun</li>
            <li>API izinlerini ayarlayın (Public role)</li>
            <li>CORS ayarlarını yapın</li>
            <li>İlk post'unuzu oluşturun ve yayınlayın</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

