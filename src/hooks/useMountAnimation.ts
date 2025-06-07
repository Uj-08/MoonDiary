import { useEffect, useState } from "react";

interface MountAnimationOptions {
    isActive: boolean;
    minVisibleTime?: number; // in ms
    animationDuration?: number; // for controlling visible/opacity transition
}

export function useMountAnimation({
    isActive,
    minVisibleTime = 500,
}: MountAnimationOptions) {
    const [shouldRender, setShouldRender] = useState(isActive);
    const [visible, setVisible] = useState(false);
    const [openedAt, setOpenedAt] = useState<number | null>(null);

    useEffect(() => {
        if (isActive) {
            setShouldRender(true);
            setTimeout(() => setVisible(true), 10); // allow opacity transition
            setOpenedAt(Date.now());
        } else {
            const now = Date.now();
            const timeOpen = openedAt ? now - openedAt : 0;
            const remaining = Math.max(0, minVisibleTime - timeOpen);

            setTimeout(() => {
                setVisible(false);
            }, remaining);
        }
    }, [isActive, minVisibleTime, openedAt]);

    const onTransitionEnd = () => {
        if (!visible) {
            setShouldRender(false);
        }
    };

    return {
        shouldRender,
        visible,
        onTransitionEnd,
    };
}