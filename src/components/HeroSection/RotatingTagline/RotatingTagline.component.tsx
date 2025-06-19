import { useEffect, useState } from "react";
import { Tagline } from "./RotatingTagline.styles";
import { RotatingTaglineTypes } from "./RotatingTagline.types";

const RotatingTagline: React.FC<RotatingTaglineTypes> = ({ taglines, name }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState<"in" | "out">("in");

    useEffect(() => {
        const interval = setInterval(() => {
            setFade("out");
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % taglines.length);
                setFade("in");
            }, 750);
        }, 5000);

        return () => clearInterval(interval);
    }, [taglines.length]);

    const text = taglines[index] + (name ? `,${name}` : "") + "!";

    return <Tagline $fade={fade}>{text}</Tagline>;
};

export default RotatingTagline;