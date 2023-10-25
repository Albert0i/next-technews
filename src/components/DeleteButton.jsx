'use client'

const DeleteButton = ({id}) => {  
  const deleteImage = async(publicId) => {    
      const res = await fetch('/api/removeImage', {
        method: 'DELETE', 
        headers: { "Content-Type":  "application/json" }, 
        body: JSON.stringify({ publicId })
      });
  }
  
  const handleDelete = async () => {
    const confirmed = confirm('Are you sure to delete this post?')
    if (confirmed) {
      try {        
        const res = await fetch(`/api/posts/${id}`, { 
          method: 'DELETE', 
          headers: { "Content-Type": "application/json" } 
        })        
        
        if (res.ok) {
          const post = await res.json();
          console.log('Post deleted, post=', post)
          const { publicId } = post;
          await deleteImage(publicId);
        }
        console.log('after')
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