import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useMountAnimation } from "@/hooks/useMountAnimation";

const Container = styled.div<{ visible: boolean }>`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999999;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 300ms ease-in-out;
    pointer-events: ${(props) => (props.visible ? "all" : "none")};
`;

interface ModalProps {
    children: ReactNode;
    hideModal: (e: any) => void;
    showModal: boolean;
}

export default function Modal({ children, hideModal, showModal }: ModalProps) {
    const { shouldRender, visible, onTransitionEnd } = useMountAnimation({
        isActive: showModal,
        minVisibleTime: 500
    });

    useEffect(() => {
        if (shouldRender) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [shouldRender]);

    if (!shouldRender) return null;

    return ReactDOM.createPortal(
        <Container
            onClick={hideModal}
            visible={visible}
            onTransitionEnd={onTransitionEnd}
        >
            {children}
        </Container>,
        document.getElementById("modal-portal") as HTMLElement
    );
}