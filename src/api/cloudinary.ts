import apiClient from './client';

export const getUploadSignature = async (
  token: string,
  folder: string,
  publicId: string 
) => {
  try {
    const res = await apiClient.post(
      '/cloudinary/getUploadSignature',
      {
        folder,
        public_id: publicId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error('getUploadSignature error:', error?.response?.data || error.message || error);
    throw error;
  }
};

