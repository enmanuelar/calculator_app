import axios from "axios";
import { ENV_VARS } from "../env.js";

export const fetchHistory = async (accessToken, page, limit) => {
  const response = await axios.get(
    `${ENV_VARS.API_URL}api/records?page=${page}&limit=${limit}`,
    {
      // params: {
      //   page,
      //   limit,
      // },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
