'use client'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteButton = ({id}) => {  
  const router = useRouter()

  const deleteImage = async(publicId) => {    
      const res = await fetch('/api/removeImage', {
        method: 'DELETE', 
        headers: { "Content-Type":  "application/json" }, 
        body: JSON.stringify({ publicId })
      });
      if (!res.ok) {
        const result = await res.json()
        console.log('Can not remove image, result=', result)
      }
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
          if (publicId) 
            await deleteImage(publicId);

          toast.success('Post deleted successfully')
          router.refresh()
        }
        else {
          toast,error('Something went wrong')
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