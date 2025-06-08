import React from "react";
import { LogoContainer, Wrapper, NavLinks, SocialLinks, HamburgerButton } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import styled from "styled-components";
import ImageComponent from "../ImageComponent/ImageComponent";
import Link from "next/link";

export const Profile = styled.div`
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

const Navbar = ({ signInHandler, signedIn, picture, hmbgrClickHandler }: NavbarTypes) => {
    return (
        <Wrapper>
            <LogoContainer>
                <Link href={"/"}>
                    <Image src="/logo.png" alt={""} fill={true} />
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
                        <Image src="/gmail.png" alt={""} height="25" width="25" />
                    </Link>
                </li>
                <li>
                    <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
                        <Image src="/instagram.png" alt={""} height="25" width="25" />
                    </Link>
                </li>
                <li>
                    <Profile>
                        <ImageComponent aspectRatio={1} src={picture} alt="" />
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