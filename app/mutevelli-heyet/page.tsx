import Link from 'next/link'
import Footer from '../../components/Footer'
import { getKurulBySlug, strapiToKurul } from '../../lib/strapi'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default async function MutevelliHeyet() {
  const strapiKurul = await getKurulBySlug('mutevelli-heyet')
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  if (!strapiKurul) {
    return (
      <div style={{ padding: 100, textAlign: 'center' }}>
        Veri bulunamadı.
      </div>
    )
  }

  const kurul = strapiToKurul(strapiKurul)
  const sections = Array.isArray(kurul.sections) ? kurul.sections : []

  return (
    <div>
      {/* Header */}
      <section style={{ marginTop: '-300px' }}>
        <div
          className="container"
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <h1 style={{ color: '#fff', fontSize: 44 }}>{kurul.title}</h1>

          <nav aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <Link href="/" style={{ color: '#2DD4BF', textDecoration: 'none' }}>
              Ana Sayfa
            </Link>
            <span style={{ color: '#2DD4BF', margin: '0 10px' }}>»</span>
            <span style={{ color: '#d1f7ef' }}>{kurul.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <main style={{ padding: '66px 0 80px' }}>
        <div
          className="container"
          style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 28,
              transform: 'translateY(-60px)',
            }}
          >
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {/* Kurul Üyeleri */}
              {sections.map((section: any) => (
                <div key={section.id ?? section.title} style={{ marginBottom: 60 }}>
                  {section.title && (
                    <h4 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                      {section.title}
                    </h4>
                  )}

                  {section.period && (
                    <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
                      ({section.period})
                    </p>
                  )}

                  {Array.isArray(section.boardMember) && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 28,
                      }}
                    >
                      {section.boardMember.map((member: any) => (
                        <div
                          key={member.id}
                          style={{
                            background: '#fafafa',
                            borderRadius: 12,
                            padding: 24,
                            textAlign: 'center',
                          }}
                        >
                          <div
                            style={{
                              maxWidth: 180,
                              aspectRatio: '3 / 4',
                              margin: '0 auto 16px',
                              borderRadius: 12,
                              overflow: 'hidden',
                              background: '#eee',
                            }}
                          >
                            {member.photo?.url ? (
                            <img
                              src={`${STRAPI_URL}${member.photo.url}`}
                              alt={member.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            ) : (
                              <div
                                style={{
                                  display: 'flex',
                                  height: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <svg
                                  width="60"
                                  height="60"
                                  viewBox="0 0 24 24"
                                  fill="#ccc"
                                >
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                              </div>
                            )}
                          </div>

                          <div style={{ fontWeight: 700, fontSize: 15 }}>
                            {member.name}
                          </div>
                          <div style={{ fontSize: 14, color: '#666' }}>
                            {member.role}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

{kurul.content && (
  <div
    style={{
      marginTop: 40,
      borderTop: '1px solid #eee',
      paddingTop: 40,
      width: '100%',
      overflow: 'hidden', // yatay kaydırmayı engeller
    }}
    className="rich-text-container markdown-content prose max-w-none"
  >
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      disallowedElements={['script', 'iframe']}
    >
      {kurul.content}
    </ReactMarkdown>
  </div>
)}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
