import { PermissionsAndroid, Platform } from 'react-native';

// Örnek çeviri fonksiyon tipini buraya uyarlayabilirsin:
type TranslateFunc = (key: string) => string;

export const checkContactsPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
  }
  return false;
};

export const requestContactsPermission = async (
  t: TranslateFunc
): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: t('text.permission_required'),
        message: t('text.contacts_permission_description'),
        buttonPositive: t('text.give_permission'),
        buttonNegative: t('text.reject_permission'),
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log('CONTACTS_PERMISSION_ERROR', error);
    return false;
  }
};

export const checkNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }
  return true;
};

export const requestNotificationPermission = async (
  t: TranslateFunc
): Promise<boolean> => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: t('text.permission_required'),
          message: t('text.notifications_permission_description'),
          buttonPositive: t('text.give_permission'),
          buttonNegative: t('text.reject_permission'),
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } catch (error) {
    console.log('NOTIFICATION_PERMISSION_ERROR', error);
    return false;
  }
};
