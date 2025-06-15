import { dancingScript } from "@/styles/fonts";
import styled, { keyframes } from "styled-components";

export const Container = styled.header`
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 75dvh;  
    background-color: #000;
`;

export const ImageContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: 100%;
    aspect-ratio: 4/3;
    z-index: 10;
    filter: blur(3px);
    width: 100%;
    z-index: 1;
    @media (max-width: 500px) {
        aspect-ratio: 1;
    }
    img {
        object-fit: contain;
        object-position: center;
        @media (max-width: 1200px) {
            object-fit: cover;
        }
    }

    &:before {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 2;
        background-color: black;
        opacity: 0.5;
    }
`;

export const HiddenTitle = styled.h1`
    z-index: 3;
    position: absolute;
    font-size: 6rem;
    color: white;
    text-align: center;
    visibility: hidden;
`;
export const Title = styled.h2`
    z-index: 3;
    position: absolute;
    font-size: 6rem;
    color: white;
    
    font-family: ${dancingScript.style.fontFamily}, cursive;
    text-align: center;
    @media (max-width: 1200px) {
        font-size: 4rem;
    }
    @media (max-width: 900px) {
        font-size: 3rem;
    }
`;

// Animation
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Animated Title
export const AnimatedTitle = styled(Title)`
    opacity: 0;
    animation: ${fadeIn} 0.8s ease-out forwards;
`;