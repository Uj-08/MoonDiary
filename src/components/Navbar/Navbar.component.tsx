import React from "react";
import { LogoContainer, Wrapper, NavLinks, SocialLinks, HamburgerButton } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import styled from "styled-components";
import ImageComponent from "../ImageComponent/ImageComponent";
import Link from "next/link";
import logo from "public/logo.png"
import gmail from "public/gmail.png"
import insta from "public/instagram.png"
import { useRouter } from "next/router";


export const Profile = styled.span`
display: flex;
position: relative;
height: 26px;
width: 26px;
border-radius: 100%;
overflow: hidden;
text-align: left;
transform: translateY(-2px);
img {
    width: 100%;
    object-fit: cover;
}
`;

const Navbar = ({ signInHandler, signedIn, picture, hmbgrClickHandler, setShowLoginModal }: NavbarTypes) => {
    const router = useRouter();
    const profileClickHandler = () => {
        if (!signedIn) setShowLoginModal(true);
        else router.push("/profile")
    }
    return (
        <Wrapper>
            <LogoContainer>
                <Link href={"/"}>
                    <Image src={logo} alt={"MoonDiary"} fill={true} />
                </Link>
            </LogoContainer>
            <NavLinks>
                <li>
                    <Link href={"/"}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={"/features"}>
                        Features
                    </Link>
                </li>
                <li>
                    <Link href={"/about-me"}>
                        About Me
                    </Link>
                </li>
                <li onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</li>
            </NavLinks>
            <SocialLinks>
                <li>
                    <Link href="mailto:psykidbiz@gmail.com">
                        <Image src={gmail} alt={"gmail"} height="25" width="25" />
                    </Link>
                </li>
                <li>
                    <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
                        <Image src={insta} alt={"Instagram"} height="25" width="25" />
                    </Link>
                </li>
                <li>
                    <Profile onClick={profileClickHandler}>
                        <ImageComponent aspectRatio={1} src={picture} alt="profile" />
                    </Profile>
                </li>
            </SocialLinks>
            <HamburgerButton onClick={hmbgrClickHandler}>
                <span />
                <span />
                <span />
            </HamburgerButton>
        </Wrapper>
    );
}

export default React.memo(Navbar);