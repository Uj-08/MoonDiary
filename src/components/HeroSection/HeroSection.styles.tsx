import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    text-align: center;
    position: relative;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 4/3;
    max-height: 75dvh;
    @media (max-width: 500px) {
        aspect-ratio: 1;
    }
    h1 {
        font-size: 6rem;
        color: white;
        font-family: 'Dancing Script', cursive;
        @media (max-width: 1200px) {
            font-size: 4rem;
        }
        @media (max-width: 900px) {
            font-size: 3rem;
        }
    }
    &:before {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-image: url("/cover.jpeg");
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -2;
        filter: blur(3px);
        background-position: center;
    }
    &:after {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -1;
        background-color: black;
        opacity: 0.5;
    }
`;