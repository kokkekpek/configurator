import OutputInterface from '../../src/utils/output/OutputInterface'

export default class EmptyOutput implements OutputInterface {
    public ok(message: string): void {}
    public error(message: string): void {}
}