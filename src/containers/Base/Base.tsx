import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import { GoogleLogin } from "@react-oauth/google";
import Modal from "../Modal/Modal";
import BaseTypes from "./Base.types";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import HamburgerMenu from "@/components/Navbar/HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetErrorState } from "@/redux/slices/blogInfo";
import { Container, Loader, Toast } from "./Base.styles";
import { useRouter } from "next/router";

const Base = ({ children }: BaseTypes) => {
  const [showModal, setShowModal] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const blogInfo = useSelector((state: RootState) => state.blogInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (blogInfo.error.isError) {
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 2000)
    }
  }, [blogInfo.error.isError, dispatch])

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
      router.reload()
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
    router.reload()
  }

  return (
    <>
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
        <Toast show={blogInfo.error.isError}>
          {
            blogInfo.error.message
          }
        </Toast>
        <FooterComponent />
      </Container>
      <Modal show={showModal} hideModal={hideModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <GoogleLogin onSuccess={successHandler} />
        </div>
      </Modal>
      <Modal show={(blogInfo.blogPostUpdateStatus.isLoading || blogInfo.blogDeleteStatus.isLoading)} hideModal={hideModal}>
        <Loader />
      </Modal>
    </>
  );
};

export default React.memo(Base);
