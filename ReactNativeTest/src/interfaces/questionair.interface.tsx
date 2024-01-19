import { IUser } from "./user.interface";

export interface IQuestion {
    id: number;
    question: string;
    answer: IQAnswer[] | null;
    isActive: boolean;

}

export interface IQAnswer {
    id: number;
    answerText: string;
    detailAns: string;
    isCorrect: boolean;
    isActive: boolean;
}

export interface IAnswerResult {
    id: number;
    question: string;
    userAns: IQAnswer;
    correctAns: IQAnswer;
    userProfile: IUser | null;
    isActive: boolean;
}