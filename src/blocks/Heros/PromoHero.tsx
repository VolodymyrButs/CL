import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'

import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import { JumpingArrow } from 'components/JumpingArrow'
import { Button } from 'components/Button'
import LampIcon from 'assets/icons/Lamp.svg'
import i18n from 'i18n/config'

const PromoHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid ${colors.dark};
    background-color: ${backgroundColors.promotion};
    align-items: flex-end;
    :before {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: inherit;
        content: '';
    }
`
const PromoHeroColumn = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    outline: 1px solid ${colors.dark};
`
export const PromoHero = () => {
    const { t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allPromoHeroYaml {
                edges {
                    node {
                        title
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)
    const promoHeroData = data.allPromoHeroYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    return (
        <PromoHeroWraper>
            <Container columns={'1fr 1fr 1fr'}>
                <PromoHeroColumn>
                    <h2>{promoHeroData.title}</h2>
                    <Button>{t('learnMore')}</Button>
                    <JumpingArrow />
                </PromoHeroColumn>
                <PromoHeroColumn>{promoHeroData.title}</PromoHeroColumn>
                <PromoHeroColumn>
                    <LampIcon />
                </PromoHeroColumn>
            </Container>
        </PromoHeroWraper>
    )
}
