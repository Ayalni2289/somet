import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getCategoryWithItems,
  strapiToArticle,
} from '@/lib/strapi';
import ArticleTemplate from '@/components/ArticleTemplate';
import CategoryTemplate from '@/components/CategoryTemplate';

// ⬇️ ÇOK ÖNEMLİ (Vercel build-time render yapmasın)
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

  // 1️⃣ ARTICLE
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

  // 2️⃣ CATEGORY
  const categoryRaw = await getCategoryWithItems(slug);
  if (categoryRaw) {
    const data = categoryRaw.attributes ?? categoryRaw;
    const rawItems = data.categoryItems?.data ?? data.categoryItems ?? [];

    const items = rawItems.map((item: any) => {
      const attrs = item.attributes ?? item;
      const imgData = attrs.image?.data?.attributes ?? attrs.image;

      return {
        id: item.id,
        title: attrs.title,
        slug: attrs.slug,
        img: imgData?.url,
      };
    });

    return (
      <CategoryTemplate
        title={data.title}
        items={items}
        currentPage={currentPage}
      />
    );
  }

  // 3️⃣ YOKSA
  notFound();
}
