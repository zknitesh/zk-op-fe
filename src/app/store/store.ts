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
    connectMetaMask: () => void;
    disconnectMetaMask: () => void;
    connectNetwork: () => void;
    disconnectNetwork: () => void;
}

export const useStore = create<ZkOpMetaMaskDataState>((set) => ({
    // initial state
    zkOpMetaMaskData: undefined,
    metaMask: undefined,
    metaMaskHooks: undefined,
    network: undefined,
    networkHooks: undefined,
    hooks: undefined,
    // methods for manipulating state
    connectMetaMask: () => {
        set((state: ZkOpMetaMaskDataState) => {
            console.log("Connecting to Metamask...");
            const [_metaMask, _metaMaskHooks] = initializeConnector<MetaMask>(
                (actions) => new MetaMask({ actions })
            );
            state.metaMask = _metaMask;
            state.metaMaskHooks = _metaMaskHooks;
            return state;
        });
    },
    disconnectMetaMask: () => {
        set((state: ZkOpMetaMaskDataState) => {
            if (state.metaMask?.deactivate) {
                state.metaMask?.deactivate();
            } else {
                state.metaMask?.resetState();
            }
            state.metaMask = undefined;
            state.metaMaskHooks = undefined;
            return state;
        });
    },
    connectNetwork: () => {
        set((state: ZkOpMetaMaskDataState) => {
            console.log("Connecting to Network...");
            const [_network, _networkHooks] = initializeConnector<Network>(
                (actions) => new Network({ actions, urlMap: URLS })
            );
            state.network = _network;
            state.networkHooks = _networkHooks;
            return state;
        });
    },
    disconnectNetwork: () => {
        set((state: ZkOpMetaMaskDataState) => {
            if (state.network?.deactivate) {
                state.network?.deactivate();
            } else {
                state.network?.resetState();
            }
            state.network = undefined;
            state.networkHooks = undefined;
            return state;
        });
    },
}));
