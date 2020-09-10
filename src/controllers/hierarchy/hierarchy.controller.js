const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { hierarchyService } = require('../../services');

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

module.exports = {createHierarchy, getHierarchy, getHierarchys, updateHierarchy, deleteHierarchy}