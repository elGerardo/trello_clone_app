export default class Delay {
    public static async handle(seconds: number) {
        return new Promise((resolve) => setTimeout(resolve, seconds))
    }
}