import Output from './utils/output/Output'
import JSONReader from './utils/JSONReader'
import ConfigInterface from './config/ConfigInterface'
import Directories from './utils/Directories'
import OutputInterface from './utils/output/OutputInterface'
import Templates from './utils/templates/Templates'
import TemplatesFilter from './utils/templates/TemplatesFilter'
import TemplatesCopy from './utils/templates/TemplatesCopy'
import ValuesStorage from './utils/ValuesStorage'
import Editor from './utils/Editor'

export default class Configurator {
    private static readonly _JSON = 'config.json'

    constructor() {
        const output: OutputInterface = new Output()
        try {
            const config: ConfigInterface = JSONReader.read(Configurator._JSON)
            const directories: Directories = new Directories(config.directories)
            const templates: Templates = new Templates('.')
            directories.createAll(output)
            const templatesPaths: string[] = templates.paths
            const directoriesPaths: string[] = directories.paths
            const filteredTemplatesPaths: string[] = TemplatesFilter.filter(templatesPaths, directoriesPaths)
            const copiedFiles: string[] = TemplatesCopy.copy(filteredTemplatesPaths, output)
            const valuesStorage: ValuesStorage = new ValuesStorage()
            valuesStorage.addDirectories(config.directories)
            valuesStorage.addShows(config.show)
            valuesStorage.addValues(config.values)
            Editor.edit(copiedFiles, valuesStorage.items)
        } catch (e) {
            process.exit(1)
        }
    }
}