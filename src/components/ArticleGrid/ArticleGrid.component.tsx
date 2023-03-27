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
                {blogs.map((blog: any, idx: number) => {
                    return (
                        <DynamicCard key={idx} blog={blog}/>
                    )
                })}
            </Grid>
        </Container>
    );
 }