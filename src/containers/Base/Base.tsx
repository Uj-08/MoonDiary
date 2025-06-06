import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import { GoogleLogin } from "@react-oauth/google";
import Modal from "../Modal/Modal";
import BaseTypes from "./Base.types";
import styled from "styled-components";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import HamburgerMenu from "@/components/Navbar/HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetErrorState } from "@/redux/slices/blogInfo";

const Container = styled.div<{ showModal?: boolean }>`
    min-height: 100dvh;
    filter: ${(props) => (props.showModal ? "blur(5px)" : "")};
    height: 100%;
`;

export const Toast = styled.div<{ show?: boolean }>`
  position: fixed;
  display: flex;
  color: white;
  bottom: 0;
  right: 0;
  margin: 16px;
  padding: 8px 16px;
  border-radius: 12px;
  ${({ show }) => show ? "transform: translateX(0%);" : "transform: translateX(150%);"}
  ${({ show }) => show ? "opacity: 1;" : "opacity: 0;"}
  transition: transform 800ms linear, opacity 1000ms linear;
  font-family: 'Montserrat', sans-serif;

  z-index: 3;

  background: rgba( 255, 0, 0, 0.65 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 3px );
-webkit-backdrop-filter: blur( 3px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

const Base = ({ children }: BaseTypes) => {
  const [showModal, setShowModal] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const error = useSelector((state: RootState) => state.blogInfo.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.isError) {
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 2000)
    }
  }, [dispatch, error.isError])

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  useEffect(() => {
    if (hasCookie(COOKIE_NAME)) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [signedIn]);

  function signInHandler() {
    if (signedIn) {
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
    if (hasCookie(COOKIE_NAME)) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }

  return (
    <Container showModal={showModal}>
      <Navbar
        signInHandler={signInHandler}
        signedIn={signedIn}
        hmbgrClickHandler={() => setShowHamburger(true)}
      />
      <HamburgerMenu
        showHamburger={showHamburger}
        setShowHamburger={setShowHamburger}
        signInHandler={signInHandler}
        signedIn={signedIn}
      />
      {children}
      <Toast show={error.isError}>
        {
          error.message
        }
      </Toast>
      <FooterComponent />
      {showModal && (
        <Modal hideModal={hideModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <GoogleLogin onSuccess={successHandler} />
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default React.memo(Base);
