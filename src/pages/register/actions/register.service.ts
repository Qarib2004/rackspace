import { IRegisterRequest, IRegisterResponse } from './register';
import { registerUserApi } from './register.query';

export class RegisterService {
  static async register(registerData: IRegisterRequest): Promise<IRegisterResponse> {
    try {
      const responce = await registerUserApi(registerData);
      return responce;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          }
          throw error;
          
    }
  }
}
