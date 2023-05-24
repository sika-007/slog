import Image from "next/image"

const Author = ({ author }) => {


  return (
    <div className=" text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20 transition-colors ease-in-out duration-300 hover:bg-opacity-40">
      <div className="absolute rounded-full flex justify-center left-0 right-0 -top-12">
        <Image src={author.photo.url} alt={author.name} height={100} width={100} unoptimized className="rounded-full align-middle bg-white"></Image>
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  )
}

export default Author
