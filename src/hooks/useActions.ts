import * as settingsActions from "@/store/settings.slice";
import * as typingActions from "@/store/typing.slice"
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

// Объединение действий из разных срезов в один объект
const rootActions = {
    ...settingsActions,
    ...typingActions,
};

// Кастомный хук для привязки действий к диспатчеру Redux
export const useActions = () => {
    const dispatch = useDispatch(); // Получение функции dispatch из Redux

    // Используем useMemo для оптимизации и предотвращения создания нового объекта функций при каждом рендере
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};