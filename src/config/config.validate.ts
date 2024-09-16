import { Validate } from '../helpers/validate'
import configSchema from './config.schema'

export default (env: Record<string, any>) => {
    const { errors, value } = Validate(configSchema, env)

    if (errors) {
        console.error(errors)
        process.exit(-1)
    }

    return value
}
