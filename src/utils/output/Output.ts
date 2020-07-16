import {green, magenta, white, red} from 'colors/safe'
import OutputInterface from './OutputInterface'
import path from "path";

export default class Output implements OutputInterface {
    private static readonly _ERROR = '[ERROR]'

    public created(file: string): void {
        const filePath = path.resolve('.', file)
        const coloredFilePath: string = green(filePath)
        console.log(`${coloredFilePath}`)
    }

    public replaced(key: string, value: string): void {
        const coloredKey: string = magenta(key)
        const coloredValue: string = white(value)
        console.log(`  ${coloredKey}: ${coloredValue}`)
    }

    public error(message: string): void {
        const error: string = red(Output._ERROR)
        console.log(`${error} ${message}`)
        process.exit(1)
    }
}