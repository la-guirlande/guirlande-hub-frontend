import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { AccessTokenResponse, Endpoint, ErrorResponse, Response } from '../utils/api';
import { Key } from '../utils/local-storage';

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
export const useQuery = <R extends Response>(auth = false): Query<R> => {
  const [status, setStatus] = useState<Status>(Status.INIT);
  const [code, setCode] = useState(0);

  const get = async (url: string, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await handleQuery('GET', url, null, auth ? setAuthHeader(config) : config);
      handleResponse(res);
      return res.data;
    } catch (err) {
      if ((err as AxiosError<ErrorResponse>).response.data.errors[0].error === 'access_denied' && localStorage.getItem(Key.REFRESH_TOKEN)) {
        console.log('Trying to auto-connect with refresh token');
        try {
          await reconnect();
          const res = await handleQuery('GET', url, null, auth ? setAuthHeader(config) : config);
          handleResponse(res);
          return res.data;
        } catch (err) {
          throw handleError(err as AxiosError<ErrorResponse>);
        }
      }
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const post = async <B>(url: string, body: B, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await handleQuery<R, B>('POST', url, body, auth ? setAuthHeader(config) : config);
      handleResponse(res);
      return res.data;
    } catch (err) {
      if ((err as AxiosError<ErrorResponse>).response.data.errors[0].error === 'access_denied' && localStorage.getItem(Key.REFRESH_TOKEN)) {
        console.log('Trying to auto-connect with refresh token');
        try {
          await reconnect();
          const res = await handleQuery<R, B>('POST', url, body, auth ? setAuthHeader(config) : config);
          handleResponse(res);
          return res.data;
        } catch (err) {
          throw handleError(err as AxiosError<ErrorResponse>);
        }
      }
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const put = async <B>(url: string, body: B, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await handleQuery<R, B>('PUT', url, body, auth ? setAuthHeader(config) : config);
      handleResponse(res);
      return res.data;
    } catch (err) {
      if ((err as AxiosError<ErrorResponse>).response.data.errors[0].error === 'access_denied' && localStorage.getItem(Key.REFRESH_TOKEN)) {
        console.log('Trying to auto-connect with refresh token');
        try {
          await reconnect();
          const res = await handleQuery<R, B>('PUT', url, body, auth ? setAuthHeader(config) : config);
          handleResponse(res);
          return res.data;
        } catch (err) {
          throw handleError(err as AxiosError<ErrorResponse>);
        }
      }
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const patch = async <B>(url: string, body: B, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await handleQuery<R, B>('PATCH', url, body, auth ? setAuthHeader(config) : config);
      handleResponse(res);
      return res.data;
    } catch (err) {
      if ((err as AxiosError<ErrorResponse>).response.data.errors[0].error === 'access_denied' && localStorage.getItem(Key.REFRESH_TOKEN)) {
        console.log('Trying to auto-connect with refresh token');
        try {
          await reconnect();
          const res = await handleQuery<R, B>('PATCH', url, body, auth ? setAuthHeader(config) : config);
          handleResponse(res);
          return res.data;
        } catch (err) {
          throw handleError(err as AxiosError<ErrorResponse>);
        }
      }
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const del = async (url: string, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    try {
      const res = await handleQuery('DELETE', url, null, auth ? setAuthHeader(config) : config);
      handleResponse(res);
      return res.data;
    } catch (err) {
      if ((err as AxiosError<ErrorResponse>).response.data.errors[0].error === 'access_denied' && localStorage.getItem(Key.REFRESH_TOKEN)) {
        console.log('Trying to auto-connect with refresh token');
        try {
          await reconnect();
          const res = await handleQuery('DELETE', url, null, auth ? setAuthHeader(config) : config);
          handleResponse(res);
          return res.data;
        } catch (err) {
          throw handleError(err as AxiosError<ErrorResponse>);
        }
      }
      throw handleError(err as AxiosError<ErrorResponse>);
    }
  }

  const reset = () => {
    setStatus(Status.INIT);
    setCode(0);
  }

  function setAuthHeader(config: AxiosRequestConfig) {
    return { ...config, Headers: { Authorization: `Bearer ${localStorage.getItem(Key.ACCESS_TOKEN)}` } };
  }

  async function handleQuery<RR = R, B = unknown>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, body?: B, config?: AxiosRequestConfig) {
    let res: AxiosResponse<RR>;
    switch (method) {
      case 'GET':
        res = await axios.get<RR>(url, config);
        break;
      case 'POST':
        res = await axios.post<B, AxiosResponse<RR>>(url, body, config);
        break;
      case 'PUT':
        res = await axios.put<B, AxiosResponse<RR>>(url, body, config);
        break;
      case 'PATCH':
        res = await axios.patch<B, AxiosResponse<RR>>(url, body, config);
        break;
      case 'DELETE':
        res = await axios.delete<RR>(url, config);
        break;
      default: throw new Error('Invalid HTTP method');
    }
    console.log(`Request sent : ${method} ${url}`);
    return res;
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

  async function reconnect() {
    const tokenRes = await handleQuery<AccessTokenResponse>('POST', Endpoint.AUTH_ACCESS_TOKEN, { refresh_token: localStorage.getItem(Key.REFRESH_TOKEN) });
    localStorage.setItem(Key.REFRESH_TOKEN, tokenRes.data.refresh_token);
    localStorage.setItem(Key.ACCESS_TOKEN, tokenRes.data.access_token);
  }

  return { status, code, get, post, put, patch, delete: del, reset };
}
