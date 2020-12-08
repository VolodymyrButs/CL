import fetch from 'node-fetch'
import { getCID, getFBValidLink } from 'tracking'

export const sendForm = (
    formName: string,
    formData: object,
    placement?: string
) => {
    const place = placement ? placement : ''
    return fetch(process.env.GATSBY_SEND_FORM_URL as string, {
        method: 'POST',
        body: JSON.stringify({
            ...formData,
            formName,
            place,
            cid: getCID(),
            fbpLink: getFBValidLink(),
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((response) => {
        return response.json()
    })
}
