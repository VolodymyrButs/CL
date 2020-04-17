const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer')

const app = express()
const port = 8004
const contactAddress = 'wowabuz@gmail.com'
const mailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'volodymyrbuts01@gmail.com',
        pass: 'peptqoopvb',
    },
})
const formLabelByKey = {
    name: "Ім'я",
    phone: 'Телефон',
    email: 'Електронна адреса',
    message: 'Повідомлення',
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
                                <td>${bodyToHtml[key]}</td>
                            </tr>`
                })
                .join('')}</table>`,
        },
        // eslint-disable-next-line consistent-return
        function(err) {
            if (err) {
                return res.status(500).send(err)
            }
            return res.json({ success: true })
        }
    )
})
app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`App listening at http://localhost:${port}`)
)
