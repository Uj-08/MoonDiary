import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    text-align: center;
    min-height: 500px;
    height: 70vh;
    position: relative;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 6rem;
        color: white;
        font-family: 'Dancing Script', cursive;
        @media (max-width: 1200px) {
            font-size: 4rem;
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
        background-position: 0 -100px;
        z-index: -2;
        filter: blur(3px);
        @media (max-width: 1200px) {
            background-position: 0 0px;
        }
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