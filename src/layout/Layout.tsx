import React from 'react'
import styled from 'styled-components'
import { Header } from 'blocks/Header/Header'
import { Footer } from 'blocks/Footer'

const LayoutWraper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
`
const BlocksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 80px;
    bottom: 0;
    overflow-y: auto;
    box-sizing: content-box;
`

export const Layout = (props: { children: React.ReactNode }) => {
    return (
        <LayoutWraper>
            <Header />
            <BlocksWrapper>
                <div>{props.children}</div>
                <Footer />
            </BlocksWrapper>
        </LayoutWraper>
    )
}
