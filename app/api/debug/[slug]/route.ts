import { NextResponse } from 'next/server';
import { getArticleBySlug } from '../../../../lib/strapi';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // 1️⃣ ARTICLE KONTROLÜ
  const article = await getArticleBySlug(slug);
  if (article) {
    return NextResponse.json({
      type: 'article',
      article,
      sectionsCount: article?.sections?.length || 0,
      sections: article?.sections || [],
    });
  }

  // 2️⃣ CATEGORY KONTROLÜ
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate[categoryItems][populate]=image`,
      { cache: 'no-store' }
    );

    const data = await res.json();
    const category = data.data?.[0];

    if (category) {
      return NextResponse.json({
        type: 'category',
        category: {
          id: category.id,
          title: category.title,
          slug: category.slug,
          publishedAt: category.publishedAt,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          categoryItems: category.categoryItems,
        },
        itemsCount: Array.isArray(category.categoryItems)
          ? category.categoryItems.length
          : 0,
      });
    }
  } catch {
    // sessizce aşağı düş
  }

  return NextResponse.json(
    { error: `Slug '${slug}' not found in articles or categories` },
    { status: 404 }
  );
}
