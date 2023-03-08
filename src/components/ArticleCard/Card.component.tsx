import { AuthorDetail, AuthorProfile, BlogAuthor, BlogData, BlogHeader, BlogTitle, CardDetails, Container, ImageContainer } from "./Card.styles"
import Image from "next/image";
import { useRouter } from "next/router";

export default function Card () {
    const router = useRouter();
    function routeHandler() {
        router.push("/blogs");
    }
    return (
        <Container onClick={routeHandler}>
            <ImageContainer>
                <Image src="/card.jpeg" fill={true} alt={"card-hero-img"}/>
            </ImageContainer>
            <CardDetails>
                <BlogHeader>

                </BlogHeader>
                <BlogTitle>The Healing Experience</BlogTitle>
                <BlogData>Worldwide, as the number of external facilities grow and make sure of the fact that mankind is taken care of in every sense of the word. Minimizing time, effort and distance, this exponential emergence claims to refine the quality of life, but going to the core of the fact one would ask what does quality of life mean? And more importantly who determines this standard of quality? We as a naturally inquisitive species have invested ourselves in becoming the best version of ourselves to match the expectations of an increasingly intolerant society, the rat race seems like a mirage projecting a glorious struggle for perfection, but the flow from struggle to strife doesn’t take much time. The bed of roses soon turns into a bed of thorns. The constant search for fulfilment outside ourselves is definitely a frustrating experience yet something that is very normalised as we tend to live in this perpetual state of misery without noticing it. Pushing our tiny selves against the whole wide world we forget the simple fact that we are a part of the same world!</BlogData>
                <BlogAuthor>
                    <AuthorProfile>
                        <Image src="/pro-full.jpeg" fill={true} alt="profile"/>
                    </AuthorProfile>
                    <AuthorDetail>
                        <div>Shairee Sinha</div>
                        <div>3y ago</div>
                    </AuthorDetail>
                </BlogAuthor>
            </CardDetails>
        </Container>
    );
};