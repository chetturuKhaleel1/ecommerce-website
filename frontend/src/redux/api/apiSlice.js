import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ₹{token}`);
    }
    return headers;
  },
  fetchFn: async (url, options = {}) => {
    if (options.body instanceof FormData) {
      delete options.headers["Content-Type"];
    }
    return fetch(url, options);
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
