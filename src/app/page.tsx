"use client";
import Provider from "./components/provider";
import MetaMaskCard from "./components/connectorCards/MetaMaskCard";
import Link from "next/link";
import { useStore } from "./store/store";
import { useEffect } from "react";

export default function Home() {
    console.log("RENDERING HOME...");
    const metaMask = useStore((state) => state.metaMask);
    const metaMaskHooks = useStore((state) => state.metaMaskHooks);
    const isPollActive = useStore((state) => state.isPollActive);

    return (
        <>
            <Provider></Provider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                        End to End Secure Poll
                    </div>
                    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                        <Link href={"/"}>HOME</Link>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    {metaMask && metaMaskHooks && (
                        <MetaMaskCard
                            metaMask={metaMask}
                            metaMaskHooks={metaMaskHooks}
                        />
                    )}
                </div>

                {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    {isPollActive && <Link href={"/poll"}>POLL</Link>}
                </div> */}

                {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <NetworkCard />
                </div> */}
                <div className="flex justify-center items-center h-full w-full lg:max-w-5xl lg:w-full">
                    {isPollActive && (
                        <button
                            onClick={() => (window.location.href = "/poll")}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 w-auto"
                        >
                            Opinion Polls
                        </button>
                    )}
                </div>
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
            </main>
        </>
    );
}
