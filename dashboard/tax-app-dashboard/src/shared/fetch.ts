import { getToken } from "./cookies";
import { BaseResponse } from "../models";

const API_URL = "http://127.0.0.1:8000/api/";
const revalidate_interval = 60;

async function getRequest<T>(url: string, page?: number) {
  const fullUrl = url.includes("?")
    ? `${API_URL}${url}&page=${page}`
    : `${API_URL}${url}?page=${page}`;

  const res = await fetch(fullUrl, {
    method: "GET",
    headers: getHeaders(),
    next: { revalidate: revalidate_interval },
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
    headers: getHeaders(),
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
    headers: getHeaders(),
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
    headers: getHeaders(),
  });
  if (!res.ok) {
    handleError(res, "DELETE");
  }
  return res;
}

function getHeaders() {
  const token = getToken();
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
  res.json().then((data) => console.log(data));

  throw new Error(`
                    ${method} Request Failed
                    Url: ${res.url}
                    Error code: ${res.status}
                    Error message: ${res.statusText}
                    `);
}

export { getRequest, postRequest, patchRequest, deleteRequest };
