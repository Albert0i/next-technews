import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req, {params}) { 
    try {
        const catName = params.catName
        const posts = await prisma.category.findUnique({ where: { catName }, include: {
            posts: { include: { author: true }, orderBy: { createdAt: 'desc'} }
        } } )
    
        return NextResponse.json(posts, {status:200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: 'Could not fetch post by category...'}, {status: 500}) 
    }
}
