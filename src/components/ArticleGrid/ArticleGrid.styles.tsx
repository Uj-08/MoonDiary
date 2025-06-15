import styled from "styled-components";

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

  & > :first-child {
    grid-column: 1 / -1;
  }

  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem 5px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  }
  @media (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  font-family: "Arimo", sans-serif;
  span {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  @media (max-width: 728px) {
    justify-content: center;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  color: #000;
`;

export const Select = styled.select`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #fff;
  background-color: #fff;
  font-size: 14px;
  color: #303030;
  appearance: none;
  cursor: pointer;
  transition: border 0.2s ease;
  box-shadow: 0 2px 6px rgba(189, 16, 224, 0.08);
  min-width: 104px;
  @media (max-width: 500px) {
    font-size: 12px;
    min-width: 93px;
  }

  &:focus {
    border-color: rgba(189, 16, 224, 0.148);
    outline: none;
  }
`;
