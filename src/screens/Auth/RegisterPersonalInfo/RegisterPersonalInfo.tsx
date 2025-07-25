import React, { useState, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, Button, Icon, Input } from '@components';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '@colors';

import { useTranslation } from 'react-i18next';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';

import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';
import { updateProfile, getIdToken } from '@react-native-firebase/auth';

import styles from './RegisterPersonalInfo.style';
import { useAuth } from '@context/AuthContext';

import { Photo as PhotoType } from '@types';
import { uploadPhotoToCloudinary } from '@api/uploadPhoto';
import ImageResizer from 'react-native-image-resizer';
import { generateUniqueMatchCode } from '@utils/generateMatchCode';
import { useLoading } from '@context/LoadingContext';

const RegisterPersonalInfo = () => {
  const { t } = useTranslation();

  const [nameSurname, setNameSurname] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuth();
  const { isLoading, showLoading, hideLoading } = useLoading();

  const [photo, setPhoto] = useState<PhotoType | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route =
    useRoute<RouteProp<AuthStackParamList, 'RegisterPersonalInfo'>>();

  const db = getFirestore();

  const selectPhoto = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.5,
      });

      if (result.assets?.length) {
        const asset = result.assets[0];
        if (!asset.uri) return;
        const resizedImage = await ImageResizer.createResizedImage(
          asset.uri,
          800,
          800,
          'JPEG',
          80,
        );
        setPhoto({
          uri: resizedImage.uri,
          type: asset.type || 'image/jpeg',
          fileName: `photo_${route.params.email}`,
        });
      }
    } catch (error) {
      console.error('SELECT_PHOTO_ERROR', error);
    }
  }, [route.params.email, t]);

  const handleRegister = useCallback(async () => {
    setError(null);

    if (nameSurname.trim() === '') {
      setError(t('errors.name_surname_required'));
      return;
    }
    showLoading();
    try {
      const { email, password } = route.params;
      const registeredUser = await register(email, password, nameSurname);

      if (!registeredUser) {
        setError(t('errors.register_failed'));
        return;
      }

      if (photo) {
        const idToken = await getIdToken(registeredUser);
        const uploadedPhoto = await uploadPhotoToCloudinary(photo, idToken);

        await setDoc(
          doc(db, 'Users', registeredUser.uid),
          { avatar: uploadedPhoto },
          { merge: true },
        );

        await updateProfile(registeredUser, {
          photoURL: uploadedPhoto.url,
        });
      }
    } catch (e) {
      console.error('Registration error:', e);
      setError(t('errors.general_error'));
    } finally {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'RegisterPermissionRequest' }],
        }),
      );
      setTimeout(() => {
        hideLoading();
      }, 1500) 
    }
  }, [nameSurname, photo, register, route.params, db, navigation, t]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <LinearGradient
        colors={[COLORS.gradient_blue, COLORS.gradient_purple]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <View style={styles.innerContentContainer}>
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
            <Text style={styles.title}>NOTTU</Text>
            <Text style={styles.subTitle}>{t('text.create_account')}</Text>
            <TouchableOpacity
              onPress={selectPhoto}
              style={styles.selectPhotoButton}
              disabled={isLoading}
            >
              {photo?.uri ? (
                <Image
                  source={{ uri: photo.uri }}
                  style={styles.selectedPhoto}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.noPhotoSelectedContainer}>
                  <View style={styles.selectPhotoIconContainer}>
                    <Icon
                      name="camera"
                      color={COLORS.white}
                      size={64}
                      type="ion"
                    />
                  </View>
                  <Text style={styles.buttonText}>
                    {t('button.select_photo')}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <Input
              error={error || undefined}
              label={t('text.name_and_surname')}
              onChangeText={setNameSurname}
              placeholder={t('text.dummy_names_placeholder')}
              editable={!isLoading}
              value={nameSurname}
            />
            <Button
              label={t('button.register')}
              customStyles={{
                container: styles.continueButtonContainer,
              }}
              rightIcon={
                <Icon
                  name="right"
                  type="antdesign"
                  size={20}
                  color={COLORS.black}
                />
              }
              onPress={handleRegister}
              disabled={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterPersonalInfo;
