export type Option = "published" | "drafts" | "liked";

export interface SwitchTypes {
	selected: Option;
	onChange: (option: Option) => void;
}
