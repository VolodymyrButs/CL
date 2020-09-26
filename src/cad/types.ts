export type OptionalString = undefined | string

export interface GenericElement<P> {
    id?: OptionalString
    objectType?: OptionalString
    points: P
    isApertureWall?: boolean
    balconyType?: OptionalString
    length?: number
}
export type WallPoints = [x1: number, y1: number, x2: number, y2: number]
export type WallType = GenericElement<WallPoints>
export function isWall(element: ElementType): element is WallType {
    return (
        (element as WallType).objectType === 'wall' &&
        (element as WallType).points.length === 4
    )
}

export type TubeType = GenericElement<[x1: number, y1: number, d: number]>
export function isTube(element: ElementType): element is TubeType {
    return (
        (element as TubeType).objectType === 'tube' &&
        (element as TubeType).points.length === 3
    )
}

export type MainDoorPoints = [
    x1: number,
    y2: number,
    h1: number,
    h2: number,
    h3: number
]
export type MainDoorType = GenericElement<MainDoorPoints>
export function isMainDoor(element: ElementType): element is MainDoorType {
    return (
        (element as MainDoorType).objectType === 'mainDoor' &&
        (element as MainDoorType).points.length === 5
    )
}

export type ApertureTypePoints = [number, number][]
export type ApertureType = GenericElement<ApertureTypePoints>
export function isAperture(element: ElementType): element is ApertureType {
    return (
        (element as ApertureType).objectType === 'aperture' &&
        (element as ApertureType).points.length === 10
    )
}

export type ApertureDoorType = GenericElement<ApertureTypePoints>
export function isApertureDoor(
    element: ElementType
): element is ApertureDoorType {
    return (
        (element as ApertureDoorType).objectType === 'apertureDoor' &&
        (element as ApertureDoorType).points.length === 10
    )
}

export type HeaterTypePoints = [
    p1: [number, number],
    p2: [number, number],
    p3: [number, number],
    p4: [number, number]
]
export type HeaterType = GenericElement<HeaterTypePoints>
export function isHeater(element: ElementType): element is HeaterType {
    return (element as HeaterType).objectType === 'heater'
}

export type VentType = GenericElement<
    [x1: number, y1: number, x2: number, y2: number, h: number]
>
export function isVent(element: ElementType): element is VentType {
    return (element as VentType).objectType === 'vent'
}

export type BalconyDoorType = GenericElement<[number, number][]>
export function isBalconyDoor(
    element: ElementType
): element is BalconyDoorType {
    return (element as BalconyDoorType).objectType === 'balconyDoor'
}

export type ElementType =
    | WallType
    | TubeType
    | MainDoorType
    | ApertureType
    | ApertureDoorType
    | HeaterType
    | VentType
    | BalconyDoorType
