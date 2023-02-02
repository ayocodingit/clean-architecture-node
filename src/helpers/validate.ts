import Joi from 'joi'

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
            error,
            value,
        }
    }

    return {
        errors: getValidationErrors(error.details),
        value,
    }
}
