import { Container } from "./HeroSection.styles";
import { useState, useEffect } from "react";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";


export default function HeroSection() {

    const [client, setClient] = useState<{given_name: string}>();

    useEffect(() => {
        if(hasCookie("clientMD")) {
            const cookie = getCookie("clientMD");
            if(typeof(cookie) === "string"){
                setClient(jwtDecode(cookie))
            }
        }
    }, [])

    console.log(client)

    return (
        <Container>
            <h1>
                Welcome to MoonDiary{client?.given_name ? ("," + client?.given_name) : ""}!
            </h1>
        </Container>
    );
};