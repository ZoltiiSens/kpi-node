import * as http from "node:http";
import router from "./routers.js";
import defaultHandler from "./defaultHandler.js";
import helpers from "./helpers.js";
import { safeJSON } from "./utils.js";

const processedContentTypes = {
  "text/html": (text) => text,
  "text/plain": (text) => text,
  "application/json": (json) => safeJSON(json, { message: "error" }),
  "application/x-www-form-urlencoded": (data) => {
    return Object.fromEntries(new URLSearchParams(data));
  },
};

const server = http.createServer(async (req, res) => {
  const requestURL = new URL(req.url || "/", `http://${req.headers.host}`);
  // console.log(`RequestURL: ${requestURL}`);
  // console.log(`Router: ${router}`);
  // for (let [key, val] of router){
  // 	console.log(`${key} ---> ${val}`);
  // }

  const routeModule = router.get(requestURL.pathname) ?? {};

  const handler = routeModule[req?.method] ?? defaultHandler;
  let payload = {};
  let rawRequest = "";
  for await (const chunk of req) {
    rawRequest += chunk;
  }
  if (req.headers["content-type"]) {
    const contentType = req.headers["content-type"].split(";")[0];
    if (processedContentTypes[contentType]) {
      payload = processedContentTypes[contentType](rawRequest);
    }
  }
  try {
    handler(req, Object.assign(res, helpers), requestURL, payload, rawRequest);
  } catch (e) {
    res.statusCode = 500;
    res.end(process.env.NODE_ENV == "production" ? "internal error" : e);
  }
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});
server.listen(parseInt(process.env.PORT) || 9000);

process.on("SIGINT", () => {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
});
