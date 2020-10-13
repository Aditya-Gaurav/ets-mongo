const httpStatus = require('http-status');
const { Summary } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Summary
 * @param {Object} SummaryBody
 * @returns {Promise<Summary>}
*/
const createSummary = async (summaryBody) => {
  console.log("SummaryBody", summaryBody)
  const summary = await Summary.create(summaryBody);
  return summary;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSummary = async (filter, options) => {
  const result = await Summary.paginate(filter, options);
  return result;
};

const updateSummaryVariantData = async(itemId, summaryBody ) => {
  query = {'_id': itemId},
  update = {
    $push: {vars: summaryBody}
  },
  options = {upsert: true, useFindAndModify: false};
  const summary = await Summary.findOneAndUpdate(query, update, options);
  return summary;
}



/**
 * Get Summary by id
 * @param {ObjectId} id
 * @returns {Promise<Summary>}
 */
const getSummary = async (id) => {
  return Summary.findById(id);
};


/**
 * Delete Summary by id
 * @param {ObjectId} SummaryId
 * @returns {Promise<Summary>}
 */
const deleteSummary = async (summaryId) => {
  const summary = await getSummary(summaryId);
  if (!summary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }
  await Summary.remove();
  return summary;
};


module.exports = {createSummary, getAllSummary, getSummary, deleteSummary, updateSummaryVariantData}