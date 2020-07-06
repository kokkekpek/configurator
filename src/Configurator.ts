import {exec} from 'child_process'

export default class Configurator {
    constructor() {
        exec('mkdir x -p')
    }
}