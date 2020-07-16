import {green} from 'colors/safe'
import {red} from 'colors/safe'
import OutputInterface from './OutputInterface'

export default class Output implements OutputInterface {
    private static readonly _ERROR = '[ERROR]'
    private static readonly _OK = '[OK]'

    public created(message: string): void {
        const ok: string = green(Output._OK)
        console.log(`${ok} ${message}`)
    }

    public replaced(message: string): void {
        const ok: string = green(Output._OK)
        console.log(`${ok} ${message}`)
    }

    public error(message: string): void {
        const error: string = red(Output._ERROR)
        console.log(`${error} ${message}`)
        process.exit(1)
    }
}