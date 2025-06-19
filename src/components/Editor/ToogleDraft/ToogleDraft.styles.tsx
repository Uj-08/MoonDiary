import { styled } from "styled-components";

export const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  cursor: pointer;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Slider = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked }) => (checked ? "#b101b1" : "#ccc")};
  border-radius: 34px;
  transition: 0.3s;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
    transform: ${({ checked }) =>
        checked ? "translateX(0px)" : "translateX(22px)"};
  }
`;