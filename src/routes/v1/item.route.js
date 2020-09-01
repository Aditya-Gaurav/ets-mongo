const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const itemValidation = require('../../validations/item.validation');
const itemController = require('../../controllers/item/item.controller');

router
    .route('/')
    .post(validate(itemValidation.createItem), itemController.createItem)
    .get(validate(itemValidation.getItems), itemController.getItems);

router.route('/:itemId')
    .get(auth('getitems'), validate(itemValidation.getItem), itemController.getItem)
    .patch(auth('manageitem'), validate(itemValidation.updateItem), itemController.updateItem)
    .delete(auth('manageitem'), validate(itemValidation.deleteItem), itemController.deleteItem);

module.exports = router;