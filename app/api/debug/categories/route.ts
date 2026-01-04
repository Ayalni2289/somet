import { NextResponse } from 'next/server'

export async function GET() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Get raw category data with Strapi v4 bracket notation
    const res1 = await fetch(
      `${STRAPI_URL}/api/categories?populate[categoryItems][populate]=image`,
      { cache: 'no-store' }
    )
    
    const categories = await res1.json()
    
    // Get raw category-items with Strapi v4 bracket notation
    const res2 = await fetch(
      `${STRAPI_URL}/api/category-items?populate[category]=*&populate[image]=*`,
      { cache: 'no-store' }
    )
    
    const items = await res2.json()
    
    return NextResponse.json({
      categories: {
        count: categories.data?.length || 0,
        zihinselEngellilik: categories.data?.find((c: any) => c.slug === 'zihinsel-engellilik'),
        allWithItems: categories.data?.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          itemsCount: Array.isArray(c.categoryItems) ? c.categoryItems.length : 'not an array',
          categoryItemsExists: c.hasOwnProperty('categoryItems'),
          itemsExists: c.hasOwnProperty('items')
        }))
      },
      categoryItems: {
        count: items.data?.length || 0,
        sample: items.data?.slice(0, 2)
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}
