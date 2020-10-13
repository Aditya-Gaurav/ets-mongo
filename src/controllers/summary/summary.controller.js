const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { summaryService } = require('../../services');

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

module.exports = {createSummary, getAllSummary, getSummary, updateSummary, deleteSummary}