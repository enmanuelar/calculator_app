import axios from "axios";
import { ENV_VARS } from "../env.js";

/**
 * The fetchRecords function will fetch records based on the pagination parameters
 * @param {string} accessToken The Auth0 access token
 * @param {number} page The page number for pagination
 * @param {number} limit The limit number for pagination
 * @returns {Object} Response object
 */
export const fetchRecords = async (accessToken, page, limit) => {
  const response = await axios.get(
    `${ENV_VARS.API_URL}api/records?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

/**
 * @typedef {Object} Record
 * @property {number} operationId
 * @property {number} firstValue
 * @property {number} secondValue
 */
/**
 * Submit the new record to the server
 * @param {string} accessToken The Auth0 access token
 * @param {Record} record The new record
 * @returns {Promise} Promise object that resolves to the server response
 */
export const submitRecord = async (accessToken, record) => {
  const response = await axios.post(
    `${ENV_VARS.API_URL}api/calculate`,
    record,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

/**
 * Sends a request to the server to delete a record
 * @param {string} accessToken The Auth0 access token
 * @param {string} recordId The record id
 * @returns {Promise} Promise object that resolves to the server response
 */
export const deleteRecord = async (accessToken, recordId) => {
  const response = await axios.delete(
    `${ENV_VARS.API_URL}api/records/${recordId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
