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

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphQLServer from "./graphql";

const PORT = process.env.PORT || 8000;

async function init() {
  const app = express();
  app.use(express.json());

  const gqlServer = await createGraphQLServer();

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

init();
