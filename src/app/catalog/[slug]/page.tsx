import { responseType, oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import ProductDetail from "@/components/views/ProductDetail";
import ContextWrapper from "@/global/context";

// This is for Metadata generation

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const slug = params.slug;

    const product = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*[_type == 'products']`).then((res: any) => res.json());
    const titleToSet: oneProductType = product.result.find((item: oneProductType) => item.slug.current == slug);

    return {
        title: titleToSet.productName,
        description: titleToSet.description,
    };
}



// This function will fetch particular data of product using particular slug

async function fetchPreviewData(slug: string) {
    let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26+slug.current+%3D%3D+%22${slug}%22%5D%0A++`)
    return res.json();
};



// This function will make static pages of every product

export async function generateStaticParams() {
    let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*[_type == 'products']`, {
        next: {
            revalidate: 60
        }
    }).then((res: any) => res.json())
    return res.result.map((item: oneProductType) => { slug: item.slug });
};


const Catalog = async ({ params }: { params: { slug: string } }) => {
    let data: responseType = await fetchPreviewData(params.slug)
    return (
<ContextWrapper>
<ProductDetail item={data.result[0]} />
</ContextWrapper>
  


    )
}

export default Catalog