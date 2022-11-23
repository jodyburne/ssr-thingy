import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/components/App";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
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
    <script type="application/json" src="/main.js"></script>
  </html>
);

const server = express();

server.use(express.static(path.resolve(__dirname, "dist")));

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

server.listen(3007, () => {
  console.log(`Server running on http://localhost:3007`);
});
