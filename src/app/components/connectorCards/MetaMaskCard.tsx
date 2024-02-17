"use client";

import { useEffect, useState } from "react";

import { hooks, metaMask } from "../../connectors/metaMask";
import { Card } from "../Card";
import { BaseProvider, Web3Provider } from "@ethersproject/providers";

const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
} = hooks;

export default function MetaMaskCard() {
    console.log("RENDERING METAMASKCARD...");
    const chainId: number | undefined = useChainId();
    const accounts: string[] | undefined = useAccounts();
    const isActivating: boolean = useIsActivating();

    const isActive: boolean = useIsActive();

    const provider: Web3Provider | undefined = useProvider();
    const ENSNames: undefined[] | (string | null)[] = useENSNames();

    const [error, setError] = useState<Error | undefined>(undefined);

    // attempt to connect eagerly on mount
    useEffect(() => {
        void metaMask.connectEagerly().catch(() => {
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
