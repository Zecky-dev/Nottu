import axios from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';

const generateBaseURL = () => {
  try {
    const isEmulator = DeviceInfo.isEmulatorSync();
    const OS = Platform.OS;
    const isDevelopment = __DEV__;

    if (!isDevelopment) {
      return Config.API_URL_REMOTE;
    }

    if (OS === 'android') {
      return isEmulator
        ? Config.API_URL_EMULATOR_ANDROID
        : Config.API_URL_PHYSICAL_ANDROID;
    }

    if (OS === 'ios') {
      return Config.API_URL_IOS;
    }

    console.warn('Platform couldn\'t be recognized, default URL will be used.');
    return Config.API_URL_REMOTE;
  } catch (error) {
    console.error('GENERATE_BASE_URL_ERROR:', error);
    return Config.API_URL_REMOTE;
  }
};

const BASE_URL = generateBaseURL();

console.log('BASE_URL', BASE_URL)

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
