const tokens = [
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    icon: "/icons/weth.svg",
    decimals: 18,
    address: "0x4200000000000000000000000000000000000006",
    coingeckoId: "ethereum",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "/icons/usdc.png",
    decimals: 6,
    address: "0xb62F35B9546A908d11c5803ecBBA735AbC3E3eaE",
    coingeckoId: "usdc",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    icon: "/icons/usdt.png",
    decimals: 6,
    address: "0x05D032ac25d322df992303dCa074EE7392C117b9",
    coingeckoId: "tether",
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
