export default interface OutputInterface {
    created(message: string): void
    replaced(key: string, value: string): void
    error(message: string): void
}