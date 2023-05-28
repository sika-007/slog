import { PostCard, PostWidget, Categories } from "@/components";
import { getCategories, getCategoryPosts } from "@/services";

export async function getStaticPaths() {

  const data = await getCategories()
  const pathArray = data.categories.map(datum => (
    {
      params: {
        category: datum.slug
      }
    }
  ))
  return {
    paths: pathArray,
    fallback: false
  }
}

export async function getStaticProps(context) {
  console.log(context)

  const slug = context.params.category
  const posts = await getCategoryPosts(slug)

  return (
    {
      props: {
        posts
      }
    }
  )
}


const CategoryPage = ({ posts }) => {

  console.log(posts)

  return (
    <div className="container mx-auto md:px-10 px-3 mb-8">
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

export default CategoryPage
