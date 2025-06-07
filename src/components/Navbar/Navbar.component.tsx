import React, { useEffect, useState } from "react";
import { LogoContainer, Wrapper, NavLinks, SocialLinks, HamburgerButton } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import ImageComponent from "../ImageComponent/ImageComponent";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
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

const Navbar = ({ signInHandler, signedIn, hmbgrClickHandler }: NavbarTypes) => {
    const router = useRouter();
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