import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req, {params}) { 
    try {
        const email = params.email
        const posts = await prisma.user.findUnique({ where: { email }, include: {
            posts: { orderBy: { createdAt: 'desc'} }
        } } )
    
        return NextResponse.json(posts, {status:200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: 'Could not fetch post by user...'}, {status: 500}) 
    }
}
