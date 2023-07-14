import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let originalData: Array<oneProductType> = [];
  const url = request.nextUrl.searchParams;

  let response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`
  );
  let dataFrom_API = await response.json();
  originalData.push(...dataFrom_API.result);
  if (url.has("start") || url.has("end")) {
    if (originalData[Number(url.get("start"))]) {
      let ProductArray = originalData.slice(
        Number(url.get("start")),
        Number(url.get("end"))
      );
      return NextResponse.json({ ProductArray });
    }
    return NextResponse.json({  ProductArray:"Not Found" });
  }
  return NextResponse.json({ originalData });
}
