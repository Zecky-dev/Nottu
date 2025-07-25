import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon, Input } from '@components';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '@colors';

import { validateEmail } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from './LoginEmail.style';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from '@react-native-firebase/firestore';
import { useLoading } from '@context/LoadingContext';

const LoginEmail = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const {showLoading, hideLoading} = useLoading();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checkIfUserExists = async () => {
    const db = getFirestore();
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const validateEmailInput = (email: string): string => {
    const trimmed = email.trim();
    if (trimmed === '') {
      return t('errors.email_required');
    }
    if (!validateEmail(trimmed)) {
      return t('errors.email_not_valid');
    }
    return '';
  };

  const onContinue = async () => {
    setIsSubmitted(true);
    const errorMessage = validateEmailInput(email);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');
    showLoading();
    try {
      const isRegistered = await checkIfUserExists();
      if (isRegistered) {
        navigation.navigate('LoginPassword', { email });
      } else {
        navigation.navigate('RegisterPassword', { email });
      }
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  };

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
          behavior={'padding'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.innerContentContainer}>
            <Text style={styles.title}>NOTTU</Text>
            <Input
              error={isSubmitted ? error : ''}
              value={email}
              label={t('text.email')}
              placeholder={t('text.email_placeholder')}
              onChangeText={val => {
                setEmail(val);
                if (isSubmitted) {
                  const errorMessage = validateEmailInput(val);
                  setError(errorMessage);
                }
              }}
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
              onPress={onContinue}
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginEmail;
