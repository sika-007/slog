import React from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
import Image from 'next/image'

const PostCard = ({ post }) => {

  const dateIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>

  const dateCreated = moment(post.createdAt)

  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className="h-80 rounded-t-lg lg:rounded-lg shadow-md mb-6 overflow-hidden">
        <img src={post.featuredImage.url} alt={post.title} className='shadow-lg h-full w-full object-cover object-center' />
      </div>
      <div className='px-6 flex flex-col items-center'>
        <Link href={`/post/${post.slug}`}>
          <h1 className="transition duration-700 text-xl text-center mb-8 cursor-pointer hover:text-primary md:text-3xl font-semibold">
            {post.title}
          </h1>
        </Link>
        <div className='lg:flex text-center items-center justify-center mb-8 w-full'>
          <div className="flex items-center mb-4 justify-center lg:mb-0 w-full lg:w-auto">
            <Image src={post.author?.photo.url} alt={post.author.name} width={30} height={30} />
            <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
          </div>
          <div className='fomt-medium text-gray-700'>
            {dateIcon}
            <span>
              {dateCreated.format("MMM DD, YYYY HH:MM a")}
            </span>
          </div>
        </div>
        <p className='text-center text-sm hidden md:block'>{post.excerpt}</p>
        <button className='text-center transition duration-100 hover:bg-secondary hover:translate-y-1 hover:scale-105 inline-block bg-primary text-lg font-medium rounded-full px-4 py-1 mt-3 text-white'>
          <Link href={`/post/${post.slug}`}>
            <p className='hidden md:block'>Continue reading</p>
            <p className='md:hidden'>Read this post</p>
          </Link>
        </button>
      </div>
    </div>
  )
}

export default PostCard
