const joi=require('joi')
const isNotFutureYear = (value, helpers) => {
    const currentYear = new Date().getFullYear();
    if (value > currentYear) {
        return helpers.message('Publish year cannot be a future year');
    }
    if(value<0)return helpers.message('Publish year cannot be less than 0');
    return value;
};
const isPriceGreaterThanZero = (value, helpers) => {
    if (value <= 0) {
        return helpers.message('Price must be greater than 0');
    }
    return value;
};
const validateBookSchema=joi.object({
    title:joi.string().required(),
    author:joi.string().required(),
    publishYear:joi.string().required().min(0).custom(isNotFutureYear),
    price:joi.number().required().min(0).custom(isPriceGreaterThanZero)
})
module.exports=validateBookSchema;