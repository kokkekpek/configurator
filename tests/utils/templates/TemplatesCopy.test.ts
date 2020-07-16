import fs from 'fs'
import TemplatesCopy from '../../../src/utils/templates/TemplatesCopy'

const rimraf = require('rimraf')
const copyDir = require('copy-dir')
const TEMPLATES_DIRECTORY: string = './tests/__data__/templates'
const TEMPORARY_DIRECTORY: string = './tests/tmp'

it('copy', () => {
    if (fs.existsSync(TEMPORARY_DIRECTORY))
        rimraf.sync(TEMPORARY_DIRECTORY)
    fs.mkdirSync(TEMPORARY_DIRECTORY, { recursive: true })
    copyDir.sync(TEMPLATES_DIRECTORY, TEMPORARY_DIRECTORY)

    const result:string[] = TemplatesCopy.copy([
        './tests/tmp/log/three.template.yml',
        './tests/tmp/one.template.yml',
        './tests/tmp/subdirectory/two.template.yml'
    ])

    expect(result).toStrictEqual([
        './tests/tmp/log/three.yml',
        './tests/tmp/one.yml',
        './tests/tmp/subdirectory/two.yml'
    ])
    expect(fs.existsSync('./tests/tmp/log/three.yml')).toBeTruthy()
    expect(fs.existsSync('./tests/tmp/one.yml')).toBeTruthy()
    expect(fs.existsSync('./tests/tmp/subdirectory/two.yml')).toBeTruthy()
})