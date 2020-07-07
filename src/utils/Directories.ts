import DirectoriesConfigInterface from '../config/DirectoriesConfigInterface'
import OutputInterface from './output/OutputInterface'
import fs from 'fs'

export default class Directories {
    private readonly _config: DirectoriesConfigInterface
    private readonly _output: OutputInterface

    public constructor(config: DirectoriesConfigInterface, output: OutputInterface) {
        this._config = config
        this._output = output
    }

    public createAll(): void {
        for (const [ , value] of Object.entries(this._config)) {
            if (!fs.existsSync(value.path))
                fs.mkdirSync(value.path, { recursive: true })
            const mask = Directories._getMask(value.permissions)
            fs.chmodSync(value.path, mask)
            this._output.ok(`${value.path}:${value.permissions}`)
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