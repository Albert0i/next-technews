import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
    try {
        const categories = await prisma.category.findMany() 
        return NextResponse.json(categories, {status: 200})
    } catch (error) {
        console.log(error)        
        return NextResponse.json({ error: 'Something went wrong...'}, {status: 500}) 
    }
}
/*
    Chrome Extension | JSON Formatter
*/