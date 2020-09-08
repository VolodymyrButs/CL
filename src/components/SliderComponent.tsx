import React from 'react'
import styled from 'styled-components'

import { displayWidth } from 'styles/width'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SlickNext, SlickPrevious } from 'components/SlickNavigation'

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
        max-height: 600px;
    }
    .slick-list {
        margin: 0 -16px;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 -30px;
        }
    }
    img {
        cursor: grab;
    }
    .slick-slide > div {
        margin: 0 16px;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 30px;
        }
    }
    .slick-dots {
        bottom: -22px;
        left: 0;

        @media (min-width: ${displayWidth.tablet}) {
            bottom: 5px;
        }
        li {
            width: 10px;
            button {
                width: 10px;
                ::before {
                    width: 10px;
                }
            }
        }
    }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SliderComponent = ({ children, ...props }: any) => {
    const settings = {
        nextArrow: <SlickNext />,
        prevArrow: <SlickPrevious />,
    }
    return (
        <CarouselWrapper {...props}>
            <Slider {...settings} {...props}>
                {children}
            </Slider>
        </CarouselWrapper>
    )
}
