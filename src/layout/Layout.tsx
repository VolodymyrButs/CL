import React from 'react'
import styled from 'styled-components'
import { Header } from 'blocks/Header/Header'

const LayoutWraper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`
const BlocksWrapper = styled.div`
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
            <BlocksWrapper>{props.children}</BlocksWrapper>
        </LayoutWraper>
    )
}
