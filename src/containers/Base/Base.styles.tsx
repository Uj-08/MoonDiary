import styled, { keyframes } from "styled-components";

export const Container = styled.div<{ showModal?: boolean }>`
  min-height: 100dvh;
  filter: ${(props) => (props.showModal ? "blur(5px)" : "")};
  height: 100%;
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

export const ToastContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1rem;
  z-index: 10;
`;
