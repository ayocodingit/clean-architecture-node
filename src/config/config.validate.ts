import { validate } from '../helpers/validate'
import configSchema from './config.schema'

export default (env: any) => {
    const { error, value } = validate(configSchema, env)

    if (error) {
        console.error(error)
        process.exit(-1)
    }

    return value
}
