
import { Joi } from 'celebrate';

export const sendMessageSchema = Joi.object({
    sender: Joi.string().required(),
    content: Joi.string().required(),
    chat: Joi.string().required()
}).messages({
    'any.required': 'This field is required.'
})

export const getAllMessageSchema = Joi.object({
    chatId: Joi.string().required()
})

