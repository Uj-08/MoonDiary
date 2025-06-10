import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    min-height: calc(100dvh - 220px);
    padding: 200px 6rem;
    gap: 12px;
`;