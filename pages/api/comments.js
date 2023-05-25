import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

const hygraphToken = process.env.GRAPHCMS_TOKEN


export default async function comments(req, res) {

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
        data: {name: $name, email: $email, comment: $comment, cli34hbl915ef01ta1uybfy7w: {connect: {slug: $slug}}} 
      ) { id }
    }
  `


  const result = await graphQLClient.request(query, {
    name,
    email,
    comment,
    slug
  })

  res.status(200).send(result)

}
