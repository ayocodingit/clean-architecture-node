import Logger from '../pkg/logger'
import configSchema from './config.schema'

export default (env: any) => {
    const { value, error } = configSchema.validate(env, {
        cache: true,
        abortEarly: false,
        stripUnknown: true,
    })

    if (error) {
        console.error(error.message)
        process.exit(-1)
    }

    return value
}
