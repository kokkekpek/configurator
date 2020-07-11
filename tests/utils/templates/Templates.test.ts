import Templates from '../../../src/utils/templates/Templates'

it('search', () => {
    const templates: Templates = new Templates('./tests/__data__/templates')
    expect(templates.paths).toStrictEqual([
        './tests/__data__/templates/log/three.template.yml',
        './tests/__data__/templates/one.template.yml',
        './tests/__data__/templates/subdirectory/two.template.yml'
    ])
})

it('not exist', () => {
    const templates: Templates = new Templates('./tests/__data__/templates/not-exist')
    expect(templates.paths).toStrictEqual([])
})