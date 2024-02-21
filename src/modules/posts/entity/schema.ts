import Joi from 'joi'

// define for schema validate
export const RequestBody = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})
