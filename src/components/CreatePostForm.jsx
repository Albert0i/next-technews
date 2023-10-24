'use client'
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { CldUploadButton } from 'next-cloudinary';
import Image from "next/image";

const CreatePostForm = () => {
  const [links, setLinks] = useState([])
  const [linkInput, setLinkInput] = useState('')
  const titleRef = useRef(null);
  const linkRef = useRef(null);
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [publicId, setPublicId] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch('/api/categories')
      const catNames = await res.json()
      setCategories(catNames)
    }

    fetchAllCategories()
    titleRef.current.focus()
  }, [])

  function addLink(e) {
    e.preventDefault()
    if (linkInput.trim() !== '') {
        setLinks( prev => [...prev, linkInput] )
        setLinkInput('')
        linkRef.current.focus()
    }
  }
  function deleteLink(index) {
    setLinks(prev => prev.filter((_, i) => i !== index))
  }
  
  function handleImageUpload(result) {
    console.log('result=', result)
    const info = result.info 
    
    if ('secure_url' in info && 'public_id' in info) {      
      const url = info.secure_url
      const public_id = info.public_id
      setImageUrl(url)
      setPublicId(public_id)
      console.log('url=', url)
      console.log('public_id=', public_id)
    }
  }

  async function removeImage(e) { 
    e.preventDefault()

    try {
      const res = await fetch('api/removeImage', {
        method: 'DELETE', 
        headers: { "Content-Type":  "application/json" }, 
        body: JSON.stringify({ publicId })
      })
      if (res.ok) {
        setImageUrl('')
        setPublicId('')
      }
    } catch (error) {
      console.log(error)
    }    
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!title || !content) {
      setError('Title and content are required')
      return
    }
    
    try {
      const res = await fetch('/api/posts', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          title, content, links, selectedCategory, imageUrl, publicId
        })
      }) 
      if (res.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        <h2>Create Post</h2>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' ref={titleRef} onChange={ e => setTitle(e.target.value)} />

            <textarea placeholder='Content' onChange={ e => setContent(e.target.value)}/>

            <div>
                { links && links.map( (link, index) => 
                    <div key={index}  className='flex items-center gap-4'>
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
                        </span>
                        <Link className='link' href={`${link}`}>{link}</Link>
                        <span className='cursor-pointer' onClick={() => deleteLink(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                        </span>
                    </div> ) }
            </div>

            <div className='flex gap-2'>
                <input className='flex-1' type='text' placeholder='Place the link and click on Add' onChange={ e => setLinkInput(e.target.value) } value={linkInput} ref={linkRef}/>
                <button className='flex items-center btn' onClick={addLink}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
                    </span>                
                    Add
                </button>
            </div>

            <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
            className={`relative grid h-48 mt-4 border-2 border-dotted rounded-md place-items-center bg-slate-100 ${imageUrl && 'pointer-events-none'}`} 
            onUpload={handleImageUpload} >
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
              </div>
              { imageUrl && <Image src={imageUrl} fill className='absolute inset-0 object-cover ' alt={title} ></Image> }
            </CldUploadButton>

            { publicId && <button className='px-4 py-2 mb-4 font-bold text-white bg-red-500 rounded-md w-fit' onClick={removeImage} >Remove Image</button> }

            <select className='p-3 border rounded-md appearance-none' onChange={ e => setSelectedCategory(e.target.value)}>
                <option value=''>Select a category</option>
                {
                    categories && 
                    categories.map(category => 
                        <option key={category.id} value={`${category.catName}`}>{ category.catName }</option>)
                }
            </select>

            <button type='submit' className='primary-btn'>Create Post</button>

            { error && 
              <div className='py-2 font-bold text-red-500 '>
                {error}
              </div>
            }
            
        </form>
    </div>
  )
}

export default CreatePostForm
/*
   Heroicon.com
   https://heroicons.com/
*/