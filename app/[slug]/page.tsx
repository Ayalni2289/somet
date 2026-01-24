import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getCategoryWithItems,
  strapiToArticle,
  getStrapiImageUrl,
  getRelatedArticles,
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
    parseInt(searchParams?.page ?? '1', 10)
  );

  /* =========================
      1️⃣ ARTICLE KONTROLÜ
  ========================= */
  const rawArticle = await getArticleBySlug(slug);

  if (rawArticle) {
    const article = strapiToArticle(rawArticle);

    const type =
      rawArticle.attributes?.type ??
      rawArticle.type;

    // getRelatedArticles artık { data, meta } dönüyor
    const { data: relatedArticlesRaw, meta } = await getRelatedArticles(
      type,
      slug,
      currentPage, // page
      12           // pageSize
    );

    const relatedArticles = relatedArticlesRaw.map((item: any) => {
      const attr = item.attributes ?? item;

      return {
        id: item.id,
        title: attr.title,
        slug: attr.slug,
        coverImage: getStrapiImageUrl(
          attr.cover?.data?.attributes?.url ||
          attr.image?.data?.attributes?.url
        ),
      };
    });

    return (
      <ArticleTemplate
        title={article.title}
        sections={article.sections}
        coverImage={article.coverImage}
        seoTitle={article.seoTitle}
        seoDescription={article.seoDescription}

        /* ✅ DOĞRU PROP */
        relatedArticles={relatedArticles}

        /* ✅ PAGINATION META */
        pagination={meta?.pagination}

        /* ✅ LABEL */
        categoryLabel={
          type === 'haber'
            ? 'Diğer Haberler'
            : type === 'duyuru'
              ? 'Diğer Duyurular'
              : 'Diğer Etkinlikler'
        }
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