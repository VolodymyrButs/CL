import React from 'react'
import styled from 'styled-components'

import { displayWidth } from 'styles/width'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Next from 'assets/icons/arrowRight.svg'
import Previous from 'assets/icons/arrowLeft.svg'
import { colors } from 'styles/colors'

const CarouselWrapper = styled.div`
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
    height: auto;
    padding: 16px 32px 26px;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.6666);
        height: auto;
        padding: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: calc((${displayWidth.desktop} - 160px) * 0.6666);
        max-height: 711px;
    }
    .slick-list {
        margin: 0 -16px;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 -30px;
        }
    }
    .slick-slide > div {
        margin: 0 16px;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 30px;
        }
    }
    .slick-prev {
        left: 0;
    }
    .slick-next {
        right: 0;
    }
    .slick-dots {
        bottom: -22px;
        left: 0;
        @media (min-width: ${displayWidth.tablet}) {
            bottom: 5px;
        }
    }
`
const NextArrow = styled(Next)`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    z-index: 4;
    border: 1px solid ${colors.white};
    border-radius: 15px;
    @media (min-width: ${displayWidth.desktop}) {
        border-radius: 22.5px;
        width: 45px;
        height: 45px;
        margin-right: 45px;
    }
`
const PreviousArrow = styled(Previous)`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    z-index: 4;
    border: 1px solid ${colors.white};
    border-radius: 15px;
    @media (min-width: ${displayWidth.desktop}) {
        width: 45px;
        height: 45px;
        margin-left: 45px;
        border-radius: 22.5px;
    }
`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SliderComponent = ({ children, ...props }: any) => {
    const settings = {
        nextArrow: <NextArrow />,
        prevArrow: <PreviousArrow />,
    }
    return (
        <CarouselWrapper {...props}>
            <Slider {...settings} {...props}>
                {children}
            </Slider>
        </CarouselWrapper>
    )
}
