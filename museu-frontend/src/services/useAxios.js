import axios from "axios";

export const FRONT_BASEURL = process.env.REACT_APP_FRONT_BASE_URL || "";
export const API_AUTH_TOKEN_NAME = process.env.REACT_APP_API_AUTH_TOKEN_NAME || "";

export const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
