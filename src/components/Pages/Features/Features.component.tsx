import React from 'react'
import { Container, Grid } from './Features.styles'
import { FeaturesTypes } from './Features.types'
import FeatureCard from '@/components/FeatureCard/FeatureCard.component'

const Features = ({ tags }: FeaturesTypes) => {
    return (
        <Container>
            <Grid>
                {tags.map((tag, index) => <FeatureCard key={index} tag={tag} />)}
            </Grid>
        </Container>
    )
}

export default Features