const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { summaryService } = require('../../services');
const { Summary } = require('../../models');
const Category = require('../../models/category.model');

const createSummary = catchAsync(async (req, res) => {
  const summary = await summaryService.createSummary(req.body.createSummaryData);
  res.status(httpStatus.CREATED).send(summary);
});

const getAllSummary = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await summaryService.getAllSummary(filter, options);
  res.send(result);
});

const getSummary = catchAsync(async (req, res) => {
  const summary = await summaryService.getSummary(req.params.SummaryId);
  if (!summary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }
  res.send(Summary);
});

const updateSummary = catchAsync(async (req, res) => {
  const user = await summaryService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteSummary = catchAsync(async (req, res) => {
  await summaryService.deleteSummaryById(req.params.SummaryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getProductAttr = catchAsync(async (req, res) => {
    const results = {};

    const category = await Category.aggregate([
      {$match:{$and :[ {'parent':"5f8bad7c407194d9ca4d169h"}]}},

    ]);

    const filters = await Summary.aggregate([
      {$match:{$and :[ {'dep':"5f8bad7c407194d9ca4d169h"}]}},
      {$facet: {
    
         "filters": [
            {"$project": {"MergedArray": { "$setUnion": [ "$attrs", "$sattrs", "$vars.attrs" ] }}},
            {"$unwind" : "$MergedArray"},
            {"$unwind" : "$MergedArray"},
            {"$group" : { _id : '$_id', MergedArray: { $addToSet: "$MergedArray" }}},
            {"$unwind": "$MergedArray"},
            {"$sortByCount": "$MergedArray"},
             { "$addFields": { 
                "value": { "$arrayElemAt": [{ "$split": [ "$_id", "=" ]} , 1 ]},
               "filterById": { "$arrayElemAt": [{ "$split": [ "$_id", "=" ]} , 0 ]},
    
            }},
            {"$group" : { _id : '$filterById' ,   "facets": { "$push":  {"name": "$value", sum: {'$sum': "$count"}} } } },
            
          ]}
       }
    ]) 
    results['categoryList'] = category;
    results['filters'] = filters[0].filters;


    res.send(results);


})

module.exports = {createSummary, getAllSummary, getSummary, updateSummary, deleteSummary, getProductAttr}