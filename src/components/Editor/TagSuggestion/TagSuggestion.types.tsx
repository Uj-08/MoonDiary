import { TagType } from "@/types/tag";
import { Dispatch, SetStateAction } from "react";

export interface TagSuggestionTypes { tags?: TagType[], setTagsArr: Dispatch<SetStateAction<string[]>> }