import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 140px 8rem 40px 8rem;
    min-height: calc(100dvh - 220px);
    @media (max-width: 1200px) {
        padding: 100px 4rem 40px 4rem;
    }
    @media (max-width: 640px) {
        padding: 100px 0rem 40px 0rem;
    }
`;

export const Title = styled.h1`
    color: #292929;
    padding: 0 1rem;
    align-self: flex-start;
    font-family: "Arimo", sans-serif;
    @media (max-width: 640px) {
        align-self: center;
        padding: 0;
    }
`;

export const FlexWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.75rem;
    width: 100%;
    padding: 0 1rem;    
    @media (max-width: 640px) {
        justify-content: center;
        padding: 0;
    }
`;