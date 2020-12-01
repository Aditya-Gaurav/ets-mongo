const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const variantValidation = require('../../validations/variant.validation');
const variantController = require('../../controllers/variant/variant.controller');


router.route('/product').post(variantController.getProductInfo);    


// router
//     .route('/:itemId')
//     .post( variantController.createVariant)
//     .get(validate(variantValidation.getVariants), variantController.getVariants);

// router.route('/:itemId/:variantId')
//     .get(validate(variantValidation.getVariant), variantController.getVariant)
//     .patch(validate(variantValidation.updateVariant), variantController.updateVariant)
//     .delete(validate(variantValidation.deleteVariant), variantController.deleteVariant);


module.exports = router;