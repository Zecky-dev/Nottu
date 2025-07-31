import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initI18n } from './i18n';


import LanguageProvider from './context/LanguageContext';
import Toast from 'react-native-toast-message';

import { AuthStack, AppStack } from '@navigation';

// Firebase
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

import { Loading } from '@components';

import AuthProvider, { useAuth } from '@context/AuthContext';
import LoadingProvider, { useLoading } from '@context/LoadingContext';
import { toastConfig } from '@utils/toastConfig';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, registerCompleted } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user && registerCompleted ? (
        <RootStack.Screen name="App" component={AppStack} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

function AppContent() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const { showLoading, hideLoading } = useLoading();
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      showLoading();
      await initI18n();
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        hideLoading();
      });

      return () => unsubscribe();
    })();
  }, [auth]);

  return <RootNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LoadingProvider>
        <LanguageProvider>
          <AuthProvider>
            <NavigationContainer>
              <AppContent />
              <Loading />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </AuthProvider>
        </LanguageProvider>
      </LoadingProvider>
    </GestureHandlerRootView>
  );
}
