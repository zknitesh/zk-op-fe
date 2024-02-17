import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { useCallback, useEffect, useState } from "react";
import { CHAINS } from "../store/chains";

function ChainSelect({
    activeChainId,
    switchChain,
    chainIds,
}: {
    activeChainId: number;
    switchChain: (chainId: number) => void;
    chainIds: number[];
}) {
    console.log(
        `RENDERING CHAINSELECT... activeChainId = ${activeChainId}, chainIds = ${chainIds}, CHAINS = ${JSON.stringify(
            CHAINS
        )}`
    );
    return (
        <select
            value={activeChainId}
            onChange={(event) => {
                switchChain(Number(event.target.value));
            }}
            disabled={switchChain === undefined}
        >
            <option hidden={true} disabled={true} value={-1}>
                Select chain
            </option>
            <option value={-1}>Default</option>
            {chainIds.map((chainId) => (
                <option key={chainId} value={chainId}>
                    {CHAINS[chainId]?.name ?? chainId}
                </option>
            ))}
        </select>
    );
}

export function ConnectWithSelect({
    connector,
    activeChainId,
    chainIds = Object.keys(CHAINS).map(Number),
    isActivating,
    isActive,
    error,
    setError,
}: {
    connector: MetaMask | Network;
    activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
    chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
    isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
    isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
    error: Error | undefined;
    setError: (error: Error | undefined) => void;
}) {
    const [desiredChainId, setDesiredChainId] = useState<number>();

    /**
     * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
     * update the `desiredChainId` value so that <select /> has the right selection.
     */
    useEffect(() => {
        console.log(
            `activeChainId = ${activeChainId}, desiredChainId = ${desiredChainId}`
        );
        if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
            setDesiredChainId(activeChainId);
            console.log(
                `Setting desired chainId to activeChainId: activeChainId = ${activeChainId}, desiredChainId = ${desiredChainId}`
            );
        }
    }, [desiredChainId, activeChainId]);

    const switchChain = useCallback(
        async (desiredChainId: number) => {
            console.log(`Switch chain called ${desiredChainId}`);
            setDesiredChainId(desiredChainId);

            try {
                if (
                    // If we're already connected to the desired chain, return
                    desiredChainId === activeChainId ||
                    // If they want to connect to the default chain and we're already connected, return
                    (desiredChainId === -1 && activeChainId !== undefined)
                ) {
                    setError(undefined);
                    return;
                }
                console.log("Activating the network");
                await connector.activate(desiredChainId);
                // if (connector instanceof Network) {
                //

                // } else {
                //     console.log("Activating network with metamask");
                //     await connector.activate(
                //         getAddChainParameters(desiredChainId)
                //     );
                // }

                setError(undefined);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    console.error("Unhandled unknown error ", error);
                }
            }
        },
        [connector, activeChainId, setError]
    );

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {
                <ChainSelect
                    activeChainId={desiredChainId ?? -1}
                    switchChain={switchChain}
                    chainIds={chainIds.filter(
                        (c): c is number => c != undefined && c != null
                    )}
                />
            }
            <div style={{ marginBottom: "1rem" }} />
            {isActive ? (
                error ? (
                    <button onClick={() => switchChain(desiredChainId ?? -1)}>
                        Try again?
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (connector?.deactivate) {
                                console.log("Deactivating connector...");
                                void connector.deactivate();
                            } else {
                                console.log("Resetting connector connector...");
                                void connector.resetState();
                            }
                            setDesiredChainId(undefined);
                        }}
                    >
                        Disconnect
                    </button>
                )
            ) : (
                <button
                    onClick={() => switchChain(desiredChainId ?? -1)}
                    disabled={isActivating || !desiredChainId}
                >
                    {error ? "Try again?" : "Connect"}
                </button>
            )}
        </div>
    );
}
