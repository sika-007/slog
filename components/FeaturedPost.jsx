import React, { useEffect, useState, useRef } from 'react'
import { getFeaturedPosts } from '@/services'
import arrowBack from "../public/arrow_back.png"
import arrowForward from "../public/arrow_forward.png"
import Image from 'next/image'
import Link from 'next/link'

const FeaturedPost = () => {

  const [featuredPosts, setFeaturedPosts] = useState([])
  const postTapeRef = useRef()

  useEffect(() => {
    getFeaturedPosts()
      .then(res => setFeaturedPosts(res))
      .catch((err) => console.log(err))
  }, [])

  function handleScroll(direction) {
    switch (direction) {
      case "right":
        postTapeRef.current.scrollLeft += 100;
        console.group("right")
        break;
      case "left":
        postTapeRef.current.scrollLeft -= 100;
        console.group("left")
        break;
    }
  }

  const featuredPostElements = featuredPosts.map(post => (
    <Link key={post.createdAt} href={`/post/${post.slug}`}>
      <div className='relative h-60 w-40 flex-shrink-0 snap-center'>
          <img src={post.featuredImage.url} className='h-full rounded-lg w-full object-cover' alt={post.title} />
          <div className='absolute peer bottom-4 z-10' >
            <p className='text-center text-white px-2'>{post.title}</p>
          </div>
          <div className='absolute peer z-10 top-4 flex justify-center w-full gap-2'>
            <img src={post.author.photo.url} className='rounded-full w-6' alt={post.author.name} />
            <p className='text-white'>{post.author.name}</p>
          </div>
          <div className='bg-black opacity-30 rounded-lg hover:opacity-70 transition-opacity absolute inset-0 peer-hover:opacity-70'/>
      </div>
    </Link>
  ))


  return (
    <>
      <h3 className='text-xl mb-8 font-semibold text-white border-b border-b-tertiary border-opacity-20 pb-4'>Our Top Picks</h3>
      <div ref={postTapeRef} className='flex flex-nowrap featured-posts-tape overflow-x-auto overflow-y-hidden justify-start gap-5 snap-x'>
        {featuredPostElements}
        <div className='absolute top-52 -left-1'>
          <Image onClick={() => handleScroll("left")} src={arrowBack} height={35} width={35} className='bg-tertiary rounded-full' alt="arrow back" />
        </div>
        <div onClick={() => handleScroll("right")} className='absolute top-52 -right-1'>
          <Image src={arrowForward} className='bg-tertiary rounded-full' width={35} height={35} alt="arrow forward" />
        </div>
      </div>
    </>
  )
}

export default FeaturedPost
