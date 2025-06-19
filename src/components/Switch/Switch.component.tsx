import React from 'react'
import { ActiveIndicator, SwitchContainer, SwitchOption } from './Switch.styles';
import { SwitchTypes } from './Switch.types';

const Switch = ({
    showDrafts,
    showDraftsHandler
}: SwitchTypes) => {
    return (
        <SwitchContainer>
            <ActiveIndicator $position={showDrafts ? "right" : "left"} />
            <SwitchOption active={!showDrafts} onClick={() => showDraftsHandler(false)}>
                Published
            </SwitchOption>
            <SwitchOption active={showDrafts} onClick={() => showDraftsHandler(true)}>
                Drafts
            </SwitchOption>
        </SwitchContainer>
    )
}

export default React.memo(Switch);