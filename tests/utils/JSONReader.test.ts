import JSONReader from '../../src/utils/JSONReader'

it('valid', () => {
    JSONReader.read('tests/__data__/json/valid.json')
})

it('invalid', () => {
    expect(() => {
        JSONReader.read('tests/__data__/json/invalid.json')
    }).toThrow(Error);
})

it('not found', () => {
    expect(() => {
        JSONReader.read('tests/__data__/json/not-exist.json')
    }).toThrow(Error);
})