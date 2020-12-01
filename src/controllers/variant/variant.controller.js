const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { variantService } = require('../../services');
const { summaryService } = require('../../services');
const { Inventory } = require('../../models');
const { Variant } = require('../../models');


const createVariant = catchAsync(async (req, res) => {
  const variant = await variantService.createVariant(req.params.itemId, req.body.createVariantData);
  const summary =  summaryService.updateSummaryVariantData(req.params.itemId, req.body.createSummaryData);
  res.status(httpStatus.CREATED).send(variant);
});

const getVariants = catchAsync(async (req, res) => {
  const result = await variantService.getVariants(req.params.itemId);
  res.send(result);
});

const getVariant = catchAsync(async (req, res) => {
  const variant = await variantService.getVariantById(req.params.itemId, req.params.variantId);
  if (!variant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'variant not found');
  }
  res.send(variant);
});

const updateVariant = catchAsync(async (req, res) => {
  const user = await variantService.updateVariantById(req.params.itemId, req.body);
  res.send(user);
});

const deleteVariant = catchAsync(async (req, res) => {
  await variantService.deleteVariantById(req.params.itemId, req.params.variantId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getProductInfo = catchAsync(async (req, res) => {
  const url = "gap-men-men-navy-short-sleeve-cotton-stretch-logo-polo-shirt-X9FR757W3IK";
  // const regex = /-[^-]*$/gm;
  // const str = req.params.url;
  // let m;

  // while ((m = regex.exec(str)) !== null) {
  //   // This is necessary to avoid infinite loops with zero-width matches
  //   if (m.index === regex.lastIndex) {
  //       regex.lastIndex++;
  //   }
    
  //   // The result can be accessed through the `m`-variable.
  //   m.forEach((match, groupIndex) => {
  //       console.log(`Found match, group ${groupIndex}: ${match}`);
  //   });
  // }
    
  var result = {};
 
  var mongoose = require('mongoose');
  var id = mongoose.Types.ObjectId('5f85487bd22d666cf8952f04');
  var itemId =  mongoose.Types.ObjectId('5f7971a5e598173824256964'); 
     
  const variantDetails = await Variant.aggregate([
    {$match: {"url" : "/gap-men-men-navy-short-sleeve-cotton-stretch-logo-polo-shirt-X9FR757W3IK"}},
    {"$addFields": { "variant": { "$toString": "$_id" }}},
    {$lookup:{from: "prices", localField: "variant",foreignField: "_id", as: "priceData"}},
  ])

  const colors = await Variant.aggregate([
    {$match: {"itemId" : itemId}},
    {$unwind: "$attrs" },
    {$addFields: {'availableColors': { $cond: [{ $eq: ["$attrs.name", "Color"] }, '$attrs.value', null] }}},
    {$match: { "availableColors": { "$exists": true,   "$ne": null }}},
    {$group : { _id : '$availableColors', data: { $push:  '$$ROOT' } }},
    {$lookup:{from: "attributes", localField: "_id",foreignField: "_id" ,as: "colorDetails"}},

 ])
   
  const getSkus = await  Inventory.aggregate([
    {$match: {itemId: id}},
    {$group :  {_id: "$color", sku: { $push:  '$$ROOT' } }},
    {$project: {_id: 0, "sku.color": 0, "sku._id": 0, "sku.itemId": 0,"sku.variantId": 0}}
  ])

  result['colors'] = colors;
  result['variantDetails'] = variantDetails[0];
  result['skus'] = getSkus[0]['sku'];

  res.send(result);

})

module.exports = {createVariant, getVariant, getVariants, updateVariant, deleteVariant, getProductInfo}