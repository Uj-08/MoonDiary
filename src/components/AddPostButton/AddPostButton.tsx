import React from "react";
import {
	ButtonWrapper,
	StyledLink,
	IconWrapper,
	LabelText,
	StyledIcon,
} from "./AddPostButton.styles";

const AddPostButton = () => {
	return (
		<StyledLink href="/blogs/post">
			<ButtonWrapper>
				<IconWrapper>
					<StyledIcon />
				</IconWrapper>
				<LabelText>POST</LabelText>
			</ButtonWrapper>
		</StyledLink>
	);
};

export default React.memo(AddPostButton);
