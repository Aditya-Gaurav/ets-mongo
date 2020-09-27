const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { hierarchyService } = require('../../services');
const { Category } = require('../../models');
const { Console } = require('winston/lib/winston/transports');


const createHierarchy = catchAsync(async (req, res) => {
  const hierarchy = await hierarchyService.createHierarchy(req.body);
  res.status(httpStatus.CREATED).send(hierarchy);
});

const getHierarchys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await hierarchyService.getHierarchys(filter, options);
  res.send(result);
});

const getHierarchy = catchAsync(async (req, res) => {
  const hierarchy = await hierarchyService.getHierarchyById(req.params.hierarchyId);
  if (!hierarchy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hierarchy not found');
  }
  res.send(hierarchy);
});

const updateHierarchy = catchAsync(async (req, res) => {
  const user = await hierarchyService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteHierarchy = catchAsync(async (req, res) => {
  await hierarchyService.deleteHierarchyById(req.params.hierarchyId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getCategoryDescendants = catchAsync(async (req, res) => {
  // console.log('called here');
  // var descendants=[]
  // var stack=[];
  // var item = await Category.find({_id:"Cell_Phones_and_Accessories"});

  // stack.push(item);
  // console.log("stack", stack);
  // // return;

  // while (stack.length>0){
  //     var currentnode = stack.pop();
  //     console.log("parent:currentnode._id",currentnode);

  //     var children = await Category.find({parent:currentnode._id});
  //     console.log("children", children)

  //     return;

      
  //     // children.forEach(function(child) {
  //     //   descendants.push(child._id);
  //     //   stack.push(child);
  //     // // console.log(race.raceName);    
  //     // });
  //     // for(let i=0; i < children.length ; i++) {
  //     //   var child = children[i];
  //     //   descendants.push(child._id);
  //     //   stack.push(child);
  //     // }
  //     console.log('children.length', children.length)
  //     while(true == (children.length > 0)) {
  //         var child = children.pop();
  //         console.log("child", child);
  //         descendants.push(child);
  //         stack.push(child);
  //     }
  // }

  // // var a = descendants.join(",")

  // res.send(descendants);





  let allItems = await Category.find({});
   console.log("allItems", allItems);
  if (allItems.length) {
    allItems = allItems.map((item) =>
        item.toObject()
    );
    allItems = allItems
        .map((item) => {
            let parentObj = null;
            if (item.parent) {
                parentObj = allItems.find(
                    (findItem) =>
                        findItem._id.toString() ===
                        item.parent.toString()
                );
            }
            if (parentObj) {
                if (!parentObj.children) {
                    parentObj.children = [];
                }
                parentObj.children.push(item);
            }
            return item;
        })
        .filter((item) => !item.parent);

  //  allItems = allItems.filter((item) => item._id == 'Electronics')

   res.send(allItems);     
} else {
    console.error("items not found");
}

})

//get breadcrumb
const getCategoryPath = catchAsync(async (req, res) => {
  console.log('cald');
  var path=[];
  var item = await Category.findOne({_id:"Camcorders"});
  console.log(item);
  while (item.parent !== null) {
      item= await Category.findOne({_id:item.parent});
      path.push(item._id);
  }
  const a =  path.reverse().join('/');

  res.send(a);
})

const createNewCategoryNode = catchAsync(async (req, res) => {
  var existingelemscount = await Category.count({parent:'Electronics'});
  console.log("existingelemscount",existingelemscount);
  var neworder = (existingelemscount+1)*10;
  console.log("neworder", neworder);
  return res.send();

  const a = await Category.insert({_id:'LG', parent:'Electronics', someadditionalattr:'test', order:neworder});
  res.send(a);
})

const updateCategory = catchAsync(async (req, res) => {
  existingelemscount = await Category.find({parent:'Cell_Phones_and_Smartphones'}).count();
  neworder = (existingelemscount+1)*10;
  await Category.update({_id:'LG'},{$set:{parent:'Cell_Phones_and_Smartphones', order:neworder}});
})

const deleteCategory = catchAsync(async (req, res) => {
  // existingelemscount = await Category.find({parent:'Cell_Phones_and_Smartphones'}).count();
  // neworder = (existingelemscount+1)*10;
  await Category.remove({_id:'LG'});
})


module.exports = {createHierarchy, getHierarchy, 
  getHierarchys, updateHierarchy, deleteHierarchy, 
  getCategoryDescendants, getCategoryPath, createNewCategoryNode, 
  updateCategory, deleteCategory}