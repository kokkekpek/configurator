import Templates from '../../../src/utils/templates/Templates'

it('search', () => {
    const templates: Templates = new Templates('./tests/__data__/config')
    expect(templates.paths).toStrictEqual([
        './tests/__data__/config/log/three.template.yml',
        './tests/__data__/config/one.template.yml',
        './tests/__data__/config/subdirectory/two.template.yml'
    ])
})

it('not exist', () => {
    const templates: Templates = new Templates('./tests/__data__/config/not-exist')
    expect(templates.paths).toStrictEqual([])
})