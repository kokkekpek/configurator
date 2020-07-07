const glob = require('glob')

export default class Templates {
    private static readonly _REGEXP: string = '**/*.template.*'

    private readonly _root: string

    public constructor(root: string) {
        this._root = root
    }

    public get paths(): string[] {
        const regexp: string = `${this._root}/${Templates._REGEXP}`
        return glob.sync(regexp)
    }
}