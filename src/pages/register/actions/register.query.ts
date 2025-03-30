import axios from 'axios';
import { IRegisterRequest, IRegisterResponse } from './register';
import { API_URL } from 'core/utils/base-url';

const apiUrl = API_URL;

export const registerUserApi = async (userData: IRegisterRequest): Promise<IRegisterResponse> => {
  const responce = await axios.post(`${apiUrl}/users/signup`, userData);
  return responce.data;
};


