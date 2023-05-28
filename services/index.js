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

export const getSimilarPosts = async (categories, slug) => {
	const query = gql`
		query similarPosts($slug: String!, $categories: [String!]) {
			posts (
				where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
				last: 3
			) {
				title
				featuredImage {
					url
				}
				slug
				createdAt
			}
		}
	`

	const result = await request(graphqlAPI, query, { categories, slug })
	return result.posts
}

export const getCategories = async () => {
	const query = gql`
		query categories {
			categories {
				name
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result
}

export const getPostDetails = async (slug) => {
	const query = gql`
		query PostDetails($slug: String!) {
			post(where: {slug: $slug}) {
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
				content {
					html
				}
			}
		}
	`
	const result = await request(graphqlAPI, query, { slug })
	return result.post
}

export const submitComment = async (obj) => {
	const result = await fetch("/api/comments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(obj)
	})

	return result.json()
}

export const getComments = async (slug) => {
	const query = gql`
		query getComments ($slug: String!) {
			comments(where: {post: {slug: $slug}}) {
				name
				createdAt
				comment
			}
		}
	`
	const result = await request(graphqlAPI, query, { slug })
	return result.comments
}

export const getFeaturedPosts = async () => {
	const query = gql`
		query getFeaturedPosts {
			posts(where: {featuredPost: true}) {
				author {
					name
					photo {
						url
					}
				}
				title
				slug
				createdAt
				featuredImage {
      		url
    		}
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.posts
}

export const getCategoryPosts = async (slug) => {
	const query = gql`
		query getCategoryPosts($slug: String!) {
			postsConnection(where: {categories_some: {slug: $slug}}) {
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
	const result = await request(graphqlAPI, query, {slug})
	return result.postsConnection.edges
} 