import styled from "styled-components"

export const Container = styled.section`
    padding: 1rem 8rem;
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
    gap: 1.5rem;
`;