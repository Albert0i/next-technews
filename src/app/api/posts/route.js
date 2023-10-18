import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req) {
    const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json()
    const authorEmail = 'john@email.com'
    
    if (!title || !content) {
        return NextResponse.json({ message: 'Title and content are required'}, {status: 500})
    }
    try {
        const newPost = await prisma.post.create({
            data: { 
                title, 
                content, 
                links, 
                imageUrl, 
                publicId, 
                catName: selectedCategory, 
                authorEmail
            }
        })
        console.log('Post created')
        return NextResponse.json(newPost, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Could not create post...'}, {status: 500}) 
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({ 
            include: { author: { select: { name: true }}}, 
            orderBy: { createdAt: 'desc' } 
        }) 
        return NextResponse.json(posts)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Something went wrong...'}, {status: 500}) 
    }
}
/*
    Chrome Extension | JSON Formatter
*/