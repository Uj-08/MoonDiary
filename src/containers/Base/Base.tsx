import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import { GoogleLogin } from "@react-oauth/google";
import Modal from "../Modal/Modal";
import BaseTypes from "./Base.types";
import styled from "styled-components";
import { getCookie, hasCookie, setCookie, deleteCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";

export default function Base({children}: BaseTypes) {

    const [showModal, setShowModal] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if(showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }
    ,[showModal]);

    useEffect(() => {
        if(hasCookie(COOKIE_NAME)) {
            setSignedIn(true);
        } else {
            setSignedIn(false);
        }
    }, [signedIn])


    const Container = styled.div<{ showModal?: boolean }>`
        display: flex;
        flex-direction: column;
        min-height: 100dvh;
        filter: ${props => props.showModal ? "blur(5px)" : ""};
    `;

    const ContentWrapper = styled.div`
        flex: 1;
    `;

    function signInHandler() {
        if(signedIn) {
            deleteCookie(COOKIE_NAME);
            setSignedIn(false);
        } else {
            setShowModal(true);
        }
    } 

    function hideModal() {
        setShowModal(false);
    }

    function successHandler(credentialResponse: any) {
        setCookie(COOKIE_NAME, credentialResponse?.credential);
        setShowModal(false);
        if(hasCookie(COOKIE_NAME)) {
            setSignedIn(true);
        } else {
            setSignedIn(false);
        }
    }

    return (
        <Container showModal={showModal}>
            <Navbar signInHandler={signInHandler} signedIn={signedIn} />
            <ContentWrapper>
                {children}
            </ContentWrapper>
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