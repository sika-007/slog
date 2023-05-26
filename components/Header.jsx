import { useState, useEffect } from "react"
import Link from "next/link"
import { getCategories } from "@/services"

const Header = () => {
	const [categories, setCategories] = useState([])
	const [showMenu, setShowMenu] = useState(false)

	useEffect(() => {
		getCategories()
			.then(data => {
				setCategories(data.categories)
			})
			.catch(err => console.error(err))
	}, [])


	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="border-b-tertiary w-full border-b flex justify-between items-center py-8">
				<div className="align-middle">
					<Link href="/">
						<p className="cursor-pointer font-bold text-4xl text-white">
							THE SLOG!
						</p>
					</Link>
				</div>
				<div className="hidden md:flex gap-4">
					{categories.map(category => (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<p className="md:float-right mt-2 align-middle text-white font-semibold">
								{category.name}
							</p>
						</Link>
					))}
				</div>
				<div className="md:hidden">
					<div onClick={() => setShowMenu(prev => !prev)} className="flex flex-col items-end gap-y-1">
						<div className={`h-1 w-6 bg-white duration-100 transition-all ${showMenu && "rotate-45 translate-y-2"}`} />
						<div className={`h-1 w-5 bg-white transition-all duration-200 ${showMenu && "rotate-45 opacity-0"}`} />
						<div className={`h-1 ${showMenu ? "w-6" : "w-4"} duration-300 bg-white transition-all ${showMenu && "-rotate-45 -translate-y-2"}`} />
					</div>
					<div className={`absolute transition-all bg-black bg-opacity-25 hover:bg-opacity-40 p-4 top-20 right-5 ${showMenu ? "translate-x-0" : "translate-x-36"}`}>
						{categories.map(category => (
							<Link key={category.slug} href={`/category/${category.slug}`}>
								<p className="md:float-right mt-2 align-middle text-white">
									{category.name}
								</p>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
