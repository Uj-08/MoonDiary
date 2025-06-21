"use client"
import React from "react";
import { LogoContainer, Wrapper, NavLinks, SocialLinks, HamburgerButton, Profile, NavLink, SocialLink } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import ImageComponent from "../ImageComponent/ShimmerImage.component";
import Link from "next/link";
import logo from "public/logo.png";
import { FaInstagram } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";




const Navbar = ({ signInHandler, signedIn, picture, hmbgrClickHandler }: NavbarTypes) => {
    return (
        <Wrapper>
            <LogoContainer>
                <Link href={"/"}>
                    <Image src={logo} alt={"MoonDiary"} height={35} width={35} />
                </Link>
            </LogoContainer>
            <NavLinks>
                <NavLink>
                    <Link href={"/"}>
                        Home
                    </Link>
                </NavLink>
                <NavLink>
                    <Link href={"/features"}>
                        Features
                    </Link>
                </NavLink>
                <NavLink>
                    <Link href={"/about-me"}>
                        About Me
                    </Link>
                </NavLink>
                <NavLink onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</NavLink>
            </NavLinks>
            <SocialLinks>
                <SocialLink>
                    <Link href="mailto:psykidbiz@gmail.com">
                        <MdAlternateEmail className="social_icon" />
                    </Link>
                </SocialLink>
                <SocialLink>
                    <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
                        <FaInstagram className="social_icon" />
                    </Link>
                </SocialLink>
                <SocialLink>
                    <Link href={"/profile"} prefetch={false}>
                        {
                            signedIn ?
                                <Profile>
                                    <ImageComponent aspectRatio={1} src={picture} alt="profile" />
                                </Profile>
                                : <CgProfile className="social_icon" />
                        }
                    </Link>
                </SocialLink>
            </SocialLinks>
            <HamburgerButton onClick={hmbgrClickHandler}>
                <RxHamburgerMenu className="hamburger_icon" />
            </HamburgerButton>
        </Wrapper>
    );
}

export default React.memo(Navbar);