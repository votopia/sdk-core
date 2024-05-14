const tokens = [
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    icon: "/icons/weth.svg",
    decimals: 18,
    address: "0x98E1817244d130D8fE05591ba517d3f24Db035Ec",
    coingeckoId: "ethereum",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "/icons/usdc.png",
    decimals: 18,
    address: "0xD1fE20F19f18F4f26CbCf97a2367a47c3866d98e",
    coingeckoId: "usdc",
  },
];
export const DEFAULT_TOKEN_LIST = {
  name: "Votopia Default",
  timestamp: new Date().toISOString(),
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tags: {},
  logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
  keywords: ["votopia", "default"],
  tokens,
};
