import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    svg {
        padding: 0 6px;
    }
`

interface IStarRatingProps {
    rating: number
    quantity: number
}

export const StarRating: React.FC<IStarRatingProps> = ({
    rating,
    quantity,
}) => {
    const arr = Array.from(Array(quantity), (_, i) => i + 1)
    return (
        <Wrapper>
            {arr.map(i => {
                if (i <= rating) {
                    return (
                        <svg
                            key={i}
                            viewBox="0 0 51 48"
                            width="18px"
                            height="18px"
                        >
                            <path
                                fill="rgb(35, 31, 32)"
                                className="widget"
                                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                            ></path>
                        </svg>
                    )
                } else if (i > rating && i - rating < 1) {
                    const ratio = Math.round((1 - (i - rating)) * 100)
                    const percent = `${ratio}%`
                    const id = `widgetGrad${i}`
                    const url = `url(#${id})`
                    return (
                        <svg
                            key={i}
                            viewBox="0 0 51 48"
                            width="18px"
                            height="18px"
                        >
                            <defs>
                                <linearGradient
                                    id={id}
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="rgb(35, 31, 32)"
                                    ></stop>
                                    <stop
                                        offset={percent}
                                        stopColor="rgb(35, 31, 32)"
                                    ></stop>
                                    <stop
                                        offset={percent}
                                        stopColor="rgb(203, 211, 227)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stopColor="rgb(203, 211, 227)"
                                    ></stop>
                                </linearGradient>
                            </defs>
                            <path
                                fill={url}
                                className="widget"
                                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                            ></path>
                        </svg>
                    )
                } else {
                    return (
                        <svg
                            key={i}
                            viewBox="0 0 51 48"
                            width="18px"
                            height="18px"
                        >
                            <path
                                fill="rgb(203, 211, 227)"
                                className="widget"
                                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                            ></path>
                        </svg>
                    )
                }
            })}
        </Wrapper>
    )
}
