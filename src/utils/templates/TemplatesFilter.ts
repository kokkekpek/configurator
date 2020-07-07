import path from 'path'

export default class TemplatesFilter {
    public static filter(templates: string[], directories: string[]): string[] {
        const result: string[] = []

        directories = TemplatesFilter._resolvedPaths(directories)
        templates = TemplatesFilter._resolvedPaths(templates)

        for (let i: number = 0; i < templates.length; i++) {
            const template: string = templates[i]
            let include: boolean = true
            for (let j: number = 0; j < directories.length; j++) {
                const directory: string = directories[j]
                if (template.substr(0, directory.length) === directory) {
                    include = false
                    break
                }
            }
            if (include) result.push(template)
        }
        return result
    }

    private static _resolvedPaths(paths: string[]): string[] {
        const result: string[] = []
        for (let i: number = 0; i < paths.length; i++) {
            const resolvedPath: string = path.resolve('.', paths[i])
            result.push(resolvedPath)
        }
        return result
    }
}