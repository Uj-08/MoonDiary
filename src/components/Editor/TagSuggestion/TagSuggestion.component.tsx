import React, { useState, useRef, useEffect } from "react";
import { TitleText } from "../Editor.styles";
import { TagType } from "@/types/tag";
import { TagSuggestionTypes } from "./TagSuggestion.types";
import { Container, Suggestion, SuggestionWindow } from "./TagSuggestion.styles";

const TagSuggestion = ({ tags, setTagsArr }: TagSuggestionTypes) => {
	const [tagsField, setTagsField] = useState(tags?.map((tag) => `#${tag.name}`).join(" ") ?? "");
	const [suggestions, setSuggestions] = useState<TagType[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const tagsArray = tagsField
			.split(" ")
			.filter((tag) => tag.startsWith("#"))
			.map((tag) => tag.slice(1));

		setTagsArr(tagsArray);
	}, [tagsField, setTagsArr]);

	const fetchSuggestions = (query: string) => {
		fetch(`/api/tags?search=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setSuggestions(data.tags ?? []);
				setShowSuggestions(true);
			})
			.catch(() => setSuggestions([]));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setTagsField(value);

		const regex = /#(\w+)$/;
		const result = regex.exec(value);

		if (result?.[1]) {
			const partialTag = result[1];

			if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

			debounceTimeout.current = setTimeout(() => {
				fetchSuggestions(partialTag);
			}, 300);
		} else {
			setShowSuggestions(false);
			setSuggestions([]);
		}
	};

	const insertTag = (tagName: string) => {
		const updated = tagsField.replace(/#(\w+)$/, `#${tagName} `);
		setTagsField(updated);
		setSuggestions([]);
		setShowSuggestions(false);
	};

	return (
		<Container>
			<TitleText type="text" value={tagsField} onChange={handleChange} placeholder="#Tags" />

			{showSuggestions && suggestions.length > 0 && (
				<SuggestionWindow>
					{suggestions.map((tag) => (
						<Suggestion key={tag._id.toString()} onClick={() => insertTag(tag.name)}>
							#{tag.name}
						</Suggestion>
					))}
				</SuggestionWindow>
			)}
		</Container>
	);
};

export default React.memo(TagSuggestion);
