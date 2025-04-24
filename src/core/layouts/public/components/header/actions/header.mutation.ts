import { useMutation, useQueryClient } from 'react-query';
import { updateUser, deleteUser } from './header.service';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedData: { id: string; body: any }) => updateUser(updatedData),

    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['user', variables.id]);
        queryClient.invalidateQueries(['users']);      },
        onError: (error) => {
          console.error('Error for updating:', error);
        },
    },
    
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.removeQueries('user');
    },
  });
};
