"use client";

import Link from "next/link";
import { useState } from "react";
import registerCircuit from "../circuit/register_circuit.json";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export default function RegisterPoll() {
    const [formData, setFormData] = useState({
        aadharNumber: "",
        userSecret: "",
        systemSecret: "",
    });

    // Function to check if all inputs are filled
    const allFieldsFilled =
        formData.aadharNumber !== "" &&
        formData.userSecret !== "" &&
        formData.systemSecret !== "";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Process formData here or send it to an API
        console.log("handle submit called", formData);
        const backend = new BarretenbergBackend(registerCircuit as any);
        const noir = new Noir(registerCircuit as any, backend);
        const input = {
            userAadharNumber: formData.aadharNumber,
            userSecret: formData.userSecret,
            systemSecret: formData.systemSecret,
        };
        const { witness, returnValue } = await noir.execute(input);
        console.log(returnValue);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    End to End Secure Poll
                </div>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <Link href={"/"}>HOME</Link>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Register Poll
                </h2>
                <div>
                    <label
                        htmlFor="aadharNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Aadhar Number
                    </label>
                    <input
                        type="text"
                        name="aadharNumber"
                        id="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        placeholder="Enter Aadhar Number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div>
                    <label
                        htmlFor="userSecret"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        User Secret
                    </label>
                    <input
                        type="password"
                        name="userSecret"
                        id="userSecret"
                        value={formData.userSecret}
                        onChange={handleChange}
                        placeholder="Enter User Secret"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div>
                    <label
                        htmlFor="systemSecret"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        System Secret
                    </label>
                    <input
                        type="password"
                        name="systemSecret"
                        id="systemSecret"
                        value={formData.systemSecret}
                        onChange={handleChange}
                        placeholder="Enter System Secret"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!allFieldsFilled}
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
                        allFieldsFilled
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 cursor-not-allowed"
                    }`}
                >
                    Submit
                </button>
            </form>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
        </main>
    );
}
