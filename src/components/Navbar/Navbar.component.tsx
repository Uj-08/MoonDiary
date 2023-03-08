import { LogoContainer, Wrapper, NavLinks, SocialLinks } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";

export default function Navbar({ signInHandler, signedIn }: NavbarTypes) {
    return (
        <Wrapper>
            <LogoContainer>
                <Image src="/logo.png" alt={""} height="45" width="45" />
            </LogoContainer>
            <NavLinks>
                <li>Home</li>
                <li>Features</li>
                <li>About Me</li>
                <li onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</li>
            </NavLinks>
            <SocialLinks>
                <li><Image src="/facebook.png" alt={""} height="25" width="25" /></li>
                <li><Image src="/instagram.png" alt={""} height="25" width="25" /></li>
                <li><Image src="/linkedin.png" alt={""} height="25" width="25" /></li>
            </SocialLinks>
        </Wrapper>
    );
}