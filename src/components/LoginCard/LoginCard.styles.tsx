import styled from "styled-components";
import { anton, dancingScript, montserrat } from "@/styles/fonts";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    background: white;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    max-width: 360px;
    width: 100%;
    text-align: center;
    font-family: ${montserrat.style.fontFamily}, sans-serif;
`;

export const Title = styled.h2`
    font-size: 1.4rem;
    color: #353535;
    margin-bottom: 0.5rem;
    font-family: ${anton.style.fontFamily}, sans-serif;
`;

export const Subtitle = styled.p`
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 1rem;
    font-family: ${dancingScript.style.fontFamily}, cursive;
`;

export const Divider = styled.div`
    height: 1px;
    background-color: #eee;
    margin: 1.5rem 0 1rem;
`;

export const Small = styled.small`
    color: #aaa;
    font-size: 0.65rem;
    font-family: ${montserrat.style.fontFamily}, sans-serif;
`;