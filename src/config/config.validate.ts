import { ValidateFormRequest } from '../helpers/validate'
import configSchema from './config.schema'

export default (env: Record<string, any>) => {
    try {
        const value = ValidateFormRequest(configSchema, env)
        return value
    } catch (error: any) {
        console.error('Config validation error', JSON.parse(error.message))
        process.exit(-1)
    }
}
