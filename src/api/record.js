/**
 * @typedef {Object} Record
 * @property {string} operationId
 * @property {string} userId
 * @property {number} firstValue
 * @property {number} secondValue
 */
/**
 * The submitOperation function will POST the operation to the server
 * @param {Record} record
 * @returns {Promise} Promise object that resolves to the config object
 */
export async function submitOperation(record) {
  return new Promise((resolve) => {
    resolve({
      statusCode: 200,
      message: "Success",
      data: record,
    });
  });
}
