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
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  font-family: "Arimo", sans-serif;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.95rem;
  color: #333;
  appearance: none;
  cursor: pointer;
  transition: border 0.2s ease;

  &:focus {
    border-color: rgba(189, 16, 224, 0.5);
    outline: none;
  }
`;
