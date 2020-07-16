export default interface OutputInterface {
    created(message: string): void
    replaced(message: string): void
    error(message: string): void
}