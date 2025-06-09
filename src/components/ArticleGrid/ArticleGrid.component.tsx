import { useEffect, useState } from "react";
import { Container, Title, Grid } from "./ArticleGrid.styles";
import PostCard from "../Blog/AddPostButton";
import DynamicCard from "../ArticleCard/DynamicCard.component";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import React from "react";

const ArticleGrid = ({ blogs }: { blogs: any }) => {
  const [client, setClient] = useState<{ email: string }>();

  useEffect(() => {
    if (hasCookie("clientMD")) {
      const cookie = getCookie("clientMD");
      if (typeof cookie === "string") {
        setClient(jwtDecode(cookie));
      }
    }
  }, []);

  return (
    <Container>
      <Grid>
        {blogs?.map((blog: any, idx: number) => {
          return (
            <DynamicCard key={idx} index={idx} blog={blog} clientEmail={client?.email} />
          );
        })}
      </Grid>
    </Container>
  );
}

export default React.memo(ArticleGrid);
