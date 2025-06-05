import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
`;

export const PreviewContainer = styled.section`
    flex: 1;
    max-width: 60%;
    font-family: 'Montserrat', sans-serif;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    min-height: 800px;
    @media (max-width: 1200px) {
        margin: 0 4rem;
    }
    @media (max-width: 920px) {
        max-width: 100%;
        margin: 0 0rem;
        border-radius: 0px;
        box-shadow: none;
    }
    /* @media (max-width: 812px) {
        
    }
    @media (max-width: 450px) {
    } */
`;

export const Preview = styled.div`
    width: 100%;
    height: 100%;
    /* border: 2px solid #eee; */
    @media (max-width: 920px) {
        aspect-ratio: 4/3;
    }
`;

export const PreviewImageContainer = styled.div`
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

export const AdditionalSection = styled.section`
    
`

export const AdditionalSectionTitle = styled.div`
    font-family: "Arimo", sans-serif;
    font-size: 1.8rem;
    margin-bottom: 12px;
`;

export const AdditionalData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;