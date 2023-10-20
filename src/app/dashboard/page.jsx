import React from 'react'
import Post from "@/components/Post";
import Link from 'next/link';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const getPosts = async (email) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`)   
    const data = await res.json()        
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  let data = null

  if (!session) 
    redirect('/sign-in')

  if (email)
    data = await getPosts(email);
    
    return (<div>
              <h1>My Posts</h1>

              { data.posts && data.posts.length > 0 ? 
                data.posts.map((post) => ( <Post key={post.id} post={post} authorName={data.name}/> ) ) : 
                <div className='py-6'>No posts created yet <Link className='underline' href='/create-post'>Create New</Link>
                  </div> } 
            </div>)
}

export default Dashboard