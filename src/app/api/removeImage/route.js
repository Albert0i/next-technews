
import cloudinary from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const removeImage = async (publicId) => {
    try {
        const res = await cloudinary.v2.uploader.destroy(publicId)
        console.log('Image removed, res=', res)
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(req) {
    const { publicId } = await req.json()
    await removeImage(publicId)
    return NextResponse.json({ message: 'success' })
}