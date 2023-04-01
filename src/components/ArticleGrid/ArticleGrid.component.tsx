import { useEffect, useState } from "react";
 import { Container, Title, Grid } from "./ArticleGrid.styles";
 import PostCard from "../ArticleCard/PostCard.component";
 import DynamicCard from "../ArticleCard/DynamicCard.component";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
 
 export default function ArticleGrid ({ blogs }: { blogs: any}) {

    const [client, setClient] = useState<{email: string}>();
    

    useEffect(() => {
        if(hasCookie("clientMD")) {
            const cookie = getCookie("clientMD");
            if(typeof(cookie) === "string"){
                setClient(jwtDecode(cookie))
            }
        }
    }, [])
    
    return (
        <Container>
            {/* <Title>
                Recent:
            </Title> */}
            <Grid>
                {/* <Card/> */}
                {blogs.map((blog: any, idx: number) => {
                    return (
                        <DynamicCard key={idx} blog={blog}/>
                    )
                })}
                {
                    client && (client?.email === "ujjwalpandey24@gmail.com" || "sinhashairee6@gmail.com") &&
                    <PostCard />
                }
            </Grid>
        </Container>
    );
 }