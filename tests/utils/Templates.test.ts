import Templates from '../../src/utils/Templates'

it('Templates search', () => {
    const searchResult: string[] = Templates.search('./tests/__temp__')
    expect(searchResult).toStrictEqual([
        './tests/__temp__/log/three.template.yml',
        './tests/__temp__/one.template.yml',
        './tests/__temp__/subdirectory/two.template.yml'
    ])
})

it('Templates not exist', () => {
    const searchResult: string[] = Templates.search('./tests/__temp__/not-exist')
    expect(searchResult).toStrictEqual([])
})