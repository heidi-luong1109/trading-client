const config = {
  bitmex: {
    key: __BITMEX_API_KEY__,
    secret: __BITMEX_API_SECRET__,
    testnet: __BITMEX_TESTNET__,
    symbols: __BITMEX_SYMBOLS__,
    useragent: "bitmex_client",
    basePath: "/api/v1",
  },
  proxy: {
    port: __PROXY_PORT__,
    host: "http://localhost",
  }
};

export default config;
