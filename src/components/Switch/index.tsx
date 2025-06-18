import React from 'react'
import { ActiveIndicator, SwitchContainer, SwitchOption } from './Switch.styles';

const Switch = ({
    showDrafts,
    showDraftsHandler
}: {
    showDrafts: boolean;
    showDraftsHandler: (bool: boolean) => void
}) => {



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