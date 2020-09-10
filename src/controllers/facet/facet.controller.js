const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { facetService } = require('../../services');

const createFacet = catchAsync(async (req, res) => {
  const facet = await facetService.createFacet(req.body);
  res.status(httpStatus.CREATED).send(facet);
});

const getFacets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await facetService.getFacets(filter, options);
  res.send(result);
});

const getFacet = catchAsync(async (req, res) => {
  const facet = await facetService.getFacetById(req.params.facetId);
  if (!facet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Facet not found');
  }
  res.send(facet);
});

const updateFacet = catchAsync(async (req, res) => {
  const user = await facetService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteFacet = catchAsync(async (req, res) => {
  await facetService.deleteFacetById(req.params.facetId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createFacet, getFacet, getFacets, updateFacet, deleteFacet}