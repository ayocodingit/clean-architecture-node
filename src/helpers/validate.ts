import Joi from 'joi'
import error from '../pkg/error'
import statusCode from '../pkg/statusCode'
import { Translate } from './translate'
import {
    RegexAlphabet,
    RegexObjectID,
    RegexSanitize,
    RegexSubdomain,
} from './regex'

const getSourceRegex = (regex: RegExp) => {
    let source = ''

    switch (regex) {
        case RegexSanitize:
            source = 'RegexSanitize'
            break
        case RegexAlphabet:
            source = 'RegexAlphabet'
            break
        case RegexObjectID:
            source = 'RegexObjectID'
            break
        case RegexSubdomain:
            source = 'RegexSubdomain'
            break
        // Other Regex for replace on Translate
    }

    return source
}

const getValidationErrors = (
    validationErrors: Joi.ValidationErrorItem[],
    locale: string
) => {
    const errors: Record<string, string> = {}
    validationErrors.forEach((item) => {
        const { path, message, context } = item

        let type = item.type
        const valid = context?.valids?.join(', ')
        const key = context?.label as string
        const getIndexPath = typeof path[path.length - 1] === 'string' ? 1 : 2
        const attribute = path[path.length - getIndexPath]?.toString()
        const regex = context?.regex
        const limit = context?.limit as string

        if (regex) type = getSourceRegex(regex)

        errors[key] =
            locale && type
                ? Translate(type, { attribute, limit, valid, regex })
                : message
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

export const ValidateParams = <T = any>(schema: Joi.Schema<T>, values: any) => {
    const { errors, value } = Validate(schema, values)

    if (errors) {
        throw new error(statusCode.BAD_REQUEST, errors.value)
    }

    return value
}
