import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button } from 'components/Button'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { sendEvent } from 'tracking'
const Wrapper = styled.div`
    position: relative;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    border-top: 1px solid ${colors.dark};
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
    @media (min-width: ${displayWidth.desktop}) {
        border-top: none;
    }
`
const ContainerStyled = styled.div`
    max-width: 1190px;
    border: 1px solid ${colors.dark};
    margin: 0px auto;
    border-top: none;
    border-bottom: none;
    display: flex;
    justify-content: center;
`
const ButtonDesktop = styled(Button)`
    display: none;
    width: 750px;
    margin: 30px auto;
    background-color: white;
    color: ${colors.dark};
    @media (min-width: ${displayWidth.desktop}) {
        display: block;
    }
`
const ButtonMobile = styled(Button)`
    background-color: white;
    color: ${colors.dark};
    margin: 30px auto;
    padding: 15px;
    height: 82px;
    font-weight: bold;
    font-size: 15px;
    @media (min-width: 350px) {
        width: 290px;
        padding: 15px 20px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        display: none;
    }
`
export const ShowMore = ({
    advantages3DIsVisible,
    setAdvantages3DIsVisible,
    advantagesServicesIsVisible,
    setAdvantagesServicesIsVisible,
    visualizationAdvantagesIsVisible,
    setVisualizationAdvantagesIsVisible,
}: {
    advantages3DIsVisible: boolean
    setAdvantages3DIsVisible: (arg: boolean) => void
    advantagesServicesIsVisible: boolean
    setAdvantagesServicesIsVisible: (arg: boolean) => void
    visualizationAdvantagesIsVisible: boolean
    setVisualizationAdvantagesIsVisible: (arg: boolean) => void
}) => {
    const { t } = useTranslation()
    const showMoreHandle = () => {
        if (
            !advantages3DIsVisible &&
            !advantagesServicesIsVisible &&
            !visualizationAdvantagesIsVisible
        ) {
            setAdvantagesServicesIsVisible(true)
            sendEvent('Click', {
                eventCategory: 'ShowMoreButtonPromo',
                placement: 'Promo',
                target: 'Color',
            })
            setTimeout(
                () =>
                    window!
                        .document!.getElementById('SelectionOfPaints')!
                        .scrollIntoView({
                            block: 'start',
                            behavior: 'smooth',
                        }),
                400
            )
        } else if (
            advantagesServicesIsVisible &&
            !advantages3DIsVisible &&
            !visualizationAdvantagesIsVisible
        ) {
            setAdvantages3DIsVisible(true)
            sendEvent('Click', {
                eventCategory: 'ShowMoreButtonPromo',
                placement: 'Promo',
                target: 'Project3d',
            })
            setTimeout(
                () =>
                    window!
                        .document!.getElementById('Project3D')!
                        .scrollIntoView({
                            block: 'start',
                            behavior: 'auto',
                        }),
                400
            )
        } else if (
            advantagesServicesIsVisible &&
            advantages3DIsVisible &&
            !visualizationAdvantagesIsVisible
        ) {
            setVisualizationAdvantagesIsVisible(true)
            sendEvent('Click', {
                eventCategory: 'ShowMoreButtonPromo',
                placement: 'Promo',
                target: 'Visualization3d',
            })
            setTimeout(
                () =>
                    window!
                        .document!.getElementById('visualization3d')!
                        .scrollIntoView({
                            block: 'start',
                            behavior: 'auto',
                        }),
                400
            )
        } else return
    }
    return (
        <Wrapper>
            {!visualizationAdvantagesIsVisible && (
                <ContainerStyled>
                    <ButtonDesktop onClick={showMoreHandle}>
                        {t('showPromo')} <b>{t('CL')}</b>
                    </ButtonDesktop>
                    <ButtonMobile onClick={showMoreHandle}>
                        {t('showPromoMobile')} <b>{t('CL')}</b>
                    </ButtonMobile>
                </ContainerStyled>
            )}
        </Wrapper>
    )
}
