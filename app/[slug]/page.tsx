import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getCategoryWithItems,
  strapiToArticle,
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

  /* =========================
      2️⃣ CATEGORY KONTROLÜ
  ========================= */
  const categoryResult = await getCategoryWithItems(slug);

  // Strapi v5 JSON yapısına göre düzeltildi
  if (categoryResult) {
    const category = categoryResult.attributes ?? categoryResult;
    const rawItems = category.categoryItems?.data ?? [];

    if (rawItems.length > 0) {
      const items = rawItems.map((item: any) => {
        const itemAttrs = item.attributes ?? item;
        return {
          id: item.id,
          title: itemAttrs.title,
          slug: itemAttrs.slug,
          // Kategori öğeleri için görsel yolu kontrolü
          img: itemAttrs.image?.url ?? itemAttrs.image?.data?.attributes?.url ?? null,
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