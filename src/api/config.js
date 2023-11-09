import user from "../fixtures/userFixture.js";
import operations from "../fixtures/operationsFixture.js";

/**
 * The fetchConfig function will get the config object from the server
 * @returns {Promise} Promise object that resolves to the config object
 */
export default async function fetchConfig() {
  return new Promise((resolve) => resolve({ user, operations }));
}
