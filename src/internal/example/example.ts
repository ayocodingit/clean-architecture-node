import winston from 'winston'
import { Config } from '../../config/config.interface'
import Http from '../../transport/http/http'

class Example {
    constructor(
        private http: Http,
        private logger: winston.Logger,
        private config: Config
    ) {}
}

export default Example
