import styled, { keyframes } from "styled-components";

export const Container = styled.div<{ showModal?: boolean }>`
  min-height: 100dvh;
  filter: ${(props) => (props.showModal ? "blur(5px)" : "")};
  height: 100%;
`;

export const Toast = styled.div<{ show?: boolean }>`
  position: fixed;
  display: flex;
  color: white;
  bottom: 0;
  right: 0;
  margin: 16px;
  padding: 8px 16px;
  border-radius: 12px;
  ${({ show }) =>
    show ? "transform: translateX(0%);" : "transform: translateX(150%);"}
  ${({ show }) => (show ? "opacity: 1;" : "opacity: 0;")}
  transition: transform 800ms linear, opacity 1000ms linear;
  font-family: "Montserrat", sans-serif;

  z-index: 3;

  background: rgba(255, 0, 0, 0.65);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 6px solid #7a0bc0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.8s linear infinite;
  margin: auto;
`;
