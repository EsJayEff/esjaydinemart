import { cartTableDrizzle, db } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm"

// fetching the data from the vercel postgres
export async function GET(req: NextRequest) {
try {
       
            let allCartData = await db.select().from(cartTableDrizzle)
            return NextResponse.json({ allCartData })
    
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    };
};

// inserting data into the table of vercel postgres
export async function POST(req: NextRequest) {
    let request = await req.json();
    try {
        if (request.product_id && request.quantity && request.user_id && request.price && request.image_url && request.product_name && request.product_desc){
        let response = await db.insert(cartTableDrizzle).values(request).returning();
        return NextResponse.json({ response })
    } else {
        throw Error ("Please insert the product_id , quantity and the user_id")
    }
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    };
};

// updating the table in the vercel postgres
export async function PUT(req: NextRequest) {
    let request = await req.json();
    try {
        let response = await db.update(cartTableDrizzle).set(request).
               where(
                    and(eq(cartTableDrizzle.product_id, request.product_id),
                    eq(cartTableDrizzle.user_id, request.user_id))
                ).returning()
        return NextResponse.json({ response })
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
}

// deleting the table data from vercel postgres
export async function DELETE(req: NextRequest) {
    let url = req.nextUrl.searchParams;

    try {
        if (url.has("product_id") && url.has("user_id")) {
            let response = await db.delete(cartTableDrizzle).
                where(
                    and(eq(cartTableDrizzle.product_id, (url.get("product_id") as string)),
                    eq(cartTableDrizzle.user_id, (url.get("user_id") as string)))
                ).returning()
            return NextResponse.json({ response });
        } else {
            let response = await db.delete(cartTableDrizzle).returning()
            return NextResponse.json({ response });
        }
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
} 
