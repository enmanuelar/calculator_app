import { ENV_VARS } from "../env.js";
import axios from "axios";
export const fetchOperations = async (accessToken) => {
  const response = await axios.get(`${ENV_VARS.API_URL}api/v1/operations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
