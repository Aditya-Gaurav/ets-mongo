const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const itemRoute = require('./item.route');
const variantRoute = require('./variant.route');
const hierarchytRoute = require('./hierarchy.route');
const brandRoute = require('./brand.route');
const facetRoute = require('./facet.route');



const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/items', itemRoute);
router.use('/variants', variantRoute);
router.use('/hierarchys', hierarchytRoute);
router.use('/brands', brandRoute);
router.use('/facets', facetRoute);


module.exports = router;
