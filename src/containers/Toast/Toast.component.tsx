import React from "react";
import { useMountAnimation } from "@/hooks/useMountAnimation";
import { ToastContainer } from "./Toast.styles";
import { ToastTypes } from "./Toast.types";

const Toast = ({ show, message, isError }: ToastTypes) => {
	const { shouldRender, visible, onTransitionEnd } = useMountAnimation({
		isActive: show,
		minVisibleTime: 500,
	});

	if (!shouldRender) return null;

	return (
		<ToastContainer isError={isError} visible={visible} onTransitionEnd={onTransitionEnd}>
			{message}
		</ToastContainer>
	);
};

export default React.memo(Toast);
