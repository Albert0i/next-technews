import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req, {params}) { 
    try {
        const id = params.id 
        const post = await prisma.post.findUnique({ where: { id }, include: {
            author: { select: { name: true }}
        } } ) 
    
        return NextResponse.json(post, {status:200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: 'Could not fetch post...'}, {status: 500}) 
    }
}

export async function PUT(req, {params}) {
    try {
        const id = params.id
        const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json() 
        const post = await prisma.post.update({ where: {id}, 
            data: {
                title, 
                content, 
                links, 
                catName: selectedCategory, 
                imageUrl, 
                publicId
            }})
        return NextResponse.json(post, {status:200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: 'Could not update post...'}, {status: 500}) 
    }
}

export async function DELETE(req, {params}) {
    try {
        const id = params.id
        const post = await prisma.post.delete({ where: {id}})
        return NextResponse.json(post, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Could not delete post...'}, {status: 500}) 
    }
}
