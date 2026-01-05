import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getCategoryWithItems,
  strapiToArticle,
  getStrapiImageUrl,
} from '@/lib/strapi';
import ArticleTemplate from '@/components/ArticleTemplate';
import CategoryTemplate from '@/components/CategoryTemplate';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const { slug } = params;
  const currentPage = Math.max(
    1,
    parseInt(searchParams.page ?? '1', 10)
  );

  /* =========================
      1️⃣ ARTICLE KONTROLÜ
  ========================= */
  const rawArticle = await getArticleBySlug(slug);

  if (rawArticle) {
    // strapiToArticle ham JSON'u alır ve coverImage: "http://..." şeklinde bir obje döner
    const article = strapiToArticle(rawArticle);

    return (
      <ArticleTemplate
        title={article.title}
        sections={article.sections}
        coverImage={article.coverImage} // ✅ Artık strapiToArticle'dan gelen hazır URL
        seoTitle={article.seoTitle}
        seoDescription={article.seoDescription}
      />
    );
  }

  const categoryResult = await getCategoryWithItems(slug);

  if (categoryResult) {
    const category = categoryResult.attributes ?? categoryResult;
    // Strapi v5'te bazen data iç içe olabiliyor, güvenli erişim:
    const rawItems = category.categoryItems?.data ?? category.categoryItems ?? [];

    if (Array.isArray(rawItems) && rawItems.length > 0) {
      const items = rawItems.map((item: any) => {
        const itemAttrs = item.attributes ?? item;
        
        // Resim verisine güvenli erişim
        const imgData = itemAttrs.image?.data?.attributes ?? itemAttrs.image?.attributes ?? itemAttrs.image ?? null;
        
        return {
          id: item.id,
          title: itemAttrs.title,
          slug: itemAttrs.slug,
          // ✅ getStrapiImageUrl kullanarak tam URL alıyoruz
          img: getStrapiImageUrl(imgData?.url), 
        };
      });

      return (
        <CategoryTemplate
          title={category.title}
          items={items}
          currentPage={currentPage}
        />
      );
    }
  }

  // =========================
  // 3️⃣ BULUNAMADI
  // =========================
  notFound();
}