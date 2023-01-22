export default class extends Error {
    constructor(
        public status: number,
        public message: string,
        public isObject?: boolean
    ) {
        super(message)
    }
}
