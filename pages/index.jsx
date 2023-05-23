import { Inter } from 'next/font/google'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '@/components'
import { getPosts } from '@/services'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const posts = await getPosts()

  return (
    {
      props: {
        posts
      }
    }
  )
}



export default function Home({ posts }) {

  console.log(posts)

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Slog by Sika</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map(post => <PostCard post={post.node} key={post.node.title} />)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
