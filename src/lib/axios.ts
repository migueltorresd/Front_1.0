import * as axios from "axios";

import { endpoints } from "@/lib/endpoint";

export const axiosInstance = axios.default.create({
  baseURL: `${endpoints.base}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
