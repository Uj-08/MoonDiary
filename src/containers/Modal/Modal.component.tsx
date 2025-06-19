import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useMountAnimation } from "@/hooks/useMountAnimation";
import { ModalProps } from "./Modal.types";
import { Container } from "./Modal.styles";

const Modal = ({ hideModal, showModal, children }: ModalProps) => {
    const { shouldRender, visible, onTransitionEnd } = useMountAnimation({
        isActive: showModal,
        minVisibleTime: 500
    });

    useEffect(() => {
        document.body.style.overflow = shouldRender ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [shouldRender]);

    if (!shouldRender) return null;

    const portalRoot = document.getElementById("modal-portal");
    if (!portalRoot) {
        console.error("Modal portal root not found!");
        return null;
    }

    return createPortal(
        <Container
            onClick={hideModal}
            visible={visible}
            onTransitionEnd={onTransitionEnd}
        >
            {children}
        </Container>,
        portalRoot
    );
};

export default React.memo(Modal);