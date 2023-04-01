 import { Container, Title, Grid } from "./ArticleGrid.styles";
 import PostCard from "../ArticleCard/PostCard.component";
 import DynamicCard from "../ArticleCard/DynamicCard.component";
import { Key } from "react";
 
 export default function ArticleGrid ({ blogs }: { blogs: any}) {
    return (
        <Container>
            <Title>
                Recent:
            </Title>
            <Grid>
                {/* <Card/> */}
                {blogs.map((blog: any, idx: number) => {
                    return (
                        <DynamicCard key={idx} blog={blog}/>
                    )
                })}
                <PostCard />
            </Grid>
        </Container>
    );
 }