import axios, { AxiosError, AxiosResponse } from 'axios';
import { getServerImageDetailsPath, ServerPath } from '../enums/UrlPath';
import { ICanvas } from '../types/Canvas';
import { ILogin, ISignUp, IToken } from '../types/User';
const port = location.protocol === 'http:' ? process.env.REACT_APP_PORT : '443';

export const ServerPathAbsolute = `${location.protocol}//${location.hostname}:${port}`;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.baseURL = ServerPathAbsolute;

export type HTTPResponse<T> = AxiosResponse<T>;
export type HTTPError = Error | AxiosError;

const getAuthHeader = (token: string) => {
  return { headers: { Authorization: `Token ${token}` } };
};

const commonErrorMsg = (path: string, error: HTTPError) => {
  const url = new URL(path, axios.defaults.baseURL).toString();
  console.error(`Cant't get ${url} because ${error}`);
};

export const saveImageInfo = (
  token: string,
  uuid: string,
  canvas: ICanvas,
): Promise<HTTPResponse<ICanvas>> => {
  const path = getServerImageDetailsPath(uuid);
  return axios.post(path, canvas, getAuthHeader(token)).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.ImageDetails, error);
    throw error;
  });
};

export const getImageInfo = (token: string, uuid: string): Promise<HTTPResponse<ICanvas>> => {
  const path = getServerImageDetailsPath(uuid);

  return axios.get(path, getAuthHeader(token)).catch((error: HTTPError) => {
    commonErrorMsg(path, error);
    throw error;
  });
};

export const getUserCanvasList = (token: string): Promise<HTTPResponse<Array<ICanvas>>> => {
  return axios.get(ServerPath.ImageList, getAuthHeader(token)).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.ImageList, error);
    throw error;
  });
};

export const createCanvas = (token: string, canvas: ICanvas): Promise<HTTPResponse<ICanvas>> => {
  const data = new FormData();
  data.append('drawing', canvas.drawing);
  data.append('image', canvas?.image || '', canvas.image?.name);

  return axios.post(ServerPath.ImageList, data, getAuthHeader(token)).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.ImageList, error);
    throw error;
  });
};

export const signUpRequest = (userData: ISignUp): Promise<HTTPResponse<string>> => {
  return axios.post(ServerPath.Register, userData).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.Register, error);
    throw error;
  });
};

export const getAuthTokenRequest = (credentials: ILogin): Promise<HTTPResponse<IToken>> => {
  return axios.post(ServerPath.Login, credentials).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.Login, error);
    throw error;
  });
};

export const deleteAuthTokenRequest = (token: string): Promise<HTTPResponse<string>> => {
  return axios.get(ServerPath.Logout, getAuthHeader(token)).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.Logout, error);
    throw error;
  });
};
