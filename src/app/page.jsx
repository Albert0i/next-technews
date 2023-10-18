import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { postsData } from '@../../data'

const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, { cache: 'no-store'})
    if (res.ok) {
      const posts = await res.json()
      return posts
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function Home() {
  const posts = await getPosts()
  
  return (<div>
            <CategoriesList />
            
            { posts && postsData.length > 0 ? 
              posts.map((post) => ( <Post key={post.id} post={post} /> ) ) : 
              <div className='py-6'>No posts to display</div> } 
        </div>)
}
