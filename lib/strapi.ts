
// Strapi API Client
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
  if (!url) return undefined
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

function serializeSectionsToHtml(sections: any[] | undefined): string | undefined {
  if (!Array.isArray(sections)) return undefined;

  return sections
    .map((section) => {
      const type = section.__component;

      // Rich Text Alanı
      if (type === 'text.rich-text' || type === 'blocks.rich-text') {
        return section.text || section.richText || '';
      }

      // Image Block (Tekli Resim) - Ekran görüntüsünde alan adı: image
      if (type === 'image.image-block') {
        const imgData = section.image?.data || section.image;
        const url = getStrapiImageUrl(imgData?.attributes?.url || imgData?.url);
        
        if (!url) return '';
        const caption = section.caption ? `<figcaption>${section.caption}</figcaption>` : '';
        return `<figure><img src="${url}" alt="${section.caption || ''}" />${caption}</figure>`;
      }

      // Gallery Block (Çoklu Resim) - Ekran görüntüsünde alan adı: multipleMedia
      if (type === 'images.gallery-block') {
        const mediaSource = section.multipleMedia?.data || section.multipleMedia;
        
        if (!Array.isArray(mediaSource)) return '';

        const imgs = mediaSource
          .map((m: any) => {
            const url = getStrapiImageUrl(m.attributes?.url || m.url);
            return url ? `<img src="${url}" style="width:100%; border-radius:8px;" />` : '';
          })
          .join('');
          
        return imgs ? `<div class="gallery-grid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:15px;">${imgs}</div>` : '';
      }

      return '';
    })
    .filter(Boolean)
    .join('\n');
}


// Fetch all articles from Strapi
// Fetch all articles from Strapi
export async function getArticles(): Promise<StrapiArticle[]> {
  try {
    const query = "?sort=createdAt:desc&populate[cover]=*";

    const res = await fetch(
      `${STRAPI_URL}/api/articles${query}`,
      {
        headers: {
          Authorization: STRAPI_API_TOKEN
            ? `Bearer ${STRAPI_API_TOKEN}`
            : '',
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const json = await res.json();
    return json?.data ?? [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}


export async function getArticleBySlug(
  slug: string
): Promise<StrapiArticle | null> {
  try {
    const query =
      `?filters[slug][$eq]=${slug}` +
      `&populate[sections][populate]=*` +
      `&populate[cover][fields][0]=url`;

    const res = await fetch(
      `${STRAPI_URL}/api/articles${query}`,
      {
        headers: {
          Authorization: STRAPI_API_TOKEN
            ? `Bearer ${STRAPI_API_TOKEN}`
            : '',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.error('Article fetch failed:', res.status);
      return null;
    }

    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}


export function strapiToArticle(raw: any) {
  const a = raw.attributes ?? raw;

  return {
    title: a.title,
    slug: a.slug,
    content: a.content,
    coverImage: a.cover?.data?.attributes?.url ?? null,
    sections: a.sections ?? [],
    publishedAt: a.publishedAt,
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
  const res = await fetch(
    `${STRAPI_URL}/api/articles?filters[type][$eq]=${type}&sort=publishedAt:desc&pagination[limit]=5&populate=Cover`,
    { cache: 'no-store' }
  )

  const json = await res.json()
  return json.data
}


export async function getKurulBySlug(slug: string) {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

  const query = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[sections][on][sections.board-section][populate][boardMember][populate]': 'photo',
  });

  const res = await fetch(`${STRAPI_URL}/api/kuruls?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('STRAPI ERROR:', err);
    return null;
  }

  const json = await res.json();
  return json?.data?.[0] || null;
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
