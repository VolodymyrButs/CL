import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import Slider from 'react-slick'

import { Modal } from './Modal'
import { ProjectImages } from 'layout/Project'
import { displayWidth } from 'styles/width'
import { SlickNext, SlickPrevious } from 'components/SlickNavigation'

const ImageModal = styled(Img)<{ fluid: FluidObject }>`
    height: 90vh;
    @media (min-width: ${displayWidth.desktop}) {
        height: 100%;
    }
`
const SliderStyled = styled(Slider)`
    height: 100%;
    .slick-list {
        height: 100%;
        margin: 0 -10px;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 -10px;
        }
        @media (min-width: ${displayWidth.desktop}) {
            div {
                height: 100%;
            }
        }
    }
    img {
        cursor: grab;
    }
`

interface IModalProps {
    closeHandler?: () => void
    data: ProjectImages[]
    isModalOpen: boolean
    initialSlideIndex: number
    setCurrentSlideS?: (arg: number) => void
}

export const ModalCarousel: React.FC<IModalProps> = ({
    data,
    isModalOpen,
    closeHandler,
    initialSlideIndex,
    setCurrentSlideS,
}) => {
    const sliderSettings = {
        infinite: true,
        nextArrow: <SlickNext modal={true} />,
        prevArrow: <SlickPrevious modal={true} />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                },
            },
        ],
    }

    const slides = data.map((photo) => (
        <div key={photo.childImageSharp.fluid.src}>
            <ImageModal
                fluid={photo.childImageSharp.fluid}
                imgStyle={{ objectFit: 'contain' }}
                alt={photo.childImageSharp.parent.name}
                title={photo.childImageSharp.parent.name}
            />
        </div>
    ))
    const sliderRef = useRef<Slider | null>(null)
    const slider = sliderRef.current
    useEffect(() => {
        if (slider !== null) {
            slider.slickGoTo(initialSlideIndex)
        }
    }, [initialSlideIndex, slider])
    return (
        <Modal isOpen={isModalOpen} closeHandler={closeHandler} image={true}>
            <SliderStyled
                ref={sliderRef}
                {...sliderSettings}
                afterChange={(current: number) => {
                    setCurrentSlideS !== undefined && setCurrentSlideS(current)
                }}
            >
                {slides}
            </SliderStyled>
        </Modal>
    )
}
