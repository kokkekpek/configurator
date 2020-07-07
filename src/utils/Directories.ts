import DirectoriesConfigInterface from '../config/DirectoriesConfigInterface'
import OutputInterface from './output/OutputInterface'
import fs from 'fs'

export default class Directories {
    private readonly _config: DirectoriesConfigInterface

    public constructor(config: DirectoriesConfigInterface) {
        this._config = config
    }

    public createAll(output: OutputInterface): void {
        for (const [ , value] of Object.entries(this._config)) {
            if (!fs.existsSync(value.path))
                fs.mkdirSync(value.path, { recursive: true })
            const mask = Directories._getMask(value.permissions)
            fs.chmodSync(value.path, mask)
            output.ok(`${value.path}:${value.permissions}`)
        }
    }

    public get paths(): string[] {
        const result: string[] = []
        for (const [, value] of Object.entries(this._config))
            result.push(value.path)
        return result
    }

    /**
     * @param permission {number} Example:
     *     775
     * @return {number} Example:
     *     493
     */
    private static _getMask(permission: number) {
        return parseInt(permission.toString(), 8)
    }
}