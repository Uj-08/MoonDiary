import { Container, ImageContainer, Title } from "./HeroSection.styles";
import { useState, useEffect } from "react";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { COOKIE_NAME } from "@/helpers/constants";
import cover from "public/cover.jpeg"
import Image from "next/image";

export default function HeroSection() {

    const [client, setClient] = useState<{given_name: string}>();

    useEffect(() => {
        if(hasCookie(COOKIE_NAME)) {
            const cookie = getCookie(COOKIE_NAME);
            if(typeof(cookie) === "string"){
                setClient(jwtDecode(cookie))
            }
        }
    }, [])

    return (
        <Container>
            <ImageContainer>
                <Image 
                    src={cover} 
                    alt={"hero-image"}
                    fill
                    quality={50}
                    placeholder="blur"
                    priority
                />
            </ImageContainer>
                <Title>
                    Welcome to MoonDiary{client?.given_name ? ("," + client?.given_name) : ""}!
                </Title>
        </Container>
    );
};