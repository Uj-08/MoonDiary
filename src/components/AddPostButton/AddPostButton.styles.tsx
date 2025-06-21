import styled from "styled-components";
import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";

export const StyledLink = styled(Link)`
  text-decoration: none;
  align-self: flex-end;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 14px 24px;
  max-width: 180px;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-family: "Arimo", sans-serif;
  font-weight: bold;

  background: rgba(189, 16, 224, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: rgba(177, 1, 177, 0.2) 0px 12px 28px 0px,
      rgba(177, 1, 177, 0.1) 0px 2px 4px 0px,
      rgba(177, 1, 177, 0.05) 0px 0px 0px 1px inset;
  }

  @media (max-width: 600px) {
    padding: 12px 18px;
    gap: 8px;
    max-width: 100%;
    font-size: 14px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled(MdAddCircleOutline)`
  width: 24px;
  height: 24px;
  color: white;

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

export const LabelText = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;