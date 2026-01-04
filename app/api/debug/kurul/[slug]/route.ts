import { NextResponse } from 'next/server'
import { getKurulBySlug } from '../../../../../lib/strapi'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const kurul = await getKurulBySlug(params.slug)
  
  return NextResponse.json({
    kurul,
    sectionsCount: kurul?.sections?.length || 0,
    sections: kurul?.sections || [],
    raw: kurul,
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
