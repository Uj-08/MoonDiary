import React from "react"
import Link from "next/link"
import Image from "next/image"
import logo from "public/logo.png"
import { FaInstagram } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { CopyrightText, Footer, FooterIcon, FooterIconContainer } from "./Footer.styles"

const FooterComponent = () => {
    return (
        <Footer>
            <FooterIconContainer>

                <FooterIcon>
                    <Link href="mailto:psykidbiz@gmail.com">
                        <MdAlternateEmail className="social_link" />
                    </Link>
                </FooterIcon>

                <FooterIcon>
                    <Link href={"/"}>
                        <Image src={logo} alt="logo" height={20} width={20} />
                    </Link>
                </FooterIcon>

                <FooterIcon>
                    <Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
                        <FaInstagram className="social_link" />
                    </Link>
                </FooterIcon>

            </FooterIconContainer>
            <CopyrightText>© MoonDiary 2025</CopyrightText>
        </Footer>
    )
}

export default React.memo(FooterComponent);