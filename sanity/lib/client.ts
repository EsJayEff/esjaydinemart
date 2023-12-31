import { createClient } from 'next-sanity'
import imageUrlBuilder  from "@sanity/image-url";

export const client = createClient({
  projectId:`${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
  dataset:`${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
  apiVersion:"2022-03-25",
  useCdn:false,
})


const builder = imageUrlBuilder(client)

export function urlFor(source:string) {
  return builder.image(source)}