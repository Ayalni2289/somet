import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryDataBySlug } from '@/lib/strapi';
import CategoryTemplate from '@/components/CategoryTemplate';

// ⬇️ ÇOK ÖNEMLİ — Vercel build-time render yapmasın
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const title = params.slug.replace(/-/g, ' ').toUpperCase();

  return {
    title: `${title} — SOMET`,
  };
}

export default async function ActivityCategoryPage({
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

  // 🔥 Strapi'den kategori + ilişkili içerikler
  const categoryRaw = await getCategoryDataBySlug(slug);

  if (!categoryRaw) {
    notFound();
  }

  const attrs = categoryRaw.attributes ?? categoryRaw;
  const rawItems = attrs.categoryItems?.data ?? attrs.categoryItems ?? [];

  const items = rawItems.map((item: any) => {
    const d = item.attributes ?? item;
    const imgData = d.image?.data?.attributes ?? d.image;

    return {
      id: item.id,
      title: d.title,
      slug: d.slug,
      img: imgData?.url,
    };
  });

  return (
    <CategoryTemplate
      title={attrs.title}
      items={items}
      currentPage={currentPage}
      breadcrumbParent={{
        name: 'Aktiviteler',
        href: '/aktiviteler',
      }}
    />
  );
}
