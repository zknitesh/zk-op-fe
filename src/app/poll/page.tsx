"use client";

import Link from "next/link";

export default function Poll() {
    const questions: PollQuestion[] = [
        {
            id: "question1",
            text: "What is your favorite color?",
            options: ["Red", "Green", "Blue"],
        },
        {
            id: "question2",
            text: "What is your preferred pet?",
            options: ["Dog", "Cat", "Bird"],
        },
        {
            id: "question3",
            text: "Which cuisine do you prefer?",
            options: ["Italian", "Mexican", "Japanese"],
        },
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const answers = questions.reduce(
            (acc: AnswersMap, question: PollQuestion) => {
                const answer: FormDataEntryValue | null = formData.get(
                    question.id
                );
                acc[question.id] = answer as string;
                return acc;
            },
            {}
        );
        console.log("Poll Answers:", answers);
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
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <form onSubmit={handleSubmit} className="mt-4">
                    {questions.map((question, index) => (
                        <div key={question.id} className="mb-4">
                            <p className="mb-1 font-medium">
                                {index + 1}. {question.text}
                            </p>
                            <div className="flex flex-col">
                                {question.options.map((option) => (
                                    <label
                                        key={option}
                                        className="inline-flex items-center mt-1"
                                    >
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option}
                                            className="form-radio h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
        </main>
    );
}
