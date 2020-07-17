import ValuesStorage from '../../src/utils/ValuesStorage'

it('addValues', () => {
    const valuesStorage: ValuesStorage = new ValuesStorage()
    valuesStorage.addValues({
        name: 'Name',
        email: 'my.email@gmail.com',
        tls: true,
        log: false
    })
    expect(valuesStorage.items).toStrictEqual({
        '{cfg.name}': 'Name',
        '{cfg.email}': 'my.email@gmail.com',
        '#{cfg.tls}': '',
        '//{cfg.tls}': '',
        '#{!cfg.tls}': '#',
        '//{!cfg.tls}': '//',
        '#{cfg.log}': '#',
        '//{cfg.log}': '//',
        '#{!cfg.log}': '',
        '//{!cfg.log}': '',
    })
})

it('addDirectories', () => {
    const valuesStorage: ValuesStorage = new ValuesStorage()
    valuesStorage.addDirectories({
        'traefik.acme': {
            path: './data/traefik/acme',
            permissions: 775
        },
        'traefik.log': {
            path: './log',
            permissions: 775
        }
    })
    expect(valuesStorage.items).toStrictEqual({
        '{cfg.traefik.acme}': './data/traefik/acme',
        '{cfg.traefik.log}': './log'
    })
})

it('combine', () => {
    const valuesStorage: ValuesStorage = new ValuesStorage()
    valuesStorage.addValues({
        name: 'Name',
        email: 'my.email@gmail.com',
        tls: true,
        log: false
    })
    valuesStorage.addDirectories({
        'traefik.acme': {
            path: './data/traefik/acme',
            permissions: 775
        },
        'traefik.log': {
            path: './log',
            permissions: 775
        }
    })
    expect(valuesStorage.items).toStrictEqual({
        '{cfg.name}': 'Name',
        '{cfg.email}': 'my.email@gmail.com',
        '#{cfg.tls}': '',
        '//{cfg.tls}': '',
        '#{!cfg.tls}': '#',
        '//{!cfg.tls}': '//',
        '#{cfg.log}': '#',
        '//{cfg.log}': '//',
        '#{!cfg.log}': '',
        '//{!cfg.log}': '',
        '{cfg.traefik.acme}': './data/traefik/acme',
        '{cfg.traefik.log}': './log'
    })
})

