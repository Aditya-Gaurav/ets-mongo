const httpStatus = require('http-status');
const { Facet } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Facet
 * @param {Object} FacetBody
 * @returns {Promise<Facet>}
*/
const createFacet = async (facetBody) => {
      console.log("FacetBody", facetBody)
  const facet = await Facet.create(facetBody);
  return facet;
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
const getFacets = async (filter, options) => {
  const facets = await Facet.paginate(filter, options);
  return facets;
};



/**
 * Get Facet by id
 * @param {ObjectId} id
 * @returns {Promise<Facet>}
 */
const getFacetById = async (id) => {
  return Facet.findById(id);
};


/**
 * Delete Facet by id
 * @param {ObjectId} FacetId
 * @returns {Promise<Facet>}
 */
const deleteFacetById = async (facetId) => {
  const facet = await getFacetById(facetId);
  if (!facet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Facet not found');
  }
  await Facet.remove();
  return facet;
};


module.exports = {createFacet, getFacets, getFacetById, deleteFacetById}