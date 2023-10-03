import styled from "styled-components";

export const BlogTitleContainer = styled.div`
    margin-top: 60px;
    padding: 0 8rem;
    @media (max-width: 1200px) {
        padding: 0 4rem;
    }
    @media (max-width: 812px) {
        padding: 0 2rem;
    }
    @media (max-width: 450px) {
        padding: 0 1rem;
    }
`;

export const BlogTitle = styled.div`
    font-family: "Babylonica", cursive;
    font-size: 96px;
    text-align: center;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    @media (max-width: 670px) {
        font-size: 60px;
    }
    @media (max-width: 570px) {
        font-size: 55px;
    }
    @media (max-width: 470px) {
        font-size: 45px;
    }
`;

export const Container = styled.div`
    padding: 0px 8rem;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 1200px) {
        padding: 0 4rem;
    }
    @media (max-width: 1000px) {
        flex-direction: column-reverse;
    }
    @media (max-width: 812px) {
        padding: 0 2rem;
    }
    @media (max-width: 450px) {
        padding: 0 1rem;
    }
`;

export const EditorContainer = styled.div`
    flex-basis: 100%;
`;

export const TitleText = styled.input`
    border-radius: 8px;
    width: 100%;
    padding: 10px 15px;
    font-size: 20px;
    margin-bottom: 10px;
    border: 1px solid #eee;
    box-shadow: 0 2px 2px -2px rgba(34,47,62,.1), 0 8px 8px -4px rgba(34,47,62,.07);
    &:focus {
        border: 1px solid #c4c4c4;
        outline: none;
    }
    @media (max-width: 570px) {
        font-size: 15px;
    }
`;

export const Button = styled.button`
    margin-top: 5px;
    text-align: center;
    width: 100%;    
    padding: 12px 10px;
    background-color: #fff;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 2px -2px rgba(34,47,62,.1), 0 8px 8px -4px rgba(34,47,62,.07);
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 1px;
    font-weight: 900;
    font-size: 16px;
    &:hover {
        box-shadow: 0 2px 2px -2px rgba(34,47,62,.3), 0 8px 8px -4px rgba(34,47,62,.09);
    }
`;

export const Span = styled.span``;

export const PreviewContainer = styled.div`
    flex-basis: 100%;
    font-family: 'Montserrat', sans-serif;
    background-color: #fff;
    ${Span} {
        display: block;
        font-size: 20px;
        margin-bottom: 5px;
        text-transform: uppercase;
        font-weight: 700;
    }
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
    aspect-ratio: 4/3;
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

export const InputFileLabel = styled.label`
    position: absolute;
    color: white;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.4);
    padding: 5px 15px;
    border-radius: 8px;
    cursor: pointer;
    :hover {
        box-shadow: 0 2px 2px -2px rgba(34,47,62,.1), 0 8px 8px -4px rgba(34,47,62,.07);
    }
`;

export const RemoveImage = styled.div`
    position: absolute;
    color: black;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff6b;
    padding: 5px 15px;
    border-radius: 8px;
    cursor: pointer;
    :hover {
        box-shadow: 0 2px 2px -2px rgba(34,47,62,.1), 0 8px 8px -4px rgba(34,47,62,.07);
        background-color: white;
    }
`;

export const PreviewData = styled.div`
    padding: 10px 20px;
    padding-bottom: 40px;
    @media (max-width: 670px) {
        font-size: 95%;
    }
    @media (max-width: 570px) {
        font-size: 90%;
    }
    @media (max-width: 470px) {
        font-size: 85%
    }
    @media (max-width: 400px) {
        font-size: 80%
    }
`;