import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts, getSimilarPosts } from '@/services'


const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
        .then(result => {
          setRelatedPosts(result)
        })
    } else {
      getRecentPosts()
        .then(result => {
          setRelatedPosts(result)
        })
    }
  }, [slug])

  console.log(relatedPosts)

  const postItems = relatedPosts.map((post) => (
    <div key={post.title} className='flex items-center w-full mb-4'>
      <div className="w-16 flex-none">
        <img src={post.featuredImage.url} alt={post.title} quality={10} className='align-middle w-16 h-16 rounded-full object-cover' />
      </div>
      <div title={post.title} className='flex-row ml-4'>
        <Link href={`/post/${post.slug}`} className='text-md'>
          {post.title.length > 51 ? (post.title.slice(0,50) + "...") : (post.title)}
        </Link>
        <p className='text-gray-500 text-xs'>
          {moment(post.createdAt).format("MMM DD, YYYY.")}
        </p>
      </div>
    </div>
  ))

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? "Related posts" : "Recent Posts"}
      </h3>
      {postItems}
    </div>
  )
}

export default PostWidget
