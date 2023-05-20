import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '@/services'


const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
        .then(result => {
          setRelatedPosts(result)
          console.log(relatedPosts)
        })
    } else {
      getRecentPosts()
        .then(result => {
          setRelatedPosts(result)
          console.log(relatedPosts)
        })
    }
  }, [slug])

  console.log()

  const posts = relatedPosts.map((post) => (
    <div key={post.title} className='flex items-center w-full mb-4'>
      <div className="w-16 flex-none">
        <img src={post.featuredImage.url} alt={post.title} className='h-16 w-16 align-middle rounded-full object-cover' />
      </div>
      <div title={post.title} className='flex-row ml-4'>
        <Link href={`/post/${post.slug}`} className='text-md'>
          {post.title.length > 51 ? (post.title.slice(0,50) + "...") : (post.title)}
        </Link>
        <p className='text-gray-500 text-xs'>
          {moment(relatedPosts[1]?.createdAt).format("MMM DD, YYYY.")}
        </p>
      </div>
    </div>
  ))

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? "Related posts" : "Recent Posts"}
      </h3>
      {posts}
    </div>
  )
}

export default PostWidget
