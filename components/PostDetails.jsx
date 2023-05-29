import moment from "moment/moment"
import Image from "next/image"
import DOMParserReact from "dom-parser-react"

const PostDetails = ({ post }) => {

  

  const dateIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>

  const dateCreated = moment(post.createdAt)

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          quality={20}
          className="object-top rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto">
            <Image src={post.author?.photo.url} alt={post.author.name} height={30} width={30} />
            <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
          </div>
          <div className=' font-medium text-gray-700'>
            {dateIcon}
            <span>
              {dateCreated.format("MMM DD, YYYY HH:MM a")}
            </span>
          </div>
        </div>
        <div className="blogpost-parent">
          <DOMParserReact source={post.content.html} />
        </div>
      </div>
    </div>
  )
}

export default PostDetails
