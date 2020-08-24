export const getDataByLanguage = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    language: string = 'uk'
) => {
    const langData = data.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === language
        }
    ).node
    return langData
}
