class HttpException extends Error {
    constructor(
        public status: number,
        public message: string,
        public isObject?: boolean
    ) {
        super(message)
    }
}

export default HttpException
