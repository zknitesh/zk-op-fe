# ZK-OP Frontend

## Setup

1. Install yarn using corepack. Corepack is included with all official Node.js releases starting from Node.js 14.19 / 16.9. Enabling Corepack, will add the yarn binary to your PATH:

```
corepack enable
```

2. Create next-app in a new directory.

```
nvm install 20.9.0
nvm use 20.9.0
yarn create next-app
```

3. Use @web3-react/core which uses the package ethers

```
yarn add @web3-react/core
yarn add ethers
yarn add @ethersproject/providers
```

4. providers

```
yarn add @web3-react/metamask
yarn add @web3-react/network
```
