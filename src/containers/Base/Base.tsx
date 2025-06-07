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
import { resetCreatedBlogId, resetDeletedBlogId, resetErrorState, resetSuccessState } from "@/redux/slices/blogInfo";
import { Container, Loader, ToastContainer } from "./Base.styles";
import { useRouter } from "next/router";
import Toast from "../Toast";

const Base = ({ children }: BaseTypes) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const blogInfo = useSelector((state: RootState) => state.blogInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (blogInfo.blogPostUpdateStatus.createdBlogId) {
      dispatch(resetCreatedBlogId())
      router.push("/");
    } else if (blogInfo.blogDeleteStatus.deletedBlogId) {
      dispatch(resetDeletedBlogId())
    }

  }, [blogInfo.blogDeleteStatus.deletedBlogId, blogInfo.blogPostUpdateStatus.createdBlogId, dispatch, router])

  useEffect(() => {
    if (blogInfo.error.isError) {
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 4000)
    } else if (blogInfo.success.isSuccessful) {
      setTimeout(() => {
        dispatch(resetSuccessState());
      }, 4000)
    }
  }, [blogInfo.error.isError, blogInfo.success.isSuccessful, dispatch])

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
      setShowLoginModal(true);
    }
  }

  function hideModal() {
    setShowLoginModal(false);
  }

  function successHandler(credentialResponse: any) {
    setCookie(COOKIE_NAME, credentialResponse?.credential);
    setShowLoginModal(false);
    if (hasCookie(COOKIE_NAME)) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
    router.reload()
  }

  return (
    <>
      <Container showModal={showLoginModal}>
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
        <FooterComponent />
      </Container>
      <ToastContainer>
        <Toast 
          show={blogInfo.error.isError} 
          message={blogInfo.error.message} 
          isError 
        />
        <Toast 
          show={blogInfo.success.isSuccessful} 
          message={blogInfo.success.message} 
          isError={false} 
        />
      </ToastContainer>
      <Modal showModal={showLoginModal || (blogInfo.blogPostUpdateStatus.isLoading || blogInfo.blogDeleteStatus.isLoading)} hideModal={hideModal}>
        {
          showLoginModal ?
            <div onClick={(e) => e.stopPropagation()}>
              <GoogleLogin onSuccess={successHandler} />
            </div> :
            <Loader />
        }
      </Modal>
    </>
  );
};

export default React.memo(Base);
