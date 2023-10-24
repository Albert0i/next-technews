'use client'
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

const EditPostForm = ({ post }) => {
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

  useEffect(() => {
    const initValues = () => {
        setTitle(post.title)
        setContent(post.content)
        setImageUrl(post.imageUrl || '')
        setPublicId(post.publicId || '')
        setSelectedCategory(post.catName || '')
        setLinks(post.links || [])
    }

    initValues()
  }, [post.title, post.content, post.imageUrl, post.publicId, post.catName, post.links])

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
  
  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!title || !content) {
      setError('Title and content are required')
      return
    }
    
    try {
      const res = await fetch(`/api/posts/${post.id}`, { 
        method: 'PUT',
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
        <h2>Update Post</h2>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' ref={titleRef} onChange={ e => setTitle(e.target.value)} value={title} />

            <textarea placeholder='Content' onChange={ e => setContent(e.target.value)} value={content} />

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

            <select className='p-3 border rounded-md appearance-none' onChange={ e => setSelectedCategory(e.target.value)} value={selectedCategory}>
                <option value=''>Select a category</option>
                {
                    categories && 
                    categories.map(category => 
                        <option key={category.id} value={`${category.catName}`}>{ category.catName }</option>)
                }
            </select>

            <button type='submit' className='primary-btn'>Update Post</button>

            { error && 
              <div className='py-2 font-bold text-red-500 '>
                {error}
              </div>
            }
            
        </form>
    </div>
  )
}

export default EditPostForm
/*
   Heroicon.com
   https://heroicons.com/
*/