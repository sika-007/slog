import { gql, request } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
	const query = gql`
	query Assets {
		postsConnection {
			edges {
				node {
					createdAt
					slug
					title
					excerpt
					featuredImage {
						url
					}
					author {
						bio
						id
						name
						photo {
							url
						}
					}
					categories {
						name
						slug
					}
				}
			}
		}
	}	
`
	const result = await request(graphqlAPI, query)
	return result.postsConnection.edges
}

export const getRecentPosts = async () => {
	const query = gql`
		query recentPosts {
			posts(orderBy: createdAt_ASC, last: 3) {
				title
				featuredImage {
					url
				}
				slug
				createdAt
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.posts
}

export const getSimilarPosts = async () => {
	const query = gql`
		query similarPosts($title: String = "slug", $slug: String = "slug_not", $slug_not: String = "", $slug_in: [String] = "") {
			posts (
				where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				slug
				createdAt
			}
	`

	const result = await request(graphqlAPI, query)
	return result.posts

}

export const getCategories = async () => {

}