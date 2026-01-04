import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  try {
    // 1️⃣ Categories + Items
    const resCategories = await fetch(
      `${STRAPI_URL}/api/categories?populate[categoryItems][populate]=image`,
      { cache: 'no-store' }
    );

    const categoriesJson = await resCategories.json();

    // 2️⃣ Category Items (tekil kontrol için)
    const resItems = await fetch(
      `${STRAPI_URL}/api/category-items?populate=image&populate=category`,
      { cache: 'no-store' }
    );

    const itemsJson = await resItems.json();

    const categories = categoriesJson.data || [];

    return NextResponse.json({
      categories: {
        count: categories.length,
        allWithItems: categories.map((c: any) => {
          const attrs = c.attributes || {};
          const items = attrs.categoryItems?.data || [];

          return {
            id: c.id,
            slug: attrs.slug,
            title: attrs.title,
            itemsCount: items.length,
            categoryItemsType: typeof attrs.categoryItems,
            categoryItemsIsArray: Array.isArray(items),
          };
        }),
      },
      categoryItems: {
        count: itemsJson.data?.length || 0,
        sample: itemsJson.data?.slice(0, 2) || [],
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
