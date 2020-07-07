import JSONReader from '../../src/utils/JSONReader'

it('JSONReader valid', () => {
    JSONReader.read('tests/__data__/json/valid.json')
})

it('JSONReader invalid', () => {
    expect(() => {
        JSONReader.read('tests/__data__/json/invalid.json')
    }).toThrow(Error);
})

it('JSONReader not found', () => {
    expect(() => {
        JSONReader.read('tests/__data__/json/not-exist.json')
    }).toThrow(Error);
})