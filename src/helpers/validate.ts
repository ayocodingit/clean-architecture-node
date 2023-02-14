import Joi from 'joi'
import error from '../pkg/error'
import statusCode from '../pkg/statusCode'

const getValidationErrors = (validationErrors: Joi.ValidationErrorItem[]) => {
    const errors: Record<string, string> = {}

    validationErrors.forEach((item) => {
        const { path, message } = item
        const key = path.join('.')
        errors[key] = message
    })

    return errors
}

export const validate = (schema: Joi.Schema, values: any) => {
    const { error, value } = schema.validate(values, {
        abortEarly: false,
        stripUnknown: true,
        errors: {
            wrap: {
                label: '',
            },
        },
        cache: true,
    })

    if (!error) {
        return {
            errors: error,
            value,
        }
    }

    return {
        errors: getValidationErrors(error.details),
        value,
    }
}

export const validateFormRequest = (schema: Joi.Schema, values: any) => {
    const { errors, value } = validate(schema, values)

    if (errors) {
        throw new error(
            statusCode.UNPROCESSABLE_ENTITY,
            JSON.stringify(errors),
            true
        )
    }

    return value
}
