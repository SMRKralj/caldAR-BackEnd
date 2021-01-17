const { check, validationResult } = require('express-validator/check');

//const { customer, customerType, email, buildings, fiscal_address, phone } = data;

function createCustomerValidations(data) {
    check('customer').not().isEmpty().isLength({ min: 5 }).withMessage('Customer full name must have more than 5 characters'),
        check('customerType').not().isEmpty().isIn(['particular', 'business']).withMessage('Customer type must be particular or business')
    check('email').not().isEmpty.isEmail().withMessage('Your email is not valid '),
        check('buldings').not().isEmpty().isArray().withMessage('Buildings list must be an array'),
        check('fiscal_address').not().isEmpty().isAddress().withMessage
}



/*check('name').not().isEmpty().withMessage('Name must have more than 5 characters'),
check('classYear', 'Class Year should be a number').not().isEmpty(),
    check('weekday', 'Choose a weekday').optional(),
    check('email', 'Your email is not valid').not().isEmpty(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty(), */


module.exports = {
    createCustomerValidations,
};