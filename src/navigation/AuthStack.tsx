import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

import {
  ForgotPassword,
  LoginEmail,
  LoginPassword,
  RegisterComplete,
  RegisterPassword,
  RegisterPermissionRequest,
  RegisterPersonalInfo,
} from '@screens/Auth';
import { Onboarding } from '@screens';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const completed = await AsyncStorage.getItem('onboarding_completed');
      setShowOnboarding(completed !== 'true');
    })();
  }, []);

  if (showOnboarding === null) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
      <Stack.Screen
        name="RegisterPermissionRequest"
        component={RegisterPermissionRequest}
      />
      <Stack.Screen
        name="RegisterPersonalInfo"
        component={RegisterPersonalInfo}
      />
      <Stack.Screen name="RegisterComplete" component={RegisterComplete} />
    </Stack.Navigator>
  );
};

export default AuthStack;
