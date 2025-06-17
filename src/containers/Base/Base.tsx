import React, { useState, useEffect, createContext, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import { GoogleLogin } from "@react-oauth/google";
import Modal from "../Modal/Modal";
import BaseTypes from "./Base.types";
import { hasCookie, setCookie, deleteCookie, getCookie } from "cookies-next";
import { ADMIN_EMAILS, COOKIE_NAME } from "@/helpers/constants";
import HamburgerMenu from "@/components/Navbar/HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetCreatedBlogId, resetDeletedBlogId, resetErrorState, resetSuccessState } from "@/redux/slices/blogInfo";
import { Container, Loader, ToastContainer } from "./Base.styles";
import { useRouter } from "next/router";
import Toast from "../Toast";
import jwtDecode from "jwt-decode";
import AddPostButton from "@/components/Blog/AddPostButton";

interface ClientContextType {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean
}
export const ClientContext = createContext<ClientContextType | null>(null);

const Base = ({ children }: BaseTypes) => {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const blogInfo = useSelector((state: RootState) => state.blogInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setSignedIn(hasCookie(COOKIE_NAME) as boolean)
  }, [])

  useEffect(() => {
    if (blogInfo.blogDeleteStatus.deletedBlogId) {
      router.reload();
      dispatch(resetDeletedBlogId());
    }

    if (blogInfo.blogPostUpdateStatus.createdBlogId) {
      dispatch(resetCreatedBlogId());
      router.push("/");
    }
  }, [
    blogInfo.blogDeleteStatus.deletedBlogId,
    blogInfo.blogPostUpdateStatus.createdBlogId,
    dispatch,
    router,
  ]);

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

  const signInHandler = useCallback(() => {
    if (signedIn) {
      deleteCookie(COOKIE_NAME);
      setSignedIn(false);
      router.reload();
    } else {
      setShowLoginModal(true);
    }
  }, [signedIn, router]);

  const hideModal = () => {
    setShowLoginModal(false);
  }

  const successHandler = useCallback((credentialResponse: any) => {
    setCookie(COOKIE_NAME, credentialResponse?.credential);
    setShowLoginModal(false);
    setSignedIn(true);
    router.reload();
  }, [router]);

  const [clientDecode, setClientDecode] = useState<any>(null);

  const getDecodedClient = useMemo(() => {
    try {
      const token = getCookie(COOKIE_NAME);
      return token ? jwtDecode(token as string) : null;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  }, [signedIn]);

  useEffect(() => {
    if (signedIn) {
      setClientDecode(getDecodedClient);
    }
  }, [getDecodedClient, signedIn]);

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
        {children}
        <FooterComponent />
      </Container>
      <ToastContainer>
        {!router.asPath.startsWith("/blogs/post") && clientDecode &&
          ADMIN_EMAILS.includes(clientDecode?.email) && <AddPostButton />}
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
      <HamburgerMenu
        showHamburger={showHamburger}
        setShowHamburger={setShowHamburger}
        signInHandler={signInHandler}
        signedIn={signedIn}
        picture={picture}
      />
      <Modal 
        showModal={showLoginModal || (blogInfo.blogPostUpdateStatus.isLoading || blogInfo.blogDeleteStatus.isLoading)} 
        hideModal={hideModal}
      >
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
