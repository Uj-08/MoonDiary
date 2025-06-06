import { Footer } from "./Footer.styles"
import Image from "next/image"

export default function FooterComponent() {
    return (
        <Footer>
            <ul>
                <li>
                    <a href="mailto:psykidbiz@gmail.com">
                        <Image src={"/gmail.png"} alt="social-links" fill={true}/>
                    </a>
                </li>
                <li>
                    <Image src={"/logo.png"} alt="social-links" fill={true}/>
                </li>
                <li>
                    <a href="https://www.instagram.com/shaireee_67/">
                        <Image src={"/instagram.png"} alt="social-links" fill={true}/>
                    </a>
                </li>
                {/* <li>
                    <a href="#">
                        <Image src={"/linkedin.png"} alt="social-links" fill={true}/>
                    </a>
                </li> */}
            </ul>
            <span>© MoonDiary 2025</span>
        </Footer>
    )
}