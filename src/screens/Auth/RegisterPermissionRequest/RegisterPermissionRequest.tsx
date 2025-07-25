import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '@colors';

import styles from './RegisterPermissionRequest.style';
import { Text, View, PermissionsAndroid } from 'react-native';

import PermissionButton from './components/PermissionButton';
import { Button, Icon } from '@components';
import { t } from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigation/types';

const RegisterPermissionRequest = () => {
  const [contactsGranted, setContactsGranted] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onClickContinue = () => {
    navigation.navigate('RegisterComplete');
  };

  type PermissionType = 'notifications' | 'contacts';

  const requestPermission = async (type: PermissionType) => {
    try {
      if (type === 'contacts') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: t('text.permission_required'),
            message: t('text.contacts_permission_description'),
            buttonPositive: t('text.give_permission'),
            buttonNegative: t('text.reject_permission'),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setContactsGranted(true);
        }
      }

      if (type === 'notifications') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: t('text.permission_required'),
            message: t('text.notifications_permission_description'),
            buttonPositive: t('text.give_permission'),
            buttonNegative: t('text.reject_permission'),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setNotificationsGranted(true);
        }
      }
    } catch (error: any) {
      console.log('REQUEST_PERMISSION_ERROR', error);
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const contactsStatus = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        const notificationsStatus = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        setContactsGranted(contactsStatus);
        setNotificationsGranted(notificationsStatus);
      } catch (error) {
        console.log('CHECK_PERMISSIONS_ERROR', error);
      }
    };

    checkPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <LinearGradient
        colors={[COLORS.gradient_blue, COLORS.gradient_purple]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <Text style={styles.title}>NOTTU</Text>
        <View style={styles.permissionsContainer}>
          <PermissionButton
            granted={notificationsGranted}
            onPress={() => requestPermission('notifications')}
            disabled={notificationsGranted}
            title={t('text.activate_notifications')}
            icon={
              <Icon
                name="notifications"
                color={notificationsGranted ? COLORS.white : COLORS.black}
                size={32}
                type="material"
              />
            }
            description={t('text.activate_notifications_descr')}
          />
          <PermissionButton
            granted={contactsGranted}
            onPress={() => requestPermission('contacts')}
            title={t('text.connect_with_contacts')}
            disabled={contactsGranted}
            icon={
              <Icon
                name="contacts"
                color={contactsGranted ? COLORS.white : COLORS.black}
                size={32}
                type="material-community"
              />
            }
            description={t('text.connect_with_contacts_descr')}
          />
          <Button
            label={t('button.continue')}
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
            onPress={onClickContinue}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterPermissionRequest;
