import { Inter } from 'next/font/google'
import Head from 'next/head'
import { PostCard, Categories, PostWidget, FeaturedPost } from '@/components'
import { getPosts } from '@/services'


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


  return (
    <div className="container mx-auto md:px-10 px-3 mb-8">
      <Head>
        <title>Slog by Sika</title>
        <meta name="description" content="Learn more about all that has to do with web development and programming in general with Slog!" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='relative col-span-1 justify-self-auto lg:col-span-12 bg-black bg-opacity-25 shadow-lg rounded-lg p-8 lg:mb-6'>
          <FeaturedPost />
        </div>
        <div className='lg:col-span-8 col-span-1 relative'>
          {posts.map(post => <PostCard post={post.node} key={post.node.title} />)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='relative lg:sticky top-4'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
