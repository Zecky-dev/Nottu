import apiClient from './client';
import { getUploadSignature } from './cloudinary';
import { Photo as PhotoType } from '@types';

export const uploadPhotoToCloudinary = async (
  photo: PhotoType,
  idToken: string,
) => {
  try {
    const { signature, timestamp, apiKey, cloudName } =
      await getUploadSignature(idToken, 'uploads/avatars');
    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      type: photo.type || 'image/jpeg',
      name: `photo_${photo.fileName}`,
    } as any);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('api_key', apiKey);
    formData.append('folder', 'uploads/avatars');
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const res = await apiClient.post(cloudinaryUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      url: res.data.secure_url,
      id: res.data.public_id,
    };
  } catch (error: any) {
    console.error(
      'Cloudinary upload error:',
      error?.response?.data || error.message || error,
    );
    throw error;
  }
};
