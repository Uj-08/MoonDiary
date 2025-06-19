import { useCallback, useEffect, useState } from "react";
import { Tagline } from "./RotatingTagline.styles";
import { RotatingTaglineTypes } from "./RotatingTagline.types";

const FADE_DURATION = 750;
const ROTATE_INTERVAL = 5000;

const RotatingTagline: React.FC<RotatingTaglineTypes> = ({
    taglines,
    name,
}) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState<"in" | "out">("in");

    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % taglines.length);
    }, [taglines.length]);

    useEffect(() => {
        const handleRotate = () => {
            setFade("out");
            setTimeout(() => {
                updateIndex();
                setFade("in");
            }, FADE_DURATION);
        };

        const interval = setInterval(handleRotate, ROTATE_INTERVAL);
        return () => clearInterval(interval);
    }, [taglines.length, updateIndex]);

    let text = taglines[index];
    if (name) {
        text += `,${name}`;
    }
    text += "!";

    return <Tagline $fade={fade}>{text}</Tagline>;
};

export default RotatingTagline;
