import winston from 'winston'
import Http from '../../../../transport/http/http'

class Handler {
    constructor(private logger: winston.Logger, private http: Http) {}
}

export default Handler
