import axiosInstance from 'core/configs/axios.config';

export const getUser = async (id: any) => {
    const res = await axiosInstance.get(`users/${id}`);
    return res.data;
};


export const updateMe = async (body: any) => {
    const res = await axiosInstance.patch('users/updateMe', body);
    return res.data.data.user;
  };
  



  export const updatePassword = async (passwordData: { 
    passwordCurrent: string; 
    password: string; 
    passwordConfirm: string 
}) => {
    if (!passwordData.passwordCurrent || !passwordData.password || !passwordData.passwordConfirm) {
        throw new Error('All password fields are required to fill out');
    }
    const response = await axiosInstance.patch('/users/update-password', passwordData);
    return response.data;
};