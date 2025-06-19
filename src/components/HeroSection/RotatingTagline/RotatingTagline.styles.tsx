import { dancingScript } from "@/styles/fonts";
import styled, { keyframes } from "styled-components";
const Y_CONST = "20px";

export const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(${Y_CONST}); }
    to { opacity: 1; transform: translateY(0); }
`;

export const fadeOut = keyframes`
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-${Y_CONST}); }
`;

export const Tagline = styled.span<{ $fade: "in" | "out" }>`
    font-size: 3rem;
    font-weight: 600;
    color: #ffffff;
    opacity: 0;
    animation: ${({ $fade }) => ($fade === "in" ? fadeIn : fadeOut)} 0.6s ease forwards;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 0 8px;
    
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
        margin-top: 30px;
    }
`;
