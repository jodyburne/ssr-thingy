import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/components/App";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";
import { typeDefs, resolvers } from "./apolloServer";
// @ts-ignore
import webpackConfig from "../../webpack.config";

const Html = () => (
  <html lang="en">
    <head>
      <title>Document</title>
    </head>
    <body>
      <div id="root">
        <App />
      </div>
    </body>
    <script type="application/javascript" src="/main.js"></script>
  </html>
);

// @ts-ignore
async function startApolloServer(typeDefs, resolvers) {
  const server = express();

  const httpServer = http.createServer(server);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: server });

  server.use(express.static(path.resolve(__dirname, "dist")));

  // @ts-ignore
  const compiler = webpack(webpackConfig);

  server.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
    })
  );
  server.use(
    webpackHotMiddleware(compiler, {
      log: false,
    })
  );
  server.get("/", (_, res) => {
    const content = renderToString(<Html />);
    res.send(content);
  });

  // server.listen(3007, () => {
  //   console.log(`Server running on http://localhost:3007`);
  // });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3007 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:3007`);
}

startApolloServer(typeDefs, resolvers);
