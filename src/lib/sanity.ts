import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source)
}

// Define a basic type for Portable Text blocks
export interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: Array<{ _key: string; _type: string; marks?: string[]; text: string }>;
  markDefs?: Array<any>; // Can be more specific if needed
  style?: string;
}

// Schema types
export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt: string
  body: PortableTextBlock[]
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

// Queries
export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  }
}`

export const blogPostQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  }
}`

