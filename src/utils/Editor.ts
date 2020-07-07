import ValuesConfigInterface from '../config/ValuesConfigInterface'
import fs from 'fs'

export default class Editor {
    public static edit(files: string[], values: ValuesConfigInterface): void {
        for (let i: number = 0; i < files.length; i++) {
            const file: string = files[i]
            for (const [key, value] of Object.entries(values)) {
                const buffer: Buffer = fs.readFileSync(file)
                const result: string = buffer.toString().split(key).join(value)
                fs.writeFileSync(file, result)
            }
        }
    }
}