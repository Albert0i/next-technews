'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const SignInBtns = () => {
  return (
    <>
        <h1 className='mt-8 text-center ' >Sign In</h1>
        <div className='flex flex-col items-center justify-center gap-4 p-4 mt-4'>
            <button className='flex items-center gap-4 p-4 transition border rounded-full hover:bg-slate-100/25' onClick={() => signIn('github')}>
                <span>
                    <Image src='/github-logo.svg' width={30} height={30} alt='github login' />
                </span>
                Sign In With GitHub
            </button>

            <button className='flex items-center gap-4 p-4 transition border rounded-full hover:bg-slate-100/25' onClick={() => signIn('google')}>
                <span>
                    <Image src='/google-logo.svg' width={30} height={30} alt='google login' />
                </span>
                Sign In With Google
            </button>
        </div>
    </>
  )
}

export default SignInBtns