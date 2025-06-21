import React from 'react'
import { AboutCard, Author, AuthorBio, AuthorName, AuthorProfile, Container } from './About.styles';
import ShimmerImageComponent from '@/components/ImageComponent/ShimmerImage.component';
import { AboutTypes } from './About.types';

const About = ({}: AboutTypes) => {
    return (
        <Container>
            <AboutCard>
                <Author>
                    <AuthorProfile>
                        <ShimmerImageComponent
                            src={"https://old-moondiary.netlify.app/img/pro.jpg"}
                            aspectRatio={1}
                            alt={"profile"}
                        />
                    </AuthorProfile>
                    <AuthorName>{"Shairee Sinha"}</AuthorName>
                </Author>
                <AuthorBio>
                    {
                        "Rolling in and out of Hindu college with my degree in English literature wasn’t enough to curb my craving for expression. Pursuing and juggling various creative skills like dancing, music and theatre has broadened my interests and passion to look out for the next new lesson. Forever trying to wrap my head around this perpetual tease called existence."
                    }
                </AuthorBio>
            </AboutCard>
        </Container>
    )
}

export default React.memo(About);