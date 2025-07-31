import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import styles from './Profile.style';
import { useAuth } from '@context/AuthContext';
import { Button, Icon, Input } from '@components';
import { t } from 'i18next';
import { useLanguage } from '@context/LanguageContext';
import ProfileEditSection from './components/ProfilEditSection';
import usePhotoPicker from '@hooks/usePhotoPicker';
import COLORS from '@colors';

import Modal from 'react-native-modal';
import CustomModal from '@components/CustomModal';
import Premium from '@screens/App/Premium';
import Toggle from './components/Toggle';
import {
  checkNotificationPermission,
  requestNotificationPermission,
} from '@utils/permission';
import { getIdToken, updateProfile } from '@react-native-firebase/auth';
import { uploadPhotoToCloudinary } from '@api/uploadPhoto';
import { useLoading } from '@context/LoadingContext';
import { showToast } from '@utils/toastConfig';

const Profile = () => {
  const { userInfo, logout, updateUserInfo, user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { language, changeLanguage } = useLanguage();
  const { photo, selectPhoto, setPhoto } = usePhotoPicker();

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);

  if (!userInfo) return null;

  const [newNameSurname, setNewNameSurname] = useState(
    userInfo.nameSurname.trim() || '',
  );

  const onUpdateModalClose = () => {
    setUpdateModalVisible(false);
    setNewNameSurname(userInfo.nameSurname);
  };

  const onPremiumModalClose = () => {
    setPremiumModalVisible(false);
  };

  const onLogout = () => {
    Alert.alert(
      t('text.are_you_sure'),
      t('text.are_you_sure_logout'),
      [
        {
          text: t('text.no'),
          style: 'cancel',
        },
        {
          text: t('text.yes'),
          onPress: () => {
            logout();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const onNotificationGrantChange = async (newValue: boolean) => {
    if (newValue) {
      const granted = await requestNotificationPermission(t);
      setNotificationsGranted(granted);
    } else {
      Alert.alert(
        t('text.notification_permission_settings'),
        t('text.notification_permission_change_info'),
        [
          { text: t('text.cancel'), style: 'cancel' },
          { text: t('text.settings'), onPress: () => Linking.openSettings() },
        ],
      );
    }
  };

  const sendMail = () => {
    const URL = 'mailto:nottu.app@gmail.com';
    Linking.openURL(URL);
  };

  const updatePhoto = async () => {
    if (photo?.uri && user && user.email) {
      showLoading();

      try {
        const idToken = await getIdToken(user);

        const uploadedPhoto = await uploadPhotoToCloudinary(
          photo,
          idToken,
          user.email,
        );

        await updateProfile(user, {
          photoURL: uploadedPhoto.url,
        });

        await updateUserInfo({ avatar: uploadedPhoto }, user.uid);

        setPhoto(null);
      } catch (error) {
        showToast({
          type: 'error',
          text1: t('text.fail'),
          text2: t('errors.update_photo_error')
        })
      } finally {
        hideLoading();
      }
    }
  };

  useEffect(() => {
    (async () => {
      const granted = await checkNotificationPermission();
      setNotificationsGranted(granted);
    })();
  }, []);

  return (
    <View style={styles.modalContent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => selectPhoto(userInfo.email)}
          style={styles.editButton}
        >
          <Image
            source={
              photo
                ? { uri: photo.uri }
                : userInfo.avatar
                ? { uri: userInfo.avatar.url }
                : require('@assets/images/user_default.png')
            }
            style={styles.photo}
          />
          <View style={styles.editIconContainer}>
            <Icon name="pencil" type="oct" color="black" size={12} />
          </View>
        </TouchableOpacity>

        <View style={styles.nameSurnameContainer}>
          <Text style={styles.nameSurname}>{userInfo.nameSurname}</Text>
          <TouchableOpacity onPress={() => setUpdateModalVisible(true)}>
            <Icon name="pencil" type="oct" color="black" size={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileEditSectionsContainer}>
          <ProfileEditSection
            icon={require('@assets/images/profile_notification.png')}
            title={t('text.notifications')}
          >
            <View style={styles.notificationGrantContainer}>
              <Text style={styles.notificationGrantInfoText}>
                {t('text.notification_grant_info')}
              </Text>
              <Toggle
                value={notificationsGranted}
                onValueChange={onNotificationGrantChange}
              />
            </View>
          </ProfileEditSection>

          <ProfileEditSection
            icon={require('@assets/images/profile_language.png')}
            title={t('text.language')}
          >
            <View style={styles.languageButtonsContainer}>
              {['en', 'tr'].map(lang => (
                <TouchableOpacity
                  key={lang}
                  activeOpacity={0.8}
                  onPress={() => changeLanguage(lang)}
                  style={[
                    styles.changeLanguageButton,
                    language === lang && styles.activeLanguageContainer,
                  ]}
                >
                  <View
                    style={[
                      styles.circle,
                      language === lang && styles.activeCircle,
                    ]}
                  >
                    {language === lang && (
                      <Icon
                        name="checkmark"
                        type="ion"
                        color="white"
                        size={18}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.languageText,
                      language === lang && styles.activeLanguageText,
                    ]}
                  >
                    {t(`text.${lang}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ProfileEditSection>

          <ProfileEditSection
            icon={require('@assets/images/profile_other.png')}
            title={t('text.other')}
          >
            <View style={styles.buttonsContainer}>
              <Button
                useGradient
                label="Premium"
                gradientColors={[
                  COLORS.premium_gradient_start,
                  COLORS.premium_gradient_end,
                ]}
                leftIcon={
                  <Image
                    source={require('@assets/images/profile_premium.png')}
                    style={styles.buttonIcon}
                  />
                }
                customStyles={{
                  label: styles.buttonLabelWhite,
                  contentContainer: styles.contentGap8,
                }}
                onPress={() => setPremiumModalVisible(true)}
              />
              <View style={styles.rowWithGap}>
                <View style={styles.flex1}>
                  <Button
                    label={t('button.contact_us')}
                    leftIcon={
                      <Image
                        source={require('@assets/images/profile_contact.png')}
                        style={styles.buttonIcon}
                      />
                    }
                    customStyles={{
                      container: styles.borderBlack,
                      label: styles.buttonLabelBlack,
                      contentContainer: styles.contentGap8,
                    }}
                    onPress={sendMail}
                  />
                </View>
                <View style={styles.flex1}>
                  <Button
                    label={t('button.rate_app')}
                    leftIcon={
                      <Image
                        source={require('@assets/images/profile_rate.png')}
                        style={styles.buttonIcon}
                      />
                    }
                    customStyles={{
                      container: styles.borderBlack,
                      label: styles.buttonLabelBlack,
                      contentContainer: styles.contentGap8,
                    }}
                  />
                </View>
              </View>
            </View>
          </ProfileEditSection>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        {photo && (
          <View>
            <Button
              label={t('button.save')}
              backgroundColor={COLORS.success_green}
              leftIcon={
                <Icon name="check" type="feather" color="white" size={18} />
              }
              onPress={updatePhoto}
              customStyles={{
                label: styles.buttonLabelWhite,
                contentContainer: styles.contentGap8,
              }}
            />
          </View>
        )}

        <View>
          <Button
            label={t('button.logout')}
            backgroundColor={COLORS.error_red}
            leftIcon={
              <Image
                source={require('@assets/images/profile_logout.png')}
                style={styles.buttonIcon}
              />
            }
            customStyles={{
              label: styles.buttonLabelWhite,
              contentContainer: styles.contentGap8,
            }}
            onPress={onLogout}
          />
        </View>
      </View>

      <Modal
        isVisible={updateModalVisible}
        onBackButtonPress={onUpdateModalClose}
        onBackdropPress={onUpdateModalClose}
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        style={styles.updateModalContainer}
      >
        <View style={styles.updateModalContent}>
          <Input
            label={t('text.name_and_surname')}
            onChangeText={val => setNewNameSurname(val)}
            placeholder={t('text.name_and_surname')}
            placeholderTextColor={COLORS.black}
            value={newNameSurname}
            customStyles={{
              label: {
                color: COLORS.black,
              },
              input: {
                color: COLORS.black,
              },
              inputContainer: {
                borderColor: COLORS.black,
              },
            }}
          />
          <Button
            label={t('button.save')}
            onPress={() => {
              if (newNameSurname !== userInfo.nameSurname && user) {
                updateUserInfo(
                  { nameSurname: newNameSurname.trim() },
                  user.uid,
                );
              }
              setUpdateModalVisible(false);
            }}
            backgroundColor={COLORS.black}
            customStyles={{
              label: styles.buttonLabelWhite,
              container: {
                borderRadius: 12,
              },
            }}
          />
        </View>
      </Modal>

      <CustomModal
        isFullScreen={false}
        onClose={onPremiumModalClose}
        isVisible={premiumModalVisible}
      >
        <Premium />
      </CustomModal>
    </View>
  );
};

export default Profile;
