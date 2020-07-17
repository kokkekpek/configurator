import ValuesConfigInterface from '../config/ValuesConfigInterface'
import DirectoriesConfigInterface from '../config/DirectoriesConfigInterface'
import ObjectStringInterface from './interface/ObjectStringInterface'

export default class ValuesStorage {
    private static readonly _CFG: string = 'cfg'

    private static readonly _SHARP_COMMENT: string = '#'
    private static readonly _SLASH_COMMENT: string = '//'

    private readonly _items: ObjectStringInterface

    public constructor() {
        this._items = {}
    }
    
    public addValues(values: ValuesConfigInterface): void {
        for (const [key, value] of Object.entries(values)) {
            if (value === true || value === false)
                this._addBooleanValue(key, value)
            else
                this._addNotBooleanValue(key, value)
        }
    }

    public _addBooleanValue(key: string, value: boolean): void {
        const sharp: string = `${ValuesStorage._SHARP_COMMENT}{${ValuesStorage._CFG}.${key}}`
        const slash: string = `${ValuesStorage._SLASH_COMMENT}{${ValuesStorage._CFG}.${key}}`
        const noSharp: string = `${ValuesStorage._SHARP_COMMENT}{!${ValuesStorage._CFG}.${key}}`
        const noSlash: string = `${ValuesStorage._SLASH_COMMENT}{!${ValuesStorage._CFG}.${key}}`
        this._items[sharp] = value ? '' : ValuesStorage._SHARP_COMMENT
        this._items[slash] = value ? '' : ValuesStorage._SLASH_COMMENT
        this._items[noSharp] = value ? ValuesStorage._SHARP_COMMENT : ''
        this._items[noSlash] = value ? ValuesStorage._SLASH_COMMENT : ''
    }

    public _addNotBooleanValue(key: string, value: string | number): void {
        const placeholder: string = `{${ValuesStorage._CFG}.${key}}`
        this._items[placeholder] = value.toString()
    }

    public addDirectories(directories: DirectoriesConfigInterface): void {
        for (const [key, value] of Object.entries(directories)) {
            const placeholder: string = `{${ValuesStorage._CFG}.${key}}`
            this._items[placeholder] = value.path
        }
    }

    public get items(): ObjectStringInterface {
        return this._items
    }
}