import { create } from "zustand";

import { ZkOpMetaMaskData } from "../model/web3.models";
import { MetaMask } from "@web3-react/metamask";
import { Web3ReactHooks, initializeConnector } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { URLS } from "./chains";

interface ZkOpMetaMaskDataState {
    zkOpMetaMaskData: ZkOpMetaMaskData | undefined;
    metaMask: MetaMask | undefined;
    metaMaskHooks: Web3ReactHooks | undefined;
    network: Network | undefined;
    networkHooks: Web3ReactHooks | undefined;
    isPollActive: boolean;
    connectMetaMask: () => void;
    disconnectMetaMask: () => void;
    connectNetwork: () => void;
    disconnectNetwork: () => void;
    setPollState: (pollState: boolean) => void;
}

export const useStore = create<ZkOpMetaMaskDataState>((set) => ({
    // initial state
    zkOpMetaMaskData: undefined,
    metaMask: undefined,
    metaMaskHooks: undefined,
    network: undefined,
    networkHooks: undefined,
    isPollActive: false,
    // methods for manipulating state
    connectMetaMask: () => {
        set((state: ZkOpMetaMaskDataState) => {
            console.log("Connecting to Metamask...");
            const [_metaMask, _metaMaskHooks] = initializeConnector<MetaMask>(
                (actions) => new MetaMask({ actions })
            );
            return {
                zkOpMetaMaskData: state.zkOpMetaMaskData,
                metaMask: _metaMask,
                metaMaskHooks: _metaMaskHooks,
                network: state.network,
                networkHooks: state.networkHooks,
                isPollActive: state.isPollActive,
            };
        });
    },
    disconnectMetaMask: () => {
        set((state: ZkOpMetaMaskDataState) => {
            if (state.metaMask?.deactivate) {
                state.metaMask?.deactivate();
            } else {
                state.metaMask?.resetState();
            }
            return {
                zkOpMetaMaskData: state.zkOpMetaMaskData,
                metaMask: undefined,
                metaMaskHooks: undefined,
                network: state.network,
                networkHooks: state.networkHooks,
                isPollActive: state.isPollActive,
            };
        });
    },
    connectNetwork: () => {
        set((state: ZkOpMetaMaskDataState) => {
            console.log("Connecting to Network...");
            const [_network, _networkHooks] = initializeConnector<Network>(
                (actions) => new Network({ actions, urlMap: URLS })
            );
            return {
                zkOpMetaMaskData: state.zkOpMetaMaskData,
                metaMask: state.metaMask,
                metaMaskHooks: state.metaMaskHooks,
                network: _network,
                networkHooks: _networkHooks,
                isPollActive: state.isPollActive,
            };
        });
    },
    disconnectNetwork: () => {
        set((state: ZkOpMetaMaskDataState) => {
            if (state.network?.deactivate) {
                state.network?.deactivate();
            } else {
                state.network?.resetState();
            }
            return {
                zkOpMetaMaskData: state.zkOpMetaMaskData,
                metaMask: state.metaMask,
                metaMaskHooks: state.metaMaskHooks,
                network: undefined,
                networkHooks: undefined,
                isPollActive: state.isPollActive,
            };
        });
    },
    setPollState: (pollState: boolean) => {
        set((state: ZkOpMetaMaskDataState) => {
            console.log("Poll Active:", pollState);
            return {
                zkOpMetaMaskData: state.zkOpMetaMaskData,
                metaMask: state.metaMask,
                metaMaskHooks: state.metaMaskHooks,
                network: state.network,
                networkHooks: state.networkHooks,
                isPollActive: pollState,
            };
        });
    },
}));
