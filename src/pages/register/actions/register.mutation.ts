
import { useMutation } from 'react-query';
import { errorToast, successToast } from '../../../core/shared/toast/toast';
import { useNavigate } from 'react-router-dom';
import { registerService } from './register.service';


export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) => {
      return registerService(data);
    },
    onSuccess: (data: any) => {
      successToast('Registration successful!');
      navigate('/login');
    },
    onError: (error: any) => {
      errorToast(error?.response?.data);
    }
  });
};