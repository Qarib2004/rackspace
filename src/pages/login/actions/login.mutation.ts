
import { useMutation } from 'react-query';
import { loginService } from './login.service';
import { errorToast } from '../../../core/shared/toast/toast';
import { setToken } from '../../../core/helpers/get-token';
import { store } from '../../../store/store.config';
import { setUser } from '../../../store/store.reducer';
import { useNavigate } from 'react-router-dom';


export const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) => {
      return loginService(data);
    },
    onSuccess: (data: any) => {
      // setToken('users/login');
      setToken(data.token);
      store.dispatch(setUser(data.token));
      navigate('/');
    },
    onError: (error: any) => {
      // console.log(error);
      // errorToast(error?.response?.data?.error || 'Server error occurred.');
    }
  });
};