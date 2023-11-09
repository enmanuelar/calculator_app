import { ENV_VARS } from "../env.js";
import axios from "axios";
export const fetchOperations = async (accessToken) => {
  // return fetch(`${ENV_VARS.API_URL}api/operations`, {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw new Error(response.status.toString());
  // });
  const response = await axios.get(`${ENV_VARS.API_URL}api/operations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const submitOperation = async (accessToken, record) => {
  // return fetch(`${ENV_VARS.API_URL}api/calculate`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify(record),
  // }).then((response) => {
  //   return response.json();
  // });
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
