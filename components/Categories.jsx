import { useState, useEffect } from "react"
import Link from "next/link"
import { getCategories } from "@/services"

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data.categories)
        console.log(categories)
      })
      .catch(err => console.error(err))
  }, [])

  const categoryItems = categories?.map(category => (
    <Link key={category.slug} href={`/categpries/${category.slug}`}>
      <p className="cursor-pointer block pb-3 mb-3">
        {category.name}
      </p>
    </Link>
  ))

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {categoryItems}
    </div>
  )
}

export default Categories
