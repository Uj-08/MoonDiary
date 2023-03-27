import styled from "styled-components";

export const PreviewContainer = styled.div`
    margin: 0 8rem;
    flex-basis: 100%;
    max-width: 60%;
    font-family: 'Montserrat', sans-serif;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    min-height: 800px;
`;

export const Preview = styled.div`
    width: 100%;
    height: 100%;
    /* border: 2px solid #eee; */
`;

export const PreviewImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 45dvw;
    img {
        object-fit: cover;
        aspect-ratio: 4/3;
    }
    input {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-25%);
    }
`;