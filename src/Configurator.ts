import JSONReader from './utils/JSONReader'
import ConfigInterface from './config/ConfigInterface'
import Directories from './utils/Directories'
import OutputInterface from './utils/output/OutputInterface'
import Templates from './utils/templates/Templates'
import TemplatesFilter from './utils/templates/TemplatesFilter'
import TemplatesCopy from './utils/templates/TemplatesCopy'
import ValuesStorage from './utils/ValuesStorage'
import Editor from './utils/Editor'
import ValuesConfigInterface from './config/ValuesConfigInterface'
import ShowConfigInterface from './config/ShowConfigInterface'
import DirectoriesConfigInterface from './config/DirectoriesConfigInterface'

export default class Configurator {
    public static run( rootPath: string, configJsonFile: string, output: OutputInterface): void {
        const config: ConfigInterface = JSONReader.read(configJsonFile)
        const configDirectories: DirectoriesConfigInterface = config.directories ?? {}
        const configValues: ValuesConfigInterface = config.values ?? {}
        const configShow: ShowConfigInterface = config.show ?? {}

        const directories: Directories = new Directories(configDirectories)
        const templates: Templates = new Templates(rootPath)
        directories.createAll(output)
        const templatesPaths: string[] = templates.paths
        const directoriesPaths: string[] = directories.paths
        const filteredTemplatesPaths: string[] = TemplatesFilter.filter(templatesPaths, directoriesPaths)
        const copiedFiles: string[] = TemplatesCopy.copy(filteredTemplatesPaths, output)
        const valuesStorage: ValuesStorage = new ValuesStorage()
        valuesStorage.addDirectories(configDirectories)
        valuesStorage.addValues(configValues)
        valuesStorage.addShows(configShow)
        Editor.edit(copiedFiles, valuesStorage.items)
    }
}