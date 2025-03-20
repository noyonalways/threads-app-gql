/* 
|------------------------------------------------------------------------------
| Project Info
|------------------------------------------------------------------------------
| Title: Threads App GraphQL Server
| Description: A GraphQL server for the Threads app
| Author: Noyon Rahaman
| Date: 2025-03-20
| Technologies: Node.js, Express, Apollo Server, GraphQL
|------------------------------------------------------------------------------
*/

import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

const PORT = process.env.PORT || 8000;

async function init() {
  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: `#graphql
      type Query {
        hello(name: String): String
    }
    `,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello, ${name}!`,
      },
    },
  });

  await server.start();

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

init();
