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
   
    let f = [] 

    filters[0].filters.forEach(item => {
      for (const [key, value] of Object.entries(item)) {
       if(key === 'facets' ){ 
          item[key].forEach( item => {
            // item.push({a:1})
            f.indexOf(item['name']) === -1  ?
                Object.assign(item,{isSelected:false}) : 
                  Object.assign(item,{isSelected:true})
    
          })
        }
    }
    })

    results['categoryList'] = category;
    results['filters'] = filters[0].filters;



    res.send(results);


})

const getAllSummary = catchAsync(async (req, res)=> {
  const results = {};

    const category = await Category.aggregate([
      {$match:{$and :[ {'parent':"5f8bad7c407194d9ca4d169h"}]}},

    ]);

    const filters = await Summary.aggregate([
      {$match:{$and :[ {'dep':"5f8bad7c407194d9ca4d169h"}]}},
      {$facet: {
    
         "filters": [
            {"$project": {"MergedArray": { "$setUnion": [ "$attrs", "$vars.attrs" ] }}},
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
   console.log("req.query",req.query)
    let f = Object.values(req.query);
    selectedFacets = []
   
    let back =[];
    Object.keys(req.query).forEach( (item) => {
      if(req.query[item]) {
        req.query[item] =  req.query[item].replace(/%20/g, " ");
      }
      const a = req.query[item].split('--');
      back.push(a)
    })
    back = back.flat(1);
    console.log("back", back);

    filters[0].filters.forEach(item => {
      for (const [key, value] of Object.entries(item)) {
       if(key === 'facets' ){ 
          item[key].forEach( item => {
            // item.push({a:1})
            console.log('back.indexOf(item)', back.indexOf(item['name']))
            back.indexOf(item['name']) === -1  ?
                Object.assign(item,{isSelected:false}) : 
                  Object.assign(item,{isSelected:true})
    
          })
        }
    }
    })

  var a = Object.values(req.query);

  var b = [];
  
  a.forEach( (item) => {
   var c = item.split('--');
   b.push(c); 
  })
  
  b = b.flat(1); 

  console.log(b);
 
  
  const deeplinkurl = "/women-fashion?p=1&category=T-Shirts--Sweatshirts--Sweaters--Lounge%20Pants&brand=SUGR&f-si=XS&cid=tn_women_fashion"
   //  db.getCollection('summaries').find(
     
  //   { "dep" : "5f8bad7c407194d9ca4d169g",
  //       sattrs: { $all: [ "brand=aditya","brand=puma"]},
  //       "vars.attrs" : { $all: ["color=red"]},

  //       "$or": [
  //       { cat: { '$regex': "^/5f8bad7c407194d9ca4d169h/5f8bad7c407194d9ca4d169l", '$options': 'i' } },
  //       { cat: { '$regex': "^/5f8bad7c407194d9ca4d169h/5f8bad7c407194d9ca4d1692", '$options': 'i' } }
  //   ]} 
    
    
     
    // )
 
    let filterList = {};


   let searchListArray = [];
   let querySearchForCustomer = {
    '$or': []
  };
  let attrsSearchListArray = [];
  let varAttrSearchListArray = [];
  if(req.query.dep){
    let cid = {
      "dep": req.query.dep
    } 
    Object.assign(filterList, cid);

    // searchListArray.push(cid);
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

      querySearchForCustomer['$or'].push(emailSearch);
      

    })

    if (querySearchForCustomer['$or'].length > 0) {
      // searchListArray.push(querySearchForCustomer);

      Object.assign(filterList, querySearchForCustomer);

    }
  }


  if(req.query.price){
     
  }

  // if(req.query.sort){
  //   let sort = {
  //     "sort": req.query.sort
  //   } 
  //   Object.assign(filterList, sort);
  // }

  if(req.query.discount){
      let discount = {
        "discount": req.query.discount
      } 
      Object.assign(filterList, discount);
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
    "attrs" : { "$all": attrsSearchListArray }
  };
      
  // searchListArray.push(filterQuery);
  if(attrsSearchListArray.length > 0 ) {
    Object.assign(filterList, filterQuery);
  }

  if(req.query.size || req.query.color ) {
    let varAttr;
    if(req.query.size) {
      
      let sizes = facetSearchFormat(req.query.size, 'size');
      varAttrSearchListArray = varAttrSearchListArray.concat(sizes)
    }

    if(req.query.color){
      let colors = facetSearchFormat(req.query.color, 'color');
      varAttrSearchListArray = varAttrSearchListArray.concat(colors)
    }

    let filterQuery = { "vars.attrs" : { "$all": varAttrSearchListArray } };

    if(varAttrSearchListArray.length > 0 ) {
      Object.assign(filterList, filterQuery);
    }

    // searchListArray.push(filterQuery);
  } 

  console.log("searchListArray", JSON.stringify(filterList));
  console.log("req.query", req.query);


  let sort;
  if(req.query.sort){
    
    if(req.query.sort === 'newest') {
      sort = {
        createdAt : -1
      }
    }
    if(req.query.sort === 'price_low_to_high') {
      sort = {
        price : 1
      }
    }
   
    if(req.query.sort === 'price_high_to_low') {
      sort = {
        price : -1
      }
    }

  } else{
    sort = {
      createdAt : -1
    }
  }

  //  return;

  // let facets = getFacets.find(value => /^brand/)

  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
   let result = {};
   console.log('sort', sort);
   console.log("filterList", filterList);

  // const result = await summaryService.getAllSummary(filter, options);
  const styles = await Summary.find(filterList).sort(sort);
  // results['categoryList'] = category;
  // results['filters'] = filters[0].filters;
  const sorting  = {
    "list":[
      {
         "displayName":"Popularity",
         "value":"popularity",
         "isSelected":true
      },
      {
         "displayName":"Newest",
         "value":"newest",
         "isSelected":false
      },
      {
         "displayName":"Price: Low to High",
         "value":"price_low_to_high",
         "isSelected":false
      },
      {
         "displayName":"Price: High to Low",
         "value":"price_high_to_low",
         "isSelected":false
      },
      {
         "displayName":"Discount",
         "value":"discount",
         "isSelected":false
      }
    ],
    "mapping":"sort"
  };

  const queryApplied ={ 
    mapping: "qa",
    value: null
  }
   
  result['sort'] = sorting;
  result['styles'] = styles;
  result['queryApplied'] = queryApplied;

  result['filters'] = {};
  result['filters']['filterBy'] = filters[0].filters;
  result['filters']['category'] = category;

  res.send(result);

})

function facetSearchFormat(param, paramName) {
  let input = param.replace(/%20/g, " ")
  let inputs = input.split("--");
  inputs = inputs.map(item => paramName +"="+ item);

  return inputs;
}

module.exports = {createSummary, getAllSummary, getSummary, updateSummary, deleteSummary, getProductAttr}