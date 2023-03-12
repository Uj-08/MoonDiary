import { LogoContainer, Wrapper, NavLinks, SocialLinks } from "./Navbar.styles"
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar({ signInHandler, signedIn }: NavbarTypes) {
    const router = useRouter();

    return (
        <Wrapper>
            <LogoContainer onClick={() => router.push("/")} style={{ marginRight: "138px" }}>
                <Image src="/logo.png" alt={""} height="45" width="45" />
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
        </Wrapper>
    );
}