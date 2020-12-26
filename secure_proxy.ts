import dotenv from "dotenv";
import express from "express";
import httpProxy from "http-proxy";
import * as https from "https";
import * as http from "http";
import { createHmac } from "crypto";
import * as bodyParser from "body-parser";

dotenv.config();

type BitmexSignature = {
  signature: string;
  expires: number;
};

const createBitmexSignature = (request: http.IncomingMessage, body: string, payload: string): BitmexSignature => {
  const expires = new Date().getTime() + 60 * 1000;
  const method = request.method || "";
  const url = request.url || "";

  const hmac = createHmac("sha256", payload);
  hmac.update(method + url + expires + body);
  const signature = hmac.digest("hex");

  return { signature, expires };
};

const proxy = httpProxy.createProxyServer();

proxy.on("error", (error: any, request: any, response: http.ServerResponse) => {
  response.end();
});

proxy.on("proxyReq", (proxyRequest: http.ClientRequest, request: any) => {
  let body = "";
  if (request.body) {
    body = JSON.stringify(request.body);
  }

  if (request.method !== "OPTIONS") {
    const key = String(request.headers["bitmex-api-key"]);
    const secret = String(request.headers["bitmex-api-secret"]);
    const { signature, expires } = createBitmexSignature(request, body, secret);

    proxyRequest.setHeader("api-expires", expires);
    proxyRequest.setHeader("api-key", key);
    proxyRequest.setHeader("api-signature", signature);

    proxyRequest.removeHeader("bitmex-api-key");
    proxyRequest.removeHeader("bitmex-api-secret");
  }

  proxyRequest.setHeader("Content-Type", "application/json");
  proxyRequest.setHeader("Content-Length", Buffer.byteLength(body));
  proxyRequest.write(body);
});

const app = express();

app.use(bodyParser.json());
app.use((request: http.IncomingMessage, response: http.ServerResponse) => {
  delete request.headers["origin"];
  delete request.headers["referer"];
  delete request.headers["host"];

  const isTestnet = String(request.headers["bitmex-api-testnet"]).toLowerCase() === "true";
  delete request.headers["bitmex-api-testnet"];

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "User-Agent, Content-type, Content-Length,api-expires,api-key,api-signature,bitmex-api-testnet,bitmex-api-key,bitmex-api-secret",
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,POST,PUT,DELETE,OPTIONS",
  );

  const target = isTestnet === true ? "https://testnet.bitmex.com" : "https://www.bitmex.com";
  proxy.web(request, response, { target });
});

const port = process.env.PROXY_PORT || 8000;

app.listen(port, () => console.log(`Started Bitmex proxy on port ${port}`));
