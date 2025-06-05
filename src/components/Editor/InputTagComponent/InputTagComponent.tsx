import React, { useState, useRef } from "react";
import { TitleText } from "../Editor.styles";
import styled from "styled-components";

type TagType = { _id: string; name: string };

const Container = styled.div`
    position: relative;
`;

export const SuggestionWindow = styled.ul`
    position: absolute;
    top: calc(100% - 6px);
    left: 0;
    /* background: #fff; */
    width: 100%;
    z-index: 10;
    margin: 0;
    padding: 5px 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    backdrop-filter: blur(5px);
    padding: 10px 8px;
    box-shadow: rgb(0 0 0 / 20%) 0px 12px 28px 0px,
    rgb(0 0 0 / 10%) 0px 2px 4px 0px,
    rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    border-radius: 10px;
`;

export const Suggestion = styled.li`
    font-family: 'Montserrat', sans-serif;
    background-color: #fff;
    padding: 5px 10px; 
    cursor: pointer;
    box-shadow:
        rgb(0 0 0 / 10%) 0px 12px 28px 0px,
        rgb(0 0 0 / 5%) 0px 2px 4px 0px,
        rgb(255 255 255 / 2.5%) 0px 0px 0px 1px inset;
    border-radius: 10px;
    opacity: 0.7;
    transition: opacity 300ms linear;
    transition: box-shadow 300ms linear;
    :hover {
        opacity: 1;
        box-shadow: 
        rgb(0 0 0 / 20%) 0px 12px 28px 0px,
        rgb(0 0 0 / 10%) 0px 2px 4px 0px,
        rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    }
    :active {
        opacity: 1;
        box-shadow: 
            rgb(0 0 0 / 20%) 0px 12px 28px 0px,
            rgb(0 0 0 / 10%) 0px 2px 4px 0px,
            rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    }
`;

const InputTagComponent = ({ tags }: { tags: TagType[] }) => {
    const [tagsField, setTagsField] = useState(
        tags?.map((tag) => `#${tag.name}`).join(" ") || ""
    );
    const [suggestions, setSuggestions] = useState<TagType[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchSuggestions = (query: string) => {
        fetch(`/api/tags?search=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setSuggestions(data.tags || []);
                setShowSuggestions(true);
            })
            .catch(() => setSuggestions([]));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagsField(value);

        const regex = /#(\w+)$/;
        const result = regex.exec(value);

        if (result && result[1]) {
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
            <TitleText
                type="text"
                value={tagsField}
                onChange={handleChange}
                placeholder="Tags..."
            />

            {showSuggestions && suggestions.length > 0 && (
                <SuggestionWindow>
                    {suggestions.map((tag) => (
                        <Suggestion
                            key={tag._id}
                            onClick={() => insertTag(tag.name)}
                        >
                            #{tag.name}
                        </Suggestion>
                    ))}
                </SuggestionWindow>
            )}
        </Container>
    );
};

export default InputTagComponent;