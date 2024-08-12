import { Dispatch, SetStateAction } from "react";

export interface ITypingContext {
    setIsReset: Dispatch<SetStateAction<boolean>>,
    textLoading: boolean
}