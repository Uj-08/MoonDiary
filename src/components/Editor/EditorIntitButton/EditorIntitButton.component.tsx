import React from 'react'
import { EditorInitButtonTypes } from './EditorIntitButton.types';
import { Button, Container } from './EditorIntitButton.styles';

const EditorIntitButton = ({
    shouldInitEditor,
    initializeEditor
}: EditorInitButtonTypes) => {
    if (!shouldInitEditor)
        return (
            <Container>
                <Button onClick={initializeEditor}>
                    Initialize Editor?
                </Button>
            </Container>
        )
    return <></>
}

export default React.memo(EditorIntitButton);