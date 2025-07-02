import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LoginCardTypes } from "./LoginCard.types";
import {
	Container,
	Card,
	Title,
	Subtitle,
	Divider,
	Small,
	ButtonContainer,
} from "./LoginCard.styles";

const LoginCard = ({ successHandler }: LoginCardTypes) => {
	return (
		<Container onClick={(e) => e.stopPropagation()}>
			<Card>
				<Title>Welcome Back !</Title>
				<Subtitle>Login to continue to MoonDiary</Subtitle>
				<ButtonContainer>
					<GoogleLogin
						onSuccess={successHandler}
						theme="filled_black"
						size="large"
						text="signin_with"
						shape="pill"
						width="100%"
					/>
				</ButtonContainer>
				<Divider />
				<Small>Begin your cosmic journey with a single sign-in ✨</Small>
			</Card>
		</Container>
	);
};

export default React.memo(LoginCard);
