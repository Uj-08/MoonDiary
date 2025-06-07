import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Container = styled.div<{ visible: boolean }>`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 300ms ease-in-out;
    pointer-events: ${(props) => (props.visible ? "auto" : "none")};
`;

interface ModalProps {
    children: ReactNode;
    show: boolean;
    hideModal: () => void;
}

const MIN_VISIBLE_DURATION = 500; // ms

export default function Modal({ children, show, hideModal }: ModalProps) {
    const [shouldRender, setShouldRender] = useState(show);
    const [visible, setVisible] = useState(false);
    const [openedAt, setOpenedAt] = useState<number | null>(null);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            setTimeout(() => setVisible(true), 10);
            setOpenedAt(Date.now());
            document.body.style.overflow = "hidden";
        } else {
            const now = Date.now();
            const timeOpen = openedAt ? now - openedAt : 0;
            const remaining = Math.max(0, MIN_VISIBLE_DURATION - timeOpen);

            // Wait until min duration is fulfilled
            setTimeout(() => {
                setVisible(false);
                document.body.style.overflow = "auto";
            }, remaining);
        }
    }, [show]);

    const handleTransitionEnd = () => {
        if (!visible) {
            setShouldRender(false);
        }
    };

    if (!shouldRender) return null;

    return ReactDOM.createPortal(
        <Container
            visible={visible}
            onClick={hideModal}
            onTransitionEnd={handleTransitionEnd}
        >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </Container>,
        document.getElementById("modal-portal") as HTMLElement
    );
}