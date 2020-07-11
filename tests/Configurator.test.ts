import fs from 'fs'
import Configurator from '../src/Configurator'
import OutputInterface from '../src/utils/output/OutputInterface'
import EmptyOutput from './__override__/EmptyOutput'

const rimraf = require('rimraf')
const TEMPORARY_DIRECTORY: string = './tests/tmp'
const CONFIG_JSON_ORIGINAL_FILE: string = './tests/__data__/config/config.empty.json'
const CONFIG_JSON_FILE: string = TEMPORARY_DIRECTORY + '/config.json'

it('empty no error', () => {
    if (fs.existsSync(TEMPORARY_DIRECTORY)) rimraf.sync(TEMPORARY_DIRECTORY)
    fs.mkdirSync(TEMPORARY_DIRECTORY, { recursive: true })
    fs.copyFileSync(CONFIG_JSON_ORIGINAL_FILE, CONFIG_JSON_FILE)

    expect.assertions(0)
    try {
        const output: OutputInterface = new EmptyOutput()
        Configurator.run(TEMPORARY_DIRECTORY, CONFIG_JSON_FILE, output)
    } catch (e) {
        console.log(e)
        expect(true).toBeTruthy()
    }
})