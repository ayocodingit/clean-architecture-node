import winston, { createLogger, format, transports } from 'winston'
import { Config } from '../config/config.interface'

class Logger {
    private logger: winston.Logger

    constructor(config: Config) {
        this.logger = createLogger({
            level: config.app.log,
            format: format.combine(format.json()),
            transports: [new transports.Console()],
        })
    }

    public Info(message: string, ...meta: any[]) {
        this.logger.info(message, ...meta)
    }

    public Error(message: string, ...meta: any[]) {
        this.logger.error(message, ...meta)
    }
}

export default Logger
