import { Joi } from 'celebrate';

export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,14}$/)
        .min(8)
        .max(14)
        .required()
})
