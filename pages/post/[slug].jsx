import React from 'react'
import { getPosts, getPostDetails } from '@/services'
import { PostDetails, Categories, PostWidget, Author, Comments, CommentsForm } from "@/components"


export async function getStaticPaths() {
  const data = await getPosts()
  const pathArray = data.map(datum => (
    {
      params: {
        slug: datum.node.slug
      }
    }
  ))

  return {
    paths: pathArray,
    fallback: false
  }
}

export async function getStaticProps(context) {
  
  const slug = context.params.slug
  const data = await getPostDetails(slug)

  return (
    {
      props: {
        post: data
      }
    }
  )
}

const PostSection = ({ post }) => {
  
  const categorySlugs = post.categories.map(category => category.slug)



  return (
    <div className='container mx-auto px-3 md:px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetails post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget slug={post.slug} categories={categorySlugs} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSection
