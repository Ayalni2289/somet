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
  const articleRaw = await getArticleBySlug(slug);
  if (articleRaw) {
    const article = strapiToArticle(articleRaw);

    return (
      <ArticleTemplate
        {...article}
        hero={article.coverImage}
      />
    );
  }

  /* =========================
     2️⃣ CATEGORY KONTROLÜ
     (ARTIK CATEGORY-ITEM ÜZERİNDEN)
  ========================= */
  const categoryResult = await getCategoryWithItems(slug);

  if (categoryResult && categoryResult.items.length > 0) {
    const { category, items: rawItems } = categoryResult;

    const items = rawItems.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      img: item.image?.url,
    }));

    return (
      <CategoryTemplate
        title={category?.title ?? ''}
        items={items}
        currentPage={currentPage}
      />
    );
  }

  /* =========================
     3️⃣ HİÇBİRİ DEĞİLSE
  ========================= */
  notFound();
}
