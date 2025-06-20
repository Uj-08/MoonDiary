import React from 'react'
import { Container, FlexWrapper } from './Features.styles'
import { FeaturesTypes } from './Features.types'
import FeatureCard from '@/components/FeatureCard/FeatureCard.component'

const Features = ({ tags }: FeaturesTypes) => {
    return (
        <Container>
          <FlexWrapper>
      {tags.map((tag) => (
        <FeatureCard key={tag._id} tag={tag} />
      ))}
    </FlexWrapper>
        </Container>
    )
}

export default React.memo(Features);