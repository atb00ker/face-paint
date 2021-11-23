import { ServerPathAbsolute } from '../helpers/axios';

export enum RouterPath {
  Home = '/',
  Login = '/login/',
  Logout = '/logout/',
  Dashboard = '/dashboard/',
  SignUp = '/signup/',
  Editor = '/editor/:uuid/',
}

export const getRouterPathEditor = (uuid: string) => {
  return RouterPath.Editor.replace(':uuid', uuid);
};

export enum ServerPath {
  Media = '/media/:file_path',
  Login = '/api/v1/users/login/',
  Register = '/api/v1/users/register/',
  ImageList = '/api/v1/image/',
  ImageDetails = '/api/v1/image/:uuid',
  Logout = '/api/v1/users/logout/',
}

export const getMediaLocation = (file_path: string) => {
  const path = ServerPath.Media.replace(':file_path', file_path);
  return new URL(path, ServerPathAbsolute).toString();
};

export const getServerImageDetailsPath = (uuid: string) => {
  return ServerPath.ImageDetails.replace(':uuid', uuid);
};
