"use client"
import React from "react";
import { NavLinks, SocialLinks } from "../Navbar.styles";
import Image from "next/image";
import Link from "next/link";
import gmail from "public/gmail.png"
import insta from "public/instagram.png"
import { Container, HamburgerContainer, LinkContainer, ProfileContainer, TopContainer } from "./HamburgerMenu.styles";
import { HamburgerTypes } from "./HamburgerMenu.types";

const HamburgerMenu = ({
  showHamburger,
  setShowHamburger,
  signInHandler,
  signedIn,
  picture,
}: HamburgerTypes) => {

  const containerClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }
  
  return (
    <Container $showHamburger={showHamburger} onClick={() => setShowHamburger(false)}>
      <HamburgerContainer
        onClick={containerClickHandler}
        $showHamburger={showHamburger}
      >
        <TopContainer>
          <h2>Navigation</h2>
          <div onClick={() => setShowHamburger(false)}>&#9587;</div>
        </TopContainer>
        <LinkContainer>
          <NavLinks $isHamburger={true}>
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
              <div onClick={() => {
                signInHandler()
                setShowHamburger(false)
              }}>
                {signedIn ? "Sign Out" : "Sign In"}
              </div>
            </li>
          </NavLinks>
          <SocialLinks $isHamburger={true}>
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
              <Link href="/profile" onClick={() => setShowHamburger(false)}>
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
