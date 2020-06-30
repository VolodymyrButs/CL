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
    padding: 50px 30px;
    box-sizing: border-box;
    margin: 0 auto;
    height: auto;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        max-width: calc((100vw - 160px) * 0.6666);
        height: auto;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: calc((${displayWidth.desktop} - 160px) * 0.6666);
        max-height: 650px;
    }
    .slick-list {
        margin: 0 -5px;
    }
    .slick-slide > div {
        padding: 0 5px;
    }
`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SliderComponent = ({ children, ...props }: any) => {
    return (
        <CarouselWrapper {...props}>
            <Slider {...props}>{children}</Slider>
        </CarouselWrapper>
    )
}
