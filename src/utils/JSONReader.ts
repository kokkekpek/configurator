import fs from 'fs'

export default class JSONReader {
    public static readonly FILE_NOT_FOUND_ERROR = 'file not found'
    public static readonly INVALID_JSON_FORMAT_ERROR = 'invalid json format'

    public static read(file: string): any {
        if (!fs.existsSync(file))
            throw new Error(`${file} ${JSONReader.FILE_NOT_FOUND_ERROR}`)
        try {
            const data = fs.readFileSync(file)
            return JSON.parse(data.toString())
        } catch (error) {
            throw new Error(`${file} ${JSONReader.INVALID_JSON_FORMAT_ERROR} ${error.message}`)
        }
    }
}