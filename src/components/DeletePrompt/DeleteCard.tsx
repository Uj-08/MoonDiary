import React from 'react'
import { DeleteButton } from '../ArticleCard/Card.styles';
import styled from 'styled-components';

interface DeleteCardTypes {
    blogTitle: string;
    onDeleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onCancelHandler: () => void;
}

const Container = styled.div`
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

const ModalDeleteButton = styled(DeleteButton)`
    opacity: 1;
`;

const CancelButton = styled(ModalDeleteButton)`
    border: 1px solid #5CD5A7;
    color: #5CD5A7;
    :active {
        color: #ffff;
        background-color: #5CD5A7;
    }
`;

function DeleteCard({ blogTitle, onDeleteHandler, onCancelHandler }: DeleteCardTypes) {
    function containerClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }
  return (
    <Container onClick={containerClickHandler}>
        <div>Delete {blogTitle} ?</div>
        <div>
            <ModalDeleteButton onClick={onDeleteHandler} >
                Confirm
            </ModalDeleteButton>
            <CancelButton onClick={onCancelHandler} >
                Cancel
            </CancelButton> 
        </div>
    </Container>
  )
}

export default DeleteCard