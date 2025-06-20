"use client"
import React from "react";
import { NavLink, NavLinks, SocialLink, SocialLinks } from "../Navbar.styles";
import Image from "next/image";
import Link from "next/link";
import gmail from "public/gmail.png"
import insta from "public/instagram.png"
import { Container, Cross, HamburgerContainer, LinkContainer, ProfileContainer, Title, TopContainer } from "./HamburgerMenu.styles";
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
          <Title>Navigation</Title>
          <Cross onClick={() => setShowHamburger(false)}>&#9587;</Cross>
        </TopContainer>
        <LinkContainer>
          <NavLinks $isHamburger={true}>
            <NavLink $isHamburger={true}>
              <Link href={"/"} onClick={() => setShowHamburger(false)} >
                Home
              </Link>
            </NavLink>
            <NavLink $isHamburger={true}>
              <Link href={"/features"} onClick={() => setShowHamburger(false)} >
                Features
              </Link>
            </NavLink>
            <NavLink $isHamburger={true}>
              <Link href={"/about-me"} onClick={() => setShowHamburger(false)} >
                About Me
              </Link>
            </NavLink>
            <NavLink $isHamburger={true} onClick={() => {
                signInHandler()
                setShowHamburger(false)
              }}>
                {signedIn ? "Sign Out" : "Sign In"}
            </NavLink>
          </NavLinks>
          <SocialLinks $isHamburger={true}>
            <SocialLink>
              <Link href="mailto:psykidbiz@gmail.com" onClick={() => setShowHamburger(false)}>
                <Image src={gmail} alt="social-links" height={25} width={25} />
              </Link>
            </SocialLink>

            <SocialLink>
              <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer" onClick={() => setShowHamburger(false)}>
                <Image src={insta} alt="social-links" height={25} width={25} />
              </Link>
            </SocialLink>

            <SocialLink>
              <Link href="/profile" onClick={() => setShowHamburger(false)}>
                <ProfileContainer>
                  <Image src={picture} alt="social-links" fill />
                </ProfileContainer>
              </Link>
            </SocialLink>
          </SocialLinks>
        </LinkContainer>
      </HamburgerContainer>
    </Container>
  );
};

export default React.memo(HamburgerMenu);
