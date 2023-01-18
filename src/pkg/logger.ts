import winston, { createLogger, format, transports } from 'winston'
import { Config } from '../config/config.interface'

class Logger {
    public logger: winston.Logger

    constructor(config: Config) {
        this.logger = createLogger({
            level: config.app.log,
            format: format.combine(format.json()),
            transports: [new transports.Console()],
        })
    }
}

export default Logger
