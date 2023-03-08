import { Container } from "./HeroSection.styles";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";


export default function HeroSection() {

    const [client, setClient] = useState(undefined);

    useEffect(() => {
        const token = getCookie("clientMD");
        if(token) {
            setClient(jwtDecode(token));
        }
    }, [])

    console.log(client)

    return (
        <Container>
            <h1>
                Welcome {client?.given_name ? (client?.given_name + ",") : ""} to MoonDiary !
            </h1>
        </Container>
    );
};