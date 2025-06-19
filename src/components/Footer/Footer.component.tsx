import Link from "next/link"
import Image from "next/image"
import { Footer, LogoContainer } from "./Footer.styles"
import logo from "public/logo.png"
import gmail from "public/gmail.png"
import insta from "public/instagram.png"

export default function FooterComponent() {
    return (
        <Footer>
            <ul>
                <li>
                    <Link href="mailto:psykidbiz@gmail.com">
                        <Image src={gmail} alt="social-links" fill={true} />
                    </Link>
                </li>
                <LogoContainer>
                    <Link href={"/"}>
                        <Image src={logo} alt="social-links" fill={true} />
                    </Link>
                </LogoContainer>
                <li>
                    <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
                        <Image src={insta} alt="social-links" fill={true} />
                    </Link>
                </li>
            </ul>
            <span>© MoonDiary 2025</span>
        </Footer>
    )
}