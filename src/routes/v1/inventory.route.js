const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const inventoryValidation = require('../../validations/inventory.validation');
const inventoryController = require('../../controllers/inventory/inventory.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(inventoryValidation.createInventory), inventoryController.createInventory)
  .get( validate(inventoryValidation.getAllInventory), inventoryController.getAllInventory);

router
  .route('/:inventoryId')
  .get(validate(inventoryValidation.getInventory), inventoryController.getInventory)
  .patch( validate(inventoryValidation.updateInventory), inventoryController.updateInventory)
  .delete( validate(inventoryValidation.deleteInventory), inventoryController.deleteInventory);

module.exports = router;