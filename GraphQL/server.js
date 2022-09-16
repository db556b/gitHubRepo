import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => "Hellow World",    
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await server.listen({ port: 2121 });
console.log(`server is running at ${url}`);