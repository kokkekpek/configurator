import Output from './utils/output/Output'
import JSONReader from './utils/JSONReader'
import ConfigInterface from './config/ConfigInterface'
import Directories from './utils/Directories'
import OutputInterface from './utils/output/OutputInterface'

export default class Configurator {
    private static readonly _JSON = 'config.json'

    constructor() {
        const output: OutputInterface = new Output()
        try {
            const config: ConfigInterface = JSONReader.read(Configurator._JSON)
            const directories: Directories = new Directories(config.directories, output)
            const paths: string[] = directories.paths
        } catch (e) {
            output.error(e.message)
        }
    }
}