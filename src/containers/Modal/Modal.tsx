import { ReactNode } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
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
    overflow: hidden;
`;

interface ModalTypes {
    children: ReactNode
    hideModal: () => void;
}

export default function Modal({ children, hideModal }: ModalTypes) {
    return (
        <>
            {ReactDOM.createPortal(
                    (
                        <Container onClick={hideModal}>
                            {children}
                        </Container>
                    ), 
            document.getElementById("modal-portal") as HTMLElement)}
        </>
    );
}