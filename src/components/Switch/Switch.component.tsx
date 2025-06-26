import React from "react";
import { ActiveIndicator, SwitchContainer, SwitchOption } from "./Switch.styles";
import { SwitchTypes, Option } from "./Switch.types";

const Switch = ({ selected, onChange }: SwitchTypes) => {
	const options: Option[] = ["published", "drafts", "liked"];
	return (
		<SwitchContainer>
			<ActiveIndicator $position={options.indexOf(selected)} />
			{options.map((opt) => (
				<SwitchOption key={opt} active={selected === opt} onClick={() => onChange(opt)}>
					{opt.charAt(0).toUpperCase() + opt.slice(1)}
				</SwitchOption>
			))}
		</SwitchContainer>
	);
};

export default React.memo(Switch);
