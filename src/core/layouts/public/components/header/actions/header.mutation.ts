import { useMutation, useQueryClient } from 'react-query';
import { updateUser, deleteUser } from './header.service';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', data?.id]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.removeQueries('user');
    },
  });
};
