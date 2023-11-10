import { ENV_VARS } from "../env.js";
import axios from "axios";
export const fetchOperations = async (accessToken) => {
  const response = await axios.get(`${ENV_VARS.API_URL}api/operations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// export const submitOperation = async (accessToken, record) => {
//   const response = await axios.post(
//     `${ENV_VARS.API_URL}api/calculate`,
//     record,
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     },
//   );
//   return response.data;
// };
