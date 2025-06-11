import Link from "next/link"
import { Footer } from "./Footer.styles"
import Image from "next/image"
import styled from "styled-components"

export const LogoContainer = styled.li`
    :hover {
        img {
            transform: rotate(360deg);
        }
    }
    img {
        transition: transform 0.3s linear;
    }
`

export default function FooterComponent() {
    return (
        <Footer>
            <ul>
                <li>
                    <Link href="mailto:psykidbiz@gmail.com">
                        <Image src={"/gmail.png"} alt="social-links" fill={true} />
                    </Link>
                </li>
                <LogoContainer>
                    <Link href={"/"}>
                        <Image src={"/logo.png"} alt="social-links" fill={true} />
                    </Link>
                </LogoContainer>
                <li>
                    <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
                        <Image src={"/instagram.png"} alt="social-links" fill={true} />
                    </Link>
                </li>
            </ul>
            <span>© MoonDiary 2025</span>
        </Footer>
    )
}