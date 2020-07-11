import OutputInterface from './utils/output/OutputInterface'
import Output from './utils/output/Output'
import Configurator from './Configurator'

export default class Main {
    private static readonly _CONFIG_JSON_FILE: string = 'config.json'
    private static readonly _ROOT_PATH: string = '.'

    public constructor() {
        const output: OutputInterface = new Output()
        try {
            Configurator.run(Main._ROOT_PATH, Main._CONFIG_JSON_FILE, output)
        } catch (e) {
            output.error(e.stack)
        }
    }
}