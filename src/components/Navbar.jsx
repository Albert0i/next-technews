'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const Navbar = () => {
  const { status, data: session } = useSession()
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const popupRef = useRef(null)
  
  useEffect(() => {
    function handleClickOutside (e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) 
        setIsPopupVisible(false);
    }
    
    document.addEventListener('click', handleClickOutside)
    if (!isPopupVisible) 
      document.removeEventListener('click', handleClickOutside);
    return (() => {
      document.removeEventListener('click', handleClickOutside);
    })
  
  }, [isPopupVisible])
  return (
    <div className='relative flex justify-between pb-4 border-b mn-4'>
      <div>
        <Link href='/'>
          <h1 className='text-4xl font-bold tracking-tighter text-dark'>Tech News</h1>
        </Link>
        <p className='text-sm'>
          Exploring Tomorrow&apos;s Innovations, <br />One Bite at a Time. 
        </p>
      </div>

      {
        status === "authenticated" ? 
        (<>        
          <div ref={popupRef} className={`absolute right-0 z-30 flex-col gap-2 p-6 text-right bg-white rounded-md shadow-lg top-20 min-w-[160px] ${isPopupVisible? 'flex': 'hidden' }`} >
            <div className='font-bold'>{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link className='hover:underline' href='/dashboard' onClick={ () => setIsPopupVisible(false) }>Dashboard</Link>
            <Link className='hover:underline' href='/create-post' onClick={ () => setIsPopupVisible(false) }>Create Post</Link>
            <button className='btn' onClick={signOut}>Sign Out</button>
          </div>
          
          <div className='flex items-center gap-2'>
            <Link className='items-center hidden gap-2 mr-6 md:flex' href='/create-post'>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image src={session?.user?.image || '' } width={36} height={36} alt='Profile Image' className='rounded-full cursor-pointer' onClick={ () => setIsPopupVisible(prev => !prev) } />
          </div>
          </>)
           : 
          (<div className='flex items-center '>
            <Link className='btn' href='/sign-in'>
              Sign In
            </Link>
          </div>)
      }      
    </div>
  )
}

export default Navbar
/*
   heroicons
   https://heroicons.com/
*/