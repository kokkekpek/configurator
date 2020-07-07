import TemplatesFilter from '../../../src/utils/templates/TemplatesFilter'

it('filter', () => {
    const templates: string[] = [
        'text.txt',
        'log/text.txt',
        'data/text.txt',
        'data/info/text.txt',
        'test/text.txt',
    ]
    const directories: string[] = [
        'log',
        'data'
    ]
    const result: string[] = TemplatesFilter.filter(templates, directories)
    expect(result.length).toBe(2)
})