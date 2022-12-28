export const JoiValidator = async (schema) => {
    return async (payload) => await schema.validateAsync(payload, { abortEarly: false });
}