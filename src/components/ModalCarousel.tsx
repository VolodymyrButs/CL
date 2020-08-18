import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import Slider from 'react-slick'

import { Modal } from './Modal'
import { ProjectImages } from 'layout/Project'
import { displayWidth } from 'styles/width'
import { SlickNext, SlickPrevious } from 'components/SlickNavigation'

const ImageModal = styled(Img)`
    height: 95vh;
`
const SliderStyled = styled(Slider)`
    .slick-list {
        margin: 10px;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 -10px;
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
}

export const ModalCarousel: React.FC<IModalProps> = ({
    data,
    isModalOpen,
    closeHandler,
    initialSlideIndex,
}) => {
    const sliderSettings = {
        infinite: true,
        nextArrow: <SlickNext />,
        prevArrow: <SlickPrevious />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                },
            },
        ],
    }

    const slides = data.map(photo => (
        <div key={photo.childImageSharp.fluid.src}>
            <ImageModal
                fluid={photo.childImageSharp.fluid}
                imgStyle={{ objectFit: 'contain' }}
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
            <SliderStyled ref={sliderRef} {...sliderSettings}>
                {slides}
            </SliderStyled>
        </Modal>
    )
}
