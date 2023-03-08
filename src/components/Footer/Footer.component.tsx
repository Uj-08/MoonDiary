import { Footer } from "./Footer.styles"
import Image from "next/image"

export default function FooterComponent() {
    return (
        <Footer>
            <ul>
                <li>
                    <a href="#">
                        <Image src={"/facebook.png"} alt="social-links" fill={true}/>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image src={"/instagram.png"} alt="social-links" fill={true}/>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Image src={"/linkedin.png"} alt="social-links" fill={true}/>
                    </a>
                </li>
            </ul>
            <span>© MoonDiary 2023</span>
        </Footer>
    )
}