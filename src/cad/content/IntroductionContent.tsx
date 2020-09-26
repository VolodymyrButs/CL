import React from 'react'
import styled from 'styled-components'

import { accentDark } from 'cad/themes/accentDark'

const P = styled.p`
    font-size: 22px;
    margin: 5px 0;
    line-height: 26px;
    li {
        font-size: 18px;
    }
`

const A = styled.a`
    color: ${accentDark.color};
    text-decoration: none;
    margin-left: 5px;
    &:hover {
        text-decoration: underline;
    }
`

const H3 = styled.h3`
    font-size: 24px;
    line-height: 30px;
    margin: 5px 0;
`

const Ul = styled.ul`
    margin: 5px 20px;
`

const Li = styled.li`
    margin: 5px 20px;
    list-style: circle;
`

const email = 'obmer@clearline.com.ua'

// const youtubeId = 'BkMlIY5Gq8o'

// const Video = () => (
//     <div
//         style={{
//             position: 'relative',
//             paddingBottom: '56.25%' /* 16:9 */,
//             paddingTop: 25,
//             height: 0,
//         }}
//     >
//         <iframe
//             title="video-instruction"
//             style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//             }}
//             src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
//             frameBorder="0"
//             allowFullScreen
//         />
//     </div>
// )

const IntroductionContentEN = () => (
    <>
        <H3>Create an apartment drawing for your project design</H3>

        <Ul>
            <Li>free</Li>

            <Li>without registration</Li>

            <Li>on your smartphone</Li>

            <Li>for rectangular rooms</Li>
        </Ul>

        <H3>Measure the room</H3>

        <P>Take each room&apos;s dimensions.</P>

        <H3>Draw each room in the editor one by one</H3>

        <H3>Add entrance room</H3>

        <P>
            <Li>
                The process begins with adding the <b>entrance door</b>
            </Li>

            <Li>
                Next, draw starting from the <b>door</b> to the right, selecting
                the direction of the walls using arrows and setting their size.
                You need to add every <b>wall</b> of the entrance room
            </Li>

            <Li>
                Close the entrance room outline - connect the last <b>wall</b>{' '}
                with the left edge of the <b>entrance door</b>
            </Li>
        </P>

        <H3>Add other rooms</H3>

        <P>
            <Li>
                Once you&apos;ve created the <b>entrance room</b> you can add{' '}
                <b>inner doors</b>
            </Li>

            <Li>
                Click on the <b>Inner Doors</b> tool and select the <b>wall</b>{' '}
                on which they should be located
            </Li>

            <Li>
                Once you add <b>Interior Doors</b> it is possible to draw the
                next room
            </Li>

            <Li>
                Draw it, <b>close the outline</b> and add the following{' '}
                <b>rooms</b>
                using the same principle
            </Li>
        </P>

        <H3>Add windows, ventilation, radiators, etc.</H3>

        <P>
            <Li>
                After you&apos;ve added every room, you can add other objects,
                picking them on the panel to the left
            </Li>
        </P>
        {/* <Video /> */}

        <H3>Save the drawing</H3>

        <P>
            Click on the “Save Drawing” button and get a drawing file. Send the{' '}
            file to the e-mail <A href={`mailto:${email}`}>{email}</A>
        </P>
    </>
)

