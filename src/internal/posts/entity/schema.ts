import Joi from 'joi'

export const RequestSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})
