export function download(filename: string, text: string) {
    const element = window.document.createElement('a')

    element.setAttribute(
        'href',
        `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
    )
    element.setAttribute('download', `${filename}.dxf`)

    element.style.display = 'none'
    window.document.body.appendChild(element)

    element.click()

    window.document.body.removeChild(element)
}
