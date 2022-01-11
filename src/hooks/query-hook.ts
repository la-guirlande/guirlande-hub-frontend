import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { ErrorResponse, Response } from '../utils/api';

/**
 * Query.
 */
export type Query<R extends Response> = {
  status: Status;
  code: number;
  get: (url: string, config?: AxiosRequestConfig) => Promise<R>;
  post: <B>(url: string, body?: B, config?: AxiosRequestConfig) => Promise<R>;
  put: <B>(url: string, body?: B, config?: AxiosRequestConfig) => Promise<R>;
  patch: <B>(url: string, body?: B, config?: AxiosRequestConfig) => Promise<R>;
  delete: (url: string, config?: AxiosRequestConfig) => Promise<R>;
  reset: () => void;
}

/**
 * Status enumeration.
 */
export enum Status {
  INIT = 0,
  IN_PROGRESS = 1,
  SUCCESS = 2,
  ERROR = 3
}

/**
 * Query hook.
 * 
 * This hook can make API calls and returns the response data.
 * 
 * @returns Query
 */
export const useQuery = <R extends Response>(): Query<R> => {
  const [status, setStatus] = useState<Status>(Status.INIT);
  const [code, setCode] = useState(0);

  const get = async (url: string, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await axios.get<R>(url, config);
      console.log(`Request sent : GET ${url}`);
      handleResponse(res);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const post = async <B>(url: string, body: B, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await axios.post<B, AxiosResponse<R>>(url, body, config);
      console.log(`Request sent : POST ${url}`);
      handleResponse(res);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const put = async <B>(url: string, body: B, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await axios.put<B, AxiosResponse<R>>(url, body, config);
      console.log(`Request sent : PUT ${url}`);
      handleResponse(res);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const patch = async <B>(url: string, body: B, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await axios.patch<B, AxiosResponse<R>>(url, body, config);
      console.log(`Request sent : PATCH ${url}`);
      handleResponse(res);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const del = async (url: string, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await axios.delete<R>(url, config);
      console.log(`Request sent : DELETE ${url}`);
      handleResponse(res);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const reset = () => {
    setStatus(Status.INIT);
    setCode(0);
  }

  function handleResponse(res: AxiosResponse<R>) {
    setCode(res.status);
    setStatus(Status.SUCCESS);
    return res.data;
  }

  function handleError(err: AxiosError<ErrorResponse>) {
    setCode(err.response?.status || 500);
    setStatus(Status.ERROR);
    if (err.message === 'Network Error') {
      return { errors: [{ error: 'network_error', error_description: 'Could not connect to server' }] } as ErrorResponse;
    } else {
      return err.response?.data;
    }
  }

  return { status, code, get, post, put, patch, delete: del, reset };
}
