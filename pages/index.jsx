import { Inter } from 'next/font/google'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '@/components'

const inter = Inter({ subsets: ['latin'] })

const posts = [
  { title: "React Testing", excerpt: "Learn React Testing" },
  { title: "React with Tailwind", excerpt: "Learn React With tailwind css" },
]

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Slog by Sika</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map(post => <PostCard post={post} key={post.title}/>)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticly relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
