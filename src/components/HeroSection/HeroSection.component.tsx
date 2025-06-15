import { Container, HiddenTitle, ImageContainer, Title } from "./HeroSection.styles";
import { useState, useEffect, useMemo } from "react";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { COOKIE_NAME } from "@/helpers/constants";
import cover from "public/cover.jpeg"
import Image from "next/image";

const moondiaryTaglines = [
    "Welcome to Moondiary",
    "Shoot for the Moondiary",
    "Moondiary awaits",
    "Settle into Moondiary",
    "Step into Moondiary",
];

const HeroSection = () => {
    const [client, setClient] = useState<{ given_name: string }>();

    useEffect(() => {
        if (hasCookie(COOKIE_NAME)) {
            const cookie = getCookie(COOKIE_NAME);
            if (typeof (cookie) === "string") {
                setClient(jwtDecode(cookie))
            }
        }
    }, [])

    const getRandomTagline = (arr: string[]) =>
        arr[Math.floor(Math.random() * arr.length)];

    const tagline = useMemo(() => getRandomTagline(moondiaryTaglines), []);

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
            <HiddenTitle>
                Welcome to Moondiary – Reflect and Grow
            </HiddenTitle>
            <Title>
                {tagline}{client?.given_name ? ("," + client?.given_name) : ""}!
            </Title>
        </Container>
    );
};

export default HeroSection;