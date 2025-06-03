import styled from "styled-components"

export const Container = styled.section`
    padding: 1rem 8rem;
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

export const Title = styled.h2`
    font-size: 25px;
    font-family: "Arimo", sans-serif;
    font-weight: 900;
    /* letter-spacing: 1.01px; */
    text-transform: uppercase;
`;

export const Grid = styled.div`
    display: grid;
    padding-top: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 2rem;
`;