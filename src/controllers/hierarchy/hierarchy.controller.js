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
  console.log('called here');
  var descendants=[]
  var stack=[];
  var item = await Category.find({_id:"Cell_Phones_and_Accessories"});
  stack.push(item);
  console.log("stack", stack.length);

  while (stack.length>0){
      var currentnode = stack.pop();
      var children = await Category.find({parent:currentnode._id});
      console.log(children);
      while(true === children.hasNext()) {
          var child = children.next();
          descendants.push(child._id);
          stack.push(child);
      }
  }
  descendants.join(",")

  res.send(descendants);

})

const getCategoryPath = catchAsync(async (req, res) => {
  console.log('cald');
  var path=[];
  var item = await Category.findOne({_id:"Nokia"});
  console.log(item);
  while (item.parent !== null) {
      item= await Category.findOne({_id:item.parent});
      path.push(item._id);
  }
  const a =  path.reverse().join('/');

  res.send(a);
})

const createNewCategoryNode = catchAsync(async (req, res) => {
  var existingelemscount = await Category.find({parent:'Electronics'}).count();
  var neworder = (existingelemscount+1)*10;
  const a = await Category.insert({_id:'LG', parent:'Electronics', someadditionalattr:'test', order:neworder});
  res.send(a);
})


module.exports = {createHierarchy, getHierarchy, getHierarchys, updateHierarchy, deleteHierarchy, getCategoryDescendants, getCategoryPath, createNewCategoryNode}