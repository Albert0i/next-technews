import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteButton from './DeleteButton'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Posts = async ( {post, authorName } ) => {
  const {id, author, createdAt:date, imageUrl, authorEmail, title, content, links, catName } = post  
  const session = await getServerSession(authOptions)
  const isEditable = session && session?.user?.email === authorEmail

  const dateObject = new Date(date)
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }
  const formattedDate = dateObject.toLocaleDateString('en-US', options)

  return (
    <div className='py-8 my-4 border-b border-slate-300'>
      <div className='mb-4'>
        Posted by: <span className='font-bold'>{ author?.name }{ authorName }</span> on {formattedDate}
      </div>

      <div className='relative w-full h-72'>
        { imageUrl ? 
          ( <Image src={imageUrl} alt={title} fill 
            className='object-cover object-center rounded-md' /> ) :         
          ( <Image src={'/thumbnail-placeholder.png'} alt={title} fill           
            className='object-cover object-center rounded-md' /> ) 
        }
      </div>

      <div>
        { post.catName && ( <Link className='text-white w-fit bg-slate-800 px-4 py-0.5 text-sm font-bold rounded-md mt-4 block' href={`/categories/${catName}`}>{catName}</Link> ) }
      </div>

      <h2>{title}</h2>

      <p className='content'>{content}</p>
      
      { links && (
        <div className='flex flex-col gap-3 my-4'>
          { links.map((link, index) => (
            <div key={index} className='flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
              <Link className='link' href={link}>{link}</Link>
            </div>
          ))}
        </div>
      ) }

      { isEditable && (
        <div className='flex gap-3 px-4 py-2 font-bold rounded-md w-fit bg-slate-200'>
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton id={id} />
        </div>  
      ) }
    </div>
  )
}

export default Posts
/*
   Heroicon.com
   https://heroicons.com/
*/