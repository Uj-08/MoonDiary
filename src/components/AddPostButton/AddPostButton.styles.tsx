import { styled } from "styled-components";

export const Container = styled.div`
  padding: 14px 24px;
  max-width: 170px;
  background-color: red;
  display: flex;
  gap: 12px;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: box-shadow linear 200ms;
  font-family: "Arimo", sans-serif;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;

  background: rgba(189, 16, 224, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:hover {
    box-shadow: rgba(177, 1, 177, 0.2) 0px 12px 28px 0px,
      rgba(177, 1, 177, 0.1) 0px 2px 4px 0px,
      rgba(177, 1, 177, 0.05) 0px 0px 0px 1px inset;
  }
  div {
    display: flex;
    align-items: center;
    svg {
      transform: scale(1.3);
      fill: white;
    }
  }
`;
