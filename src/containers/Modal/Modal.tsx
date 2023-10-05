import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Container = styled.div`
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
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
`;

interface ModalTypes {
    children: ReactNode
    hideModal: (e: any) => void;
}


export default function Modal({ children, hideModal }: ModalTypes) {
    useEffect(() => {
        if(document !== undefined) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [])
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