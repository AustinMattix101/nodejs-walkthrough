import { JoiValidator } from "../../utils/validator.js";
import Joi from 'joi';

const signupSchema = Joi.object({

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string().email().required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


    confirmPassword: Joi.ref("password"),

    address: {
        state: Joi.string().length(2).required()
    },

    DOB: Joi.date().greater(new Date("2012-01-01")).required(),

    referred: Joi.boolean().required(),

    referralDetails: Joi.string().when('referred', { is: true, then: Joi.string().required().min(3).max(50), otherwise: Joi.string().optional()} ),

    // No longer supported Method no longer accepts array arguments: items //   hobbies: Joi.array().items([Joi.string(), Joi.number()]),

    acceptTos: Joi.boolean().truthy("Yes").valid(true).required()
});

export async function validateSignup () {
    return JoiValidator(signupSchema);
};
