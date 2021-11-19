import axios, { AxiosError, AxiosResponse } from 'axios';
import { ServerPath } from '../enums/UrlPath';
import { ICanvas } from '../types/Canvas';
import { ILogin, ISignUp, IToken } from '../types/User';
const port = location.protocol === 'http:' ? process.env.REACT_APP_PORT : '443';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.baseURL = `${location.protocol}//${location.hostname}:${port}`;

export type HTTPResponse<T> = AxiosResponse<T>;
export type HTTPError = Error | AxiosError;

const getAuthHeader = (token: string) => {
  return { headers: { Authorization: `Token ${token}` } };
};

const commonErrorMsg = (path: string, error: HTTPError) => {
  const url = new URL(path, axios.defaults.baseURL).toString();
  console.error(`Cant't get ${url} because ${error}`);
};

export const saveImageInfo = (uuid: string, drawing: string): Promise<HTTPResponse<string>> => {
  const response: HTTPResponse<string> = {
    data: '',
    status: 200,
    statusText: 'Success',
    headers: '',
    config: {},
  };
  return Promise.resolve(response);
};

export const getImageInfo = (uuid: string): Promise<HTTPResponse<ICanvas>> => {
  const response: HTTPResponse<ICanvas> = {
    data: {
      imageUri: 'https://thispersondoesnotexist.com/image',
      drawing:
        '{"lines":[{"points":[{"x":278.5395162480794,"y":254.17891189987532},{"x":268.3201293910842,"y":259.4769423803893},{"x":255.79836958201037,"y":264.51829907799885},{"x":245.97862412726812,"y":267.99499329665275},{"x":238.43508780779158,"y":271.7045732660023},{"x":233.8113133073532,"y":273.55058377642047},{"x":232.0331563285155,"y":274.15248453280327},{"x":229.258193877493,"y":274.89565327633835},{"x":222.502818669745,"y":276.02364290325147},{"x":215.40193091619753,"y":274.50680085016614},{"x":213.471688720106,"y":274.15451494888623},{"x":211.52316089355975,"y":273.8504126807884},{"x":211.52316089355975,"y":273.8504126807884}],"brushColor":"#444","brushRadius":12}],"width":400,"height":400}',
    },
    status: 200,
    statusText: 'Success',
    headers: '',
    config: {},
  };
  return Promise.resolve(response);
};

export const getUserCanvasList = (): Promise<HTTPResponse<Array<ICanvas>>> => {
  const response: HTTPResponse<Array<ICanvas>> = {
    data: [
      { id: '69b2a199-72c0-4406-90b4-2aa5743a77da', imageUri: 'https://thispersondoesnotexist.com/image' },
      { id: '69b2a199-72c0-4406-90b4-2aa5743a77db', imageUri: 'https://thispersondoesnotexist.com/image' },
      { id: '69b2a199-72c0-4406-90b4-2aa5743a77dc', imageUri: 'https://thispersondoesnotexist.com/image' },
      { id: '69b2a199-72c0-4406-90b4-2aa5743a77dd', imageUri: 'https://thispersondoesnotexist.com/image' },
      { id: '69b2a199-72c0-4406-90b4-2aa5743a77de', imageUri: 'https://thispersondoesnotexist.com/image' },
      { id: '69b2a199-72c0-4406-90b4-2aa5743a77df', imageUri: 'https://thispersondoesnotexist.com/image' }
    ],
    status: 200,
    statusText: 'Success',
    headers: '',
    config: {},
  };
  return Promise.resolve(response);
};

export const createCanvas = (canvas: ICanvas): Promise<HTTPResponse<string>> => {
  const response: HTTPResponse<string> = {
    data: '69b2a199-72c0-4406-90b4-2aa5743a77db',
    status: 200,
    statusText: 'Success',
    headers: '',
    config: {},
  };
  return Promise.resolve(response);
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
