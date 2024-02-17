"use client";

import { useEffect, useState } from "react";

import { Card } from "../Card";
import { Web3Provider } from "@ethersproject/providers";
import { useStore } from "../../store/store";
import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

export default function MetaMaskCard() {
    console.log("RENDERING METAMASKCARD...");
    const metaMaskHooks: Web3ReactHooks | undefined =
        useStore.getState().metaMaskHooks;
    const metaMask: MetaMask | undefined = useStore.getState().metaMask;
    if (!metaMaskHooks || !metaMask) {
        console.error("Metamask Hooks or MetaMask are not initialised");
        return null;
    }
    const {
        useChainId,
        useAccounts,
        useIsActivating,
        useIsActive,
        useProvider,
        useENSNames,
    } = metaMaskHooks;
    const chainId: number | undefined = useChainId();
    const accounts: string[] | undefined = useAccounts();
    const isActivating: boolean = useIsActivating();

    const isActive: boolean = useIsActive();

    const provider: Web3Provider | undefined = useProvider();
    const ENSNames: undefined[] | (string | null)[] = useENSNames();

    const [error, setError] = useState<Error | undefined>(undefined);

    // attempt to connect eagerly on mount
    useEffect(() => {
        void useStore
            .getState()
            .metaMask?.connectEagerly()
            .catch(() => {
                console.debug("Failed to connect eagerly to metamask");
            });
    }, []);
    return (
        <Card
            connector={metaMask}
            activeChainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
        />
    );
}
