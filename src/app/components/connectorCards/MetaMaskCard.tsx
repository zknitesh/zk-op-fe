"use client";

import { useEffect, useState } from "react";

import { Card } from "../Card";
import { Web3Provider } from "@ethersproject/providers";
import { useStore } from "../../store/store";
import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

interface Props {
    metaMask: MetaMask;
    metaMaskHooks: Web3ReactHooks;
}

export default function MetaMaskCard({ metaMask, metaMaskHooks }: Props) {
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
    const setPollState = useStore((state) => state.setPollState);
    // attempt to connect eagerly on mount
    useEffect(() => {
        useStore
            .getState()
            .metaMask?.connectEagerly()
            .catch(() => {
                console.debug("Failed to connect eagerly to metamask");
            });
    }, []);
    useEffect(() => {
        setPollState(isActive);
    }, [isActive]);
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
