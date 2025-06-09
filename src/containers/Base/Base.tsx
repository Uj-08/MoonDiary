import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import { GoogleLogin } from "@react-oauth/google";
import Modal from "../Modal/Modal";
import BaseTypes from "./Base.types";
import { hasCookie, setCookie, deleteCookie, getCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import HamburgerMenu from "@/components/Navbar/HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetCreatedBlogId, resetDeletedBlogId, resetErrorState, resetSuccessState } from "@/redux/slices/blogInfo";
import { Container, Loader, ToastContainer } from "./Base.styles";
import { useRouter } from "next/router";
import Toast from "../Toast";
import jwtDecode from "jwt-decode";
import AddPostButton from "@/components/Blog/AddPostButton";
export const ClientContext = createContext<any>(null);

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

  const [clientDecode, setClientDecode] = useState<any>(null);

  useEffect(() => {
    if (signedIn) {
      const client = getCookie("clientMD");

      if (client) {
        try {
          const decoded = jwtDecode(client as string);
          setClientDecode(decoded);
        } catch (err) {
          console.error("Invalid token:", err);
        }
      }
    }
  }, [signedIn]);

  const picture =
    clientDecode?.picture ??
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BSEPxHF0-PRxJlVMHla55wvcxWdSi8RU2g&s";

  return (
    <ClientContext.Provider value={clientDecode}>
      <Container showModal={showLoginModal}>
        <Navbar
          signInHandler={signInHandler}
          signedIn={signedIn}
          picture={picture}
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
        {!router.asPath.startsWith("/blogs/post") && clientDecode &&
          (clientDecode?.email === "ujjwalpandey24@gmail.com" ||
            clientDecode?.email === "sinhashairee6@gmail.com" ||
            clientDecode?.email === "psykidbiz@gmail.com"
          ) && <AddPostButton />}
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
    </ClientContext.Provider>
  );
};

export default React.memo(Base);
