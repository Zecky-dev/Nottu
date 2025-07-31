import { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Photo as PhotoType } from '@types';
import ImageResizer from 'react-native-image-resizer';

type UsePhotoPickerReturn = {
  photo: PhotoType | null;
  selectPhoto: (fileNamePostFix?: string) => Promise<void>;
  setPhoto: React.Dispatch<React.SetStateAction<PhotoType | null>>;
};

const usePhotoPicker = (): UsePhotoPickerReturn => {
  const [photo, setPhoto] = useState<PhotoType | null>(null);

  const selectPhoto = useCallback(async (photoName = 'photo') => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      });

      if (result.assets?.length) {
        const asset = result.assets[0];
        if (!asset.uri) return;

        const resizedImage = await ImageResizer.createResizedImage(
          asset.uri,
          1280,
          720,
          'JPEG',
          80,
        );

        setPhoto({
          uri: resizedImage.uri,
          type: asset.type || 'image/jpeg',
          fileName: `photo_${photoName}`,
        });
      }
    } catch (error) {
      console.error('PHOTO_PICKER_ERROR', error);
    }
  }, []);

  return { photo, selectPhoto, setPhoto };
};

export default usePhotoPicker;
