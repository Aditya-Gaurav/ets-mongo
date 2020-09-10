const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const hierarchyValidation = require('../../validations/hierarchy.validation');
const hierarchyController = require('../../controllers/hierarchy/hierarchy.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(hierarchyValidation.createHierarchy), hierarchyController.createHierarchy)
  .get( validate(hierarchyValidation.getHierarchys), hierarchyController.getHierarchys);

router
  .route('/:hierarchyId')
  .get(validate(hierarchyValidation.gethierarchy), hierarchyController.getHierarchy)
  .patch( validate(hierarchyValidation.updatehierarchy), hierarchyController.updateHierarchy)
  .delete( validate(hierarchyValidation.deletehierarchy), hierarchyController.deleteHierarchy);

module.exports = router;