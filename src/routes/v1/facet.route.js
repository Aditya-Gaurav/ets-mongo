const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const facetValidation = require('../../validations/facet.validation');
const facetController = require('../../controllers/facet/facet.controller');

const router = express.Router();

router
  .route('/')
  .post(  facetController.createFacet)
  .get( validate(facetValidation.getfacets), facetController.getFacets);

router
  .route('/:facetId')
  .get(validate(facetValidation.getfacet), facetController.getFacet)
  .patch( validate(facetValidation.updatefacet), facetController.updateFacet)
  .delete( validate(facetValidation.deletefacet), facetController.deleteFacet);

module.exports = router;