import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { postsData } from '@../../data'

export default function Home() {
  return (<div>
            <CategoriesList />

            { postsData && postsData.length > 0 ? 
              postsData.map((post) => ( <Post key={post.id} post={post} /> ) ) : 
              <div className='py-6'>No posts to display</div> } 
        </div>)
}
