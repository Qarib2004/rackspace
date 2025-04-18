export interface IRegisterRequest {
    firstname: formData.firstName,
    lastname: formData.lastName,
    gender: FormData.gender,
    phoneNumber: formData.phoneNumber,
    birthDate: formData.birthDate,
    city: formData.city,
    district: formData.district,
    email: formData.email,
    password: formData.password,
    passwordConfirm: formData.confirmPassword,
    active: boolean;
    role: 'user' | 'seller' | 'administrator';
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}