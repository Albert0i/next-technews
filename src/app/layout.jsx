import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className='lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl min-h-screen flex flex-col px-8'>
            <Navbar />
            <div className='flex-auto'>
              {children}
            </div>
            <Footer />
          </div>

          <Toaster></Toaster>

        </NextAuthProvider>        
      </body>
    </html>
  )
}
/*
   React Hot Toast
   https://react-hot-toast.com/
*/
export const dynamic = "force-dynamic";
/*
   Vercel build dependency caching workaround
   https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/vercel-caching-issue
   
   Next.js CLI
   https://nextjs.org/docs/pages/api-reference/next-cli
   
   Forcing dynamic on multiple routes/project-wide
   https://github.com/vercel/next.js/discussions/48989

   Route Segment Config
   https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
*/