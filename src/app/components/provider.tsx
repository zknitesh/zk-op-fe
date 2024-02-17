"use client";
import {
    useWeb3React,
    Web3ReactHooks,
    Web3ReactProvider,
} from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import type { Network } from "@web3-react/network";
import { getName } from "../utils";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

function Child() {
    const { connector } = useWeb3React();
    console.log(`Priority Connector is: ${getName(connector)}`);
    return null;
}

export default function Provider() {
    console.log("RENDERING PROVIDER...");
    const connectMetaMask = useStore((state) => state.connectMetaMask);
    const connectNetwork = useStore((state) => state.connectNetwork);
    const metaMask = useStore((state) => state.metaMask);
    const network = useStore((state) => state.network);
    const metaMaskHooks = useStore((state) => state.metaMaskHooks);
    const networkHooks = useStore((state) => state.networkHooks);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([connectMetaMask(), connectNetwork()]).then(() =>
            setIsLoading(false)
        );
    }, [connectMetaMask, connectNetwork]);

    if (isLoading) {
        return <div>Loading Web3 connectors...</div>;
    }
    if (!metaMask || !metaMaskHooks || !network || !networkHooks) {
        console.error("Connectors not initialised");
        return <div>Loading...</div>;
    }
    const connectors: [MetaMask | Network, Web3ReactHooks][] = [
        [metaMask, metaMaskHooks],
        [network, networkHooks],
    ];
    return (
        <Web3ReactProvider connectors={connectors}>
            <Child />
        </Web3ReactProvider>
    );
}
