import OutputInterface from '../../src/utils/output/OutputInterface'

export default class EmptyOutput implements OutputInterface {
    public created(message: string): void {}
    public replaced(key: string, value: string): void {}
    public error(message: string): void {}
}