const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
require('dotenv').config({
    path: `.env.${activeEnv}`,
})

const app = express()
const contactAddress = 'wowabuz@gmail.com'

const mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'cl.dev.analytics@gmail.com',
        pass: '28nkdsfg89{ED[ewpn4w}e9',
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
})

mailer.verify(function(error) {
    if (error) {
        // eslint-disable-next-line no-console
        console.error('Error while trying to access SMTP')
        // eslint-disable-next-line no-console
        console.error(error)
    } else {
        // eslint-disable-next-line  no-console
        console.log('Server is ready to take our messages')
    }
})

const formLabelByKey = {
    name: "Ім'я",
    phone: 'Телефон',
    email: 'Електронна адреса',
    message: 'Повідомлення',
    homeType: 'Тип помещения',
    roomSize: 'Площа',
    availabilityDrawings: 'Наличие чертежа',
}
const formValueByKey = {
    yesDrawing: 'Померил и начертил',
    noDrawing1: 'Не мерил и не чертил',
    noDrawing2: 'Померил но не начертил',
    flat: 'Квартира',
    house: 'Дом, таунхаус, коттедж',
    comercialBuilding: 'Нежилое помещение',
}
app.use(bodyParser.json())

app.post('/send-form', function(req, res) {
    const { formName, ...bodyToHtml } = req.body
    mailer.sendMail(
        {
            to: [contactAddress],
            subject: formName || '[No subject]',
            html: `<table cellspacing="2" border="1" cellpadding="5"> ${Object.keys(
                bodyToHtml
            )
                .map(key => {
                    return `
                            <tr>
                                <th align="left">${
                                    key in formLabelByKey
                                        ? formLabelByKey[key]
                                        : key
                                }</th>
                                <td>${
                                    bodyToHtml[key] in formValueByKey
                                        ? formValueByKey[bodyToHtml[key]]
                                        : bodyToHtml[key]
                                }</td>
                            </tr>`
                })
                .join('')}</table>`,
        },
        // eslint-disable-next-line consistent-return
        function(err) {
            if (err) {
                return res.json({ success: false })
            }
            return res.json({ success: true })
        }
    )
})
app.listen(process.env.API_PORT, () =>
    // eslint-disable-next-line no-console
    console.log(
        `App listening at http://${process.env.API_URL}${process.env.API_PORT}`
    )
)
