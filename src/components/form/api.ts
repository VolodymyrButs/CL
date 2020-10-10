import fetch from 'node-fetch'
import { getCID, getFBValidLink } from 'tracking'

export const sendForm = (formName: string, formData: object) =>
    fetch(process.env.SEND_FORM_URL as string, {
        method: 'POST',
        body: JSON.stringify({
            ...formData,
            formName,
            cid: getCID(),
            fbpLink: getFBValidLink(),
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((response) => {
        return response.json()
    })
