import ValuesConfigInterface from '../config/ValuesConfigInterface'
import fs from 'fs'
import OutputInterface from './output/OutputInterface'

export default class Editor {
    public static edit(files: string[], values: ValuesConfigInterface, output: OutputInterface): void {
        for (let i: number = 0; i < files.length; i++) {
            const file: string = files[i]
            output.created(file)

            const buffer: Buffer = fs.readFileSync(file)
            let fileText: string = buffer.toString()
            for (const [key, value] of Object.entries(values)) {
                if (fileText.indexOf(key) !== -1) {
                    fileText = fileText.split(key).join(value)
                    output.replaced(key, value)
                }
            }
            fs.writeFileSync(file, fileText)
        }
    }
}