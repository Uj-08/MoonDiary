import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollDirection = (threshold = 10) => {
	const [scrolledDown, setScrolledDown] = useState(false);
	const lastScrollY = useRef(0);
	//if ticking is true, no new animation request is sent, idea is to throttle the updates to direction so that they happen
	//once per animation frame, because onScroll is triggered repeatedly.
	const ticking = useRef(false);

	const updateScrollDir = useCallback(() => {
		const scrollY = window.scrollY;

		//if the difference is not more than threshold then do nothing
		if (Math.abs(scrollY - lastScrollY.current) < threshold) {
			//reset ticking
			ticking.current = false;
			return;
		}

		//else set direction, true = down, false = up
		setScrolledDown(scrollY > lastScrollY.current);
		lastScrollY.current = scrollY > 0 ? scrollY : 0;
		//reset ticking
		ticking.current = false;
	}, [threshold]);

	useEffect(() => {
		const onScroll = () => {
			if (!ticking.current) {
				//Run this function right before the next repaint (frame), in sync with the display refresh rate.
				window.requestAnimationFrame(updateScrollDir);
				//set ticking to true to throttle animations
				ticking.current = true;
			}
		};

		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, [updateScrollDir]);

	return scrolledDown;
};
