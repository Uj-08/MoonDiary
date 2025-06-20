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
} from "./LoginCard.styles";

const LoginCard = ({ successHandler }: LoginCardTypes) => {
    return (
        <Container onClick={(e) => e.stopPropagation()}>
            <Card>
                <Title>Welcome Back</Title>
                <Subtitle>Login to continue to MoonDiary</Subtitle>
                <GoogleLogin
  onSuccess={successHandler}
  theme="outline"         // or "filled_black"
  size="large"            // or "medium", "small"
  text="signin_with"      // or "continue_with", "signup_with"
  shape="pill"            // or "rectangular", "circle"
  width="100%"            // ensures full width inside your card
/>
                <Divider />
                <Small>
                    Begin your cosmic journey with a single sign-in ✨
                </Small>
            </Card>
        </Container>
    );
};

export default LoginCard;