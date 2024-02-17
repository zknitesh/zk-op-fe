interface PollQuestion {
    id: string;
    text: string;
    options: string[];
}

type AnswersMap = { [key: string]: string | null };
