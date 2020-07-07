const glob = require('glob')

export default class Templates {
    private static readonly _REGEXP: string = '**/*.template.*'

    public static search(directory: string): string[] {
        const regexp: string = `${directory}/${Templates._REGEXP}`
        return glob.sync(regexp)
    }
}