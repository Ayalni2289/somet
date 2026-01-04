import { NextResponse } from 'next/server';
import { getKurulBySlug } from '../../../../../lib/strapi';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const kurul = await getKurulBySlug(params.slug);

  if (!kurul) {
    return NextResponse.json(
      { error: `Kurul '${params.slug}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      type: 'kurul',
      kurul,
      sectionsCount: kurul?.sections?.length || 0,
      sections: kurul?.sections || [],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