const IntroductionContentUK = () => (
    <>
        <H3>Створіть креслення квартири для дизайн проекту</H3>

        <Ul>
            <Li>безкоштовно</Li>

            <Li>без реєстрації</Li>

            <Li>на смартфоні</Li>

            <Li>для приміщень прямокутної форми</Li>
        </Ul>

        <H3>Обміряйте приміщення</H3>

        <P>Зніміть по черзі розміри кожної кімнати.</P>

        <H3>
            Накресліть в редакторі кожну кімнату по черзі, почавши з передпокою
        </H3>

        <H3>Додавання передпокою</H3>

        <P>
            <Li>
                Процес починається з додавання <b>вхідних дверей</b>
            </Li>

            <Li>
                Далі, кресліть від <b>дверей</b> праворуч, обираючи стрілками
                напрямок стін та вказуючи їх розміри. Потрібно додати усі{' '}
                <b>стіни</b> передпокою
            </Li>

            <Li>
                Замкніть периметр передпокою - з&apos;єднайте останню{' '}
                <b>стіну</b> з лівим краєм <b>вхідних дверей</b>
            </Li>
        </P>

        <H3>Додавання інших кімнат</H3>

        <P>
            <Li>
                Після того, як ви створили <b>передпокій</b> у вас
                з&apos;являється можливість додати <b>міжкімнатні двері</b>
            </Li>

            <Li>
                Клацніть на значок <b>Міжкімнатні двері</b> на панелі ліворуч та
                оберіть <b>стіну</b> на якій вони повинні розташовуватись
            </Li>

            <Li>
                Після того, як ви додати <b>Міжкімнатні двері</b> у вас
                з’являється можливість накреслити наступну кімнату
            </Li>

            <Li>
                Накресліть її, <b>замкніть периметр</b> цієї кімнати і додавайте
                наступні <b>кімнaти</b> за таким же принципом
            </Li>
        </P>

        <H3>Додайте вікна, витяжку, радіатори, тощо</H3>

        <P>
            <Li>
                Після того, як всі кімнати накреслені, Ви можете додавати інші
                об&apos;єкти, обираючи на панелі ліворуч необхідні елементи
            </Li>
        </P>

        {/* <Video /> */}

        <H3>Збережіть креслення</H3>

        <P>
            Натисніть на кнопку «Зберегти Креслення» та отримаєте файл
            креслення. Надішліть файл на пошту{' '}
            <A href={`mailto:${email}`}>{email}</A>
        </P>
    </>
)

const IntroductionContentRU = () => (
    <>
        <H3>Создайте чертеж квартиры для дизайн проекта</H3>

        <Ul>
            <Li>бесплатно</Li>

            <Li>без регистрации</Li>

            <Li>доступно на смартфоне</Li>

            <Li>для помещений с прямыми углами</Li>
        </Ul>

        <H3>Обмерьте помещение</H3>

        <P>Снимите поочередно размеры каждой комнаты.</P>

        <H3>
            Нарисуйте в редакторе каждую комнату по очереди, начиная с прихожей
        </H3>

        <H3>Добавление прихожей</H3>

        <P>
            <Li>
                Процесс начинается с добавления <b>входной двери</b>
            </Li>

            <Li>
                Далее, чертите от <b>двери</b> вправо, выбирая стрелками
                направления стен и задавая их размеры. Нужно добавить все{' '}
                <b>стены</b> прихожей
            </Li>

            <Li>
                Замкните периметр прихожей - соедините последнюю <b>стену</b> с
                левым краем <b>входной двери</b>
            </Li>
        </P>

        <H3>Добавление других комнат</H3>

        <P>
            <Li>
                После того, как вы создали <b>прихожую</b> у вас появляется
                возможность добавить <b>межкомнатные двери</b>.
            </Li>

            <Li>
                Кликните на значок <b>Межкомнатные двери</b> на панели слева и
                выберите <b>стену</b> на которой они должны находиться
            </Li>

            <Li>
                После того, как вы добавили <b>Межкомнатные двери</b> у вас
                появляется возможность начертить следуюцую комнату
            </Li>

            <Li>
                Начертите ее, <b>замкните периметр</b> этой комнаты и добавляйте
                следующие <b>кoмнaты</b> по такому же принципу
            </Li>
        </P>

        <H3>Добавьте окна, вытяжку, радиаторы и т.д.</H3>

        <P>
            <Li>
                После того, как все комнаты начерчены, Bы можете добавлять
                другие объекты, выбрав на панели слева необходимые елементы
            </Li>
        </P>
        {/* <Video /> */}

        <H3>Сохраните чертеж</H3>

        <P>
            Нажмите на кнопку «Сохранить Чертеж» и получите файл чертежа.
            Отправьте файл на почту<A href={`mailto:${email}`}>{email}</A>
        </P>
    </>
)

export const introductionContent = (data: string) => {
    switch (data) {
        case 'en': {
            return IntroductionContentEN
        }
        case 'uk': {
            return IntroductionContentUK
        }
        case 'ru': {
            return IntroductionContentRU
        }
        default:
            return IntroductionContentRU
    }
}
