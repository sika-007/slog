import { useState, useEffect } from "react"
import Link from "next/link"
import { getCategories } from "@/services"

const Header = () => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getCategories()
			.then(data => {
				setCategories(data.categories)
				console.log(categories)
			})
			.catch(err => console.error(err))
	}, [])

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="border-b w-full	inline-block border-blue-400 py-8">
				<div className="md:float-left block">
					<Link href="/">
						<p className="cursor-pointer font-bold text-4xl text-white">
							THE SLOG!
						</p>
					</Link>
				</div>
				<div className="hidden md:float-left md:contents">
					{categories.map(category => (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<p className="md:float-right mt-2 align-middle text-white ml-4 font-semibold">
								{category.name}
							</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Header
