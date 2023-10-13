import React from 'react'
import Post from "@/components/Post";
import { postsData } from '@../../data'
import Link from 'next/link';

const Dashboard = () => {
    return (<div>
              <h1>My Posts</h1>

              { postsData && postsData.length > 0 ? 
                postsData.map((post) => ( <Post key={post.id} post={post} /> ) ) : 
                <div className='py-6'>No posts created yet<Link className='underline' href='/create-post'>Create New</Link>
                  </div> } 
            </div>)
}

export default Dashboard