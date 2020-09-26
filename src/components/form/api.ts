import fetch from 'node-fetch'
import { getCID } from 'tracking'

export const sendForm = (formName: string, formData: object) =>
    fetch(process.env.SEND_FORM_URL as string, {
        method: 'POST',
        body: JSON.stringify({
            ...formData,
            formName,
            cid: getCID(),
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((response) => {
        return response.json()
    })
