import React from "react";
import { IsDraftToggleTypes } from "./ToogleDraft.types";
import { Slider, ToggleContainer, ToggleInput } from "./ToogleDraft.styles";

const ToggleDraft = ({ isDraft, setIsDraft }: IsDraftToggleTypes) => {
	return (
		<ToggleContainer>
			<ToggleInput type="checkbox" checked={isDraft} onChange={() => setIsDraft(!isDraft)} />
			<Slider checked={isDraft} />
		</ToggleContainer>
	);
};

export default React.memo(ToggleDraft);
