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

// const getAllSummary = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await summaryService.getAllSummary(filter, options);
//   res.send(result);
// });

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

const getAllSummary = catchAsync(async (req, res)=> {

  console.log("req.params",req.query);
  const deeplinkurl = "/women-fashion?p=1&category=T-Shirts--Sweatshirts--Sweaters--Lounge%20Pants&brand=SUGR&f-si=XS&cid=tn_women_fashion"
  
  // const deeplinkurl = "/women-fashion?p=1&category=T-Shirts--Sweatshirts--Sweaters--Lounge%20Pants&brand=SUGR&f-si=XS&cid=tn_women_fashion"
   
 
  // let getDep = deeplinkurl.split(/&/);

  // let dep = getDep.find(value => /^sort=/.test(value));
 
  // dep = dep.split(/sort=/i);
 
  // dep = dep[1];
 
  // let cat = getDep.find(value => /^category=/.test(value));
 
  // cat = cat.split(/category=/i);
 
  // cat = cat[1].split("--");

  // let sort = getDep.find(value => /^sort=/.test(value));
 
  // sort = sort.split(/sort=/i);
 
  // sort = sort[1];
   // db.getCollection('summaries').find(
     
  //   { "dep" : "5f8bad7c407194d9ca4d169g",
  //       sattrs: { $all: [ "brand=aditya","brand=puma"]},
  //       "vars.attrs" : { $all: ["color=red"]},

  //       "$or": [
  //       { cat: { '$regex': "^/5f8bad7c407194d9ca4d169h/5f8bad7c407194d9ca4d169l", '$options': 'i' } },
  //       { cat: { '$regex': "^/5f8bad7c407194d9ca4d169h/5f8bad7c407194d9ca4d1692", '$options': 'i' } }
  //   ]} 
    
    
     
  //   )

   let searchListArray = [];
   let querySearchForCustomer = {
    '$or': []
  };
  let attrsSearchListArray = [];
  let varAttrSearchListArray = [];
  if(req.query.price){
     
  }
  if(req.query.sort){

  }
  if(req.query.discount){

  }
  // if(!req.query.size && !req.query.color && !req.query.category && !req.query.cid) {
    if(req.query.fit) {
      let fits = facetSearchFormat(req.query.fit, 'fit');
      console.log(fits)
      attrsSearchListArray = attrsSearchListArray.concat(fits)
    }   

    if(req.query.pattern) {
      let patterns = facetSearchFormat(req.query.pattern, 'pattern');
      attrsSearchListArray = attrsSearchListArray.concat(patterns)
    } 

    if(req.query.sleeve) {
     

      let sleeves = facetSearchFormat(req.query.sleeve, 'sleeve');
      attrsSearchListArray = attrsSearchListArray.concat(sleeves)
    } 

    if(req.query.neck) {
      
      let necks = facetSearchFormat(req.query.neck, 'neck');
      attrsSearchListArray = attrsSearchListArray.concat(necks);
    } 

    if(req.query.material) {
      let materials = facetSearchFormat(req.query.material, 'material');
      attrsSearchListArray = attrsSearchListArray.concat(materials)
    } 
    if(req.query.ocassion) {
      
      let ocassions = facetSearchFormat(req.query.ocassion, 'ocassion');
      attrsSearchListArray = attrsSearchListArray.concat(ocassions)
    }
    if(req.query.brand) {
      
      let brands = facetSearchFormat(req.query.brand, 'brand');
      attrsSearchListArray = attrsSearchListArray.concat(brands)
    }

    console.log("attrsSearchListArray", attrsSearchListArray); 
    
    let filterQuery = {
      // "vars.attr": varAttr

      "attrs" : { "$all": attrsSearchListArray }
    };
      
    searchListArray.push(filterQuery);

      

  // }

  console.log("searchListArray1", searchListArray);

  if(req.query.size || req.query.color ) {
    let varAttr;
    if(req.query.size) {
      // let size = req.query.size;
      // size = size.replace(/%20/g, " ")
      // let sizes = size.split("--");
      // sizes = sizes.map(number => 'size=' + number);

      let sizes = facetSearchFormat(req.query.size, 'size');
      varAttrSearchListArray = varAttrSearchListArray.concat(sizes)
    }

    if(req.query.color){
      // let color = req.query.color;
      // color = color.replace(/%20/g, " ")
      // let colors = color.split("--");
      // colors = colors.map(color => 'color=' + color);
      // varAttr = varAttr.concat(colors);


      let colors = facetSearchFormat(req.query.color, 'color');
      varAttrSearchListArray = varAttrSearchListArray.concat(colors)
    }

    let filterQuery = {
      // "vars.attr": varAttr

      "vars.attrs" : { "$all": varAttrSearchListArray }
    };
      
    searchListArray.push(filterQuery);
  } 

  if(req.query.cat){
    let category = req.query.cat;
    let cat = category.split("--");

    cat.forEach( (item) => {
      let emailSearch = {
        "cat": {
          "$regex": `^/${req.query.dep}/${item}`,
          "$options": "i"
        }
      };

      querySearchForCustomer['$or'].push(emailSearch)

    })

    if (querySearchForCustomer['$or'].length > 0) {
      searchListArray.push(querySearchForCustomer)
    }
  
    

  
  }

  if(req.query.dep){
    let cid = {
      "dep": req.query.dep
    } 

    searchListArray.push(cid);


  }

   console.log("searchListArray", JSON.stringify(searchListArray));

   return;

  let facets = getFacets.find(value => /^brand/)

  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await summaryService.getAllSummary(filter, options);
  res.send(result);

})

function facetSearchFormat(param, paramName) {
  let input = param.replace(/%20/g, " ")
  let inputs = input.split("--");
  inputs = inputs.map(item => paramName +"="+ item);

  return inputs;
}

module.exports = {createSummary, getAllSummary, getSummary, updateSummary, deleteSummary, getProductAttr}