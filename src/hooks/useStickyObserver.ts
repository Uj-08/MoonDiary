import { useEffect, useRef, useState } from "react";

export const useStickyObserver = () => {
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		if (!sentinelRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
			}
		);

		observer.observe(sentinelRef.current);

		return () => observer.disconnect();
	}, []);

	return { sentinelRef, isSticky };
};
