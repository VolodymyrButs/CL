export const toSnakeCase = (str: string): string =>
    str[0].toLowerCase() +
    str
        .slice(1, str.length)
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

export const keysToSnakeCase = (object: { [key: string]: unknown }) =>
    Object.keys(object).reduce(
        (newObject, key) => ({
            ...newObject,
            [toSnakeCase(key)]: object[key],
        }),
        {}
    )
