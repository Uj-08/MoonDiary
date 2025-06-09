import { useRef, useCallback } from "react";

export const useShuffledColors = () => {
    const colorPalette = useRef<string[]>([
        "#B101B1",
        "#7A0BC0",
        "#3F0071",
        "#F31559",
        "#C70A80",
        "#009FBD",
        "#FF6D28",
        "#A367B1",
    ]);

    const shuffledColors = useRef<string[]>([]);

    const shuffleArray = useCallback((array: string[]) => {
        return [...array]
            .map((color) => ({ color, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ color }) => color);
    }, []);

    const getRandomColor = useCallback((): string => {
        if (shuffledColors.current.length === 0) {
            shuffledColors.current = shuffleArray(colorPalette.current);
        }
        return shuffledColors.current.pop()!;
    }, [shuffleArray]);

    return getRandomColor;
};