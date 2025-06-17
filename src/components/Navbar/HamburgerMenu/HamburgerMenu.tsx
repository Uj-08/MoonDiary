import React from "react";
import styled from "styled-components";
import { NavLinks, SocialLinks } from "../Navbar.styles";
import Image from "next/image";
import Link from "next/link";
import { dancingScript } from "@/styles/fonts";
import gmail from "public/gmail.png"
import insta from "public/instagram.png"

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
  ${({ showHamburger }) => !showHamburger && "pointer-events: none;"}
  transition: backdrop-filter 200ms linear;
  @media (max-width: 950px) {
        display: "none";
    }
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
  transition: transform 200ms ease-in-out;
`;

const TopContainer = styled.div`
  height: 60px;
  border-bottom: 1px solid #75757549;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
  h2 {
    font-family: ${dancingScript.style.fontFamily}, cursive;
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

const ProfileContainer = styled.div`
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  height: 27px;
  aspect-ratio: 1;
  transform: translateY(-3px);
`;

const HamburgerMenu = ({
  showHamburger,
  setShowHamburger,
  signInHandler,
  signedIn,
  picture,
}: {
  showHamburger: boolean;
  setShowHamburger: (bool: boolean) => void;
  signInHandler: () => void;
  signedIn: boolean;
  picture: string;
}) => {
  function containerClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }
  return (
    <Container showHamburger={showHamburger} onClick={() => setShowHamburger(false)}>
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
            <li>
              <Link href={"/"} onClick={() => setShowHamburger(false)} >
                Home
              </Link>
            </li>
            <li>
              <Link href={"/features"} onClick={() => setShowHamburger(false)} >
                Features
              </Link>
            </li>
            <li>
              <Link href={"/about-me"} onClick={() => setShowHamburger(false)} >
                About Me
              </Link>
            </li>
            <li>
              <div  onClick={() => {
                signInHandler()
                setShowHamburger(false) 
              }}>
                {signedIn ? "Sign Out" : "Sign In"}
              </div>
            </li>
          </NavLinks>
          <SocialLinks isHamburger={true}>
            <li>
              <Link href="mailto:psykidbiz@gmail.com" onClick={() => setShowHamburger(false)}>
                <Image src={gmail} alt="social-links" height={25} width={25} />
              </Link>
            </li>
            
            <li>
              <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer" onClick={() => setShowHamburger(false)}>
                <Image src={insta} alt="social-links" height={25} width={25} />
              </Link>
            </li>

            <li>
              <Link href={"/profile"} onClick={() => setShowHamburger(false)}>
                <ProfileContainer>
                  <Image src={picture} alt="social-links" fill />
                </ProfileContainer>
              </Link>
            </li>
          </SocialLinks>
        </LinkContainer>
      </HamburgerContainer>
    </Container>
  );
};

export default React.memo(HamburgerMenu);
