import * as settingsActions from "@/store/settings.slice";
import * as typingActions from "@/store/typing.slice"
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const rootActions = {
    ...settingsActions,
    ...typingActions,
};

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};