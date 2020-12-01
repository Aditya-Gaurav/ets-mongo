const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const itemRoute = require('./item.route');
const variantRoute = require('./variant.route');
const hierarchytRoute = require('./hierarchy.route');
const brandRoute = require('./brand.route');
const facetRoute = require('./facet.route');
const priceRoute = require('./price.route');
const inventoryRoute = require('./inventory.route');
const cartRoute = require('./cart.route');
const orderRoute = require('./order.route');
const wishlistRoute = require('./wishlist.route');
const summaryRoute = require('./summary.route');


const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/items', itemRoute);
router.use('/variants', variantRoute);
router.use('/hierarchys', hierarchytRoute);
router.use('/brand', brandRoute);
router.use('/facets', facetRoute);
router.use('/price', priceRoute);
router.use('/inventory', inventoryRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/wishlist', wishlistRoute);
router.use('/isummary', summaryRoute);


module.exports = router;
