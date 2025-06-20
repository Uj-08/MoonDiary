import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - 220px);
    align-items: center;
    padding: 140px 8rem 40px 8rem;
    @media (max-width: 1200px) {
        padding: 100px 4rem 40px 4rem;
    }
    @media (max-width: 640px) {
        padding: 100px 0rem 40px 0rem;
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
    }
`;