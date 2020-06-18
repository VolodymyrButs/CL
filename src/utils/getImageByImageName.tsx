export const getImageByImageName = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    image: string = 'ua'
) => {
    return data.edges.find(
        (elem: { node: { fluid: { originalName: string } } }) => {
            return elem.node.fluid.originalName === image
        }
    ).node
}
