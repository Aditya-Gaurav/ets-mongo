const httpStatus = require('http-status');
const { Hierarchy } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Hierarchy
 * @param {Object} HierarchyBody
 * @returns {Promise<Hierarchy>}
*/
const createHierarchy = async (hierarchyBody) => {
  const hierarchy = await Hierarchy.create(hierarchyBody);
  return hierarchy;
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
const getHierarchys = async (filter, options) => {
  const hierarchys = await Hierarchy.paginate(filter, options);
  return hierarchys;
};

/**
 * Get Hierarchy by id
 * @param {ObjectId} id
 * @returns {Promise<Hierarchy>}
 */
const getHierarchyById = async (id) => {
  return Hierarchy.findById(id);
};


/**
 * Delete Hierarchy by id
 * @param {ObjectId} HierarchyId
 * @returns {Promise<Hierarchy>}
 */
const deleteHierarchyById = async (hierarchyId) => {
  const hierarchy = await getHierarchyById(hierarchyId);
  if (!hierarchy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hierarchy not found');
  }
  await Hierarchy.remove();
  return hierarchy;
};


module.exports = {createHierarchy, getHierarchys, getHierarchyById, deleteHierarchyById}