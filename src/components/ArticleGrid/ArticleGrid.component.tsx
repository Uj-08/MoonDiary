 import { Container, Title, Grid } from "./ArticleGrid.styles";
 import Card from "../ArticleCard/Card.component";
 
 export default function ArticleGrid () {
    return (
        <Container>
            <Title>
                Recent:
            </Title>
            <Grid>
                <Card/>
            </Grid>
        </Container>
    );
 }