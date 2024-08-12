export enum Language {
    EN = "en",
    RU = "ru"
}

export interface ISettings {
    active_option: string;
    language: Language;
}

export interface ITyping {
    text: string;
    userInput: string;
    statistic: {
        name: number;
        wpm: number
        error: number | null;
    }[];
    time: number;
    wpm: number;
    timeRemaining: number;
    timerRunning: boolean;
    startTime: number | null;
    errors: number;
    totalWords: number;
    totalErrors: number;
}