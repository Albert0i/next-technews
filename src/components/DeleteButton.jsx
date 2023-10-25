'use client'

const DeleteButton = ({id}) => {  
  const deleteImage = async(publicId) => {
    try {
      const res = await fetch('/api/removeImage', {
        method: 'DELETE', 
        headers: { "Content-Type":  "application/json" }, 
        body: JSON.stringify({ publicId })
      })
      if (!res.ok) {
        console.log('res=', res)
      }
    } catch (error) {
      console.log(error)
    }  
  }
  
  const handleDelete = async () => {
    const confirmed = confirm('Are you sure to delete this post?')
    if (confirmed) {
      try {
        const res = fetch(`/api/posts/${id}`, { 
          method: 'DELETE', 
          headers: { "Content-Type": "application/json" } 
        })
        if (res.ok) {
          console.log('Post deleted')
          const post = await res.json()
          console.log('post=', post)
          const { publicId } = post          
          await deleteImage(publicId)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <button onClick={ handleDelete } className='text-red-600'>Delete</button>
  )
}

export default DeleteButton