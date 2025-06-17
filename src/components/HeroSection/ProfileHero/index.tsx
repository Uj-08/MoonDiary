import { Container, ImageContainer } from "../HeroSection.styles";
import cover from "public/cover.jpeg";
import Image from "next/image";
import { useContext } from "react";
import { ClientContext } from "@/containers/Base/Base";
import { HeroContent, ProfileContainer, Title } from "./ProfileHero.styles";

const ProfileHero = () => {
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
            <HeroContent>
                <ProfileContainer>
                    <Image
                        src={client?.picture?.replace(/=s\d+-c/, '=s400-c') ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BSEPxHF0-PRxJlVMHla55wvcxWdSi8RU2g&s"}
                        alt="hero-image"
                        fill
                        quality={50}
                        // placeholder="blur"
                        priority
                    />
                </ProfileContainer>
                <Title>{client?.name ?? "User"}</Title>
            </HeroContent>
        </Container>
    );
};

export default ProfileHero;