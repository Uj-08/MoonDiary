import { AuthorDetail, AuthorProfile, BlogAuthor, BlogData, BlogHeader, BlogTitle, CardDetails, Container, ImageContainer } from "./Card.styles"
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";

export interface DynamicCardTypes {
    blog: {
        _id: string
        authorEmail: string,
        authorName: string,
        authorPicture: string,
        blogData: string,
        blogTitle: string,
        blogImg: string,
        updatedAt: string
    }
}

export default function DynamicCard ({ blog }: DynamicCardTypes) {
    console.log(blog)
    const { _id, authorEmail, authorName, authorPicture, blogData, blogTitle, blogImg, updatedAt } = blog;
    const router = useRouter();

    function routeHandler() {
        router.push(`/blogs/${_id}`);
    }

    const formatter = new Intl.RelativeTimeFormat("en");
    let relTime;
    if(updatedAt) {
        const diff = new Date().getTime() - new Date(updatedAt).getTime();
        let diffTime = diff /(1000 * 60 * 60 * 24);
        if(diffTime > 1) {
            relTime = formatter?.format(-(diffTime.toPrecision(2)), "days");
        } else {
            diffTime = diff /(1000 * 60 * 60);
            relTime = formatter?.format(-(diffTime.toPrecision(2)), "hours");
        }
    }
    return (
        <Container onClick={routeHandler}>
            <ImageContainer>
                <Image src={blogImg || "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"} fill={true} alt={"card-hero-img"}/>
            </ImageContainer>
            <CardDetails>
                <BlogHeader>

                </BlogHeader>
                <BlogTitle>{blogTitle}</BlogTitle>
                <BlogData>{parse(blogData)}</BlogData>
                <BlogAuthor>
                    <AuthorProfile>
                        <Image src={authorPicture} fill={true} alt="profile"/>
                    </AuthorProfile>
                    <AuthorDetail>
                        <div>{authorName}</div>
                        <div>{relTime || "unknown"}</div>
                    </AuthorDetail>
                </BlogAuthor>
            </CardDetails>
        </Container>
    );
};