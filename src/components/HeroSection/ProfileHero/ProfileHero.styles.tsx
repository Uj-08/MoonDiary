import styled from "styled-components";
import { dancingScript } from "@/styles/fonts";

export const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transform: translateY(-40px);
    z-index: 1;
    @media (max-width: 950px) {
        transform: translateY(0px);
        gap: 0;
    }
`;

export const ProfileContainer = styled.div`
    position: relative;
    z-index: 1;
    aspect-ratio: 1;
    width: 40%;
    border-radius: 100%;
    overflow: hidden;
`

export const Title = styled.h1`
    font-size: 3rem;
    font-weight: 600;
    color: #ffffff;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 0 8px;
    
    z-index: 3;
    font-size: 6rem;
    color: white;
    
    font-family: ${dancingScript.style.fontFamily}, cursive;
    text-align: center;
    @media (max-width: 1200px) {
        font-size: 4rem;
    }
    @media (max-width: 900px) {
        font-size: 3rem;
        margin-top: 30px;
    }
`;