import axios from "axios";
import { ENDPOINT } from "../constants";

export const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
});
