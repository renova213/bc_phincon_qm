import Joi from "joi";
const createOrUpdateVoteReviewValidator = Joi.object({
    userId: Joi.string().required().not().empty().messages({
        "any.required": "userId is required",
        "string.empty": "userId cannot be empty",
    }),
    reviewId: Joi.string().required().not().empty().messages({
        "any.required": "reviewId is required",
        "string.empty": "reviewId cannot be empty",
    }),
    type: Joi.string().valid().required().not().empty().messages({
        "any.required": "type is required",
        "string.empty": "type cannot be empty",
    }),
});
export default {
    createOrUpdateVoteReviewValidator,
};
