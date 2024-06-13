import Joi from 'joi'
import error from '../pkg/error'
import statusCode from '../pkg/statusCode'
import { Translate } from './translate'
import { isValidObjectId } from './mongoose'

const getValidationErrors = (
    validationErrors: Joi.ValidationErrorItem[],
    locale: string
) => {
    const errors: Record<string, string> = {}
    validationErrors.forEach((item) => {
        const { path, message, type, context } = item

        const valid = context?.valids?.join(', ')
        const key = context?.label as string
        const attribute = path[path.length - 1].toString()
        const regex = context?.regex as string
        const limit = context?.limit as string


        errors[key] = !locale
            ? message
            : Translate(type, { attribute, limit, valid, regex })
    })

    return errors
}

export const Validate = <T = any>(
    schema: Joi.Schema<T>,
    values: any,
    locale: string = ''
) => {
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
        errors: getValidationErrors(error.details, locale),
        value,
    }
}

export const ValidateFormRequest = <T = any>(
    schema: Joi.Schema<T>,
    values: any,
    locale: string = ''
) => {
    const { errors, value } = Validate(schema, values, locale)

    if (errors) {
        throw new error(
            statusCode.UNPROCESSABLE_ENTITY,
            JSON.stringify(errors),
            true
        )
    }

    return value
}

export const ValidateParams = <T = any>(
    schema: Joi.Schema<T>,
    values: any,
    locale: string = ''
) => {
    const { errors, value } = Validate(schema, values, locale)

    if (errors) {
        throw new error(statusCode.BAD_REQUEST, errors[''])
    }

    return value
}

export const ValidateObjectId = (id: string, attribute: string) => {
    if (!isValidObjectId(id)) {
        throw new error(
            statusCode.BAD_REQUEST,
            Translate('not_valid', { attribute })
        )
    }

    return id
}
