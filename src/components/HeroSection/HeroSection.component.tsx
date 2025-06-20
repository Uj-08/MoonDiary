import React, { useContext } from "react";
import { Container, HiddenTitle, ImageContainer } from "./HeroSection.styles";
import cover from "public/cover.jpeg";
import Image from "next/image";
import RotatingTagline from "./RotatingTagline/RotatingTagline.component";
import { BaseContext, BaseContextType } from "@/containers/Base/Base";

const moonDiaryTaglines = [
    "Welcome to Moondiary",
    "Shoot for the Moondiary",
    "Moondiary awaits",
    "Settle into Moondiary",
    "Step into Moondiary",
];

const HeroSection = () => {
    const context = useContext<BaseContextType | null>(BaseContext);
    return (
        <Container>
            <ImageContainer>
                <Image
                    src={cover}
                    alt="hero-image"
                    fill
                    quality={50}
                    placeholder="blur"
                    priority
                />
            </ImageContainer>

            <HiddenTitle>{"MoonDiary – Align Your Life Through Energy Medicine & Cosmic Guidance"}</HiddenTitle>
            <RotatingTagline taglines={moonDiaryTaglines} name={context?.client?.given_name} />
        </Container>
    );
};

export default React.memo(HeroSection);