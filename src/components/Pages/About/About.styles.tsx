import styled from "styled-components";
import { montserrat } from "@/styles/fonts";

export const Container = styled.div`
    min-height: calc(100dvh - 220px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
`;

export const AboutCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: ${montserrat.style.fontFamily};
    font-size: 13px;
    gap: 12px;
    max-width: 300px;

    background: linear-gradient(45deg, #7a0bc099, #e94ce999);
    border-radius: 8px;
    padding: 30px 12px;
    color: white;
    box-shadow: 0 2px 6px rgba(122, 11, 192, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(255, 77, 155, 0.2);
    }
`;

export const Author = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
`;

export const AuthorName = styled.h3`
    font-weight: bold;
    font-size: 20px;
`;

export const AuthorBio = styled.p`
    font-style: italic;
    line-height: 17px;
`;

export const AuthorProfile = styled.div`
    position: relative;
    height: 70px;
    width: 70px;
    border-radius: 100%;
    overflow: hidden;
    text-align: left;
    img {
        width: 100%;
        object-fit: cover;
    }
`;