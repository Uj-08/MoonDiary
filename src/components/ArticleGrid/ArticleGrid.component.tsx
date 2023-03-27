 import { Container, Title, Grid } from "./ArticleGrid.styles";
 import Card from "../ArticleCard/Card.component";
 import DynamicCard from "../ArticleCard/DynamicCard.component";
import { Key } from "react";
 
 export default function ArticleGrid ({ blogs }: { blogs: any}) {
    return (
        <Container>
            <Title>
                Recent:
            </Title>
            <Grid>
                <Card/>
                {blogs.map((blog: { _id: string; authorEmail: string; authorName: string; authorPicture: string; blogData: string; blogTitle: string; date: string; }, idx: Key | null | undefined) => {
                    return (
                        <DynamicCard key={idx} blog={blog}/>
                    )
                })}
            </Grid>
        </Container>
    );
 }