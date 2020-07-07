import fs from 'fs'
import OutputInterface from '../../../src/utils/output/OutputInterface'
import EmptyOutput from '../../__override__/EmptyOutput'
import TemplatesCopy from '../../../src/utils/templates/TemplatesCopy'

const rimraf = require('rimraf')
const copyDir = require('copy-dir')
const CONFIG_DIRECTORY: string = './tests/__data__/config'
const TEMPORARY_DIRECTORY: string = './tests/tmp'

it('copy', () => {
    if (fs.existsSync(TEMPORARY_DIRECTORY))
        rimraf.sync(TEMPORARY_DIRECTORY)
    fs.mkdirSync(TEMPORARY_DIRECTORY, { recursive: true })
    copyDir.sync(CONFIG_DIRECTORY, TEMPORARY_DIRECTORY)

    const output: OutputInterface = new EmptyOutput()
    const result:string[] = TemplatesCopy.copy([
        './tests/tmp/log/three.template.yml',
        './tests/tmp/one.template.yml',
        './tests/tmp/subdirectory/two.template.yml'
    ],output)

    expect(result).toStrictEqual([
        './tests/tmp/log/three.yml',
        './tests/tmp/one.yml',
        './tests/tmp/subdirectory/two.yml'
    ])
    expect(fs.existsSync('./tests/tmp/log/three.yml')).toBeTruthy()
    expect(fs.existsSync('./tests/tmp/one.yml')).toBeTruthy()
    expect(fs.existsSync('./tests/tmp/subdirectory/two.yml')).toBeTruthy()
})