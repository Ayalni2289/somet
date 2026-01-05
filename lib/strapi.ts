
// Strapi API Client
import qs from 'qs';

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

export interface StrapiCategory {
  id: number
  attributes: {
    title: string
    slug: string
    categoryItems?: {
      data: StrapiCategoryItem[]
    }
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiCategoryItem {
  id: number
  documentId?: string
  title: string
  slug: string
  image?: {
    id: number
    name: string
    url: string
    alternativeText?: string
    caption?: string
    formats?: any
  } | null
  category?: {
    data: StrapiCategory | null
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface StrapiArticle {
  id: number
  title: string
  slug: string
  content?: string
  sections?: any[]
  coverImage?: {
    url: string
    alternativeText?: string
  } | null
  publishedAt?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  createdAt: string
  updatedAt: string
}

export interface StrapiPost {
  id: number
  attributes: {
    title: string
    slug: string
    content?: string
    coverImage?: {
      data: {
        attributes: {
          url: string
          alternativeText?: string
        }
      } | null
    }
    publishedAt: string | null
    isPublished: boolean
    seoTitle?: string
    seoDescription?: string
    category?: {
      data: StrapiCategory | null
    }
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiAilelereOgut {
  id: number
  attributes: {
    title: string
    slug: string
    excerpt?: string
    coverImage?: {
      data: {
        attributes: {
          url: string
          alternativeText?: string
        }
      } | null
    }
    content?: any // Dynamic zone
    publishedDate?: string | null
    isPublished: boolean
    seoTitle?: string
    seoDescription?: string
    order?: number
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiResponse<T> {
  data: T
}

// Helper function to get image URL
export function getStrapiImageUrl(url?: string | null) {
  if (!url) return undefined;
  // Eğer URL zaten tam bir adres ise (http ile başlıyorsa) direkt döndür
  if (url.startsWith('http')) return url;
  // Başına Strapi sunucu adresini ekle
  return `${STRAPI_URL}${url}`;
}

export function serializeSectionsToHtml(sections: any[]): string {
  if (!Array.isArray(sections)) return '';

  return sections
    .map((section) => {
      const type = section.__component;

      // Rich Text
      if (type === 'text.rich-text' || type === 'blocks.rich-text') {
        return section.text || section.richText || '';
      }

      // Single Image
      if (type === 'image.image-block') {
        const imgData = section.image?.data || section.image;
        const url = getStrapiImageUrl(imgData?.attributes?.url || imgData?.url);
        if (!url) return '';
        const caption = section.caption ? `<figcaption>${section.caption}</figcaption>` : '';
        return `<figure><img src="${url}" alt="${section.caption || ''}" />${caption}</figure>`;
      }

      // Gallery Block
      if (type === 'images.gallery-block') {
        const mediaSource = section.multipleMedia?.data || section.multipleMedia;
        if (!Array.isArray(mediaSource)) return '';

        const imgs = mediaSource
          .map((m: any) => {
            const url = getStrapiImageUrl(m.attributes?.url || m.url);
            return url ? `<img src="${url}" style="width:100%; border-radius:8px;" />` : '';
          })
          .join('');

        return imgs
          ? `<div class="gallery-grid" style="display:grid; grid-template-columns:repeat(2,1fr); gap:15px;">${imgs}</div>`
          : '';
      }

      return '';
    })
    .filter(Boolean)
    .join('\n');
}


// getArticles fonksiyonunun tamamı
export async function getArticles(): Promise<any[]> {
  try {
    // Karmaşık ve derin populate işlemleri için qs nesnesi oluşturuyoruz
    const queryObj = {
      sort: ['createdAt:desc'], // En yeni eklenene göre sırala
      populate: {
        Cover: {
          fields: ['url', 'alternativeText'] // Kapak fotoğrafının sadece gerekli alanlarını al
        },
        sections: {
          on: {
            // Strapi Dynamic Zone bileşen isimleri (Senin serialize fonksiyonuna göre ayarlandı)
            
            // 1. Rich Text (veya Blocks)
            'text.rich-text': {
              populate: '*' 
            },
            'blocks.rich-text': {
              populate: '*'
            },

            // 2. Tekil Resim Bloğu
            'image.image-block': {
              populate: {
                image: {
                  fields: ['url', 'alternativeText', 'caption', 'width', 'height']
                }
              }
            },

            // 3. Galeri Bloğu
            'images.gallery-block': {
              populate: {
                multipleMedia: {
                  fields: ['url', 'alternativeText', 'caption']
                }
              }
            }
          }
        }
      }
    };

    // Nesneyi Strapi'nin anlayacağı string formatına çeviriyoruz
    const queryStr = qs.stringify(queryObj, { encodeValuesOnly: true });

    const res = await fetch(
      `${STRAPI_URL}/api/articles?${queryStr}`,
      {
        headers: {
          Authorization: STRAPI_API_TOKEN
            ? `Bearer ${STRAPI_API_TOKEN}`
            : '',
        },
        next: { revalidate: 60 }, // ISR: 60 saniyede bir güncelle
      }
    );

    if (!res.ok) {
      // Hata durumunda loglayıp boş dizi dönüyoruz
      console.error(`Strapi API Error: ${res.status} - ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json?.data ?? [];
    
  } catch (error) {
    console.error("Fetch error in getArticles:", error);
    return [];
  }
}


export async function getArticleBySlug(slug: string) {
  try {
    const queryObj = {
      filters: { slug: { $eq: slug } },
      populate: {
        // 1. DÜZELTME: 'cover' değil 'Cover' (Senin şemandaki orijinal isim)
        Cover: { 
          fields: ['url', 'alternativeText'] 
        },
        
        // 2. DÜZELTME: Dynamic Zone için en garantili yöntem
        sections: {
          populate: '*'
        }
      }
    };

    const queryStr = qs.stringify(queryObj, { encodeValuesOnly: true });
    
    // Debug için URL'i yine basalım, çalışınca kaldırırsın
    console.log("REQUEST URL:", `${STRAPI_URL}/api/articles?${queryStr}`);

    const res = await fetch(`${STRAPI_URL}/api/articles?${queryStr}`, {
      headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      // Eğer hala hata alırsan bu log bize sebebini söyler
      const err = await res.text();
      console.error("Strapi Error Details:", err);
      return null;
    }

    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export function strapiToArticle(raw: any) {
  if (!raw) return null;

  // HACK: Strapi v4'te veriler 'attributes' içindedir, v5'te veya flatten edilmişse direkt köktedir.
  // Bu satır iki versiyonu da destekler.
  const data = raw.attributes ? { ...raw.attributes, id: raw.id } : raw;

  // Cover resmi kontrolü (attributes içinde mi değil mi?)
  let coverUrl = undefined;
  
  // Cover verisi var mı kontrol et
  const coverData = data.Cover?.data || data.Cover;
  
  if (coverData) {
    // Cover verisi attributes içinde mi?
    const coverAttrs = coverData.attributes || coverData;
    coverUrl = getStrapiImageUrl(coverAttrs.url);
  }

  return {
    id: raw.id || data.id,
    title: data.title || '',
    slug: data.slug || '',
    // sections bir array değilse boş array ata
    sections: Array.isArray(data.sections) ? data.sections : [],
    coverImage: coverUrl,
    publishedAt: data.publishedAt ?? null,
    seoTitle: data.seoTitle ?? null,
    seoDescription: data.seoDescription ?? null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
}
// ========== POSTS (Alternative content type) ==========

// Fetch all published posts
export async function getPosts(): Promise<StrapiPost[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/posts?filters[isPublished][$eq]=true&populate=*&sort=publishedAt:desc`,
      {
        headers: {
          'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data: StrapiResponse<StrapiPost[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error)
    return []
  }
}

// Fetch single post by slug (only published)
export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&filters[isPublished][$eq]=true&populate=*`,
      {
        headers: {
          'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data: StrapiResponse<StrapiPost[]> = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error('Error fetching post from Strapi:', error)
    return null
  }
}

// Fetch all categories
export async function getCategories(): Promise<StrapiCategory[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?populate=*&sort=name:asc`,
      {
        headers: {
          'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 3600 } // Revalidate every hour
      }
    )

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data: StrapiResponse<StrapiCategory[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories from Strapi:', error)
    return []
  }
}

export function strapiToPost(strapiPost: StrapiPost | null) {
  if (!strapiPost || !strapiPost.attributes) {
    return null
  }

  const attrs = strapiPost.attributes

  return {
    id: strapiPost.id,
    slug: attrs.slug ?? '',
    title: attrs.title ?? '',
    content: attrs.content,
    coverImage: attrs.coverImage?.data
      ? getStrapiImageUrl(attrs.coverImage.data.attributes.url)
      : undefined,
    publishedAt: attrs.publishedAt,
    isPublished: attrs.isPublished,
    seoTitle: attrs.seoTitle,
    seoDescription: attrs.seoDescription,
    category: attrs.category?.data
      ? {
          id: attrs.category.data.id,
          name: attrs.category.data.attributes?.title,
          slug: attrs.category.data.attributes?.slug,
        }
      : null,
  }
}


// ========== AILELERE ÖĞÜTLER ==========

// Fetch all ailelere ogutler (family advice articles)
export async function getAilelereOgutler(): Promise<StrapiAilelereOgut[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/ailelere-ogutler?filters[isPublished][$eq]=true&populate=*&sort[0]=order:asc&sort[1]=publishedDate:desc`,
      {
        headers: {
          'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data: StrapiResponse<StrapiAilelereOgut[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching ailelere ogutler from Strapi:', error)
    return []
  }
}

// Fetch single ailelere ogut by slug
export async function getAilelereOgutBySlug(slug: string): Promise<StrapiAilelereOgut | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/ailelere-ogutler?filters[slug][$eq]=${slug}&filters[isPublished][$eq]=true&populate=*`,
      {
        headers: {
          'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data: StrapiResponse<StrapiAilelereOgut[]> = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error('Error fetching ailelere ogut from Strapi:', error)
    return null
  }
}

// Convert Strapi ailelere ogut to our format
export function strapiToAilelereOgut(strapiOgut: StrapiAilelereOgut) {
  const attrs = strapiOgut.attributes
  
  return {
    id: strapiOgut.id,
    slug: attrs.slug,
    title: attrs.title,
    excerpt: attrs.excerpt,
    content: attrs.content,
    coverImage: attrs.coverImage?.data ? getStrapiImageUrl(attrs.coverImage.data.attributes.url) : undefined,
    publishedDate: attrs.publishedDate,
    isPublished: attrs.isPublished,
    seoTitle: attrs.seoTitle,
    seoDescription: attrs.seoDescription,
    order: attrs.order || 0,
  }
}

// ========== CATEGORY ITEMS (categoryItem by Category Slug) ==========

// Fetch category items by category slug
export async function getCategoryItemsBySlug(categorySlug: string): Promise<StrapiCategoryItem[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?filters[slug][$eq]=${categorySlug}&populate[categoryItems][populate]=image`,
      {
        headers: {
          Authorization: STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 60 },
      }
    )

    const data: StrapiResponse<StrapiCategory[]> = await response.json()

    return data.data?.[0]?.attributes?.categoryItems?.data || []
  } catch (error) {
    console.error(error)
    return []
  }
}


// Fetch single category item by slug
export async function getCategoryItemBySlug(slug: string): Promise<StrapiCategoryItem | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/category-items?filters[slug][$eq]=${slug}&populate=image`,
      {
        headers: {
          'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
        },
        next: { revalidate: 60 }
      }
    )

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data: StrapiResponse<StrapiCategoryItem[]> = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error('Error fetching category item from Strapi:', error)
    return null
  }
}

export async function getCategoryDataBySlug(slug: string): Promise<any | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate[categoryItems][populate]=image`,
      { cache: 'no-store' }
    )
    const json = await response.json()
    return json?.data?.[0] || null
  } catch {
    return null
  }
}
// Kategori ve içindeki öğeleri getiren fonksiyon
export async function getCategoryWithItems(slug: string) {
  try {
    const query = `?filters[slug][$eq]=${slug}&populate[categoryItems][populate]=image`;
    const res = await fetch(`${STRAPI_URL}/api/categories${query}`, {
      headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
      cache: 'no-store'
    });
    const json = await res.json();
    return json?.data?.[0] || null;
  } catch (error) {
    console.error("Kategori çekme hatası:", error);
    return null;
  }
}


export async function getArticlesByType(type: string) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[type][$eq]=${type}&sort=publishedAt:desc&pagination[limit]=5&populate=Cover`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      console.error(`API Hatası: ${res.statusText}`);
      return [];
    }

    const json = await res.json()
    // Strapi v4 'data' array'ini döner
    return json.data || []; 
  } catch (error) {
    console.error("Fetch hatası:", error);
    return [];
  }
}




export async function getKurulBySlug(slug: string) {
  try {
    const queryObj = {
      filters: { slug: { $eq: slug } },
      populate: {
        sections: {
          on: {
            // DİKKAT: Ekran görüntüsünde component ismin 'board-section'.
            // Strapi'de bu genellikle 'kategoriIsmi.componentIsmi' şeklindedir.
            // Eğer kategori ismin 'sections' ise aşağıdaki 'sections.board-section' doğrudur.
            // Eğer kategori ismin 'shared' ise 'shared.board-section' yapmalısın.
            'sections.board-section': {
              populate: {
                // boardMember içindeki photo'ya ulaşmak için burayı açıyoruz
                boardMember: {
                  populate: {
                    photo: {
                      fields: ['url', 'alternativeText']
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const queryStr = qs.stringify(queryObj, { encodeValuesOnly: true });

    console.log("Kurul Request URL:", `${STRAPI_URL}/api/kuruls?${queryStr}`);

    const res = await fetch(`${STRAPI_URL}/api/kuruls?${queryStr}`, {
      headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('STRAPI ERROR (Kurul):', res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching kurul:", error);
    return null;
  }
}


export function strapiToKurul(strapiKurul: any) {
  if (!strapiKurul) return null;

  const d = strapiKurul.attributes ?? strapiKurul;

  return {
    title: d.Title ?? d.title,
    slug: d.slug,
    content: d.content || [],
    sections: d.sections || [],
  };
}


export function blocksToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      if (block.type === 'heading') {
        const text = block.children?.map((c: any) => c.text).join('') || ''
        return `<h${block.level}>${text}</h${block.level}>`
      }

      if (block.type === 'paragraph') {
        const text = block.children
          ?.map((c: any) => {
            let t = c.text || ''
            if (c.bold) t = `<strong>${t}</strong>`
            if (c.underline) t = `<u>${t}</u>`
            return t
          })
          .join('')

        return `<p>${text || '&nbsp;'}</p>`
      }

      return ''
    })
    .join('')
}
