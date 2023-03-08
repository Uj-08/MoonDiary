import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import { GoogleLogin } from "@react-oauth/google";
import Modal from "../Modal/Modal";
import BaseTypes from "./Base.types";
import styled from "styled-components";

export default function Base({children}: BaseTypes) {

    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if(showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }
    ,[showModal]);


    const Container = styled.div<{ showModal?: boolean }>`
        filter: ${props => props.showModal ? "blur(5px)" : ""};
    `;

    function signInHandler() {
        setShowModal(true);
    } 

    function hideModal() {
        setShowModal(false);
    }

    function successHandler(credentialResponse: any) {
        console.log(credentialResponse);
        setShowModal(false);
    }

    return (
        <Container showModal={showModal}>
            <Navbar signInHandler={signInHandler} />
                {children}
            <FooterComponent />
            {showModal &&
                <Modal hideModal={hideModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <GoogleLogin onSuccess={successHandler}/>
                    </div>
                </Modal>
            }
        </Container>
    );
}