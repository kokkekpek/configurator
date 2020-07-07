export default interface OutputInterface {
    ok(message: string): void
    error(message: string): void
}