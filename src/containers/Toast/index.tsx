import { useMountAnimation } from "@/hooks/useMountAnimation";
import { ToastContainer } from "./Toast.styles";

interface ToastProps {
    show: boolean;
    message: string;
    isError: boolean;
}

export default function Toast({ show, message, isError }: ToastProps) {
    const { shouldRender, visible, onTransitionEnd } = useMountAnimation({
        isActive: show,
        minVisibleTime: 500,
    });

    if (!shouldRender) return null;

    return (
        <ToastContainer isError={isError} visible={visible} onTransitionEnd={onTransitionEnd}>
            {message}
        </ToastContainer>
    );
}