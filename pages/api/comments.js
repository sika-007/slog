import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

const hygraphToken = process.env.GRAPHCMS_TOKEN


export default async function comments(req, res) {

  if (req.method === "POST") {
    const { name, email, comment, slug } = req.body
  
  
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${hygraphToken}`,
      }
    })
  
    console.log("")
  
    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(
          data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}} 
        ) { id }
      }
    `
  
  
      try {
        const result = await graphQLClient.request(query, {
          name,
          email,
          comment,
          slug
        })
      
        res.status(200).json(result)
      } catch (error) {
        res.status(500).json(error)
      }
  }
}
