import axios from "axios";

export const apiClient = axios.create({
  // baseURL: 'http://localhost:5135/api',
  baseURL: "http://localhost:3003",
});