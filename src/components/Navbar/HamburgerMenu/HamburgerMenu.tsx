import React from "react";
import styled from "styled-components";
import { NavLinks, SocialLinks } from "../Navbar.styles";
import { useRouter } from "next/router";
import Image from "next/image";

const Container = styled.div<{ showHamburger: boolean }>`
  height: 100%;
  width: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 20;
  ${({ showHamburger }) =>
    showHamburger
      ? "backdrop-filter: blur(10px);"
      : "backdrop-filter: blur(0px);"}
  pointer-events: none;
  transition: backdrop-filter 200ms linear;
`;

const HamburgerContainer = styled.nav<{ showHamburger: boolean }>`
  pointer-events: all;
  height: 100%;
  position: absolute;
  width: 80%;
  right: 0;
  top: 0;
  background-color: #ffff;
  color: black;
  box-shadow: rgb(0 0 0 / 40%) 0px 16px 32px 0px,
    rgb(0 0 0 / 20%) 0px 4px 8px 0px,
    rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;
  ${({ showHamburger }) =>
    showHamburger
      ? "transform: translateX(0%);"
      : "transform: translateX(100%);"}
  transition: transform 300ms linear;
`;

const TopContainer = styled.div`
  height: 60px;
  border-bottom: 1px solid #75757549;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
  h2 {
    font-family: "Dancing Script", cursive;
    font-size: 2rem;
  }
  div {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.4rem;
  }
`;

const LinkContainer = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 16px;
`;

const HamburgerMenu = ({
  showHamburger,
  setShowHamburger,
  signInHandler,
  signedIn,
}: {
  showHamburger: boolean;
  setShowHamburger: (bool: boolean) => void;
  signInHandler: () => void;
  signedIn: boolean;
}) => {
  function containerClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }
  const router = useRouter();
  return (
    <Container showHamburger={showHamburger}>
      <HamburgerContainer
        onClick={containerClickHandler}
        showHamburger={showHamburger}
      >
        <TopContainer>
          <h2>Navigation</h2>
          <div onClick={() => setShowHamburger(false)}>&#9587;</div>
        </TopContainer>
        <LinkContainer>
          <NavLinks isHamburger={true}>
            <li onClick={() => router.push("/")}>Home</li>
            <li>Features</li>
            <li>About Me</li>
            <li onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</li>
          </NavLinks>
          <SocialLinks isHamburger={true}>
            <li>
              <Image src="/facebook.png" alt={""} height="25" width="25" />
            </li>
            <li>
              <Image src="/instagram.png" alt={""} height="25" width="25" />
            </li>
            <li>
              <Image src="/linkedin.png" alt={""} height="25" width="25" />
            </li>
          </SocialLinks>
        </LinkContainer>
      </HamburgerContainer>
    </Container>
  );
};

export default React.memo(HamburgerMenu);
