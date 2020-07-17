import ValuesConfigInterface from './ValuesConfigInterface'
import DirectoriesConfigInterface from './DirectoriesConfigInterface'

export default interface ConfigInterface {
    directories?:  DirectoriesConfigInterface
    values?: ValuesConfigInterface
}