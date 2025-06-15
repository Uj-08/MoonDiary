// components/RotatingTagline.tsx
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { dancingScript } from "@/styles/fonts";

const Y_CONST = "20px";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(${Y_CONST}); }
    to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-${Y_CONST}); }
`;

const Tagline = styled.h2<{ fade: "in" | "out" }>`
    font-size: 3rem;
    font-weight: 600;
    color: #ffffff;
    opacity: 0;
    animation: ${({ fade }) => (fade === "in" ? fadeIn : fadeOut)} 0.6s ease forwards;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 0 8px;
    margin-top: 30px;

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

interface Props {
    taglines: string[];
    name?: string;
}

const RotatingTagline: React.FC<Props> = ({ taglines, name }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState<"in" | "out">("in");

    useEffect(() => {
        const interval = setInterval(() => {
            setFade("out");
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % taglines.length);
                setFade("in");
            }, 750);
        }, 5000);

        return () => clearInterval(interval);
    }, [taglines.length]);

    const text = taglines[index] + (name ? `,${name}` : "") + "!";

    return <Tagline fade={fade}>{text}</Tagline>;
};

export default RotatingTagline;