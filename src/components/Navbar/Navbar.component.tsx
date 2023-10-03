import { useState } from "react";
import { LogoContainer, Wrapper, NavLinks, SocialLinks, HamburgerButton } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar({ signInHandler, signedIn }: NavbarTypes) {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false)

    return (
        <Wrapper>
            <LogoContainer onClick={() => router.push("/")}>
                <Image src="/logo.png" alt={""} fill={true} />
            </LogoContainer>
            <NavLinks>
                <li onClick={() => router.push("/")}>Home</li>
                <li>Features</li>
                <li>About Me</li>
                <li onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</li>
            </NavLinks>
            <SocialLinks>
                <li><Image src="/facebook.png" alt={""} height="25" width="25" /></li>
                <li><Image src="/instagram.png" alt={""} height="25" width="25" /></li>
                <li><Image src="/linkedin.png" alt={""} height="25" width="25" /></li>
            </SocialLinks>
            {/* <HamburgerButton enabled={enabled} onClick={() => setEnabled(val => !val)}>
                <span />
            </HamburgerButton> */}
        </Wrapper>
    );
}