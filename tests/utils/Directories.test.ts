import fs from 'fs'
import Directories from '../../src/utils/Directories'
import OutputInterface from '../../src/utils/output/OutputInterface'
import EmptyOutput from '../__override__/EmptyOutput'
import DirectoriesConfigInterface from '../../src/config/DirectoriesConfigInterface'

const rimraf = require('rimraf')
const TEMPORARY_DIRECTORY: string = './tests/tmp'
const TRAEFIK_DATA_PATH: string = TEMPORARY_DIRECTORY + '/traefik/data'
const LOG_PATH: string = TEMPORARY_DIRECTORY + '/log'
const DIRECTORIES_CONFIG: DirectoriesConfigInterface = {
    'traefik.data': {
        path: TRAEFIK_DATA_PATH,
        permissions: 755
    },
    'log': {
        path: LOG_PATH,
        permissions: 755
    }
}

it('createAll', () => {
    if (fs.existsSync(TEMPORARY_DIRECTORY)) rimraf.sync(TEMPORARY_DIRECTORY)
    fs.mkdirSync(TEMPORARY_DIRECTORY, { recursive: true })

    const output: OutputInterface = new EmptyOutput()
    const directories: Directories = new Directories(DIRECTORIES_CONFIG)
    directories.createAll(output)

    expect(fs.existsSync(TRAEFIK_DATA_PATH)).toBeTruthy()
    expect(fs.existsSync(LOG_PATH)).toBeTruthy()
})

it('paths', () => {
    if (fs.existsSync(TEMPORARY_DIRECTORY)) rimraf.sync(TEMPORARY_DIRECTORY)
    fs.mkdirSync(TEMPORARY_DIRECTORY, { recursive: true })

    const directories: Directories = new Directories(DIRECTORIES_CONFIG)
    const paths: string[] = directories.paths
    expect(paths).toStrictEqual([
        TRAEFIK_DATA_PATH,
        LOG_PATH
    ])
})