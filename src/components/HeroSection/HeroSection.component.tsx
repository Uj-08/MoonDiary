import { Container } from "./HeroSection.styles";
import { useState, useEffect } from "react";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { COOKIE_NAME } from "@/helpers/constants";

export default function HeroSection() {

    const [client, setClient] = useState<{given_name: string}>();

    useEffect(() => {
        if(hasCookie(COOKIE_NAME)) {
            const cookie = getCookie(COOKIE_NAME);
            if(typeof(cookie) === "string"){
                setClient(jwtDecode(cookie))
            }
        }
    }, [])

    return (
        <Container>
            <h1>
                Welcome to MoonDiary{client?.given_name ? ("," + client?.given_name) : ""}!
            </h1>
        </Container>
    );
};