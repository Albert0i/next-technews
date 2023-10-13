import Image from 'next/image'

const SignInBtns = () => {
  return (
    <>
        <h1 className='mt-8 text-center ' >Sign In</h1>
        <div className='flex flex-col items-center justify-center gap-4 p-4 mt-4'>
            <button className='flex items-center gap-4 p-4 transition border rounded-full hover:bg-slate-100/25'>
                <span>
                    <Image src='/github-logo.svg' width={30} height={30} alt='github logo' />
                </span>
                Sign In With GitHub
            </button>

            <button className='flex items-center gap-4 p-4 transition border rounded-full hover:bg-slate-100/25'>
                <span>
                    <Image src='/google-logo.svg' width={30} height={30} alt='github logo' />
                </span>
                Sign In With Google
            </button>
        </div>
    </>
  )
}

export default SignInBtns