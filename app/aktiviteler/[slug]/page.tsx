import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryDataBySlug } from '@/lib/strapi';
import CategoryTemplate from '@/components/CategoryTemplate';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${title} — SOMET`,
  };
}

export default async function ActivityCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));

  // Strapi'den kategori verisini ve ilişkili öğeleri çekiyoruz
  const categoryRaw = await getCategoryDataBySlug(slug);

  if (!categoryRaw) {
    notFound();
  }

  const attrs = categoryRaw.attributes || categoryRaw;
  const rawItems = attrs.categoryItems?.data || attrs.categoryItems || [];

  // Veriyi CategoryTemplate'in beklediği formata dönüştürüyoruz
  const items = rawItems.map((item: any) => {
    const d = item.attributes || item;
    const imgData = d.image?.data?.attributes || d.image;
    return {
      id: item.id,
      title: d.title,
      slug: d.slug,
      img: imgData?.url // CategoryTemplate içinde getStrapiImageUrl ile işlenecek
    };
  });

  return (
    <CategoryTemplate
      title={attrs.title}
      items={items}
      currentPage={currentPage}
      breadcrumbParent={{ name: 'Aktiviteler', href: '/aktiviteler' }}
    />
  );
}