import React from 'react'
import { Container, FlexWrapper, Title } from './Features.styles'
import { FeaturesTypes } from './Features.types'
import FeatureCard from '@/components/FeatureCard/FeatureCard.component'

const Features = ({ tags }: FeaturesTypes) => {
  return (
    <Container>
      <Title>Find blogs by tags.</Title>
      <FlexWrapper>
        {tags.map((tag) => (
          <FeatureCard key={tag._id} tag={tag} />
        ))}
      </FlexWrapper>
    </Container>
  )
}

export default React.memo(Features);