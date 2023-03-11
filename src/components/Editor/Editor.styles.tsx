import styled from "styled-components";

export const Container = styled.div`
    margin: 80px 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

`;

export const EditorContainer = styled.div`
    flex-basis: 100%;
`;

export const Button = styled.button`
    margin: 5px 0;
    text-align: center;
    width: 100%;    
    padding: 10px;
    background-color: #fff;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 2px -2px rgba(34,47,62,.1), 0 8px 8px -4px rgba(34,47,62,.07);
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 1px;
    font-weight: 900;
    &:hover {
        box-shadow: 0 2px 2px -2px rgba(34,47,62,.3), 0 8px 8px -4px rgba(34,47,62,.09);
    }
`;

export const Preview = styled.div`
    border-radius: 8px;
    height: 100%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    /* border: 2px solid #eee; */
    min-height: 1000px;
    overflow: hidden;
`;

export const Span = styled.span`
    
`;

export const PreviewContainer = styled.div`
    flex-basis: 100%;
    font-family: 'Montserrat', sans-serif;
    ${Span} {
        display: block;
        font-size: 20px;
        margin-bottom: 5px;
        text-transform: uppercase;
        font-weight: 700;
    }
`;

export const PreviewImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 485px;
    img {
        object-fit: cover;
        aspect-ratio: 16/9;
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
    }
`;

export const PreviewData = styled.div`
    padding: 10px 10px;
`;