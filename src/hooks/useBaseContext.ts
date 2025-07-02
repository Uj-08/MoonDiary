import { useContext } from "react";
import { BaseContext } from "@/containers/Base/Base";

export const useBaseContext = () => {
	const context = useContext(BaseContext);
	if (!context) throw new Error("useBaseContext must be used within BaseProvider");
	return context;
};
