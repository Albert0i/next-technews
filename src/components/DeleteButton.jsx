'use client'

const DeleteButton = ({id}) => {  
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