"use client";
import React from "react";
import {
	LogoContainer,
	Wrapper,
	NavLinks,
	SocialLinks,
	HamburgerButton,
	Profile,
	NavLink,
	SocialLink,
	InstagramIcon,
	ProfileIcon,
	HamburgerIcon,
	EmailIcon,
} from "./Navbar.styles";
import NavbarTypes from "./Navbar.types";
import Image from "next/image";
import ImageComponent from "../ImageComponent/ShimmerImage.component";
import Link from "next/link";
import logo from "public/logo.png";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const Navbar = ({ signInHandler, signedIn, picture, hmbgrClickHandler }: NavbarTypes) => {
	const scrolledDown = useScrollDirection(100);
	return (
		<Wrapper $scrolledDown={scrolledDown}>
			<LogoContainer>
				<Link href={"/"}>
					<Image src={logo} alt={"MoonDiary"} height={38} width={38} />
				</Link>
			</LogoContainer>
			<NavLinks>
				<Link href={"/"}>
					<NavLink>Home</NavLink>
				</Link>
				<Link href={"/features"}>
					<NavLink>Features</NavLink>
				</Link>
				<Link href={"/about-me"}>
					<NavLink>About Me</NavLink>
				</Link>
				<NavLink onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</NavLink>
			</NavLinks>
			<SocialLinks>
				<Link href="mailto:psykidbiz@gmail.com">
					<SocialLink>
						<EmailIcon className="social_icon" />
					</SocialLink>
				</Link>
				<Link href="https://www.instagram.com/shaireee_67/" target="_blank" rel="noreferrer">
					<SocialLink>
						<InstagramIcon className="social_icon" />
					</SocialLink>
				</Link>
				<Link href={"/profile"}>
					<SocialLink>
						{signedIn ? (
							<Profile>
								<ImageComponent aspectRatio={1} src={picture} alt="profile" />
							</Profile>
						) : (
							<ProfileIcon className="social_icon" />
						)}
					</SocialLink>
				</Link>
			</SocialLinks>
			<HamburgerButton onClick={hmbgrClickHandler}>
				<HamburgerIcon className="hamburger_icon" />
			</HamburgerButton>
		</Wrapper>
	);
};

export default React.memo(Navbar);
