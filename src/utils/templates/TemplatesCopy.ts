import fs from 'fs'
import OutputInterface from '../output/OutputInterface'

export default class TemplatesCopy {
    private static readonly _SUBSTRING: string = '.template.'
    private static readonly _SUBSTRING_REPLACE: string = '.'

    public static copy(files: string[], output: OutputInterface): string[] {
        const result: string[] = []
        for (let i: number = 0; i < files.length; i++) {
            const file: string = files[i]
            const newFile: string = file.replace(TemplatesCopy._SUBSTRING, TemplatesCopy._SUBSTRING_REPLACE)
            fs.copyFileSync(file, newFile)
            result.push(newFile)
            output.ok(newFile)
        }
        return result
    }
}