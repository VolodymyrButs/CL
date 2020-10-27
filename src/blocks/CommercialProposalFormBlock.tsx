import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Container } from 'components/Container'
import { DefaultFormHero } from './DefaultFormHero'
import Proposal from 'assets/icons/proposal.svg'
import Pensile from 'assets/icons/pensile.svg'
import Handshake from 'assets/icons/handshake.svg'
import { ComercialForm } from 'components/form/CommercialForm'

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background-color: ${backgroundColors.formPromo};
    width: 100%;
    ${mobileAfterBorder};
    border-bottom: 1px solid ${colors.dark};
`

const FormTitle = styled.div<{ text?: boolean }>`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;

    line-height: 32px;
    letter-spacing: 1px;
    ${({ text }) =>
        text === true
            ? `color:${colors.dark};font-size: 24px;`
            : `color: #437b13;font-size: 32px;`}

    text-align: center;
    margin: 40px 0 24px;
    white-space: pre-wrap;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 60px 0 24px;
        width: 350px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 100%;
    }
`
const svgStyle = css`
    width: 20px;
    min-width: 20px;
    margin-right: 10px;
`
const HandshakeS = styled(Handshake)`
    ${svgStyle}
`
const PensileS = styled(Pensile)`
    ${svgStyle}
`
const ProposalS = styled(Proposal)`
    ${svgStyle}
`
const FormColumn = styled.div`
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    h3 {
        display: flex;
        align-items: center;
        font-size: 20px;
        line-height: 24px;
        margin: 10px 0;
    }
`
const DivS = styled.div`
    margin-bottom: 30px;
`

export const CommercialProposalFormBlock = ({
    text,
    placement,
}: {
    text?: boolean
    placement?: string
}) => {
    const { t } = useTranslation()

    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <DefaultFormHero image />
                <FormColumn>
                    <FormTitle text={text}>
                        {text
                            ? t('ComercialProposalTitle')
                            : t('ComercialProposalFormTitle')}
                    </FormTitle>
                    {!text && (
                        <DivS>
                            <h3>
                                <PensileS />
                                {t('comercialForm.example')}
                            </h3>
                            <h3>
                                <HandshakeS /> {t('comercialForm.conditions')}
                            </h3>
                            <h3>
                                <ProposalS /> {t('comercialForm.proposal')}
                            </h3>
                        </DivS>
                    )}
                    <ComercialForm placement={placement} />
                </FormColumn>
            </Container>
        </FormWrapper>
    )
}
