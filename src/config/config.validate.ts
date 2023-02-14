import { validate } from '../helpers/validate'
import configSchema from './config.schema'

export default (env: any) => {
    const { errors, value } = validate(configSchema, env)

    if (errors) {
        console.error(errors)
        process.exit(-1)
    }

    return value
}
