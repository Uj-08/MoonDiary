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
    h1{
        font-size: 6rem;
        color: white;
        font-family: 'Dancing Script', cursive;
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