import apiClient from './client';

export const sendResetPasswordEmail = async (email: string, language: 'tr' | 'en') => {
  try {
    const res = await apiClient.post(
      '/auth/reset-password',
      {
        email,
        language
      },
    );
    return res.data;
  } catch (error: any) {
    console.error('sendResetPasswordEmail error:', error?.response?.data || error.message || error);
    throw error;
  }
};
