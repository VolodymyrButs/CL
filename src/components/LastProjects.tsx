import React from 'react'
import { Container } from 'components/Container'
import { WorksProjectItem } from 'blocks/Works/WorksProjectItem'
import styled from 'styled-components'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { useTranslation } from 'react-i18next'
import { ProjectData } from '../layout/Project'

const LastProjectsWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    border-top: 1px solid ${colors.dark};
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`
const LastProjectsTopWrapper = styled(LastProjectsWrapper)`
    border-bottom: none;
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 80px;
        background-color: ${colors.white};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${backgroundColors.project};
    }
`
const ProjectColumn = styled.div`
    height: 500px;
    background-color: ${backgroundColors.project};
    :last-child {
        background-color: ${colors.white};
        outline: 1px solid ${colors.dark};
    }
`
const ColorBlock = styled.div`
    background-color: ${backgroundColors.project};
    outline: 1px solid ${colors.dark};
`
const TitleBlock = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    letter-spacing: 1.58118px;
    padding: 48px 40px;
    text-align: left;
    background-color: ${colors.white};
    outline: 1px solid ${colors.dark};
`
export const LastProjects = ({
    data,
}: {
    data: {
        edges: {
            node: ProjectData
        }[]
    }
}) => {
    const { t, i18n } = useTranslation()
    const firstWork = data.edges[0].node
    const secondWork = data.edges[1].node
    return (
        <>
            <LastProjectsTopWrapper>
                <LeftSidebar />
                <Container columns={'1fr'} tabletColumns={'2fr 1fr'}>
                    <TitleBlock>{t('lastProjects')}</TitleBlock>
                    <ColorBlock></ColorBlock>
                </Container>
                <RightSidebar />
            </LastProjectsTopWrapper>
            <LastProjectsWrapper>
                <Container columns={'1fr'} tabletColumns={'2fr 1fr'}>
                    <ProjectColumn>
                        <WorksProjectItem
                            image={firstWork.previewImage.landscape}
                            description={firstWork[i18n.language].name}
                            link={firstWork.parent.name}
                        />
                    </ProjectColumn>
                    <ProjectColumn>
                        <WorksProjectItem
                            image={secondWork.previewImage.portrait}
                            description={secondWork[i18n.language].name}
                            link={secondWork.parent.name}
                        />
                    </ProjectColumn>
                </Container>
            </LastProjectsWrapper>
        </>
    )
}
