import { Container, HiddenTitle, ImageContainer } from "./HeroSection.styles";
import cover from "public/cover.jpeg";
import Image from "next/image";
import RotatingTagline from "./RotatingTagline";
import { useContext } from "react";
import { ClientContext } from "@/containers/Base/Base";

const moonDiaryTaglines = [
    "Welcome to Moondiary",
    "Shoot for the Moondiary",
    "Moondiary awaits",
    "Settle into Moondiary",
    "Step into Moondiary",
];

const HeroSection = () => {
    const client = useContext(ClientContext);
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

            <HiddenTitle>{"Welcome to Moondiary – Reflect and Grow"}</HiddenTitle>
            <RotatingTagline taglines={moonDiaryTaglines} name={client?.given_name} />
        </Container>
    );
};

export default HeroSection;