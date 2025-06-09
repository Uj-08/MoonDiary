import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
    border: 1px solid black;
    padding: 8px;
`;

const FeatureCard = ({
    tagData
}: {
    tagData: {
        name: string,
        blogIds: Array<string>
    }
}) => {
    return (
        <Container>
            <div>
                #{
                    tagData.name
                }
            </div>
            <span>
                {
                    tagData.blogIds.length
                }
            </span>
        </Container>
    )
}

export default FeatureCard;