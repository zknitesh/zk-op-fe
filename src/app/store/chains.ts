import type { AddEthereumChainParameter } from "@web3-react/types";
import {
    BasicChainInformation,
    ChainConfig,
    ExtendedChainInformation,
} from "../model/web3.models";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
};

function isExtendedChainInformation(
    chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
    // return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
    return false;
}

export function getAddChainParameters(
    chainId: number
): AddEthereumChainParameter | number {
    const chainInformation = CHAINS[chainId];
    if (isExtendedChainInformation(chainInformation)) {
        const extendedChainInformation: AddEthereumChainParameter = {
            chainId,
            chainName: chainInformation.name,
            nativeCurrency: chainInformation.nativeCurrency,
            rpcUrls: chainInformation.urls,
            blockExplorerUrls: chainInformation.blockExplorerUrls,
        };
        console.log("getAddChainParameters", extendedChainInformation);
        return extendedChainInformation;
    } else {
        console.log("getAddChainParameters", chainId);
        return chainId;
    }
}

const getInfuraUrlFor = (network: string) =>
    process.env.infuraKey
        ? `https://${network}.infura.io/v3/${process.env.infuraKey}`
        : undefined;
const getAlchemyUrlFor = (network: string) => {
    console.log("getAlchemyUrlFor", network);
    return process.env.NEXT_PUBLIC_SEPOLIA_URL_ALCHEMY
        ? process.env.NEXT_PUBLIC_SEPOLIA_URL_ALCHEMY.replaceAll(
              "{{network}}",
              network
          )
        : undefined;
};

export const MAINNET_CHAINS: ChainConfig = {
    1: {
        urls: ["https://eth.llamarpc.com"],
        //     getAlchemyUrlFor("mainnet") ?? "",
        //     getInfuraUrlFor("mainnet") ?? "",
        //     // "https://cloudflare-eth.com",
        // ].filter(Boolean),
        name: "Mainnet",
    },
    534352: {
        urls: ["https://rpc.scroll.io"],
        name: "Scroll",
    },
    // 137: {
    //     urls: [
    //         getAlchemyUrlFor("eth-mainnet") ?? "",
    //         getInfuraUrlFor("polygon-mainnet") ?? "",
    //         "https://polygon-rpc.com",
    //     ].filter(Boolean),
    //     name: "Polygon Mainnet",
    //     nativeCurrency: MATIC,
    //     blockExplorerUrls: ["https://polygonscan.com"],
    // },
};

export const TESTNET_CHAINS: ChainConfig = {
    11155111: {
        urls: ["https://rpc.notadegen.com/eth/sepolia"].filter(Boolean),
        name: "Sepolia",
    },
    534351: {
        urls: ["https://sepolia-rpc.scroll.io"],
        name: "Scroll Sepolia",
    },
    // 80001: {
    //     urls: [getAlchemyUrlFor("polygon-mumbai") ?? ""].filter(Boolean),
    //     name: "Polygon Mumbai",
    //     nativeCurrency: MATIC,
    //     blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    // },
};

export const CHAINS: ChainConfig = {
    ...MAINNET_CHAINS,
    ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
    CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls;

    // if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
    // }

    return accumulator;
}, {});
