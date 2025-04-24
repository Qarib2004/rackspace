import { useMutation, useQueryClient } from 'react-query';
import { updateMe, updatePassword } from './profile.service';

export const useUpdateMe = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      (body: any) => updateMe(body),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(['user']); 
        },
        onError: (error) => {
          console.error('Profil yenilənərkən xəta:', error);
        },
      }
    );
  };
  


  export const useUpdatePassword = () => {
    const queryClient = useQueryClient();
  
    return useMutation(updatePassword, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['user']); 
      },
      onError: (error) => {
        console.error('error:', error);
      },
    });
  };