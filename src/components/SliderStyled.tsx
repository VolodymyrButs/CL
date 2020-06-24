import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CarouselWrapper = styled.div`
    background-color: ${colors.white};
    width: 100vw;
    height: calc(60vw + 100px);
    padding: 50px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.dark};
    margin: 0 auto;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        max-width: calc((100vw - 160px) * 0.6666);
        height: auto;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793.3px;
        max-height: 650px;
    }
`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SliderStyled = ({ children, ...props }: any) => {
    return (
        <CarouselWrapper>
            <Slider {...props}>{children}</Slider>
        </CarouselWrapper>
    )
}
