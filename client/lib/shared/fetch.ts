import { getToken } from "./storage";
import { API_URL } from "@/lib/constants/api";
import { BaseResponse } from "../models";

async function getRequest<T>(url: string) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: await getHeaders(),
  });

  if (!res.ok) {
    handleError(res, "GET");
  }

  const data: BaseResponse<T> = await res.json();
  return data;
}

async function postRequest<TRequest, TResponse = Response>(
  url: string,
  body: TRequest
) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    handleError(res, "POST");
  }
  const data: BaseResponse<TResponse> = await res.json();
  return data;
}
async function patchRequest<TRequest, TResponse = Response>(
  url: string,
  body: TRequest
) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "PATCH",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    handleError(res, "PATCH");
  }
  const data: BaseResponse<TResponse> = await res.json();
  return data;
}

async function deleteRequest(url: string) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: await getHeaders(),
  });
  if (!res.ok) {
    handleError(res, "DELETE");
  }
  return res;
}

async function getHeaders() {
  const token = await getToken();
  return {
    "content-Type": "application/json",
    accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function handleError(
  res: Response,
  method: "GET" | "POST" | "DELETE" | "PATCH"
) {
  throw new Error(`
                    ${method} Request Failed
                    Url: ${res.url}
                    Error code: ${res.status}
                    Error message: ${res.statusText}
                    `);
}

export { getRequest, postRequest, patchRequest, deleteRequest };
