import Post from "@/components/Post"

const getPosts = async (catName) => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`, { cache: 'no-store' })
        if (res.ok)
        {
            const categories = await res.json()
            const posts = categories.posts
            return posts
        }
    } catch (error) {
        console.log(error)
    }
    return null
}

const CategoryPosts = async ({ params }) => {
  const category = params.catName

  const posts = await getPosts(category)
  
  return (
    <>
        <h1><span className='font-normal '>Category: </span>{ decodeURIComponent(category) }</h1>
        
        { posts && posts.length > 0 ? 
              posts.map((post) => ( <Post key={post.id} post={post} /> ) ) : 
              <div className='py-6'>No posts to display</div> } 
    </>
  )
}

export default CategoryPosts