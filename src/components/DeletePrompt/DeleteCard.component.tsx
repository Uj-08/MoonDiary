import React from 'react'
import { CancelButton, Container, ModalDeleteButton } from './DeleteCard.styles';
import { DeleteCardTypes } from './DeleteCard.types';

const DeleteCard = ({ blogTitle, onDeleteHandler, onCancelHandler }: DeleteCardTypes) => {
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

export default React.memo(DeleteCard);