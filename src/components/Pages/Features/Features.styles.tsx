import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: calc(100dvh - 120px);
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    margin-bottom: -100px;
    padding-bottom: 30px;
`;

export const Grid = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
`;