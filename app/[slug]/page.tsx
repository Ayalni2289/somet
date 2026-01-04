import { notFound } from 'next/navigation'
import { getArticleBySlug, getCategoryWithItems, strapiToArticle } from '@/lib/strapi'
import ArticleTemplate from '@/components/ArticleTemplate'
import CategoryTemplate from '@/components/CategoryTemplate'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || '1', 10))

  // 1. ADIM: MAKALE KONTROLÜ
  // Ekran görüntüsündeki 'Article' koleksiyonuna bakar
  const articleRaw = await getArticleBySlug(slug)
  if (articleRaw) {
    const article = strapiToArticle(articleRaw)
    return (
      <ArticleTemplate 
        {...article} 
        hero={article.coverImage} 
      />
    )
  }

  // 2. ADIM: KATEGORİ KONTROLÜ
  // Ekran görüntüsündeki 'Category' koleksiyonuna bakar
  const categoryRaw = await getCategoryWithItems(slug)
  if (categoryRaw) {
    const data = categoryRaw.attributes || categoryRaw;
    const rawItems = data.categoryItems?.data || data.categoryItems || [];
    
    // Veriyi template'in anlayacağı basit liste formatına çevir
    const items = rawItems.map((item: any) => {
      const attrs = item.attributes || item;
      const imgData = attrs.image?.data?.attributes || attrs.image;
      return {
        id: item.id,
        title: attrs.title,
        slug: attrs.slug,
        img: imgData?.url // getStrapiImageUrl template içinde kullanılacak
      }
    })

    return (
      <CategoryTemplate 
        title={data.title} 
        items={items} 
        currentPage={currentPage} 
      />
    )
  }

  // 3. ADIM: İKİSİ DE DEĞİLSE 404
  notFound()
}