import { styled } from "styled-components";
import { DeleteButton } from "../ArticleCard/ArticleCard.styles";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    gap: 20px;
    background-color: #ffff;
    color: #000;
    padding: 16px;
    border-radius: 8px;
    div {
        display: flex;
        gap: 10px;
    }
`;

export const ModalDeleteButton = styled(DeleteButton)`
    opacity: 1;
    cursor: pointer;
`;

export const CancelButton = styled(ModalDeleteButton)`
    border: 1px solid #5CD5A7;
    color: #5CD5A7;
    &:hover {
        color: #ffff;
        background-color: #5CD5A7;
    }
`;