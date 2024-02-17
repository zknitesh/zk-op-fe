"use client";

import { useEffect, useState } from "react";

import { URLS, CHAINS } from "../../chains";
import { hooks, network } from "../../connectors/network";
import { Card } from "../Card";

const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
} = hooks;

const CHAIN_IDS = Object.keys(URLS).map(Number);

export default function NetworkCard() {
    const chainId = useChainId();
    const accounts = useAccounts();
    const isActivating = useIsActivating();

    const isActive = useIsActive();

    const provider = useProvider();
    const ENSNames = useENSNames(provider);

    const [error, setError] = useState<Error | undefined>(undefined);

    // attempt to connect eagerly on mount
    useEffect(() => {
        void network.activate().catch(() => {
            console.debug("Failed to connect to network");
        });
    }, []);
    console.log(
        `NetworkCard: CHAINS = ${JSON.stringify(
            CHAINS
        )}, URLS = ${JSON.stringify(
            URLS
        )}, CHAIN_IDS = ${CHAIN_IDS}, process.env.NEXT_PUBLIC_SEPOLIA_URL_ALCHEMY=${
            process.env.NEXT_PUBLIC_SEPOLIA_URL_ALCHEMY
        }`
    );
    return (
        <Card
            connector={network}
            activeChainId={chainId}
            chainIds={CHAIN_IDS}
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
