import { Dispatch, SetStateAction } from "react";

export interface ITextSectionProps {
    setTextareaFocused: Dispatch<SetStateAction<boolean>>;
    textareaFocused: boolean;
}