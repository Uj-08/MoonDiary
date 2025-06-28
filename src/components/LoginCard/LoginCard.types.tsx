import { CredentialResponse } from "@react-oauth/google";

export interface LoginCardTypes {
	successHandler: (res: CredentialResponse) => void;
}
