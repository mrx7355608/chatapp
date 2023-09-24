import joi from "joi";
import ApiError from "../utils/ApiError.js";

const registerSchema = joi.object({
    fullname: joi.string().trim().min(5).max(30).required().messages({
        "any.required": "Fullname is required",
        "string.base": "Fullname should be a text value",
        "string.min": "Fullname should be 5 characters long at least",
        "string.max": "Fullname cannot be longer than 30 characters",
        "string.empty": "Fullname cannot be empty",
    }),
    username: joi.string().trim().min(5).max(15).required().messages({
        "any.required": "Username is required",
        "string.base": "Username should be a text value",
        "string.min": "Username should be 5 characters long at least",
        "string.max": "Username cannot be longer than 15 characters",
        "string.empty": "Username cannot be empty",
    }),
    password: joi.string().min(10).max(30).required().messages({
        "any.required": "Password is required",
        "string.base": "Password should be a text value",
        "string.min": "Password should be 10 characters long at least",
        "string.max": "Password cannot be longer than 30 characters",
        "string.empty": "Password cannot be empty",
    }),
    confirmPassword: joi.valid(joi.ref("password")).messages({
        "any.only": "Passwords do not match",
    }),
});

export function registerDataValidator(data) {
    const { error } = registerSchema.validate(data);
    if (error) throw new ApiError(error.message, 400);
}
